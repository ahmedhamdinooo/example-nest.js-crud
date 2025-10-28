import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interfaces';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  getProduct(): Product[] {
    return this.productService.findALlproducts();
  }
}
