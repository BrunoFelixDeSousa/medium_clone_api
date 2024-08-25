import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { LoginSchema, loginSchema } from '@app/auth/schemas/loginSchema';
import { ZodValidationPipe } from '@app/pipes/zod-validation-pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body('user') body: LoginSchema) {
    return this.authService.login(body);
  }
}
