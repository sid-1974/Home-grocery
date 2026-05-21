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

export interface Suggestion {
  _id: string;
  nameEn: string;
  nameKn?: string;
  comments?: string;
  userId?: {
    _id: string;
    email: string;
  } | string;
  status?: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  createdAt: string;
}

export const QUANTITY_UNITS = ["kg", "gram", "ltr", "ml", "packet", "item"];

