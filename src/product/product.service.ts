import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interfaces';
@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'product1',
      description: 'product1 description',
      price: 100,
      stock: 10,
      category: 'category 1',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'product2',
      description: 'product2 description',
      price: 200,
      stock: 20,
      category: 'category 2',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findALlproducts(): Product[] {
    return this.products;
  }
}
