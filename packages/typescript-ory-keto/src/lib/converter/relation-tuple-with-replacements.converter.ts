import * as KetoGrpcRelationTuple from '@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/relation_tuples_pb'
import * as KetoGrpcCheckService from '@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/check_service_pb'
import { RelationTupleWithReplacements } from '@nidomiro/relation-tuple-parser'
import { KetoRelationTupleLike } from './keto-relation-tuple-like'

export const setInRelationGrpcTupleLike = <T extends Record<string, string>, R extends KetoRelationTupleLike>(
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

export const toKetoGrpcRelationTuple = <T extends Record<string, string>>(
	tuple: RelationTupleWithReplacements<T>,
	replacements: T,
): KetoGrpcRelationTuple.RelationTuple => {
	const relationTuple = new KetoGrpcRelationTuple.RelationTuple()
	return setInRelationGrpcTupleLike(relationTuple, tuple, replacements)
}

export const toKetoGrpcCheckRequest = <T extends Record<string, string>>(
	tuple: RelationTupleWithReplacements<T>,
	replacements: T,
): KetoGrpcCheckService.CheckRequest => {
	const relationTuple = new KetoGrpcCheckService.CheckRequest()
	return setInRelationGrpcTupleLike(relationTuple, tuple, replacements)
}
