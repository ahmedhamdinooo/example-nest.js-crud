## Coding Standards

### General

- Use TypeScript everywhere
- Leverage NestJS Dependency Injection
- Prefer modular design (feature modules per domain)

### Naming

- Classes: PascalCase (e.g. ProductService, CreateProductDto)
- Files: kebab-case (e.g. product.controller.ts)
- DTOs: PascalCase with Dto suffix
- Methods: camelCase (e.g. getProductById)

### Controllers

- Keep controllers thin and delegate logic to services
- Return consistent response shapes (success, message, data)
- Validate input via DTOs with class-validator

### Services

- Encapsulate all business logic
- Do not mutate shared state from controllers

### DTOs & Validation

- Validate all external input
- Use optional fields wisely for PATCH

### Error Handling

- Throw BadRequestException for invalid input
- Throw NotFoundException for missing resources

### Documentation

- Add JSDoc to classes and public methods
- Maintain docs/ with API and module guides

