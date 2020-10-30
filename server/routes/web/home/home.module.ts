// Modules
import { Module } from '@nestjs/common';
import { AuthModule } from './../../../logics/auth/auth.module';
import { NextModule } from './../../../logics/next/next.module';
// Controllers
import { HomeController } from './home.controller';

@Module({
    imports: [NextModule, AuthModule],
    controllers: [HomeController]
})
export class HomeModule {
}