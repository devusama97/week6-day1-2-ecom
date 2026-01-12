import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../common/enums/role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false }) // Made optional for social login users
  password: string;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;

  @Prop({ default: 0 })
  loyaltyPoints: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isBlocked: boolean;

  // OAuth fields
  @Prop({ default: 'local' }) // 'local', 'google', 'github', 'discord'
  provider: string;

  @Prop({ required: false }) // OAuth user ID from provider
  providerId: string;

  @Prop({ required: false }) // Profile picture URL from provider
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);