import { IOfferStrategy } from "../core/IOfferStrategy";
import { WithOffer } from "../offers/WithOffer";
import { WithoutOffer } from "../offers/WithoutOffer";
import { Item } from "../models/Item";
export class PricingService {
  private strategies: IOfferStrategy[] = [new WithoutOffer(), new WithOffer()];
  calculateTotal(items: Item[]): number {
    let total = 0;
    for (const strategy of this.strategies) {
      total += strategy.apply(items);
    }
    return total;
  }
}
