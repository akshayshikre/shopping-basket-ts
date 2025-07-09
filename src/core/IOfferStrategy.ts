import { Item } from "../models/Item";
export interface IOfferStrategy {
  apply(items: Item[]): number;
}
