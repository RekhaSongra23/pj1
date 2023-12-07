import { IsEnum } from "@nestjs/class-validator";
import mongoose from "mongoose";


export enum UserRole {
    ADMIN = 'admin',
    DEVELOPER = 'developer',
    CUSTOMER = "customer"
}

export class CreateUserDto {
  id: mongoose.Types.ObjectId;
  password: string;
  username: string;
  address: string;
  department: string;
  @IsEnum(UserRole)
  role: UserRole;
}