import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsersDto{

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}