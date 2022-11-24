import {
	isRelationTuple,
	RelationTuple,
	RelationTupleWithReplacements,
	ReplacementValues,
} from '@nidomiro/relation-tuple-parser'
import { RelationQuery as KetoRelationQuery, RelationTuple as KetoRelationTuple } from '@ory/keto-client'

export function createRelationQuery(tuple: RelationTuple): KetoRelationQuery
export function createRelationQuery<T extends ReplacementValues>(
	tuple: RelationTupleWithReplacements<T>,
	replacements: T,
): KetoRelationQuery
export function createRelationQuery<T extends ReplacementValues>(
	tuple: RelationTuple | RelationTupleWithReplacements<T>,
	replacements?: T,
): KetoRelationQuery {
	if (isRelationTuple(tuple)) {
		return createRelationTuple(tuple)
	}
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return createRelationTuple(tuple, replacements!)
}

export function createRelationTuple(tuple: RelationTuple): KetoRelationTuple
export function createRelationTuple<T extends ReplacementValues>(
	tuple: RelationTupleWithReplacements<T>,
	replacements: T,
): KetoRelationTuple
export function createRelationTuple<T extends ReplacementValues>(
	tuple: RelationTuple | RelationTupleWithReplacements<T>,
	opt_replacements?: T,
): KetoRelationTuple {
	if (isRelationTuple(tuple)) {
		const result: KetoRelationTuple = {
			namespace: tuple.namespace,
			object: tuple.object,
			relation: tuple.relation,
		}

		if (typeof tuple.subjectIdOrSet === 'string') {
			result.subject_id = tuple.subjectIdOrSet
		} else {
			result.subject_set = {
				...tuple.subjectIdOrSet,
				relation: tuple.subjectIdOrSet.relation ?? '',
			}
		}

		return result
	}
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const replacements: T = opt_replacements! // cannot be null

	const result: KetoRelationTuple = {
		namespace: tuple.namespace(replacements),
		object: tuple.object(replacements),
		relation: tuple.relation(replacements),
	}

	if (typeof tuple.subjectIdOrSet === 'function') {
		result.subject_id = tuple.subjectIdOrSet(replacements)
	} else {
		result.subject_set = {
			namespace: tuple.subjectIdOrSet.namespace(replacements),
			object: tuple.subjectIdOrSet.object(replacements),
			relation: tuple.subjectIdOrSet.relation(replacements) ?? '',
		}
	}

	return result
}
