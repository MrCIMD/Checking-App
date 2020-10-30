// Modules
import { Module } from '@nestjs/common';
import { NextModule } from '../logics/next/next.module';
import { AuthenticateModule } from './web/authenticate/autheticate.module';
import { HomeModule } from './web/home/home.module';

@Module({
  imports: [
    NextModule, AuthenticateModule, HomeModule
  ],
})
export class WebModule {}
