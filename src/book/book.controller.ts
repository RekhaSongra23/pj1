import {
  Controller,  Post,  Body,  Get,  Param,  Res,  Put,  HttpStatus,  UseGuards,Request} from '@nestjs/common';

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
@UseGuards(AuthGuard)

@Controller('/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  
  @UserRoles(UserRole.ADMIN, UserRole.CUSTOMER)
 
  @Post("")
  async addBook(@Body() bookDto:BookDto, @Request() req:any ) {
    try {
        const authorId = req.user.sub
      return await this.bookService.create(authorId,bookDto,);
    } catch (err) {
      throw new NotFoundException('Not Found');
    }
  }
}