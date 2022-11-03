import { RelationTuple } from '../relation-tuple'

export type ReplaceableString<T extends Record<string, string>> = (replacements: T) => string

export interface SubjectSetWithReplacements<T extends Record<string, string>> {
	namespace: ReplaceableString<T>
	object: ReplaceableString<T>
	relation: ReplaceableString<T>
}

export interface RelationTupleWithReplacements<T extends Record<string, string>> {
	namespace: ReplaceableString<T>
	object: ReplaceableString<T>
	relation: ReplaceableString<T>
	subjectIdOrSet: ReplaceableString<T> | SubjectSetWithReplacements<T>
}

export const applyReplacements = <T extends Record<string, string>>(
	relationTuple: RelationTupleWithReplacements<T>,
	replacements: T,
): RelationTuple => {
	let subjectIdOrSet: RelationTuple['subjectIdOrSet']
	if (typeof relationTuple.subjectIdOrSet === 'object') {
		subjectIdOrSet = {
			namespace: relationTuple.subjectIdOrSet.namespace(replacements),
			object: relationTuple.subjectIdOrSet.object(replacements),
			relation: relationTuple.subjectIdOrSet.relation(replacements),
		}
	} else {
		subjectIdOrSet = relationTuple.subjectIdOrSet(replacements)
	}

	return {
		namespace: relationTuple.namespace(replacements),
		object: relationTuple.object(replacements),
		relation: relationTuple.relation(replacements),
		subjectIdOrSet,
	}
}
