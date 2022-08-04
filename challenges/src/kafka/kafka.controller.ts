import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('kafka')
export class KafkaController {
  @MessagePattern('javascript-result')
  handleJavascriptExecutorResult(@Payload() message: any) {
    console.log(message);
  }
}
