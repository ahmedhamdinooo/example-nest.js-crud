import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interfaces';
import { QueryProductDto } from './dto/query-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
/**
 * Response shape for product list requests with pagination and filters.
 */
interface FindallResponse {
  success: boolean;
  message: string;
  data: Product[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalpages: number;
    nextPage: boolean;
    previousPage: boolean;
  };
  filters: {
    category: string;
    priceRange: {
      min: number;
      max: number;
    };
    search: string;
  };
}
@Controller('product')
/**
 * Handles product HTTP endpoints: listing, retrieving, creating, updating, deleting.
 */
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  /**
   * Retrieves products with filtering, sorting, and pagination.
   * @param query Query parameters for paging, filtering, and sorting.
   * @returns Paginated list with metadata and applied filters.
   */
  @Get()
  getProducts(@Query() query: QueryProductDto): FindallResponse {
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
    let filteredProducts = [...this.productService.findAllProducts()];
    if (category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
    }
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter((p) => p.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((p) => p.price <= maxPrice);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower),
      );
    }
    //sorting
    filteredProducts.sort((a, b) => {
      let aValue: any = (a as any)[sortBy];
      let bValue: any = (b as any)[sortBy];
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
    // pagination
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = Number(page);

    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + Number(limit);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    return {
      success: true,
      message: 'products retrived successfuly',
      data: paginatedProducts,
      pagination: {
        currentPage,
        itemsPerPage: Number(limit),
        totalItems,
        totalpages: totalPages,
        nextPage: currentPage < totalPages,
        previousPage: currentPage > 1,
      },
      filters: {
        category: category || 'all',
        priceRange: {
          min: minPrice || 0,
          max: maxPrice || 0,
        },
        search: search || 'none',
      },
    };
  }

  // get product by Id
  @Get(':id')
  /**
   * Retrieves a product by its id.
   * @param id Product id as string.
   * @throws BadRequestException if id is not numeric.
   * @throws NotFoundException if product does not exist.
   */
  getProductById(@Param('id') id: string) {
    const productId = +id;
    if (isNaN(productId)) {
      throw new BadRequestException('Product Id must be a number');
    }
    const product = this.productService
      .findAllProducts()
      .find((p) => p.id === productId);
    if (!product) {
      throw new NotFoundException(`Product With Id ${id} not found`);
    }
    return {
      success: true,
      message: 'products retrived successfuly',
      data: product,
    };
  }
  @Get('category/:categoryName')
  /**
   * Retrieves products by a specific category.
   * @param categoryName Category name.
   * @throws NotFoundException if no products in category.
   */
  getByCategory(@Param('categoryName') categoryName: string) {
    const products = this.productService
      .findAllProducts()
      .filter((p) => p.category.toLowerCase() === categoryName.toLowerCase());
    if (products.length === 0) {
      throw new NotFoundException(
        `No products found in category ${categoryName}`,
      );
    }
    return {
      success: true,
      message: `products retrived successfuly with ${categoryName}`,
      category: categoryName,
      data: products,
    };
  }
  // add post
  @Post()
  @HttpCode(HttpStatus.CREATED)
  /**
   * Creates a new product (in-memory example).
   * @param CreateProductDto Product payload to create.
   */
  createProduct(@Body() CreateProductDto: CreateProductDto) {
    const newProduct = {
      ...CreateProductDto,
      id: this.productService.findAllProducts().length + 1,
    };
    return {
      success: true,
      message: 'products created successfuly',
      data: newProduct,
    };
  }
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  /**
   * Partially updates a product (in-memory example).
   * @param id Product id.
   * @param UpdateProductDto Fields to update.
   */
  updateProductPartial(
    @Param('id') id: string,
    @Body() UpdateProductDto: UpdateProductDto,
  ) {
    const ProductId = parseInt(id, 10);
    if (isNaN(ProductId)) {
      throw new BadRequestException('Product Id Must be a number');
    }
    // find product index
    const productIndex = this.productService
      .findAllProducts()
      .findIndex((p) => p.id === ProductId);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with Id ${id} not found`);
    }
    //validate price if provided
    if (UpdateProductDto.price !== undefined && UpdateProductDto.price <= 0) {
      throw new BadRequestException('price must be greater than 0');
    }
    // only update provided fields
    this.productService.findAllProducts()[productIndex] = {
      ...this.productService.findAllProducts()[productIndex],
      ...UpdateProductDto,
      updatedAt: new Date(),
    };
    return {
      success: true,
      message: 'products updated successfuly',
      updatedFields: Object.keys(UpdateProductDto),
      data: this.productService.findAllProducts()[productIndex],
    };
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  /**
   * Deletes a product (in-memory example).
   * @param id Product id.
   */
  deleteProduct(@Param('id') id: string) {
    const ProductId = parseInt(id, 10);

    // find product index
    const productIndex = this.productService
      .findAllProducts()
      .findIndex((p) => p.id === ProductId);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with Id ${id} not found`);
    }

    const deleted = this.productService
      .findAllProducts()
      .splice(productIndex, 1)[0];

    return {
      success: true,
      message: 'products deleted successfuly',
      data: deleted,
    };
  }
}
