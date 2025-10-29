## Product API

Base path: `/product`

### List products

GET `/product`

Query params:

- page (number, default 1)
- limit (number, default 10)
- category (string)
- minPrice (number)
- maxPrice (number)
- search (string)
- sortBy ('name' | 'price' | 'createdAt', default 'createdAt')
- order ('ASC' | 'DESC', default 'DESC')

Example:

```bash
curl "http://localhost:3000/product?page=1&limit=5&search=phone&sortBy=price&order=ASC"
```

### Get by id

GET `/product/:id`

Example:

```bash
curl http://localhost:3000/product/1
```

### By category

GET `/product/category/:categoryName`

### Create

POST `/product`

Body:

```json
{
  "name": "iPhone 15",
  "description": "Latest model",
  "price": 1099,
  "stock": 5,
  "category": "phones",
  "isActive": true
}
```

### Partial update

PATCH `/product/:id`

Body (any subset):

```json
{ "price": 999 }
```

### Delete

DELETE `/product/:id`

