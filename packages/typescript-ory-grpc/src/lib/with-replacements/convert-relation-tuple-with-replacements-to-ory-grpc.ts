import { RelationTupleWithReplacements } from '@nidomiro/relation-tuple-parser'
import {
	RelationTuple as OryRelationTuple,
	Subject as OrySubject,
	SubjectSet as OrySubjectSet,
} from '@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/relation_tuples_pb'

export const convertRelationTupleWithReplacementsToOryGrpc = <T extends Record<string, string>>(
	tuple: RelationTupleWithReplacements<T>,
	replacements: T,
): OryRelationTuple => {
	const relationTuple = new OryRelationTuple()
	relationTuple.setNamespace(tuple.namespace(replacements))
	relationTuple.setObject(tuple.object(replacements))
	relationTuple.setRelation(tuple.relation(replacements))

	const subject = new OrySubject()
	if (typeof tuple.subjectIdOrSet === 'function') {
		subject.setId(tuple.subjectIdOrSet(replacements))
	} else {
		const subjectSet = new OrySubjectSet()
		subjectSet.setNamespace(tuple.subjectIdOrSet.namespace(replacements))
		subjectSet.setObject(tuple.subjectIdOrSet.object(replacements))
		subjectSet.setRelation(tuple.subjectIdOrSet.relation(replacements))
		subject.setSet(subjectSet)
	}
	relationTuple.setSubject(subject)

	return relationTuple
}
