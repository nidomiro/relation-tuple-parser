/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import { KetoWriteClientService } from './app/keto-write-client.service'
import { parseRelationTuple } from '@nidomiro/relation-tuple-parser'

async function initKeto(ketoWriteService: KetoWriteClientService) {
    await ketoWriteService.addRelationTuple(parseRelationTuple('groups:users#member@user1').unwrapOrThrow())
    await ketoWriteService.addRelationTuple(parseRelationTuple('groups:users#member@user2').unwrapOrThrow())
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const globalPrefix = 'api'
    app.setGlobalPrefix(globalPrefix)
    const port = process.env.PORT || 3333

    await initKeto(app.get(KetoWriteClientService))

    await app.listen(port)
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

bootstrap().catch((reason) => console.error(reason))
