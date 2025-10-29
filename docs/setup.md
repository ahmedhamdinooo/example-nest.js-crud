## Setup

### Prerequisites

- Node.js 18+
- pnpm 8+

### Install

```bash
pnpm install
```

### Run

```bash
# Development
pnpm run start:dev

# Production
pnpm run build && pnpm run start:prod
```

### Testing

```bash
pnpm run test
pnpm run test:e2e
pnpm run test:cov
```

### Health Check

- Default server: http://localhost:3000
- Try `GET /product`

