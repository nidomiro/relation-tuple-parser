import { Subject as OrySubject } from '@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/relation_tuples_pb'

export type KetoRelationTupleLike = {
    setNamespace(value: string): void
    setObject(value: string): void
    setRelation(value: string): void
    setSubject(value: OrySubject): void
}
