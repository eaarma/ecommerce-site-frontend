export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  color?: string;
  width: number;
  length: number;
  height: number;
  volume: number;
  weight: number;
  trait1?: string;
  trait2?: string;
  trait3?: string;
  trait4?: string;
  trait5?: string;
  category?: string;
  shopId?: number;
}

export interface OrderItemType {
  id: number; // Unique identifier for the sale history item
  itemId: number; // ID of the item being sold
  name: string; // Name of the item sold
  saleDate: string; // Date and time of the sale (ISO 8601 string)
  soldPrice: number; // The price at which the item was sold
  quantitySold: number; // The quantity of the item sold
  buyerId: number; // ID of the buyer
  shopId: number; // ID of the shop making the sale
  profit: number; // Calculated profit from the sale
}

export interface User {
  id: number;
}
