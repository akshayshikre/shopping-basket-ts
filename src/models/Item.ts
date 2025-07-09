export type ItemName = 'Apple' | 'Banana' | 'Melon' | 'Lime';
import { DiscountType } from "./Discount";
export interface Item {
  name: ItemName;
  price: number;
  quantity: number;
  discount?: DiscountType;
}
