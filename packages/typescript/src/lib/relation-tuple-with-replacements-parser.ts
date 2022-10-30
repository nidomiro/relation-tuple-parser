import { error, Result, value } from 'defekt'
import { parseRelationTuple, RelationTupleSyntaxError } from './relation-tuple-parser'
import { RelationTupleWithReplacements } from './relation-tuple-with-replacements'
import { generateReplacerFunction } from './util'

const delimiter = '\u2744'

export type CreateRelationTupleStrWithReplacements<T> = (args: T) => string

export const parseRelationTupleWithReplacements = <T extends Record<string, string>>(
	relationTupleStringCreator: CreateRelationTupleStrWithReplacements<T>,
): Result<RelationTupleWithReplacements<T>, RelationTupleSyntaxError> => {
	const usedPlaceholder = new Map<keyof T, string>()
	const argsProxy = new Proxy<T>({} as T, {
		get(target: T, p: string): string {
			const placeholder = `${delimiter}${p}${delimiter}`
			usedPlaceholder.set(p, placeholder)
			return placeholder
		},
	})

	const relationTupleStr = relationTupleStringCreator(argsProxy)

	const relationTupleResult = parseRelationTuple(relationTupleStr)
	if (relationTupleResult.hasError()) {
		return error(relationTupleResult.error)
	}
	const tuple = relationTupleResult.value

	let subjectIdOrSet: RelationTupleWithReplacements<T>['subjectIdOrSet']
	if (typeof tuple.subjectIdOrSet === 'object') {
		subjectIdOrSet = {
			namespace: generateReplacerFunction(tuple.subjectIdOrSet.namespace, usedPlaceholder),
			object: generateReplacerFunction(tuple.subjectIdOrSet.object, usedPlaceholder),
			relation: generateReplacerFunction(tuple.subjectIdOrSet.relation, usedPlaceholder),
		}
	} else {
		subjectIdOrSet = generateReplacerFunction(tuple.subjectIdOrSet, usedPlaceholder)
	}

	return value({
		namespace: generateReplacerFunction(tuple.namespace, usedPlaceholder),
		object: generateReplacerFunction(tuple.object, usedPlaceholder),
		relation: generateReplacerFunction(tuple.relation, usedPlaceholder),
		subjectIdOrSet,
	})
}
