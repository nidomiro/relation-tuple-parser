import { error, Result, value } from 'defekt'
import { parseRelationTuple } from '../relation-tuple-parser'
import { RelationTupleWithReplacements } from './relation-tuple-with-replacements'
import { generateReplacerFunction } from './generate-replacer-function'
import { TwoWayMap } from '../util/two-way-map'
import { ReplacementValues } from './replacement-values'
import { RelationTupleSyntaxError } from '../errors/relation-tuple-syntax.error'
import { UnknownError } from '../errors/unknown.error'

const delimiter = '\u2744'

export type RelationTupleStringGenerator<T> = (args: T) => string

export const parseRelationTupleWithReplacements = <T extends ReplacementValues>(
	relationTupleStringGenerator: RelationTupleStringGenerator<T>,
): Result<RelationTupleWithReplacements<T>, RelationTupleSyntaxError | UnknownError> => {
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
			relation: tuple.subjectIdOrSet.relation
				? generateReplacerFunction(tuple.subjectIdOrSet.relation, usedPlaceholderLookupMap)
				: () => undefined,
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
