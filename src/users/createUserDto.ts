import mongoose from "mongoose";

export class CreateUserDto {
  id: mongoose.Types.ObjectId;
  password:string
  username: string;
  address :string;
  department :string;
}