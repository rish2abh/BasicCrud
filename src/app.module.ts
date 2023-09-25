import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forRoot("mongodb://127.0.0.1:27017/myCrud"),UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
