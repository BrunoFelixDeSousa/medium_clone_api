import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { UserEntity } from '@app/user/user.entity';
import { CreateUserSchema } from '@app/user/schemas/createUserSchema';
import { UserResponse } from '@app/user/schemas/userResponseSchema';
import { TokenPayload } from '@app/auth/schemas/tokenPayloadSchema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createDto: CreateUserSchema): Promise<UserResponse> {
    const [userWithSameEmail, userWithSameUsername] = await Promise.all([
      this.userRepository.findOne({ where: { email: createDto.email } }),
      this.userRepository.findOne({ where: { username: createDto.username } })
    ]);

    if (userWithSameUsername) {
      throw new ConflictException('User with same username already exists.');
    }

    if (userWithSameEmail) {
      throw new ConflictException('User with same e-mail already exists.');
    }

    const newUser = new UserEntity();
    const hashedPassword = await hash(createDto.password, 10);
    Object.assign(newUser, { ...createDto, password: hashedPassword });

    const user = await this.userRepository.save(newUser);
    const { password, ...result } = user;
    return result;
  }

  async findCurrentUser(userPayload: TokenPayload) {
    const userId = userPayload.sub
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      }
    });

    const { password, ...result } = user;
    return result;
  }
}
