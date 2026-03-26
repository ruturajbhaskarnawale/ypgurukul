Postgres setup and local development

1) Install PostgreSQL (Windows):
   - Download from https://www.postgresql.org/download/windows/ and install.

2) Create a database and user (example using psql):

   -- Option A: create role and DB manually using psql (run as postgres user):
   CREATE USER ritik WITH ENCRYPTED PASSWORD 'ritik1811';
   CREATE DATABASE ypgurukul_ritik OWNER ritik;
   GRANT ALL PRIVILEGES ON DATABASE ypgurukul_ritik TO ritik;

   -- Option B: run the provided SQL script (recommended):
   psql -U postgres -f backend/scripts/create_role_and_db.sql

3) Set environment variables:
    - Copy `.env.example` to `.env` in the `backend` folder and update `DATABASE_URL` if needed.
       The example already contains the `ritik` credentials for local development:
       DATABASE_URL="postgresql://ritik:ritik1811@localhost:5432/ypgurukul_ritik"

4) Install dependencies and prepare Prisma:
   cd backend
   npm install
   npx prisma generate

5) Create & run migrations (development):
   npx prisma migrate dev --name init

   This will create the database schema in PostgreSQL based on `prisma/schema.prisma`.

6) Seed sample data (optional):
   npm run prisma:seed || npx ts-node prisma/seed.ts

7) Start the server:
   npm run dev

Troubleshooting:
- If you get "ECONNREFUSED" from the frontend, ensure the backend is running and `NEXT_PUBLIC_API_URL` in the frontend points to the correct host and port.
- To check DB connection quickly, hit: `http://localhost:5000/health` (should report database Connected).
