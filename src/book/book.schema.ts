import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({
  timestamps: true,
})
export class Book {
  id: mongoose.Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  author: mongoose.Types.ObjectId;

  @Prop()
  description: string;
}
export const Bookschema= SchemaFactory.createForClass(Book)