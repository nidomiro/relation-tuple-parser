import { Injectable } from '@nestjs/common'
import { RelationTuple } from '@nidomiro/relation-tuple-parser'
import { KETO_WRITE_API_HTTP } from '../constants'
import { WriteApi } from '@ory/keto-client'
import { error, Result, value } from 'defekt'
import { UnknownError } from './errors/unknown.error'
import { KetoHttpConverter } from '@nidomiro/relation-tuple-parser-ory-keto'

@Injectable()
export class KetoWriteClientService {
  private readonly _writeClient: WriteApi

  constructor() {
    this._writeClient = new WriteApi(undefined, KETO_WRITE_API_HTTP)
  }

  async addRelationTuple(tuple: RelationTuple): Promise<Result<true, UnknownError>> {
    const query = KetoHttpConverter.createRelationQuery(tuple)
    try {
      await this._writeClient.createRelationTuple(query)
      return value(true)
    } catch (e) {
      return error(new UnknownError({ data: e }))
    }
  }
}
