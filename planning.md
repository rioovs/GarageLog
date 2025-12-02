# Vehicle Management Web App – Planning

This document describes the functional and technical plan for a household vehicle management web app.

Goal: a modern, responsive web app to manage vehicles, service history, and tax reminders, with admin/user roles and Supabase-based authentication.

---

## 1. Tech Stack

### 1.1 Frontend

- **Framework:** Next.js (App Router) + React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Data fetching / server state:** TanStack Query (React Query)
- **Client/global state:** Zustand (for UI state & small global state)
- **Auth client:** Supabase JS client (for email/password + Google auth)

### 1.2 Backend

- **Runtime:** Node.js (LTS)
- **Framework:** NestJS (TypeScript)
- **ORM:** Prisma
- **Database:** Supabase Postgres (single DB used by both Supabase Auth and Prisma)
- **Auth verification:** NestJS guard that validates Supabase JWT (via JWKS / public keys)

### 1.3 Infrastructure

- **Auth + DB:** Supabase project
  - Supabase Auth for email/password + Google login
  - Supabase Postgres as the main DB
- **Frontend hosting:** (e.g., Vercel) – SSR/SSG enabled
- **Backend hosting:** Node-compatible platform (e.g., Railway/Render/Fly.io)  
  (Backend connects to Supabase Postgres via standard Postgres URL)

---

## 2. Product Overview

### 2.1 Core Use Cases

1. Household users manage their vehicles (cars/motorcycles).
2. Track service/maintenance history per vehicle.
3. Track tax due dates (annual and 5-year) with reminders.
4. Distinguish between currently owned vs sold vehicles.
5. Admin user can manage (create/edit/deactivate) other users.

### 2.2 User Roles

- **Guest**
  - Can see landing page.
  - Can access login/register pages.
- **User**
  - Full access to own data:
    - Vehicles, service records, tax entries.
  - Edit own profile.
- **Admin**
  - All User capabilities.
  - Additional:
    - Manage users (list, create, edit, deactivate).
    - (Configurable) View all vehicles/service/tax data for troubleshooting.

---

## 3. Information Architecture & Pages

### 3.1 Public Area (No Auth Required)

**Routes (Next.js):**

- `/` – Landing page  
  Sections:
  - Hero (headline + subheadline + CTA)
  - Highlight stats
  - Features
  - How it works / Selected work
  - Footer (contact, terms, privacy)
- `/login` – Login page
  - Email/password login
  - "Continue with Google" button
  - Link to Register
- `/register` – Register page
  - Email/password registration
  - Full name
  - "Continue with Google" option
- `/privacy` – Static text
- `/terms` – Static text

### 3.2 Authenticated Area (User App)

Prefix all routes with `/app`.

- `/app` – Dashboard
  - Cards:
    - Total active vehicles
    - Upcoming tax entries (within reminder window)
  - List of last N service records
  - Quick action buttons: “Add Vehicle”, “Add Service Record”
- `/app/vehicles`
  - Table or cards of user’s vehicles
  - Columns: Plate, Brand/Model, Year, Color, Status (Owned/Sold), actions
  - Filter by status (Owned/Sold)
- `/app/vehicles/new`
  - Form to create a new vehicle
- `/app/vehicles/[vehicleId]`
  - Vehicle detail layout with tabs:
    - **Overview**
      - Basic info
      - Ownership status (Owned/Sold)
    - **Service**
      - List of service records for this vehicle
      - Button: Add Service
    - **Taxes**
      - List of tax entries for this vehicle
      - Button: Add Tax entry
- `/app/vehicles/[vehicleId]/edit`
  - Form to edit vehicle data and ownership status
- `/app/vehicles/[vehicleId]/service/new`
  - Form to create new service record
- `/app/vehicles/[vehicleId]/service/[serviceId]/edit`
  - Form to edit service record
- `/app/vehicles/[vehicleId]/taxes/new`
  - Form to create new tax entry (annual or five-year)
- `/app/vehicles/[vehicleId]/taxes/[taxId]/edit`
  - Form to edit tax entry (status, paid date, etc.)
- `/app/services` (optional v1)
  - Global list of all service records (for this user)
- `/app/taxes` (optional v1)
  - Global list of all tax entries (for this user)
  - Filters: Upcoming, Overdue, Paid
- `/app/profile`
  - View/edit profile (full_name)
  - Change password (if needed, may be handled via Supabase UI)
  - Logout button

### 3.3 Admin Area (Requires role = ADMIN)

- `/app/admin/users`
  - Table of all users (joined from `auth.users` + `profiles`)
  - Columns: Name, Email, Role, Active status, Created date
  - Actions: Edit, Deactivate
