import { Queue, Worker, QueueEvents, Job } from 'bullmq';
import IORedis from 'ioredis';
const queueName = 'pricing';
export const connection = new IORedis(6379,'shopping-basket-ts-redis-1', {});
export const basketQueue = new Queue(queueName, { connection });
export const queueEvents = new QueueEvents(queueName, { connection });