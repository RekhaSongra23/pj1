import { Controller, Get, Req, Post, Body,Param, Delete,Put, NotFoundException, BadRequestException} from '@nestjs/common';
import { UserService } from './users.service';

import { User } from './user.schema';
import mongoose from 'mongoose';
import { CreateUserDto } from './createUserDto';
import { updateUserDto } from './updateUserDto';

@Controller('/users')
export class UsersController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  async createUser(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    const userCreate = await this.UserService.createUser(CreateUserDto);
    return userCreate;
  }

  @Get()
  async getAllUsers(){
    const user1=await this.UserService.getAllUsers();
    return user1;
  }

  @Get(':id') 
  async getUserById(@Param('id') id :mongoose.Types.ObjectId){
    const finduser=await this .UserService.getUserById(id)
    return finduser;
  }

  @Put(':id')
  async updateUserById( @Body()updateUserDto:updateUserDto,  @Param('id') id :mongoose.Types.ObjectId, ){
    try {
      const userExist=await this.UserService.updateUser(id,updateUserDto)
    
    return userExist;
    }  catch(err){
    throw new NotFoundException(err);
  }
}

@Delete(':id')
async deleteById(@Param('id') id :mongoose.Types.ObjectId,){
  try {
    const deluser=await this.UserService.deleteUserById(id);    
    return deluser;
  }catch(err){
    throw new BadRequestException(err);
  }
}
}
