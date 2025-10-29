import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

/**
 * DTO for querying products with pagination, filtering, and sorting.
 */
export class QueryProductDto {
  /** Page number (>= 1) */
  @IsNumber()
  @IsOptional()
  @Min(1)
  page?: number;
  /** Page size (>= 1) */
  @IsNumber()
  @IsOptional()
  @Min(1)
  limit?: number;
  /** Optional category filter */
  @IsString()
  @IsOptional()
  category?: string;
  /** Minimum price (>= 0) */
  @IsNumber()
  @IsOptional()
  @Min(0)
  minPrice?: number;
  /** Maximum price */
  @IsNumber()
  @IsOptional()
  maxPrice?: number;
  /** Free text search */
  @IsString()
  @IsOptional()
  search?: string;
  /** Sort key */
  @IsString()
  @IsOptional()
  @IsIn(['name', 'price', 'createdAt'])
  sortBy?: 'name' | 'price' | 'createdAt';
  /** Sort order */
  @IsString()
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';
}
