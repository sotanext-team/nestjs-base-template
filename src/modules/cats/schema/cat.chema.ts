import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schema/user.chema';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Cat {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
  })
  age: number;

  @Prop({
    type: String,
    required: true,
  })
  breed: string;

  // inside the class definition
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: User;
}

export type CatDocument = Cat & Document;
export const CatSchema = SchemaFactory.createForClass(Cat);