- `/app/admin/users/new`
  - Form to create a new user:
    - Email, full_name, role, optional temp password or magic-link flow
- `/app/admin/users/[userId]/edit`
  - Edit user details:
    - full_name, role, active status

---

## 4. User Flows (High Level)

### 4.1 Registration & Login (Supabase)

1. Guest opens `/` and clicks “Get Started” → `/register`.
2. On `/register`:
   - Fill full_name, email, password → Supabase signUp.
   - On first login, create `profiles` row with:
     - `id = auth.users.id`
     - `full_name`
     - `role = USER` by default
3. On subsequent logins `/login`:
   - Email/password or Google.
4. Supabase returns session with `access_token`.
5. Next.js stores Supabase session (client).
6. For every call to NestJS API:
   - Include `Authorization: Bearer <supabase_access_token>`.

### 4.2 Dashboard Usage (User)

1. User logs in, is redirected to `/app`.
2. If no vehicles exist:
   - Show empty state with CTA “Add your first vehicle”.
3. When user adds vehicles, dashboard shows:
   - Active vehicle count
   - Upcoming tax entries (PENDING + due soon)
   - Latest service records

### 4.3 Vehicle Management

- User creates vehicles, updates them, or marks them as SOLD.
- SOLD vehicles stay in DB but are excluded from “active vehicles” metrics.

### 4.4 Service Management

- From vehicle detail → Service tab:
  - User adds records after each service.
- Service record shows:
  - Date, odometer, workshop, total cost, notes.
- History sorted by date desc.

### 4.5 Tax Management

- From vehicle detail → Taxes tab:
  - User adds tax entries:
    - Type: ANNUAL / FIVE_YEAR
    - Due date
    - Reminder days before
- Dashboard highlights upcoming tax entries within reminder window.
- User marks tax as PAID after payment.

### 4.6 Admin Management

- Admin logs in and navigates to `/app/admin/users`.
- Can:
  - View all users
  - Create new user
  - Edit existing user (change role, full_name, active status)
  - Deactivate user (prevent future login, but keep their data)

---

## 5. Data Model (Supabase Postgres via Prisma)

> NOTE: All timestamps are usually `timestamptz` with default `now()`.

### 5.1 `profiles`

User profile and role. One-to-one with `auth.users`.

- `id` (uuid, PK) – same as `auth.users.id`
- `full_name` (text)
- `role` (enum: `ADMIN` | `USER`, default `USER`)
- `is_active` (boolean, default `true`)
- `created_at` (timestamptz, default now)
- `updated_at` (timestamptz, default now)

### 5.2 `vehicles`

- `id` (uuid, PK)
- `user_id` (uuid, FK → `profiles.id`)
- `plate_number` (text)
- `brand` (text)
- `model` (text)
- `type` (text or enum: e.g., `CAR`, `MOTORCYCLE`, `OTHER`)
- `year` (int)
- `color` (text)
- `owner_name` (text)
- `ownership_status` (enum: `OWNED` | `SOLD`, default `OWNED`)
- `purchase_date` (date, nullable)
- `sold_date` (date, nullable)
- `created_at` (timestamptz, default now)
- `updated_at` (timestamptz, default now)

### 5.3 `service_records`

- `id` (uuid, PK)
- `vehicle_id` (uuid, FK → `vehicles.id`)
- `service_date` (date)
- `odometer` (int, nullable)
- `workshop_name` (text, nullable)
- `total_cost` (numeric, nullable)
- `notes` (text, nullable)
- `created_at` (timestamptz, default now)
- `updated_at` (timestamptz, default now)

### 5.4 `service_items` (optional but recommended)

- `id` (uuid, PK)
- `service_record_id` (uuid, FK → `service_records.id`)
- `item_type` (enum: `OIL`, `SPAREPART`, `LABOR`, `OTHER`)
- `item_name` (text)
- `quantity` (int)
- `unit_price` (numeric)
- `subtotal` (numeric)

### 5.5 `vehicle_taxes`

- `id` (uuid, PK)
- `vehicle_id` (uuid, FK → `vehicles.id`)
- `tax_type` (enum: `ANNUAL`, `FIVE_YEAR`)
- `due_date` (date)
- `reminder_days_before` (int, default `30`)
- `amount` (numeric, nullable)
- `status` (enum: `PENDING`, `PAID`, `OVERDUE`, default `PENDING`)
- `paid_date` (date, nullable)
- `created_at` (timestamptz, default now)
- `updated_at` (timestamptz, default now)

### 5.6 Relationships

