// Modules
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { NextModule } from "./logics/next/next.module";
import { LogicModule } from "./logics/logic.module";
import { WebModule } from "./routes/web.module";
import { EnvModule } from "./logics/env/env.module";
import { DatabaseModule } from "./logics/database/database.module";
import { AppRoutingModule } from "./app-routing.module";
import { ApiModule } from "./routes/api/api.module";
// Middleware
import { NextMiddleware } from "./logics/next/next.middleware";
// Services
import { EnvService } from "./logics/env/env.service";
// Enums
import { Configuration } from "./logics/env/env.keys";

@Module({
  imports: [AppRoutingModule, DatabaseModule, EnvModule, NextModule, LogicModule, WebModule, ApiModule],
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
    this.handleAssets(consumer);
  }

  private handleAssets(consumer: MiddlewareConsumer): void {
    consumer.apply(NextMiddleware).forRoutes({
      path: "_next*",
      method: RequestMethod.GET,
    });
  }
}
