# relation-tuple-parser/examples/nestjs-guard

## Startup

Start Keto:

```bash
docker-compose up
```

Start nestjs-app:

```bash
nx serve examples-nestjs-guard
```

Urls:

- Allowed access: http://localhost:3333/api?userId=user1
- Allowed access: http://localhost:3333/api?userId=user2
- Forbidden access: http://localhost:3333/api?userId=user3
- Forbidden access: http://localhost:3333/api

## Files

- [src/app/app.controller.ts](./src/app/app.controller.ts): Contains the secured endpoint
- [src/app/guard/keto-guard.ts](./src/app/guard/keto-guard.ts): Contains guard that protects the app
