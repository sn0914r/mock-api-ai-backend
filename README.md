# Mock API AI Backend

AI-powered backend for generating and hosting dynamic mock REST APIs with persistent CRUD operations.

---

## API Documentation

[https://site--mock-api-ai-backend--gxd2ltpdfxvn.code.run/docs](https://site--mock-api-ai-backend--gxd2ltpdfxvn.code.run/docs)

---

## Related Repositories

- [mock-api-ai-frontend](https://github.com/sn0914r/mock-api-ai-frontend)

---

## Features

### AI API Generation

- Generate mock REST APIs from natural language prompts
- Dynamic schema generation using Groq LLM
- Automatic mock data generation

### Dynamic CRUD APIs

- Dynamic REST endpoints using `/api/:apiId/:route`
- Persistent CRUD operations using PostgreSQL JSONB
- Separate dynamic APIs using unique API IDs

### Validation & Security

- Runtime payload validation based on generated schemas
- Type-safe `PUT` and `PATCH` operations
- Centralized error handling
- Structured API responses

### Backend Infrastructure

- PostgreSQL connection pooling
- TypeScript-based architecture
- Service-oriented backend structure

---

## Tech Stack

### Backend Core

- Node.js
- Express.js
- TypeScript

### AI Service

- Groq SDK (`llama-3.3-70b-versatile`)

### Database

- PostgreSQL
- Drizzle (ORM)

### Validation & Security

- Zod
- Helmet
- CORS

### Utilities

- Morgan
- UUID

---

## Folder Structure

```txt
.
├── docs/
├── drizzle/
│   └── meta/
├── src/
│   ├── clients/
│   ├── configs/
│   ├── constants/
│   ├── controllers/
│   ├── db/
│   ├── errors/
│   ├── middlewares/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   └── utils/
├── .env.example
├── .gitignore
├── drizzle.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=
NODE_ENV=
DATABASE_URL=
GROQ_API_KEY=
```

---

## Database Setup

Create the following PostgreSQL table:

```sql
CREATE TABLE fake_apis (
    id UUID PRIMARY KEY,
    route TEXT NOT NULL,
    schema_json JSONB NOT NULL,
    data_json JSONB NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

---

## Installation

```bash
git clone https://github.com/sn0914r/mock-api-ai-backend.git

cd mock-api-ai-backend

npm install

npm run dev
```

---

## API Endpoints

### Generate API

- `POST /generate`

Example request:

```json
{
  "prompt": "products API",
  "limit": 3
}
```

### Dynamic CRUD APIs

- `GET /api/:apiId/:route`
- `POST /api/:apiId/:route`
- `PUT /api/:apiId/:route/:elementId`
- `PATCH /api/:apiId/:route/:elementId`
- `DELETE /api/:apiId/:route/:elementId`

### Utility

- `GET /health`

---

## Security & Validation

- Runtime payload validation using generated schemas
- Type-safe validation for `POST`, `PUT`, and `PATCH`
- Dynamic API isolation using UUID-based routing
- Centralized error handling middleware
- Structured validation and error responses
- Safe production error handling without stack trace exposure
