# IMS Orders (Admin Dashboard)

A minimal Inventory/Order Management System (IMS) built for job hunting.
It includes authentication (JWT + roles) and an Orders CRUD module with pagination and filters.

## Tech Stack

**Backend**

- Node.js + Express + TypeScript
- PostgreSQL
- JWT Auth (admin / staff)
- Validation: (TBD)
- ORM: (TBD: Prisma or SQL)

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

### Orders

- `POST /orders`
- `GET /orders?page=1&pageSize=10&q=xxx`
- `GET /orders/:id`
- `PATCH /orders/:id`
- `DELETE /orders/:id`

### Users (admin only)

- `GET /users`
- `POST /users` (create staff)
- `PATCH /users/:id` (update role/status)

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
    routes/
    middleware/
    controllers/
    services/
frontend/
  src/
```

## Roadmap

- [x] Express server + /health
- [x] Routes split + global error handler
- [ ] Auth: register/login + JWT middleware
- [ ] Orders: CRUD + pagination + filters
- [ ] Admin: staff management
- [ ] Frontend pages (login + orders)
- [ ] Deploy

## License

MIT
