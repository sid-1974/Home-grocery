export interface Product {
  id: string | number;
  nameEn: string;
  nameKn?: string;
  image: string;
}

export interface CartItem {
  _id?: string;
  name: string;
  quantity: string;
  imageUrl: string;
}

export const QUANTITY_UNITS = ["kg", "gram", "ltr", "ml", "packet", "item"];

