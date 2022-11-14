import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
    @Get(['/healthz', '/readyz'])
    getData() {
        return { message: 'OK' }
    }
}
