import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Provides a simple hello message.
   * @returns A hello world string.
   */
  getHello(): string {
    return 'Hello World!';
  }
}

