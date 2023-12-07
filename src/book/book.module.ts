import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book } from './book.schema';

import { BookService } from './book.service';
import { Bookschema } from './book.schema';

import { JwtService } from '@nestjs/jwt';
import { BookController } from './book.controller';
import { AuthMOdule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/role/authguard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: Bookschema }]),
    AuthMOdule,
  ],
  controllers: [BookController],
  providers: [BookService, JwtService,AuthGuard],
})
export class BookModule {}
