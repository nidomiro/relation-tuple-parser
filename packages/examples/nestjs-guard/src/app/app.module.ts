import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { KetoGuard } from './guard/keto-guard'
import { APP_GUARD } from '@nestjs/core'
import { KetoWriteClientService } from './keto-write-client.service'
import { KetoReadClientService } from './keto-read-client.service'

@Module({
	imports: [],
	controllers: [AppController],
	providers: [
		KetoReadClientService,
		KetoWriteClientService,
		KetoGuard,
		{
			provide: APP_GUARD,
			useExisting: KetoGuard,
		},
	],
})
export class AppModule {}
