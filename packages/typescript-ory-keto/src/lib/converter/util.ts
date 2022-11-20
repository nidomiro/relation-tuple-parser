import { KetoRelationTupleLike } from '../keto-relation-tuple-like'
import { RelationTuple, RelationTupleWithReplacements } from '@nidomiro/relation-tuple-parser'
import * as KetoGrpcRelationTuple from '@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/relation_tuples_pb'

export function setInRelationTupleLike<R extends KetoRelationTupleLike>(oryRequest: R, tuple: RelationTuple): R {
	oryRequest.setNamespace(tuple.namespace)
	oryRequest.setObject(tuple.object)
	oryRequest.setRelation(tuple.relation)

	const subject = new KetoGrpcRelationTuple.Subject()
	if (typeof tuple.subjectIdOrSet === 'string') {
		subject.setId(tuple.subjectIdOrSet)
	} else {
		const subjectSet = new KetoGrpcRelationTuple.SubjectSet()
		subjectSet.setNamespace(tuple.subjectIdOrSet.namespace)
		subjectSet.setObject(tuple.subjectIdOrSet.object)
		subjectSet.setRelation(tuple.subjectIdOrSet.relation)
		subject.setSet(subjectSet)
	}
	oryRequest.setSubject(subject)

	return oryRequest
}

export const setInRelationTupleLikeWithReplacements = <T extends Record<string, string>, R extends KetoRelationTupleLike>(
	oryRequest: R,
	tuple: RelationTupleWithReplacements<T>,
	replacements: T,
): R => {
	oryRequest.setNamespace(tuple.namespace(replacements))
	oryRequest.setObject(tuple.object(replacements))
	oryRequest.setRelation(tuple.relation(replacements))

	const subject = new KetoGrpcRelationTuple.Subject()
	if (typeof tuple.subjectIdOrSet === 'function') {
		subject.setId(tuple.subjectIdOrSet(replacements))
	} else {
		const subjectSet = new KetoGrpcRelationTuple.SubjectSet()
		subjectSet.setNamespace(tuple.subjectIdOrSet.namespace(replacements))
		subjectSet.setObject(tuple.subjectIdOrSet.object(replacements))
		subjectSet.setRelation(tuple.subjectIdOrSet.relation(replacements))
		subject.setSet(subjectSet)
	}
	oryRequest.setSubject(subject)

	return oryRequest
}
