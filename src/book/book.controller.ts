import {
  Controller,  Post,  Body,  Get,  Param,  Res,  Put,  HttpStatus,  UseGuards,Request, Delete, BadRequestException} from '@nestjs/common';

import { BookService } from './book.service';
import { BookDto } from './bookdto';
import { JwtPayload } from 'jsonwebtoken';
import { NotFoundException } from '@nestjs/common';
import { RoleGuard } from 'src/role/role.guard';
import mongoose from 'mongoose';

import { User, UserSchema } from 'src/users/user.schema';
import { UserRole } from 'src/users/createUserDto';

import { AuthGuard } from 'src/role/authguard';
import { UserRoles } from 'src/role/role.decorator';
import { response } from 'express';
import { updateBookDto } from './updateBookDto';

@UseGuards(AuthGuard)

@Controller('/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  
  @UserRoles(UserRole.ADMIN, UserRole.CUSTOMER)
 //post----------------------------------------------
  @Post("")
  async addBook(@Body() bookDto:BookDto, @Request() req:any ) {
    try {
        const authorId = req.user.sub
      return await this.bookService.create(authorId,bookDto,);
    } catch (err) {
      throw new NotFoundException('Not Found');
    }
  }
//Get--------------------------------------------------------------------
  @Get()
  async getBooks(){
    const bookss =await this.bookService.getBooks();
    return bookss;

  }

  //GetById-----------------------------------------------------------
  @Get(':id')
  async findById(@Param('id') id :mongoose.Types.ObjectId){
  return await  this.bookService.getBookById(id).catch(()=>{
    throw new  NotFoundException(`Book with ${id} not found`)
  });
  
}
//update by id-----------------------------------------------
@Put(':id')
async update (
  @Body() updatebookDto:updateBookDto,
 @Param('id') id :mongoose.Types.ObjectId,) {
   try {
     return await this.bookService.updateBook(id,updatebookDto)
   } catch (err) {
     return response.status(err.status).json(err.response);
   }
 }
@Delete(':id')
async delete(@Param('id') id :mongoose.Types.ObjectId,){
  try {
    const deluser=await this.bookService.deleteById(id);    
    
    return deluser;
    
  }catch(err){
    throw new BadRequestException(err);
  }

}
}