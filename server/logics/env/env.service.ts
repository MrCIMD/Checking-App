import { readFileSync, existsSync } from "fs";
import { parse } from "dotenv";

export class EnvService {
  private readonly config: { [key: string]: string };

  constructor(path: string) {
    const isDevelopmentEnv = process.env.NODE_ENV !== "production";
    if (isDevelopmentEnv) {
      const existsPath = existsSync(path);
      if (!existsPath) {
        console.log(`${path} file does not exist`);
        process.exit(0);
      }
      this.config = parse(readFileSync(path));
    } else {
      this.config = {
        APP_PORT: process.env.APP_PORT,
        APP_SECRET_KEY: process.env.APP_SECRET_KEY,
        TYPEORM_CONNECTION: process.env.TYPEORM_CONNECTION,
        TYPEORM_HOST: process.env.TYPEORM_HOST,
        TYPEORM_PORT: process.env.TYPEORM_PORT,
        TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
        TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
        TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
        TYPEORM_ENTITIES: process.env.TYPEORM_ENTITIES,
        TYPEORM_MIGRATIONS: process.env.TYPEORM_MIGRATIONS,
        TYPEORM_MIGRATIONS_DIR: process.env.TYPEORM_MIGRATIONS_DIR,
      };
    }

    // this.config = parse(readFileSync(path));
  }

  public get(key: string): string {
    return this.config[key];
  }
}
