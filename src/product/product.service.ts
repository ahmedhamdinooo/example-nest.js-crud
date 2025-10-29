import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interfaces';

/**
 * Service providing in-memory product data and operations.
 * In a real application, this would integrate with a repository or database.
 */
@Injectable()
export class ProductService {
  /** In-memory list of products serving as a mock data store. */
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


  /**
   * Returns all available products.
   * @returns Array of products in memory.
   */
  findAllProducts(): Product[] {
    return this.products;
  }
}


