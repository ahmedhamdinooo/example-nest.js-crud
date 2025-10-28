import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interfaces';
import { QueryProductDto } from './dto/query-product.dto';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  getProduct(@Query() query: QueryProductDto): {
    success: boolean;
    message: string;
    data: Product[];
  } {
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      search,
      sortBy = 'createdAt',
      order = 'DESC',
    } = query;
    let fitredProducts = [...this.productService.findALlproducts()];
    if (category) {
      fitredProducts = fitredProducts.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
    }
    if (minPrice !== undefined) {
      fitredProducts = fitredProducts.filter((p) => p.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      fitredProducts = fitredProducts.filter((p) => p.price <= maxPrice);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      fitredProducts = fitredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower),
      );
    }
    //sorting
    fitredProducts.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      if (sortBy === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      if (order == 'ASC') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    return {
      success: true,
      message: 'products retrived successfuly',
      data: fitredProducts,
    };
  }
}
