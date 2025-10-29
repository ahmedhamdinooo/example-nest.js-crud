import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

/**
 * ProductModule encapsulates product-related controllers and services.
 */
@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
