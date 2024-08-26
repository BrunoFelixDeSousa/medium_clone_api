import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { ZodValidationPipe } from '@app/pipes/zod-validation-pipe';
import { UserResponse } from '@app/user/schemas/userResponseSchema';
import { JwtAuthGuard } from '@app/auth/guard/jwtAuth.guard';
import { CurrentUser } from '@app/auth/currentUser.decorator';
import { TokenPayload } from '@app/auth/schemas/tokenPayloadSchema';
import {
  CreateUserSchema,
  createUserSchema,
} from '@app/user/schemas/createUserSchema';
import {
  updateUserSchema,
  UpdateUserSchema,
} from '@app/user/schemas/updateUserSchema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(
    @Body('user') createUserDto: CreateUserSchema,
  ): Promise<UserResponse> {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async currentUser(
    @CurrentUser() userPayload: TokenPayload,
  ): Promise<UserResponse> {
    return await this.userService.findCurrentUser(userPayload);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @CurrentUser() userPayload: TokenPayload,
    @Body('user') userBody: UpdateUserSchema,
  ): Promise<UserResponse> {
    return await this.userService.updateUser(userPayload, userBody);
  }
}
