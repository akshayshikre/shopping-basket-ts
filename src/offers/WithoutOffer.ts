import { IOfferStrategy } from '../core/IOfferStrategy';
import { Item } from '../models/Item'; // Make sure this path is correct and Items is exported from there

export class WithoutOffer implements IOfferStrategy {
  apply(items: Item[]): number {
    console.log(items)
    const itemsWithoutOffers = items.filter(i => !i.discount);
    console.log("Items without offers:", itemsWithoutOffers);
    if (itemsWithoutOffers.length === 0) return 0;
    return itemsWithoutOffers.reduce((sum, item) => {
        sum += item.quantity * item.price;
        return sum;
    }, 0);
  }
}

