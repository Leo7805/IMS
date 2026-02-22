# Order & Inventory Management System (IMS)

A backend system for managing orders and related items, designed to simulate day-to-day operational workflows such as task assignment, status tracking, and itemised order processing for small to medium-sized business environments.

The system provides authenticated APIs for managing orders and staff responsibilities, with role-based access control to separate administrative and operational users.

---

## 🔗 Interactive API Documentation

Interactive Swagger UI is available for exploring nested order and order item APIs:

👉 https://ims-fpq2.onrender.com/docs

This allows frontend or QA teams to explore endpoints, request schemas, and authentication flows directly via an interactive interface.

---

## 🚀 Deployed Backend API

The backend service is deployed and accessible at:

👉 https://ims-fpq2.onrender.com

---

## ✨ Key Features

### Authentication & Roles

- JWT-based authentication
- Role-based access control (Admin / Staff)
- Secure protected endpoints

### Orders Module

- Create / update / delete orders
- Status tracking
- Pagination and search support

### Order Items Module

- Nested item management under each order
- Add / update / remove individual order items
- Quantity and pricing control per item

### Admin Module

- Manage staff user roles
- Update user status

### System Design

- Input validation (Zod)
- Unified error response structure
- Audit fields: `createdAt`, `updatedAt`
- Modular controller/service architecture
- Environment-based configuration

---

## 🧰 Tech Stack

**Backend**

- Node.js + Express + TypeScript
- PostgreSQL
- Prisma ORM
- Zod Validation
- JWT Authentication

**Frontend (WIP)**

- React + TypeScript (Vite)

---

## 🛠 Local Development

Clone the repository and run locally if needed:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Test health endpoint:

```bash
curl http://localhost:8000/health
```

---

## 📌 Roadmap

- [x] Auth: Register/Login + JWT middleware
- [x] Orders: CRUD
- [x] Admin: Staff management
- [x] Swagger API documentation
- [x] Backend deployment
- [ ] Frontend pages
- [ ] Advanced filtering

---

## 📄 License

MIT
