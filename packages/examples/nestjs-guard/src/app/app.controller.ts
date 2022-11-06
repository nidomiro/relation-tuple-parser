import { Controller, Get } from '@nestjs/common'

import { GuardedBy } from './guard/guarded-by.decorator'

@Controller()
export class AppController {
	@GuardedBy(({ userId }) => `groups:users#member@${userId}`)
	@Get()
	getData() {
		return 'Access grated!'
	}
}
