import { Injectable } from '@nestjs/common'
import { RelationTupleWithReplacements } from '@nidomiro/relation-tuple-parser'
import { PossibleReplacements } from './guard/possible-replacements'
import { CheckServiceClient } from '@ory/keto-grpc-client/ory/keto/relation_tuples/v1alpha2/check_service_grpc_pb'
import * as grpc from '@grpc/grpc-js'
import { error as dError, Result, value } from 'defekt'
import { UnknownError } from './errors/unknown.error'
import { KETO_READ_API_GRPC } from '../constants'
import { RelationTupleWithReplacementsConverter } from '@nidomiro/relation-tuple-parser-ory-keto'

@Injectable()
export class KetoReadClientService {
	private readonly _checkClient: CheckServiceClient

	constructor() {
		this._checkClient = new CheckServiceClient(KETO_READ_API_GRPC, grpc.credentials.createInsecure())
	}

	validateRelationTuple(
		relationTuple: RelationTupleWithReplacements<PossibleReplacements>,
		replacements: PossibleReplacements,
	): Promise<Result<{ allowed: boolean }, UnknownError>> {
		const checkRequest = RelationTupleWithReplacementsConverter.toKetoGrpcCheckRequest(relationTuple, replacements)

		return new Promise((resolve) => {
			this._checkClient.check(checkRequest, (error: grpc.ServiceError | null, response) => {
				if (error) {
					switch (error.code) {
						case grpc.status.NOT_FOUND:
							resolve(value({ allowed: false as boolean }))
							return
						default:
							resolve(dError(new UnknownError({ data: error })))
							return
					}
				}
				resolve(value({ allowed: response.getAllowed() }))
			})
		})
	}
}
