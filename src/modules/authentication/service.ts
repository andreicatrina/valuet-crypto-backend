import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './module/user.entity';
import * as exceptions from './exceptions';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async signIn(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new exceptions.UserNotRegisteredException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new exceptions.IncorrectCredentialsException();
    }

    const jwt = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
      token: jwt,
    };
  }
}
