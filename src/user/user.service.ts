import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../common/DTO/create-user.dto';
import { UpdateUserDto } from '../common/DTO/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/common/Schema/user.schema';
import { Model ,Types} from 'mongoose';
import * as crypto from 'crypto';
import { AuthService } from 'src/common/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private readonly authservice: AuthService,
  ) {}

  async SignUp(createUserDto: CreateUserDto, file) {
    try {
      console.log(file,"file");
      
      const hashedPassword = crypto
        .createHash('sha256')
        .update(createUserDto.password)
        .digest('hex');
      console.log(createUserDto, 'gfjhkn');

      let data = {
        ...createUserDto,
        password: hashedPassword,
        image : file.originalname
      };
      const newUser = await this.UserModel.create(data);

      return {
        message: 'Sign Up Successfull',
        newUser,
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const hashedPassword = crypto
      .createHash('sha256')
      .update(loginUserDto.password)
      .digest('hex');
    const checkUser = await this.UserModel.find({
      email: loginUserDto.email,
      password: hashedPassword,
    });
    if (!checkUser[0]) {
      return {
        status: 'failed',
        messsage: 'email or password is wrong ',
      };
    }
    const token = await this.authservice.createAccessToken(checkUser[0]);

    return {
      status: 'success',
      messsage: 'Login successfull ',
      token,
    };
  }

  async edit(userId, updateUserDto: UpdateUserDto) {
    try {
      const updateData = await this.UserModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            ...updateUserDto,
          },
        },
        { new: true },
      );
      console.log(updateData);

      return {
        status: 'successs',
        updateData,
      };
    } catch (error) {
      return {
        status: 'fail',
        error: error.message,
      };
    }
  }

  async remove(userId) {
   try {
    const id = new Types.ObjectId(userId)
    const remove = await this.UserModel.deleteOne(id)
    return{status:'success'}

   } catch (error) {
    console.log(error.message);
    
   }
  }

  async list(query: any){
    try {
      const users=await  this.UserModel.find()
      .limit(query.limit )
      .skip((query.page - 1) * query.limit)
      const count = await this.UserModel.countDocuments()
      return {
        status:"success",
        totalPages: Math.ceil(count / query.limit),
        users}
      
    } catch (error) {
      console.log(error.message);
      
    }
   
  }
}

