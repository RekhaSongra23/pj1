import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import  mongoose, { Model } from "mongoose";
import { CreateUserDto } from "./createUserDto";
import { updateUserDto } from "./updateUserDto";
import * as bcrypt from "bcrypt"

@Injectable()

export class UserService{
    constructor(
        @InjectModel(User.name) private userModel :mongoose.Model<User>,
    ){}

    async createUser(createUserDto:CreateUserDto) :Promise<User>{
        const {username,password,department,address}= createUserDto;
        const hashedPassword = await bcrypt.hash(password)
        const res =await this.userModel.create({...createUserDto, password:hashedPassword});
        return res;

    }
    async getAllUsers():Promise<User[]>{
        const res1= await this.userModel.find();
        return res1;
    }


    async getUserById(id:mongoose.Types.ObjectId) :Promise<User>{
        const res2 =await this.userModel.findById(id);
        return res2;


    }

    //updatebyId--------------------------------------------------------------------------

    async updateUser(id :mongoose.Types.ObjectId,
     updateUserDto:updateUserDto):Promise<User>{
    const userExist=await this.userModel.findByIdAndUpdate(id,updateUserDto);

  if(!userExist){
    throw new NotFoundException(`User with ${id} Not Found`);
  }
  return userExist;
}  

async deleteUserById(id:mongoose.Types.ObjectId){
    const deleteUser= await this .userModel.findByIdAndDelete(id);

    if(!deleteUser){
        throw new NotFoundException(`user with ${id} not found`);
    }
    return deleteUser;
}
    
}