import { review } from './review';

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  availabilityStatus: string;
  tags: string[];
  brand: string;
  sku: string;
  images: string[];
  thumbnail: string;
  reviews: review[];
}
