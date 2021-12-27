import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './module/user.entity';
import { configValues } from '../configuration';
import { AuthenticationController } from './controller';
import { AuthenticationService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: configValues.auth.jwtSecret,
      signOptions: { expiresIn: '360d' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
