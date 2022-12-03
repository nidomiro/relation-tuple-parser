import { RelationTuple as KetoGrpcRelationTuple } from '@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/relation_tuples_pb'
import { CheckRequest as KetoGrpcCheckService } from '@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/check_service_pb'
import { isRelationTuple, RelationTuple, RelationTupleWithReplacements } from '@nidomiro/relation-tuple-parser'
import { setInRelationTupleLike, setInRelationTupleLikeWithReplacements } from './util'

export function createRelationTuple(tuple: RelationTuple): KetoGrpcRelationTuple
export function createRelationTuple<T extends Record<string, string>>(
  tuple: RelationTupleWithReplacements<T>,
  replacements: T,
): KetoGrpcRelationTuple
export function createRelationTuple<T extends Record<string, string>>(
  tuple: RelationTuple | RelationTupleWithReplacements<T>,
  replacements?: T,
): KetoGrpcRelationTuple {
  if (isRelationTuple(tuple)) {
    return setInRelationTupleLike(new KetoGrpcRelationTuple(), tuple)
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return setInRelationTupleLikeWithReplacements(new KetoGrpcRelationTuple(), tuple, replacements!)
}

export function createCheckRequest(tuple: RelationTuple): KetoGrpcCheckService
export function createCheckRequest<T extends Record<string, string>>(
  tuple: RelationTupleWithReplacements<T>,
  replacements: T,
): KetoGrpcCheckService
export function createCheckRequest<T extends Record<string, string>>(
  tuple: RelationTuple | RelationTupleWithReplacements<T>,
  replacements?: T,
): KetoGrpcCheckService {
  if (isRelationTuple(tuple)) {
    return setInRelationTupleLike(new KetoGrpcCheckService(), tuple)
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return setInRelationTupleLikeWithReplacements(new KetoGrpcCheckService(), tuple, replacements!)
}
