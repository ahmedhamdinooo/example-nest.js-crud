import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
