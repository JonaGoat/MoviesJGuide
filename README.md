# GuideMovies - MCU Timeline (v1)

Guia interactiva del MCU con filtros, orden cronologico/lanzamiento, favoritos, playlists y recomendaciones.

## Stack
- Frontend: Next.js (App Router) + TypeScript
- Backend: NestJS + TypeScript
- DB: PostgreSQL
- ORM: Prisma

## Arquitectura general
- `frontend/` consume la API REST del backend.
- `backend/` expone endpoints REST y gestiona la persistencia en PostgreSQL.
- TMDb se consulta solo en backend para hidratar runtime, rating y descripcion.

## Estructura de carpetas
```
/legacy-version     # referencia original, no se modifica
/frontend           # Next.js App Router
/backend            # NestJS + Prisma
```

## Requisitos
- Node.js 18+
- PostgreSQL 14+

## Configuracion de PostgreSQL (local)
1. Crear DB:
   ```
   CREATE DATABASE guidemovies;
   ```
2. Configurar usuario/clave (ej. `postgres:postgres`).
3. Ajustar `backend/.env` con tu `DATABASE_URL`.

## Variables de entorno

### Backend (`backend/.env`)
```
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/guidemovies
TMDB_API_KEY=
TMDB_READ_TOKEN=
TMDB_LANG=es-ES
TMDB_REGION=CL
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

## Instalacion backend
```
cd backend
npm install
cp .env.example .env
npm run prisma:generate
npm run db:migrate
npm run db:seed
npm run dev
```

## Instalacion frontend
```
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Migraciones y seed
- Migraciones: `npm run db:migrate`
- Seed: `npm run db:seed`

## Endpoints principales
- `GET /movies`
- `GET /movies/:id`
- `GET /movies/:id/recommendations`
- `GET /genres`
- `GET /phases`
- `GET /favorites`
- `POST /favorites/:movieId`
- `DELETE /favorites/:movieId`
- `GET /playlists`
- `POST /playlists`
- `PATCH /playlists/:id`
- `DELETE /playlists/:id`
- `GET /playlists/:id/items`
- `POST /playlists/:id/items`
- `DELETE /playlists/:id/items/:movieId`

## Funcionalidades implementadas
- Catalogo MCU completo
- Busqueda, filtros y ordenamientos
- Vista detalle con runtime/rating/descripcion
- Favoritos persistentes (deviceId)
- Playlists con items y covers
- Recomendaciones
- Timeline por fases
- Responsive mobile/desktop

## Guia para modificar el proyecto
- Peliculas: `backend/prisma/seed.ts` (datos iniciales) y `backend/prisma/schema.prisma`
- Estilos: `frontend/app/globals.css`
- Componentes: `frontend/components/`
- Backend: `backend/src/`
- Endpoints: `backend/src/*/*.controller.ts`
- TMDb: `backend/.env` y `backend/src/tmdb/tmdb.service.ts`
- Base de datos: `backend/prisma/schema.prisma`

## Donde modificar cada parte del proyecto
- Peliculas: `backend/prisma/seed.ts`
- Estilos: `frontend/app/globals.css`
- Componentes: `frontend/components/`
- Backend: `backend/src/`
- Endpoints: `backend/src/*/*.controller.ts`
- TMDb: `backend/.env`
- Base de datos: `backend/prisma/schema.prisma`

## Mejoras futuras
- Autenticacion real y usuarios
- Panel admin
- CRUD de peliculas
- Subida de imagenes
- Cache de TMDb
- Tests end-to-end

## Proximas mejoras
- Autenticacion real
- Usuarios
- Panel admin
- CRUD de peliculas
- Subida de imagenes
- Cache de TMDb
- Tests
