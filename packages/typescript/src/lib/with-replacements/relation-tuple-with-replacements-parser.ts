import { error, Result, value } from 'defekt'
import { parseRelationTuple, RelationTupleSyntaxError } from '../relation-tuple-parser'
import { RelationTupleWithReplacements } from './relation-tuple-with-replacements'
import { generateReplacerFunction } from './generate-replacer-function'
import { TwoWayMap } from '../util/two-way-map'

const delimiter = '\u2744'

export type CreateRelationTupleStrWithReplacements<T> = (args: T) => string

export const parseRelationTupleWithReplacements = <T extends Record<string, string>>(
	relationTupleStringGenerator: CreateRelationTupleStrWithReplacements<T>,
): Result<RelationTupleWithReplacements<T>, RelationTupleSyntaxError> => {
	const usedPlaceholder = new Map<keyof T, string>()
	const argsProxy = new Proxy<T>({} as T, {
		get(target: T, p: string): string {
			const placeholder = `${delimiter}${p}${delimiter}`
			usedPlaceholder.set(p, placeholder)
			return placeholder
		},
	})

	const relationTupleStr = relationTupleStringGenerator(argsProxy)

	const relationTupleResult = parseRelationTuple(relationTupleStr)
	if (relationTupleResult.hasError()) {
		return error(relationTupleResult.error)
	}
	const tuple = relationTupleResult.value

	const usedPlaceholderLookupMap = new TwoWayMap(usedPlaceholder)

	let subjectIdOrSet: RelationTupleWithReplacements<T>['subjectIdOrSet']
	if (typeof tuple.subjectIdOrSet === 'object') {
		subjectIdOrSet = {
			namespace: generateReplacerFunction(tuple.subjectIdOrSet.namespace, usedPlaceholderLookupMap),
			object: generateReplacerFunction(tuple.subjectIdOrSet.object, usedPlaceholderLookupMap),
			relation: generateReplacerFunction(tuple.subjectIdOrSet.relation, usedPlaceholderLookupMap),
		}
	} else {
		subjectIdOrSet = generateReplacerFunction(tuple.subjectIdOrSet, usedPlaceholderLookupMap)
	}

	return value({
		namespace: generateReplacerFunction(tuple.namespace, usedPlaceholderLookupMap),
		object: generateReplacerFunction(tuple.object, usedPlaceholderLookupMap),
		relation: generateReplacerFunction(tuple.relation, usedPlaceholderLookupMap),
		subjectIdOrSet,
	})
}
