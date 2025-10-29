<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Mastering NestJS — a small example API demonstrating Nest fundamentals (modules, controllers, services, DTOs, validation) via a simple Product domain. This README provides setup, configuration, folder structure, coding standards, and API usage.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Configuration

- **Environment variables**
  - `PORT`: HTTP port to listen on (default `3000`).
  - Add a `.env` at project root if needed and load it via `@nestjs/config` (optional; not yet configured in this repo).

- **Validation**
  - Global `ValidationPipe` is enabled with `whitelist: true` and `forbidNonWhitelisted: true` to enforce DTO schemas.

- **Package manager**
  - The project uses `pnpm`. You can switch to `npm` or `yarn` if preferred, but update commands accordingly.

## Folder structure

```
src/
  app.module.ts            # Root application module
  app.controller.ts        # Example controller (hello route)
  app.service.ts           # Example service (hello string)
  main.ts                  # Application bootstrap
  product/
    product.module.ts      # Product feature module
    product.controller.ts  # Product routes and request handling
    product.service.ts     # Product business logic and in-memory data
    dto/                   # Product DTOs (validation schemas)
      create-product.dto.ts
      update-product.dto.ts
      query-product.dto.ts
    interfaces/
      product.interfaces.ts
```

## Architecture and DI

- **Modules** group related providers and controllers. `AppModule` imports `ProductModule`.
- **Controllers** handle HTTP concerns (routing, params, status codes). `ProductController` maps incoming requests to the service layer.
- **Services** contain business logic and are injected into controllers using Nest's **Dependency Injection** container.
- **DTOs** validate and type request payloads using `class-validator` decorators.
- **Interfaces** define domain shapes used internally (e.g., `Product`).

## Coding standards

- **General**
  - Use PascalCase for classes (`CreateProductDto`), camelCase for methods and variables.
  - Keep controllers thin; push business logic into services.
  - Prefer immutability and pure functions where possible.
  - Follow SOLID: single-responsibility services, depend on abstractions where useful.

- **NestJS**
  - Use feature modules to isolate domains.
  - Use DTOs for all inputs; avoid accepting raw objects.
  - Leverage `ValidationPipe` and transformation as needed.

- **Types & comments**
  - Add JSDoc to modules, controllers, services, DTOs, and interfaces.
  - Document params, return types, and exceptions.

## API usage

Base URL: `http://localhost:3000`

- `GET /` — returns hello string.

- `GET /product`
  - Query params: `page`, `limit`, `category`, `minPrice`, `maxPrice`, `search`, `sortBy` (`name|price|createdAt`), `order` (`ASC|DESC`)
  - Returns paginated and filtered products.

- `GET /product/:id`
  - Returns a single product by id.

- `GET /product/category/:categoryName`
  - Returns products filtered by category.

- `POST /product`
  - Body: `CreateProductDto`
  - Creates and returns a new product (in-memory example).

- `PATCH /product/:id`
  - Body: `UpdateProductDto` (partial updates supported)
  - Updates a product (in-memory example).

- `DELETE /product/:id`
  - Deletes a product (in-memory example).

## Deployment

See Nest official [deployment docs](https://docs.nestjs.com/deployment). Choose any Node hosting provider; ensure Node LTS, environment variables, and a process manager (PM2/Systemd) or container runtime.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Ahmed hamdy](https://twitter.com/kammysliwiec)


## License

Nest is [MIT licensed](https://github.com/ahmedhamdinooo/example-nest.js-crud).
