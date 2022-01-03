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

  public async signUp(email: string, password: string, name: string) {
    let user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new exceptions.EmailAddressAlreadyRegisteredException();
    }

    const hash = await bcrypt.hash(password, 10);
    user = this.userRepository.create({
      name,
      email,
      password: hash,
    });
    user = await this.userRepository.save(user);

    return {
      id: user.id,
    };
  }

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
        name: user.name,
        createdAt: user.createdAt,
      },
      token: jwt,
    };
  }
}
