import { Worker, type Job } from 'bullmq';
import { PricingService } from '../services/PricingService';
import { connection } from '../services/QueueService';

const worker = new Worker(
  'pricing',
  async (job: Job) => {
    if (job.name === 'process-basket') {
      const pricing = new PricingService();
      const total = pricing.calculateTotal(job.data.items);
      console.log('Total:', total, job.data.items);
      return total;
    }
    throw new Error(`Unknown job name: ${job.name}`);
  },
  { connection }
);

worker.on('completed', (job: Job, returnvalue: any) => {
  console.log(`Worker: Job ${job.id} completed with result:`, returnvalue);
});

worker.on('failed', (job: Job | undefined, err: Error) => {
  if (job) {
    console.log(`Worker: Job ${job.id} failed with error:`, err);
  } else {
    console.log(`Worker: Unknown job failed with error:`, err);
  }
});

worker.on('progress', (job: Job, progress: any) => {
  console.log(`Worker: Job ${job.id} progress:`, progress);
});

