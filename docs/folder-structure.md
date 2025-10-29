## Folder Structure

```
src/
  app.controller.ts
  app.module.ts
  app.service.ts
  main.ts
  product/
    dto/
      create-product.dto.ts
      update-product.dto.ts
      query-product.dto.ts
    interfaces/
      product.interfaces.ts
    product.controller.ts
    product.module.ts
    product.service.ts
```

- `product.module.ts`: Wires up controller and service
- `product.controller.ts`: HTTP routes and request validation
- `product.service.ts`: Business logic and data access (in-memory demo)
- `dto/`: Request validation schemas with `class-validator`
- `interfaces/`: TypeScript types

