import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  signup(
    @Body()
    signup_dto: SignupDto,
  ) {
    return this.authService.signup(
      signup_dto,
    );
  }
  @Post('login')
login(
  @Body()
  login_dto: LoginDto,
) {
  return this.authService.login(
    login_dto,
  );
}
}
