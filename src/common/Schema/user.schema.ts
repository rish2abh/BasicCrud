import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps : true})
export class User {

    @Prop()
    name: string;

    @Prop()
    email :string ;

    @Prop()
    password  :string ;

    @Prop()
    image :string ;

    @Prop({default: true})
    isActive: boolean

}

export const UserSchema = SchemaFactory.createForClass(User)
