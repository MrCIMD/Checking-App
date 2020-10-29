// Modules
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// Services
import { UserService } from "./user.service";
// Entities
import { User } from "../../entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
