import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './service';

export class SignInBody {
  email: string;
  password: string;
}

@Controller('api/auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('sign-in')
  async login(@Body() body: SignInBody) {
    return this.authService.signIn(body.email, body.password);
  }
}
