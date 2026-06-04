export interface Product {
  id?: string;
  _id?: string;
  name: string;
  category: any;
  description: string;
  materials: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  imageUrl: string;
  gallery?: string[];
  basePrice: number;
  features: string[];
  status?: boolean;
}

export interface QuoteRequest {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  includeEmbroidery: boolean;
  embroideryDetails?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  comments?: string;
}

export interface Category {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  iconName: string;
  heroImage: string;
  status?: boolean;
}
