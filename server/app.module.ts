// Modules
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { NextModule } from "./logics/next/next.module";
import { LogicModule } from "./logics/logic.module";
import { RouteModule } from "./routes/route.module";
import { EnvModule } from "./logics/env/env.module";
import { DatabaseModule } from "./logics/database/database.module";
// Middleware
import { NextMiddleware } from "./logics/next/next.middleware";
// Services
import { EnvService } from "./logics/env/env.service";
// Enums
import { Configuration } from "./logics/env/env.keys";

import {
  RedirectIfAuthenticatedMiddleware,
  RedirectIfNotAuthenticatedMiddleware,
} from "./logics/auth/middlewares";

@Module({
  imports: [DatabaseModule, EnvModule, NextModule, LogicModule, RouteModule],
})
export class AppModule implements NestModule {
  static PORT: number | string;
  static HOST: string;
  static PROTOCOL: string;

  constructor(private readonly envServie: EnvService) {
    AppModule.PORT = this.envServie.get(Configuration.APP_PORT);
    AppModule.HOST = this.envServie.get(Configuration.APP_HOST);
    AppModule.PROTOCOL = this.envServie.get(Configuration.APP_PROTOCOL);
  }

  public configure(consumer: MiddlewareConsumer) {
    this.handleRoutes(consumer);
    this.handleAssets(consumer);
  }

  private handleRoutes(consumer: MiddlewareConsumer): void {
    consumer.apply(RedirectIfAuthenticatedMiddleware).forRoutes({
      path: "auth/register",
      method: RequestMethod.GET,
    });

    consumer.apply(RedirectIfAuthenticatedMiddleware).forRoutes({
      path: "auth/login",
      method: RequestMethod.GET,
    });

    consumer.apply(RedirectIfNotAuthenticatedMiddleware).forRoutes({
      path: "",
      method: RequestMethod.GET,
    });
  }

  private handleAssets(consumer: MiddlewareConsumer): void {
    consumer.apply(NextMiddleware).forRoutes({
      path: "_next*",
      method: RequestMethod.GET,
    });
  }
}
