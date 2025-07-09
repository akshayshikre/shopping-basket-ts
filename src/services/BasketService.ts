import * as z from "zod/v4";
import { Item } from "../models/Item";
import { itemPrices } from "../data/itemPrices";

const basketSchema = z.array(z.string().min(1));
export type BasketSchema = z.infer<typeof basketSchema>;

export class BasketService {
  private items: Item[] = [];

  constructor(rawItems?: string[]) {
    if (rawItems) {
      const parsedItems = basketSchema.safeParse(rawItems);
      if (!parsedItems.success) {
        throw new Error(`Invalid basket items: ${parsedItems.error.message}`);
      }
      rawItems.forEach((item: string) => {
        const priceInfo = itemPrices[item as keyof typeof itemPrices];
        if (!priceInfo) throw new Error(`Price info not found for item: ${item}`);
        const existingItem = this.items.find(i => i.name === item);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          this.items.push(({
            name: item,
            price: priceInfo.price,
            quantity: 1,
            ...('discount' in priceInfo ? { discount: priceInfo.discount } : {}),
          }) as Item);
        }
      });
    }
  }

  addItem(item: string) {
    if (!itemPrices[item as keyof typeof itemPrices]) {
      throw new Error(`Item not found: ${item}`);
    }
    const priceInfo = itemPrices[item as keyof typeof itemPrices];
    if (!priceInfo) throw new Error(`Price info not found for item: ${item}`);
    const existingItem = this.items.find(i => i.name === item);
    if (existingItem) {
      existingItem.quantity += 1;
      return;
    } else {
      this.items.push({ name: item, price: priceInfo.price, quantity: 1, ...('discount' in priceInfo ? { discount: priceInfo.discount } : {}) } as Item);
    }
  }

  getItems(): Item[] {
    return this.items;
  }

  clear() {
    this.items = [];
  }
}
