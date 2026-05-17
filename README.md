# Mock API AI Backend

AI-powered backend for generating and hosting dynamic mock REST APIs with persistent CRUD operations.

---

## Live Demo

Health Endpoint: `https://site--mock-api-ai-backend--gxd2ltpdfxvn.code.run/health`

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
- pg

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
src/
├── clients/
│   ├── groq.ts
│   └── pgsql.ts
├── constants/
│   └── errorCodes.ts
├── controllers/
│   ├── fakeApi.controller.ts
│   └── generate.controller.ts
├── errors/
│   └── AppError.ts
├── middlewares/
│   ├── errorHandler.ts
│   └── validation.ts
├── routes/
│   └── index.ts
├── schemas/
│   ├── fakeApiSchema.ts
│   └── generateApiSchema.ts
├── services/
│   ├── fakeApi.service.ts
│   ├── generate.service.ts
│   └── groq.service.ts
├── utils/
│   ├── validateFakeApiData.ts
│   └── validateFakeApiDataForPatch.ts
├── app.ts
└── server.ts
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
