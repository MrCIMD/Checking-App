// Modules
import { Module } from '@nestjs/common';
import { NextModule } from './../../../logics/next/next.module';
import { AuthModule } from './../../../logics/auth/auth.module';
// Controllers
import { AuthController } from './auth.controller';

@Module({
    imports: [
        NextModule,
        AuthModule
    ],
    controllers: [AuthController]
})
export class AuthenticateModule {
}
