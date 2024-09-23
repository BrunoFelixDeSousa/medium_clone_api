import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '@app/auth/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('Validating user with email:', email)
    const user = await this.authService.validateUser(email, password)
    console.log(user)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return user
  }
}
