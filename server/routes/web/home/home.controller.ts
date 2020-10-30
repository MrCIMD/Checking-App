import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  Request,
  Response,
} from 'express';
import { AuthExceptionFilter } from './../../../logics/auth/filters/auth-exceptions.filter';
import { AuthenticatedGuard } from './../../../logics/auth/guards';
import { NextService } from '../../../logics/next/next.service';

@UseFilters(AuthExceptionFilter)
@UseGuards(AuthenticatedGuard)
@Controller()
export class HomeController {
  constructor(
    private readonly next: NextService,
  ) {}

  @Get()
  public showHome(@Req() req: Request, @Res() res: Response) {
    return this.next.render('/index', req, res);
  }
}
