# Vehicle Management App – Frontend Planning (NEW)

> NOTE: This plan REPLACES any previous frontend plan.  
> Use this document as the single source of truth for the UI implementation.

## 1. Goals

- Build a **beautiful, modern, high-conversion landing page** and a **clean admin interface** for the Vehicle Management App.
- The visual style, layout, and section composition should closely follow the provided reference landing page:
  - Large, bold typography
  - Clean white background with subtle gradients
  - Split hero section with screenshot mockup
  - Statistics block, logo strip, testimonials, etc.

We are **not** copying brand-specific assets (logos/text), but matching:
- overall layout
- section order
- spacing, typography scale
- card styles and visual hierarchy.

---

## 2. Tech Stack (Frontend)

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Library:** shadcn/ui
- **State Management:**
  - TanStack Query (server data)
  - Zustand (light client state)
- **Auth Client:** Supabase JS client
- **Icon Library:** Lucide icons or similar

Backend & DB remain as previously defined:
- NestJS + Prisma, connected to Supabase Postgres.
- Supabase Auth for email/password + Google login.

---

## 3. Global Design Requirements

1. **Typography**
   - Large hero headline (like the reference).
   - Clear hierarchy: `h1`, `h2`, `h3`, body, caption.
   - Use a clean sans-serif font (e.g., Inter, SF, etc.).

2. **Color & Background**
   - Main background: **white/light gray**.
   - Use subtle gradients and soft shadows for hero and cards.
   - Accent color for CTAs (e.g., deep blue or purple).

3. **Layout**
   - Max content width around `1200–1280px`.
   - Plenty of white space.
   - Alignments similar to the reference page:
     - Top navigation bar
     - Hero with left text + right visual
     - Sections stacked vertically with clear separation.

4. **Responsiveness**
   - Mobile-first.
   - On small screens, hero becomes vertical:
     - Text first, then visual.
   - Navigation collapses into a simple menu button on mobile.

5. **Components**
   - Use shadcn/ui primitives (Button, Card, Badge, Input, Tabs, Sheet, Dialog, etc.).
   - Encapsulate sections into reusable components where possible.

---

## 4. Pages & Sections

### 4.1 Public Landing Page (`/`)

The landing page should visually mirror the reference layout.

**Top Navigation**
- Left: App logo (simple icon + wordmark).
- Center/right menu items:
  - Product
  - Features
  - Pricing (placeholder)
  - Contact
- Right side:
  - "Sign Up" (primary)
  - "Login" (secondary or text button)

**Hero Section**
- Similar composition to the reference:
  - Left:
    - Small label / eyebrow text (e.g., “Vehicle Management Made Simple”).
    - Large H1 text (2–3 lines).
    - Short paragraph description.
    - Primary CTA button: “Get Started — It’s FREE”.
    - Secondary CTA link: “View Dashboard”.
  - Right:
    - Card-like mockup of the app:
      - A screenshot or a designed fake UI of the vehicle dashboard.
      - Use subtle shadow and border radius.
- Background:
  - Light gradient or illustrative background similar to the reference (fields/blurred image concept can be replaced by a soft abstract gradient).

**Section: Secondary Feature Highlight (Right Column Card / AI Block)**
- Right column style card (similar to the AI block in the reference):
  - Icon / abstract shape at the top.
  - Title (e.g. “Smarter reminders that keep you on track.”).
  - 2–3 bullet cards inside describing:
    - Automatic tax reminders
    - Service history overview
    - Vehicle ownership tracking

**Section: "Organize / Collaborate" Equivalent**
- Large centered H2 (two-line text).
- Description below explaining how the app organizes all your vehicle data.
- Underneath, a **logo strip** style area (grayscale logos or placeholders) showing “Trusted by…” (can use placeholder names).

**Section: “By the Numbers”**
- Large stats block similar to the reference:
  - Example:
    - Total service records tracked
    - Minutes of reminders saved
    - Vehicles managed
- Single big number + short caption.

**Section: Testimonials**
- 2–3 cards horizontally (stack vertically on mobile):
  - User avatar (placeholder)
  - Name, role
  - Short testimonial text on how the app helped.

**Bottom CTA Section**
- Simple call-to-action:
  - Text: “Ready to never miss a tax payment again?”
  - Button: “Get Started in 2 Minutes”.

**Footer**
- Left: Logo & short description.
- Middle/right columns:
  - Product links
  - Company links
  - Support links
- Sub-footer with © and language link.

---

### 4.2 Auth Pages (`/login`, `/register`)

- Clean, minimal layout.
- Centered card using shadcn/ui’s `Card` with:
  - Logo on top
  - Title (“Login”, “Create your account”)
  - Email/password inputs
  - Primary button
  - Divider text: “or continue with”
  - Google sign-in button (styled like reference CTAs)
- Small text at bottom:
  - “Don’t have an account? Sign up” or “Already have an account? Log in”.

---

### 4.3 Admin / App Shell (Authenticated Area under `/app`)

We want the **admin/app UI** to feel consistent with the landing page: clean, white, and modern.

**Layout**
- Top bar:
  - Left: Compact logo + app name.
  - Center/Right: user menu (avatar or initials), current user name, simple dropdown for logout.
- Left sidebar:
  - Navigation items:
    - Dashboard
    - Vehicles
    - Taxes
    - Services (optional)
    - Admin → Users (only for admins)
  - Use icons + labels (Lucide icons).

**Dashboard (`/app`)**
- Top: greeting + short description.
- Cards:
  - Active vehicles count
  - Upcoming tax items
  - Recent service entries
- Main content:
  - Table or list of “Upcoming Tax” (like stat block from landing page).
  - Simple graphs (placeholder) can be added later.

**Vehicles List (`/app/vehicles`)**
- Table in a Card:
  - Columns: Plate, Brand/Model, Year, Status, Last service, Actions.
- “Add Vehicle” button on top-right.

**Vehicle Detail (`/app/vehicles/[id]`)**
- Header:
  - Vehicle name / plate
  - Status badge (Owned/Sold)
  - Edit button
- Tabs (shadcn Tabs):
  - Overview
  - Service
  - Taxes
- Service tab:
  - List of service records; button “Add service”.
- Taxes tab:
  - List of tax entries; button “Add tax”.

**Admin Users (`/app/admin/users`)**
- Table:
  - Name, Email, Role, Active status, CreatedAt, Action.
- “Add User” button.
- Edit user page with a simple form card.

---

## 5. Component Breakdown (shadcn/ui + Custom)

**Global Components**
- `MainNav` – top navigation for landing page.
- `AppShell` – protected shell for `/app` (sidebar + topbar).
- `Logo` – shared logo component.
- `Section` – wrapper with consistent padding/max-width.

**Landing Specific Components**
- `HeroSection`
- `FeatureGrid`
- `StatsSection`
- `LogoStrip`
- `TestimonialsSection`
- `BottomCtaSection`
- `Footer`

**Admin Components**
- `SidebarNav`
- `TopbarUserMenu`
- `DashboardStatsCards`
- `VehicleTable`
- `TaxTable`
- `UserTable`

---

## 6. Implementation Notes

- Use Tailwind and shadcn/ui to closely mirror spacing and card styles from the reference:
  - Soft shadows, rounded corners, border, and subtle background.
- Use Next.js App Router:
  - `(marketing)` segment for public pages.
  - `(auth)` segment for login/register.
  - `(app)` segment for authenticated area.
- Use responsive design tested at:
  - `375px` (mobile)
  - `768px` (tablet)
  - `1024px+` (desktop).
- All previous “old” frontend layouts/components should be **discarded**. Only follow this new plan.

