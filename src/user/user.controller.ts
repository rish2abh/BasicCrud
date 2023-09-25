import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from '../common/DTO/create-user.dto';
import { UpdateUserDto } from '../common/DTO/update-user.dto';
import { AuthGuard } from 'src/common/auth/guard/auth.guard';
import { ExtractUserId } from 'src/common/auth/decorator/extract.token';
import { query } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("signup")
  @UseInterceptors(FileInterceptor('image'))
  SignUp(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto) {
    return this.userService.SignUp(createUserDto, file);
  }

  @Post("login")
  Login(@Body() loginUserDto : LoginUserDto ) {
    return this.userService.login(loginUserDto);
  }
   
  @Patch('edit') 
  @UseGuards(AuthGuard)
  EditUser(@ExtractUserId() userId: string, @Body() updateUserDto: UpdateUserDto) {    
    return this.userService.edit( userId , updateUserDto);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  remove(@ExtractUserId() userId : string) {
    return this.userService.remove(userId);
  }

  @Get("list")
 list(@Query() query : any ){
  console.log(query);
  
  return this.userService.list(query)
 }
}
