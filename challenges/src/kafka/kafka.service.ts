import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SubmitSolutionMessage } from './interface';

@Injectable()
export class KafkaService {
  constructor(@Inject('CHALLENGE_SERVICE') private client: ClientKafka) {}

  async submitSolution(message: SubmitSolutionMessage) {
    return firstValueFrom(
      this.client.emit('javascript', JSON.stringify(message)),
    );
  }
}
