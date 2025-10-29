import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  /**
   * Returns a hello world string to verify the API is running.
   * @returns A hello message.
   */
  getHello(): string {
    return this.appService.getHello();
  }
}
