import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto{

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