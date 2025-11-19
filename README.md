# CentStage - Backend (Express + Prisma)

## Setup (local)
1. Copy `.env.example` to `.env` and set `DATABASE_URL` to your postgres instance.
2. Install dependencies: `npm install`
3. Run Prisma migration:
   - `npx prisma db push` (creates schema)
4. Start server: `npm run dev`
5. API endpoints:
   - `GET /tasks`
   - `POST /tasks` { title, description }
   - `PATCH /tasks/:id/toggle`
   - `DELETE /tasks/:id`

## Docker (optional)
Use `docker-compose.yml` included in repo to start PostgreSQL quickly.
