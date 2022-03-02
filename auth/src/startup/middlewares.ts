import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieSession from 'cookie-session';

export const enhanceMiddlewares = (app: NestExpressApplication) => {
  app.enableCors();

  app.use(
    cookieSession({
      signed: false,
      secure: process.env.NODE_ENV !== 'test',
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new BadRequestException(errors),
      validationError: { target: false, value: true },
    }),
  );
};
