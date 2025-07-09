# Shopping Basket TS

## Overview

Shopping Basket is a TypeScript-based application that simulates a shopping basket with item pricing, discounts, and asynchronous price calculation using BullMQ and Redis. The app is containerized with Docker for easy deployment and includes comprehensive unit tests.

## Features

- **Basket Management:** Add items to a basket, including quantity tracking.
- **Pricing & Discounts:** Supports item pricing and discount strategies (e.g., buy 1 get 1, 3-for-2).
- **Validation:** Uses Zod for schema validation of basket items.
- **Asynchronous Processing:** Calculates basket totals asynchronously using BullMQ and Redis.
- **Docker Support:** Easily deployable with Docker and Docker Compose.
- **Unit Tests:** Comprehensive tests for pricing and basket logic using Jest.

## Prerequisites

- Node.js (v18 or above)
- Docker (for containerized deployment)
- Redis (automatically set up via Docker Compose)

## Installation

Clone the repository:

```sh
git clone https://github.com/akshayshikre/shopping-basket-ts.git
cd shopping-basket-ts
```

### Via Docker

**Build and run in detached mode:**
```sh
docker-compose up --build -d
```

**Check logs:**
```sh
docker-compose logs --tail 100 -f
```

**Run tests in the container:**
```sh
docker-compose exec bucket-service npm test
```

### Via Node

**Install dependencies:**
```sh
npm install
```

**Run tests:**
```sh
npm test
```

**Start the app:**
```sh
npm start
```

**Start the worker:**
```sh
npm run start-worker
```

## Running Tests

The application uses Jest for unit testing. To run all tests:

```sh
npm test
```

## Project Structure

- `src/main.ts` – Entry point, adds basket jobs to the queue.
- `src/services/BasketService.ts` – Handles basket logic and validation.
- `src/services/PricingService.ts` – Calculates totals and applies offers.
- `src/services/QueueService.ts` – Sets up BullMQ queue and events.
- `src/worker/Processor.ts` – Worker that processes basket jobs.
- `src/data/itemPrices.ts` – Item prices and discount definitions.
- `tests/` – Jest test files.

## Example Usage

**Add items and process basket:**
```typescript
import { BasketService } from './src/services/BasketService';
import { basketQueue } from './src/services/QueueService';

const basket = new BasketService(['Apple', 'Banana', 'Melon', 'Lime']);
basketQueue.add('process-basket', { items: basket.getItems() });
```

**Listen for job completion:**
```typescript
import { queueEvents } from './src/services/QueueService';

queueEvents.on('completed', ({ jobId, returnvalue }) => {
  console.log(`Job ${jobId} completed with result:`, returnvalue);
});
```

## API -

This project does not expose a REST API, but you can interact with the basket and pricing logic via the provided TypeScript classes and BullMQ queue.

## Docker Compose Services

- **bucket-service:** Main app for adding jobs to the queue.
- **pricing-worker:** Worker service for processing basket jobs.
- **redis:** Redis instance for BullMQ.

# shopping-basket-ts
