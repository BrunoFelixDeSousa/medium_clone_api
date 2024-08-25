import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post, UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { LoginSchema, loginSchema } from '@app/auth/schemas/loginSchema';
import { ZodValidationPipe } from '@app/pipes/zod-validation-pipe';
// import { LocalAuthGuard } from '@app/auth/guard/localAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(LocalAuthGuard)
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body('user') body: LoginSchema) {
    console.log(body);
    return this.authService.login(body);
  }
}
