import { RelationTuple } from '@nidomiro/relation-tuple-parser'
import {
	RelationTuple as OryRelationTuple,
	Subject as OrySubject,
	SubjectSet as OrySubjectSet,
} from '@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/relation_tuples_pb'

export const convertRelationTupleToOryGrpc = (tuple: RelationTuple): OryRelationTuple => {
	const relationTuple = new OryRelationTuple()
	relationTuple.setNamespace(tuple.namespace)
	relationTuple.setObject(tuple.object)
	relationTuple.setRelation(tuple.relation)

	const subject = new OrySubject()
	if (typeof tuple.subjectIdOrSet === 'string') {
		subject.setId(tuple.subjectIdOrSet)
	} else {
		const subjectSet = new OrySubjectSet()
		subjectSet.setNamespace(tuple.subjectIdOrSet.namespace)
		subjectSet.setObject(tuple.subjectIdOrSet.object)
		subjectSet.setRelation(tuple.subjectIdOrSet.relation)
		subject.setSet(subjectSet)
	}
	relationTuple.setSubject(subject)

	return relationTuple
}
