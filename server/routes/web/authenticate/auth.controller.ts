import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { AuthExceptionFilter } from '../../..//logics/auth/filters/auth-exceptions.filter';
import { NextService } from '../../../logics/next/next.service';

@UseFilters(AuthExceptionFilter)
@Controller()
export class AuthController {
  constructor(
    private readonly next: NextService,
  ) {}

  @Get('register')
  public showRegister(@Req() req, @Res() res) {
    return this.next.render('/auth/register', req, res);
  }

  @Get('login')
  public showLogin(@Req() req, @Res() res) {
    return this.next.render('/auth/login', req, res);
  }
}
