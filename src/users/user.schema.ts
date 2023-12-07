import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserRole } from './createUserDto';

@Schema()
export class User {
  id: mongoose.Types.ObjectId;
  @Prop()
  password: string;

  @Prop()
  username: string;

  @Prop(UserRole)
  role: UserRole;

  @Prop()
  address: string;

  @Prop()
  department: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
