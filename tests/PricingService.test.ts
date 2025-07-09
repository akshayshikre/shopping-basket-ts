import { PricingService } from '../src/services/PricingService';
import { BasketService } from '../src/services/BasketService';

describe('PricingService', () => {
  it('calculates basic totals', () => {
    const pricing = new PricingService();
    const basket = new BasketService(['Apple', 'Banana']);
    const total = pricing.calculateTotal(basket.getItems());
    expect(total).toBe(35 + 20);
  });

  it('applies melon BOGOF', () => {
    const pricing = new PricingService();
    const basket = new BasketService(['Melon', 'Melon']);
    const total = pricing.calculateTotal(basket.getItems());
    expect(total).toBe(50);
  });

  it('applies lime 3 for 2', () => {
    const pricing = new PricingService();
    const basket = new BasketService(['Lime', 'Lime', 'Lime']);
    const total = pricing.calculateTotal(basket.getItems());
    expect(total).toBe(30);
  });

  it('combines offers correctly', () => {
    const pricing = new PricingService();
    const basket = new BasketService(['Melon', 'Melon', 'Lime', 'Lime', 'Lime']);
    const total = pricing.calculateTotal(basket.getItems());
    expect(total).toBe(50 + 30);
  });
});
