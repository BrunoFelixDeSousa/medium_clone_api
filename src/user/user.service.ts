import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { hash } from 'bcrypt'
import { UserEntity } from '@app/user/user.entity'
import { CreateUserSchema } from '@app/user/schemas/createUserSchema'
import { UserResponse } from '@app/user/schemas/userResponseSchema'
import { TokenPayload } from '@app/auth/schemas/tokenPayloadSchema'
import { UpdateUserSchema } from '@app/user/schemas/updateUserSchema'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser(userBody: CreateUserSchema): Promise<UserResponse> {
    const [userWithSameEmail, userWithSameUsername] = await Promise.all([
      this.userRepository.findOne({ where: { email: userBody.email } }),
      this.userRepository.findOne({ where: { username: userBody.username } }),
    ])

    if (userWithSameUsername) {
      throw new ConflictException('User with same username already exists.')
    }

    if (userWithSameEmail) {
      throw new ConflictException('User with same e-mail already exists.')
    }

    const newUser = new UserEntity()
    const hashedPassword = await hash(userBody.password, 10)
    Object.assign(newUser, { ...userBody, password: hashedPassword })

    const user = await this.userRepository.save(newUser)
    const { password, ...result } = user
    return {
      user: result,
    }
  }

  async findCurrentUser(userPayload: TokenPayload): Promise<UserResponse> {
    const user = await this.userRepository.findOne({
      where: {
        id: userPayload.sub,
      },
    })

    const { password, ...result } = user
    return {
      user: result,
    }
  }

  async updateUser(
    userPayload: TokenPayload,
    userBody: UpdateUserSchema
  ): Promise<UserResponse> {
    const userUpdate = await this.userRepository.findOne({
      where: {
        id: userPayload.sub,
      },
    })

    if (userBody.password) {
      const hashedPassword = await hash(userBody.password, 10)
      Object.assign(userUpdate, { ...userBody, password: hashedPassword })
    } else {
      Object.assign(userUpdate, userBody)
    }

    await this.userRepository.save(userUpdate)
    const { password, ...result } = userUpdate

    return {
      user: result,
    }
  }
}
