// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { UserService } from 'src/users/users.service';
// import { BookService } from './book.service';
// import { Book, Bookschema } from './book.schema';
// import mongoose, { Model } from 'mongoose';
// import { getModelToken } from '@nestjs/mongoose';
// import { BookDto } from './bookdto';


// describe('bookServices', () => {
//   let bookservice :BookService;
//   let model :Model<Book>;

//   const mocbook = {
//     id: new mongoose.Types.ObjectId('6572a0229b32bc59525c5a68'),
//     title: 'c#',
//     author: '65717db4e309ada46f2cba1f',
//     description: 'about C++',
//   };

//   const BookModel=mongoose.model<Book>('Book',Bookschema);

//   const mockBookServices={
//     create :jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//     providers:[BookService,{provide :getModelToken(Book.name),
//     useValue :mockBookServices,
// },
// ],
//     }).compile();
//      bookservice=module.get<BookService>(BookService);
//      model =module.get <Model<Book>>(getModelToken(Book.name));

    
//   });

//   //create user----------------------------------------------

//   describe('create',() =>{
//     it('should create and run book data', async () =>{
//         const bookDto: BookDto = {
//           id :new mongoose.Types.ObjectId(),
//           title: 'c#',
//           author: '65717db4e309ada46f2cba1f',
//           description: 'about C#',
//         };



//         const book12 = new BookModel({
//           id: new mongoose.Types.ObjectId('6572a0229b32bc59525c5a68'),
//           title: 'c#',
//           author: '65717db4e309ada46f2cba1f',
//           description: 'about C#',
//         });
//         jest.spyOn(model,'create').mockResolvedValueOnce([book12])
//         const result =await bookservice.create(bookDto);
//         expect (result).toEqual([book12]);
//     });
//   });

// });
