import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { UserEntity } from '@app/user/user.entity';
import { CreateUserSchema } from '@app/user/schemas/createUserSchema';
import { UserResponse } from '@app/user/schemas/userResponseSchema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUSer(createDto: CreateUserSchema): Promise<UserResponse> {
    const newUser = new UserEntity();

    const userWithSameEmail = await this.userRepository.findOne({
      where: {
        email: createDto.email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException('User with same e-mail already exists.');
    }

    const hashedPassword = await hash(createDto.password, 10);

    Object.assign(newUser, { ...createDto, password: hashedPassword });

    const user = await this.userRepository.save(newUser);
    const { password, ...result } = user;
    return result;
  }
}
