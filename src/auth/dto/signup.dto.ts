import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}