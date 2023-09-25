import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/common/Schema/user.schema';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
  imports : [AuthModule,MongooseModule.forFeature([{name : User.name , schema : UserSchema}])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
