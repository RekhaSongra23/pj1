import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.schema';
import mongoose, { Model } from 'mongoose';
import { BookDto } from './bookdto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookmodel: Model<Book>) {}

  async create(bookid: string, BookDto: BookDto): Promise<Book> {
    const createBook = await this.bookmodel.create({
      ...BookDto,
      author: new mongoose.Types.ObjectId(bookid),
    });

    return createBook;
  }
}
