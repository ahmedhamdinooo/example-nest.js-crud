## Configuration

This sample uses in-memory data for the Product module and does not require environment variables.

For real applications:

- Use `@nestjs/config` for environment management
- Validate env with `joi`
- Externalize secrets and database credentials

Example (future):

```ts
// app.module.ts
ConfigModule.forRoot({ isGlobal: true, validationSchema: schema })
```

