import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthUser {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}