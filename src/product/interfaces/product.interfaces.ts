/**
 * Represents a product entity used throughout the application.
 */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
