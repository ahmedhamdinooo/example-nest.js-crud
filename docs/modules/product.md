## Product Module

### Overview

The Product feature demonstrates a standard NestJS module with controller, service, DTOs, and interfaces.

### Components

- Controller: `src/product/product.controller.ts`
- Service: `src/product/product.service.ts`
- DTOs: `src/product/dto/*.ts`
- Interfaces: `src/product/interfaces/*.ts`

### Controller

Responsible for routing and input validation. Exposes:

- `GET /product` — list with filters, sort, pagination
- `GET /product/:id` — get by id
- `GET /product/category/:categoryName` — list by category
- `POST /product` — create
- `PATCH /product/:id` — partial update
- `DELETE /product/:id` — delete

### Service

Holds business logic and data access. In this demo it maintains an in-memory array of `Product` items and exposes `findALlproducts()` for reads.

Recommended improvements:

- Expose dedicated methods like `findById`, `update`, `remove`, `create`
- Replace in-memory store with persistent storage in production

