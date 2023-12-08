import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.schema';
import mongoose, { Model } from 'mongoose';
import { BookDto } from './bookdto';
import { updateBookDto } from './updateBookDto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookmodel: Model<Book>) {}


  //create books---------------------------

  async create(bookid: string, BookDto: BookDto): Promise<Book> {
    const createBook = await this.bookmodel.create({
      ...BookDto,
      author: new mongoose.Types.ObjectId(bookid),
    });

    return createBook;
  }
  //get all books------------------------------------
  async getBooks(): Promise<Book[]> {
    const books = await this.bookmodel.find();
    return books;
  }
  //get boks by Id---------------------------------------
  async getBookById(id: mongoose.Types.ObjectId): Promise<Book> {
    const isvalidid = await mongoose.isValidObjectId(id);

    if (!isvalidid) {
      throw new BadGatewayException('Enter Correct Id');
    }
    const books = await this.bookmodel.findById(id);

    if (!books) {
      throw new NotFoundException(`book with this ${id} not found`);
    }
    return books;
  }

  //update books by id-----------------------------------------
  async updateBook(
    id: mongoose.Types.ObjectId,
    updatebookdto: updateBookDto,
  ): Promise<Book> {
    const existingBook = await this.bookmodel.findByIdAndUpdate(
      id,
      updatebookdto, 
      {new:true}     
    );
    if (!existingBook) {
      throw new NotFoundException(`Book ${id} not found`);
    }
    return existingBook;
  }

  //delele by id-----------------------------------------------

  async deleteById(id:mongoose.Types .ObjectId){

    const deleteUser= await this.bookmodel.findByIdAndDelete(id)

    if(!deleteUser)
    {
      throw new NotFoundException(`user with this ${id} not exist`);
    }
    return deleteUser;
  }

}
