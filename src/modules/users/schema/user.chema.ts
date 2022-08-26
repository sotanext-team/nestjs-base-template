import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoScheme } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
  })
  address: string;

  @Prop({
    type: MongoScheme.Types.Mixed,
  })
  value: any;

  static default() {
    return {
      name: 'some-random-name',
      address: '',
      value: 'something',
    };
  }
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
