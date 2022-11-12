import { Controller, Get } from '@nestjs/common'

import { GuardedBy } from './guard/guarded-by.decorator'

@Controller()
export class AppController {
	@GuardedBy(({ currentUserId }) => `groups:users#member@${currentUserId}`)
	@Get()
	getData() {
		return 'Access grated!'
	}
}
