import mongoose from 'mongoose';

export class updateUserDto {
  id: mongoose.Types.ObjectId;
  name: string;
  address: string;
  department: string;
}
