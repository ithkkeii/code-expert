import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { SignUpReqDto } from 'src/features/auth/dto/signUpReq.dto';
import { TrimStringPipe } from 'src/pipes';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor() {}
}
