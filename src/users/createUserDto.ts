import mongoose from "mongoose";

export class CreateUserDto {
  id: mongoose.Types.ObjectId;
  name: string;
  address :string;
  department :string;
}