import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class User {
  id: mongoose.Types.ObjectId;
  @Prop()
  name: string;

  @Prop()
  address: string;
  
  @Prop()
  department: string;
}
export const UserSchema = SchemaFactory.createForClass(User);