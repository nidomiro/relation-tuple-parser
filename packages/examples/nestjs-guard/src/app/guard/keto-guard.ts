import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { getGuardingRelationTuple } from './guarded-by.decorator'
import { IncomingMessage } from 'http'
import * as Url from 'url'
import { KetoReadClientService } from '../keto-read-client.service'
import assertNever from 'assert-never/index'

@Injectable()
export class KetoGuard implements CanActivate {
	constructor(private readonly _reflector: Reflector, private readonly _ketoReadClient: KetoReadClientService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const ctx = context.switchToHttp()

		const relationTuple = getGuardingRelationTuple(this._reflector, context.getHandler())

		if (relationTuple === null) {
			return false
		}

		const request = ctx.getRequest<IncomingMessage>()
		const { userId: rawUserId } = Url.parse(request.url, true).query

		let userId: string
		if (Array.isArray(rawUserId)) {
			userId = rawUserId[0]
		} else {
			userId = rawUserId
		}

		const ketoResult = await this._ketoReadClient.validateRelationTuple(relationTuple, { userId })

		if (ketoResult.hasError()) {
			const { error } = ketoResult
			switch (error.code) {
				case 'UNKNOWN_ERROR':
					throw error
				default:
					assertNever(error.code)
			}
		}

		return ketoResult.value.allowed
	}
}
