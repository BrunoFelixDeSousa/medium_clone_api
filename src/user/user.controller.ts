import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { ZodValidationPipe } from '@app/pipes/zod-validation-pipe';
import { UserResponse } from '@app/user/dto/userResponse.dto';
import { CreateUserDto, createUserSchema } from '@app/user/dto/createUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(
    @Body('user') createUserDto: CreateUserDto
  ): Promise<UserResponse> {
    console.log('createUserContoller');
    return await this.userService.createUSer(createUserDto);
  }
}