- `profiles` 1 — N `vehicles`
- `vehicles` 1 — N `service_records`
- `service_records` 1 — N `service_items`
- `vehicles` 1 — N `vehicle_taxes`

---

## 6. Backend API Design (NestJS)

> Base URL assumed: `/api`.

### 6.1 Common

- All protected endpoints require `Authorization: Bearer <SupabaseJWT>`.
- NestJS auth guard:
  - Validates token against Supabase.
  - Attaches `userId` to request.
  - Role guard reads role from `profiles` table.

### 6.2 Auth / Profile

- `GET /api/me`
  - Returns current profile (`id`, `full_name`, `role`, `is_active`).

### 6.3 Vehicles

- `GET /api/vehicles`
  - List vehicles owned by current user (or all if admin and `?all=true` flag).
- `POST /api/vehicles`
  - Create vehicle for current user.
- `GET /api/vehicles/:id`
  - Get single vehicle (ownership check).
- `PUT /api/vehicles/:id`
  - Update vehicle (ownership check).
- `DELETE /api/vehicles/:id`
  - Soft delete or hard delete (TBD).

### 6.4 Service Records

- `GET /api/vehicles/:vehicleId/services`
  - List services for a vehicle (ownership check).
- `POST /api/vehicles/:vehicleId/services`
  - Create service record for vehicle.
- `GET /api/services/:id`
  - Get a single service record.
- `PUT /api/services/:id`
  - Update a service record.
- `DELETE /api/services/:id`
  - Delete a service record.

(Optionally add endpoints for `service_items`.)

### 6.5 Vehicle Taxes

- `GET /api/vehicles/:vehicleId/taxes`
  - List tax entries for a vehicle.
- `POST /api/vehicles/:vehicleId/taxes`
  - Create new tax entry.
- `GET /api/taxes/:id`
  - Get a single tax entry.
- `PUT /api/taxes/:id`
  - Update tax entry (including marking as PAID).
- `DELETE /api/taxes/:id`
  - Delete tax entry.

- `GET /api/taxes`
  - List all taxes for current user (filters by query params: `status`, `upcoming`, etc.)

### 6.6 Admin – Users

All admin endpoints require role = ADMIN.

- `GET /api/admin/users`
  - List all profiles (with email join from auth if needed).
- `POST /api/admin/users`
  - Create a new user (invite flow; may use Supabase Admin API).
- `GET /api/admin/users/:id`
  - Get user profile.
- `PUT /api/admin/users/:id`
  - Update role, full_name, is_active.
- `DELETE /api/admin/users/:id`
  - Deactivate or delete user (implementation detail).

---

## 7. Frontend Structure (Next.js + shadcn/ui)

High-level folder suggestion (in `src`):

- `app/`
  - `(marketing)/`
    - `layout.tsx` – marketing layout
    - `page.tsx` – landing page
  - `(auth)/login/page.tsx`
  - `(auth)/register/page.tsx`
  - `(app)/` – authenticated layout with sidebar/topbar
    - `layout.tsx`
    - `page.tsx` – dashboard
    - `vehicles/`
      - `page.tsx` – list
      - `new/page.tsx`
      - `[vehicleId]/page.tsx` – detail with tabs
      - `[vehicleId]/edit/page.tsx`
      - `[vehicleId]/service/new/page.tsx`
      - `[vehicleId]/service/[serviceId]/edit/page.tsx`
      - `[vehicleId]/taxes/new/page.tsx`
      - `[vehicleId]/taxes/[taxId]/edit/page.tsx`
    - `services/page.tsx` (optional)
    - `taxes/page.tsx` (optional)
    - `profile/page.tsx`
    - `admin/users/page.tsx`
    - `admin/users/new/page.tsx`
    - `admin/users/[userId]/edit/page.tsx`
- `components/`
  - `ui/` – shadcn/ui components
  - `layout/`
  - `forms/`
  - `charts/`
  - `tables/`
- `lib/`
  - `api/` – helpers to call NestJS API (using fetch/axios + TanStack Query)
  - `auth/` – Supabase client setup, auth helpers
  - `types/` – shared TS types/interfaces
- `hooks/`
  - `useAuth.ts`
  - `useVehicles.ts`
  - `useTaxes.ts`
- `store/`
  - `useSidebarStore.ts`
  - other Zustand stores if needed

---

## 8. Non-Functional Requirements

- All authenticated routes must be protected:
  - Redirect to `/login` if no Supabase session.
- Basic error handling for API calls (toasts or banners using shadcn/ui).
- Fully responsive design, following modern minimal landing page style similar to provided reference.
- Use consistent design tokens (spacing, typography, colors) via Tailwind + shadcn/ui.

---
