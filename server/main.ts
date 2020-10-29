// Nest
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
// Modules
import { AppModule } from "./app.module";
import { LogicModule } from "./logics/logic.module";
import { NextModule } from "./logics/next/next.module";
// Libs
import dotenv from "dotenv";

dotenv.config();

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets("src/public");

  app.get(LogicModule).initialize(app);

  app
    .get(NextModule)
    .prepare()
    .then(() => {
      app.listen(AppModule.PORT, AppModule.HOST, () => {
        console.log(
          `[  Checking-App  ] Ready on ${AppModule.PROTOCOL}://${AppModule.HOST}:${AppModule.PORT}`,
        );
      });
    });
})();
