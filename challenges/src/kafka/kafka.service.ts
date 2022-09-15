import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { InterpretSolutionMessage, SubmitSolutionMessage } from './interface';

@Injectable()
export class KafkaService {
  constructor(@Inject('CHALLENGE_SERVICE') private client: ClientKafka) {}

  async submitSolution(message: SubmitSolutionMessage) {
    return firstValueFrom(
      this.client.emit('javascript', JSON.stringify(message)),
    );
  }

  async interpretSolution(message: InterpretSolutionMessage) {
    // TODO: When have multiple lang, use lang params to navigate dedicated topic
    return firstValueFrom(
      this.client.emit('javascript', JSON.stringify(message)),
    );
  }
}
