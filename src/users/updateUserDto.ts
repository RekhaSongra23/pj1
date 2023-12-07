import mongoose from 'mongoose';
import { UserRole } from './createUserDto';
import { IsEnum } from '@nestjs/class-validator';

export class updateUserDto {
  id: mongoose.Types.ObjectId;
  username: string;
  @IsEnum(UserRole)
  role:UserRole
  address: string;
  department: string;
}
