import { Module } from '@nestjs/common';

import { UsersController } from './users/users.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './users/users.service';
import { UsersModuel } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModuel,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI)
  ],
})
export class AppModule {}
