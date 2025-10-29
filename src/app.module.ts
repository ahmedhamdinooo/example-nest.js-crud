import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

/**
 * Root application module.
 * Imports feature modules and wires top-level providers.
 */
@Module({
  imports: [ProductModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}


