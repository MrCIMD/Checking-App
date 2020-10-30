// Modules
import { INestApplication, Module } from '@nestjs/common';
import { AuthModule } from './../../logics/auth/auth.module'

@Module({
    imports: [AuthModule],
})
export class ApiModule {
    public initialize(app: INestApplication) {
        app.get(AuthModule).initialize(app);
    }
}
