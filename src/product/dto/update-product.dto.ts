import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

/**
 * DTO for partially updating an existing product.
 */
export class UpdateProductDto {
  /** Product name */
  @IsString()
  @IsOptional()
  name?: string;
  /** Optional product description */
  @IsString()
  @IsOptional()
  @Length(10, 100)
  description?: string;
  /** Price must be >= 0 */
  @IsNumber()
  @IsOptional()
  @Min(0)
  price?: number;
  /** Available stock */
  @IsNumber()
  @IsOptional()
  stock?: number;
  /** Product category */
  @IsString()
  @IsOptional()
  category?: string;
  /** Whether the product is active */
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
