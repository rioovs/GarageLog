# GarageLog

A modern household vehicle management web application built with Next.js, NestJS, and Supabase.

## Overview

GarageLog helps you manage your vehicles, track service history, and monitor tax/renewal reminders all in one place. Built with modern web technologies and featuring role-based access control for household management.

## Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components built with Radix-like patterns
- **State Management**: Zustand + TanStack Query (React Query)
- **Auth**: Supabase Auth (Email/Password + Google OAuth)
- **Icons**: Lucide React

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: Supabase Postgres
- **Authentication**: JWT validation with Supabase
- **Validation**: class-validator, class-transformer

## Project Structure

```
GarageLog/
├── backend/              # NestJS API server
│   ├── prisma/           # Database schema and migrations
│   ├── src/              # Backend source code
│   │   ├── auth/         # Authentication module
│   │   ├── vehicles/     # Vehicles module
│   │   ├── services/     # Service records module
│   │   ├── taxes/        # Tax entries module
│   │   └── admin/        # Admin module
│   ├── .env              # Environment variables
│   └── package.json
├── frontend/             # Next.js web application
│   ├── src/
│   │   ├── app/          # Next.js App Router pages
│   │   │   ├── (marketing)/  # Public pages (landing)
│   │   │   ├── (auth)/       # Login/Register pages
│   │   │   └── (app)/        # Protected app pages
│   │   ├── components/   # React components
│   │   │   └── ui/       # Reusable UI components
│   │   └── lib/          # Utilities, types, API clients
│   ├── .env.local        # Frontend environment variables
│   └── package.json
├── planning.md           # Detailed project planning document
└── SETUP_GUIDE.md        # Setup and development guide
```

## Features

- 🚗 **Vehicle Management**: Track multiple vehicles (cars, motorcycles) with ownership status
- 🔧 **Service History**: Record maintenance, repairs, and service costs
- 📅 **Tax Reminders**: Track annual and 5-year tax renewals with automated reminders
- 👥 **User Roles**: Admin and user roles with different permissions
- 🔐 **Authentication**: Secure login with Supabase (Email/Password + Google OAuth)
- 📊 **Dashboard**: Overview of vehicles, upcoming taxes, and recent services
- 📱 **Responsive**: Mobile-friendly design with Tailwind CSS

## Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- Supabase account (free tier available)

### 1. Clone and Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Setup Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Get your credentials from Project Settings:
   - **API** tab: Project URL, anon key, JWT secret
   - **Database** tab: Connection string (DATABASE_URL)

### 3. Configure Environment Variables

**Backend** (`backend/.env`):
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]/postgres?schema=public"
SUPABASE_URL="https://[PROJECT_ID].supabase.co"
SUPABASE_JWT_SECRET="your-jwt-secret"
PORT=3001
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 4. Setup Database

```bash
cd backend

# Run migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# (Optional) Seed with sample data
npx prisma db seed
```

### 5. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
# Runs on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

Visit `http://localhost:3000` to see the application.

## Development Status

### ✅ Completed
- Project structure setup (monorepo with backend/frontend)
- Database schema design with Prisma
- UI component library (Button, Card, Dialog, etc.)
- Type definitions migrated
- Old Vite app files cleaned up

### 🚧 In Progress / TODO
- [ ] Backend API implementation (auth, vehicles, services, taxes)
- [ ] Supabase authentication integration
- [ ] Frontend pages migration
- [ ] Dashboard with real data
- [ ] Admin user management
- [ ] Testing and deployment

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions and [planning.md](./planning.md) for the complete project specification.

## Database Schema

The application uses the following main tables:

- **profiles**: User profiles linked to Supabase auth
- **vehicles**: Vehicle information with ownership status
- **service_records**: Maintenance and service history
- **service_items**: Individual items/parts for each service
- **vehicle_taxes**: Tax entries with reminders

See `backend/prisma/schema.prisma` for the complete schema.

## API Endpoints (Planned)

- `GET /api/me` - Current user profile
- `GET|POST /api/vehicles` - List/create vehicles
- `GET|PUT|DELETE /api/vehicles/:id` - Vehicle operations
- `GET|POST /api/vehicles/:id/services` - Service records
- `GET|POST /api/vehicles/:id/taxes` - Tax entries
- `GET /api/admin/users` - User management (admin only)

## Contributing

This is a personal/household project. If you'd like to use it, feel free to fork and customize for your needs.

## License

MIT License - See LICENSE file for details

## Documentation

- [Planning Document](./planning.md) - Complete project specification
- [Setup Guide](./SETUP_GUIDE.md) - Detailed setup and development guide
- [Prisma Schema](./backend/prisma/schema.prisma) - Database schema
