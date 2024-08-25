import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginSchema } from '@app/auth/schemas/loginSchema';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginSchema) {
    const user = await this.userRepository.findOne({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User credentials not found');
    }

    const isPasswordValid = await compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = this.jwtService.sign({ sub: user.id });

    const { password, ...userResponse } = user;

    return {
      user: userResponse,
      access_token: accessToken,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    console.log('User found:', user); // Log para verificar se o usuário foi encontrado

    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;

      console.log('Password valid:', result); // Log para verificar se a senha é válida

      return result;
    }

    console.log('Validation failed'); // Log caso a validação falhe
    return null;
  }
}
