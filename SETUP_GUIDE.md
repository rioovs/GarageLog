# GarageLog - Setup Guide

## Project Structure

The project has been migrated to a monorepo structure:

```
GarageLog/
├── backend/          # NestJS API server
│   ├── prisma/       # Database schema
│   ├── src/          # Backend source code
│   └── .env          # Backend environment variables
├── frontend/         # Next.js web application
│   ├── src/          # Frontend source code
│   │   ├── app/      # Next.js App Router pages
│   │   ├── components/   # React components (UI migrated)
│   │   └── lib/      # Utilities and types
│   └── .env.local    # Frontend environment variables
└── [old files]       # Original Vite app files (to be cleaned up)
```

## What's Been Completed

### ✅ Backend Setup
- NestJS project initialized
- Prisma ORM configured with complete schema:
  - `profiles` table
  - `vehicles` table
  - `service_records` table
  - `service_items` table
  - `vehicle_taxes` table
- Dependencies installed:
  - @prisma/client, @supabase/supabase-js
  - @nestjs/passport, passport-jwt
  - class-validator, class-transformer

### ✅ Frontend Setup
- Next.js 16 with App Router
- TypeScript + Tailwind CSS
- Dependencies installed:
  - @supabase/supabase-js, @supabase/auth-helpers-nextjs
  - @tanstack/react-query, zustand
  - lucide-react, recharts

### ✅ Component Migration
- All UI components migrated to `frontend/src/components/ui/`
  - Button, Card, Badge, Input, Label, Select, Dialog
  - Utility function `cn()` for className merging
- Type definitions migrated to `frontend/src/lib/types.ts`

## What's Remaining

### 🔲 Supabase Configuration
1. Create project at https://supabase.com
2. Get project URL and keys from settings
3. Configure environment variables in:
   - `backend/.env`
   - `frontend/.env.local`

### 🔲 Database Setup
1. Update `backend/.env` with Supabase DATABASE_URL
2. Run migrations: `cd backend && npx prisma migrate dev --name init`
3. Generate Prisma client: `npx prisma generate`
4. Optional: Seed database with sample data

### 🔲 Backend Implementation
Need to create NestJS modules:
- **Auth Module**: JWT validation guard, Supabase integration
- **Profiles Module**: GET /api/me
- **Vehicles Module**: Full CRUD endpoints
- **Services Module**: Full CRUD endpoints  
- **Taxes Module**: Full CRUD endpoints
- **Admin Module**: User management endpoints (admin only)

### 🔲 Frontend Implementation
Need to create/migrate pages:
- **Auth Pages**: Login, Register (with Supabase auth)
- **Landing Page**: Migrate from `pages/LandingPage.tsx`
- **Dashboard**: Migrate from `pages/Dashboard.tsx` with API integration
- **Vehicles Pages**: List, detail, create, edit
- **Services Pages**: List, create, edit
- **Taxes Pages**: List, create, edit
- **Admin Pages**: User management
- **Layout**: Adapt `components/Layout.tsx` to Next.js

### 🔲 Cleanup  
- Remove old Vite files (index.html, index.tsx, App.tsx, vite.config.ts)
- Update root README.md

## Quick Start Commands

### Backend
```powershell
cd backend

# Setup environment
cp .env.example .env
# Edit .env with your Supabase credentials

# Run migrations
npx prisma migrate dev --name init
npx prisma generate

# Start development server
npm run start:dev
```

### Frontend
```powershell
cd frontend

# Setup environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

## Next Steps

1. **Set up Supabase**:
   - Create a project at https://supabase.com
   - Copy the project URL and anon key
   - Get the JWT secret from Project Settings > API
   - Get the DATABASE_URL from Project Settings > Database

2. **Configure Environment Variables**:
   - Update `backend/.env` with DATABASE_URL, SUPABASE_URL, SUPABASE_JWT_SECRET
   - Update `frontend/.env.local` with NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY

3. **Run Database Migrations**:
   ```
   cd backend
   npx prisma migrate dev --name init
   ```

4. **Implement Authentication**:
   - Backend: Create auth guard for JWT validation
   - Frontend: Create Supabase client and auth context

### 🔐 Authentication Configuration

#### Enable Google Login
1. Go to your Supabase Dashboard > **Authentication** > **Providers**.
2. Click on **Google**.
3. Toggle **Enable Sign in with Google**.
4. Enter your **Client ID** and **Client Secret** (obtained from Google Cloud Console).
5. Copy the **Callback URL** from Supabase and add it to your Google Cloud Console > APIs & Services > Credentials > OAuth 2.0 Client IDs > Authorized redirect URIs.
6. Click **Save**.

#### Disable Email Verification (Optional)
To allow users to log in immediately after registration without verifying their email:
1. Go to your Supabase Dashboard > **Authentication** > **Providers**.
2. Click on **Email**.
3. Toggle **OFF** "Confirm email".
4. Click **Save**.

5. **Implement API Endpoints**:
   - Create NestJS controllers and services for each module

6. **Migrate Pages**:
   - Convert existing pages to Next.js App Router structure
   - Connect to backend API using TanStack Query

## Estimated Remaining Time

- **Backend API Implementation**: 3-4 hours
- **Frontend Pages Migration**: 2-3 hours
- **Authentication Setup**: 1-2 hours
- **Testing & Debugging**: 1-2 hours
- **Total**: 7-11 hours

## Architecture Overview

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTP
┌──────▼────────────────────────┐
│   Next.js Frontend (3000)     │
│  - Server Components          │
│  - Client Components          │
│  - Supabase Auth Client       │
└──────┬────────────────────────┘
       │ REST API + Supabase Auth
┌──────▼────────────────────────┐
│   NestJS Backend (3001)       │
│  - Auth Guard (JWT)           │
│  - REST Controllers           │
│  - Prisma ORM                 │
└──────┬────────────────────────┘
       │ PostgreSQL Protocol
┌──────▼────────────────────────┐
│   Supabase Postgres           │
│  - Auth Tables (auth.users)   │
│  - App Tables (public schema) │
└───────────────────────────────┘
```

## References

- Planning document: `planning.md`
- Prisma schema: `backend/prisma/schema.prisma`
- UI components: `frontend/src/components/ui/index.tsx`
- Type definitions: `frontend/src/lib/types.ts`
