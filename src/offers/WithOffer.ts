import { IOfferStrategy } from '../core/IOfferStrategy';
import { Item } from '../models/Item';
export class WithOffer implements IOfferStrategy {
  apply(items: Item[]): number {
    const itemsWithOffers = items.filter(i => !!i.discount) as Item[];
    console.log("Items with offers:", itemsWithOffers);
    if (itemsWithOffers.length === 0) return 0;
    return itemsWithOffers.reduce((sum, item) => {
      const buyItems = item.discount?.buyItems ?? 1;
      const forThePriceOfItems = item.discount?.forThePriceOfItems ?? 0;
      const discountedItems = Math.floor(item.quantity / buyItems);
      const nonDiscountedItems = item.quantity % buyItems;
      sum += discountedItems * forThePriceOfItems * item.price;
      sum += nonDiscountedItems * item.price;
      return sum;
    }, 0);
  }
}
