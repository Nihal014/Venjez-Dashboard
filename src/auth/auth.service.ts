import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
     constructor(
    private readonly usersService: UsersService,
  ) {}

  async signup(
    signup_dto: SignupDto,
  ) {
    const existing_user =
      await this.usersService.find_by_email(
        signup_dto.email,
      );

    if (existing_user) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

    const password_hash =
      await bcrypt.hash(
        signup_dto.password,
        10,
      );

    const user =
      await this.usersService.create_user({
        full_name:
          signup_dto.full_name,

        email:
          signup_dto.email,

        password_hash,
      });

    return {
      message:
        'User created successfully',

      user_id: user.id,
    };
  }
}
