import { Item } from './models/Item';
import { basketQueue, queueEvents } from './services/QueueService';
import { BasketService } from './services/BasketService';

const basket = new BasketService();

const shoppingItems = ['Apple', 'Apple', 'Banana', 'Melon', 'Melon', 'Lime', 'Lime', 'Lime'];
shoppingItems.forEach(item => basket.addItem(item));

basketQueue.add('process-basket', { items: basket.getItems() });

queueEvents.on('completed', ({ jobId, returnvalue }: { jobId: string; returnvalue: any }) => {
  console.log(`Job ${jobId} completed with result:`, returnvalue);
});

queueEvents.on('failed', ({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
  console.log(`Job ${jobId} failed with reason:`, failedReason);
});

queueEvents.on('progress', (args: { jobId: string; data: number | object }, id?: string) => {
  const { jobId, data } = args;
  if (typeof data === 'object' && data !== null && 'items' in data) {
    // @ts-ignore
    console.log(`Job ${jobId} progress:`, (data as { items: Item[] }).items);
  } else {
    console.log(`Job ${jobId} progress:`, data);
  }
});

console.log('Basket job added to queue. Run worker.ts to process it.');
