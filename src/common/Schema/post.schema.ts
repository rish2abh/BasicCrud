import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name }) // Reference to the User schema
  userID: Types.ObjectId;


  @Prop()
  message : string;

  @Prop()
  image_URL : string;

  @Prop({default : true})
  isActive: boolean;

}

export const PostSchema = SchemaFactory.createForClass(Post);