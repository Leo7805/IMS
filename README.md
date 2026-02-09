# IMS Orders (Admin Dashboard)

A minimal Inventory/Order Management System (IMS) .
It includes authentication (JWT + roles) and an Orders CRUD module with pagination and filters.

## Tech Stack

**Backend**

- Node.js + Express + TypeScript
- PostgreSQL
- JWT Auth (admin / staff)
- Validation: (TBD)
- ORM: (Prisma)

**Frontend**

- React + TypeScript
- Vite
- API client: fetch/axios

## Features

### Auth & Roles

- Register / Login
- JWT-based authentication
- Role-based access control: `admin`, `staff`

### Orders Module (Main)

- Create order
- List orders (pagination)
- Update order
- Delete order
- Search / filter

### Admin Module (Support)

- Admin can manage staff users

### System

- Input validation
- Unified error response
- Audit fields: `created_at`, `updated_at`
- `.env` configuration

## API Endpoints (WIP)

### Health

- `GET /health`

### Auth

- `POST /auth/register`
- `POST /auth/login`



#### Login (sample)

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

Response

```json
{
  "ok": true,
  "data": {
    "user": {
      "id": "cmla3v13r000010elbmbdu1vm",
      "email": "admin@example.com",
      "role": "STAFF"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtbGEzdjEzcjAwMDAxMGVsYm1iZHUxdm0iLCJyb2xlIjoiU1RBRkYiLCJpYXQiOjE3NzAzMzUyMTgsImV4cCI6MTc3MDk0MDAxOH0.13Xd-pMohaj1MNUgeUVg2EQVtpXdIaMf6ghzrGrJxgQ"
  }
}
```



### Users (admin only)

- `GET /users` (list users)
- `POST /users` (create staff)
- `PATCH /users/:id` (update role/status)		



### Orders

- `POST /orders` (create order)
- `GET /orders?page=1&pageSize=10&q=xxx`
- `GET /orders/:id`
- `PATCH /orders/:id`
- `DELETE /orders/:id`



#### Create order (sample)



```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "title": "Laptop repair",
  "description": "Screen not turning on",
  "assignedToId": "cmla3v13r000010elbmbdu1vm"
}
```

Response

```json
{
    "ok": true,
    "data": {
        "id": "cmla521ko0000l358nofm6p9y",
        "title": "Laptop repair2",
        "description": "Screen not turning on",
        "status": "PENDING",
        "createdById": "cml541cdf0000802wph66o6sh",
        "assignedToId": "cml544x8y0002fj1glpx1uwzl",
        "createdAt": "2026-02-06T00:19:54.361Z",
        "updatedAt": "2026-02-06T00:19:54.361Z"
    }
}
```



#### List orders (sample)



```http
GET /orders?page=1&pageSize=10&q=laptop
Authorization: Bearer <token>
```

Response



```json
{
    "ok": true,
    "data": {
        "id": "cmla521ko0000l358nofm6p9y",
        "title": "Laptop repair2",
        "description": "Screen not turning on",
        "status": "PENDING",
        "createdById": "cml541cdf0000802wph66o6sh",
        "assignedToId": "cml544x8y0002fj1glpx1uwzl",
        "createdAt": "2026-02-06T00:19:54.361Z",
        "updatedAt": "2026-02-06T00:19:54.361Z"
    }
}
```



 





#### Update user role/status (sample)



```http
PATCH /users/:id
Authorization: Bearer <admin token>
Content-Type: application/json
```

```json
{
  "role": "STAFF",
  "status": "ACTIVE"
}
```

Response

```json
{
  "ok": true,
  "data": {
    "id": "user_456",
    "email": "staff@example.com",
    "role": "STAFF",
    "status": "ACTIVE"
  }
}
```



### Order Items

- `POST /orders/:orderId/items` (create order item)
- `GET /orders/:orderId/items`
- `GET /orders/:orderId/items/:itemId`
- `PATCH /orders/:orderId/items/:itemId`
- `DELETE /orders/:orderId/items/:itemId`



#### Update order item (sample)

```http
PATCH /orders/:orderId/items/:itemId
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "quantity": 2,
  "notes": "Customer requested two screens"
}
```



Response

```json
{
  "ok": true,
  "data": {
    "id": "cmlb123abc0001xyzitem01",
    "orderId": "cmla521ko0000l358nofm6p9y",
    "name": "Screen replacement",
    "quantity": 2,
    "unitPrice": "299.99",
    "notes": "Customer requested two screens",
    "createdAt": "2026-02-06T01:10:21.123Z",
    "updatedAt": "2026-02-06T01:10:21.123Z"
  }
}
```





#### Delete order item (sample)

```http
DELETE /orders/:orderId/items/:itemId
Authorization: Bearer <token>
```

Response

```json
{
  "ok": true,
}
```





## Getting Started

### 1) Backend setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Test:

```bash
curl http://localhost:8000/health
```

### 2) Frontend setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Copy the example file and update values:

Create `backend/.env`:

```bash
cd backend
cp .env.example .env
```

Then edit backend/.env:

- DATABASE_URL
- JWT_SECRET

## Project Structure

```txt
backend/
  src/
    app.ts
    server.ts
    db.ts
    routes/
    middleware/
    controllers/
    services/
    selects/
    policies/
    types/
    utils/
frontend/
  src/
```

## Roadmap

- [x] Express server + /health
- [x] Routes split + global error handler
- [x] Auth: register/login + JWT middleware
- [ ] Orders: CRUD + pagination + filters
- [ ] Admin: staff management
- [ ] Frontend pages (login + orders)
- [ ] Deploy

## License

MIT
