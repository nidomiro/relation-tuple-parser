import { error, Result, value } from 'defekt'
import { parseRelationTuple, RelationTupleSyntaxError } from '@nidomiro/relation-tuple-parser'
import {
	RelationTuple as OryRelationTuple,
} from '@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/relation_tuples_pb'
import { convertRelationTupleToOryGrpc } from './convert-relation-tuple-to-ory-grpc'

/**
 * Same impl. as {@link parseRelationTuple} but returns a OryRelationTuple instead.
 * @param str
 * @see {@link parseRelationTuple} for further information.
 */
export const parseRelationTupleToOryGrpc = (str: string): Result<OryRelationTuple, RelationTupleSyntaxError> => {
	const result = parseRelationTuple(str)
	if (result.hasError()) {
		return error(result.error)
	}
	return value(convertRelationTupleToOryGrpc(result.value))
}
