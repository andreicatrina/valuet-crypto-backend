import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotRegisteredException extends HttpException {
  constructor() {
    super(
      {
        message: 'Please check the credentials!',
        error: UserNotRegisteredException.name,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class IncorrectCredentialsException extends HttpException {
  constructor() {
    super(
      {
        message: 'Please check the credentials!',
        error: IncorrectCredentialsException.name,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
