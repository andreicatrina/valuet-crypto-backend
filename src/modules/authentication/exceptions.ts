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

export class EmailAddressAlreadyRegisteredException extends HttpException {
  constructor() {
    super(
      {
        message: 'This email address is already registered',
        error: EmailAddressAlreadyRegisteredException.name,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
