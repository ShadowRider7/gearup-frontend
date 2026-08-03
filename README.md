# GearUp 🏋️ — Frontend

**Rent Sports & Outdoor Gear Instantly**

GearUp is a modern, responsive Next.js (App Router) frontend for a sports and outdoor equipment rental platform. Customers browse gear, book rental dates, and pay securely via Stripe. Providers manage their gear inventory and fulfill incoming orders. Admins moderate users, gear, and rentals across the platform.

This is the **frontend-only** application. It consumes the [GearUp backend REST API](https://github.com/ShadowRider7/gearUp-backend).

- **Live App:** _add your Vercel URL here_
- **Backend API:** https://gear-up-backend-theta.vercel.app
- **Backend Repo:** https://github.com/ShadowRider7/gearUp-backend
- **API ↔ UI mapping:** see [`API_INTEGRATION.md`](./API_INTEGRATION.md)

---

## 🛠️ Tech Stack

| Category           | Technology                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------------- |
| Framework          | Next.js 16 (App Router, Server + Client Components)                                          |
| Language           | TypeScript                                                                                   |
| Styling            | Tailwind CSS v4, shadcn/ui (Radix primitives)                                                |
| Data fetching      | Next.js Server Actions + `fetch` (cache tags/revalidation), TanStack Query                   |
| Global/local state | Zustand, React `useActionState` / `useState`                                                 |
| Forms & validation | React Hook Form + Zod                                                                        |
| Auth               | Custom JWT (access + refresh tokens) in HTTP-only cookies, verified in `proxy.ts` middleware |
| Payments           | Stripe Checkout (`@stripe/stripe-js`, `@stripe/react-stripe-js`)                             |
| Notifications      | Sonner (toasts)                                                                              |
| Icons              | lucide-react, react-icons                                                                    |
| Package manager    | pnpm                                                                                         |

---

## 👥 Roles & Permissions

Users choose a role (`CUSTOMER`, `PROVIDER`, or `ADMIN`) at registration. The UI, navigation, and available actions all adapt to the authenticated user's role, and every `/dashboard/*` route is protected by `proxy.ts` (Next.js Middleware) which decodes the JWT and redirects unauthorized users.

| Role         | What they can do in the UI                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Customer** | Browse/filter gear, view gear details, place rental orders, pay via Stripe, track order status, mark gear returned, leave reviews, view payment history |
| **Provider** | Dashboard overview, add/edit/delete gear (with image URLs, pricing, stock), view incoming & all orders, update order status, view low-stock items       |
| **Admin**    | Dashboard overview, manage users (suspend/activate), view all gear & rentals platform-wide, create/update gear categories                               |

---

## ✨ Features

### Public

- Responsive gear grid with search, filter (category, brand, max price, availability) and pagination
- Gear details page with specs, provider info, and a "Rent Now" flow (date range + quantity)
- Skeleton loaders (`loading.tsx`) and graceful error fallbacks (`error.tsx`, `not-found.tsx`)

### Customer

- Register / login with client + server-side validation errors
- Checkout modal → Stripe Checkout redirect → `/payment` success/cancel pages with clear UI feedback
- Order history with status badges, payment history table
- Mark rented gear as returned, then leave a rating + comment review

### Provider

- Dashboard overview (listed gear, active rentals, pending orders)
- Gear CRUD forms (create/update/delete, image URLs, pricing, stock)
- Incoming order table with one-click status updates (Confirm → Picked Up → …)
- Low-stock report

### Admin

- Platform overview stats
- User management table with Suspend/Activate actions
- Global view of all gear listings and rental orders
- Category creation & editing

### Cross-cutting

- Role-based route protection via `proxy.ts` middleware (JWT decode + automatic access-token refresh using the refresh-token cookie)
- Consistent error handling: toast notifications for API errors, inline field errors on forms, and route-level `error.tsx` / `not-found.tsx` boundaries
- Optimistic-feeling updates via Next.js cache tags (`revalidateTag` / `updateTag`) instead of full page reloads

---

## 📊 Rental Order Status (UI badges)

```
PLACED → CONFIRMED → PAYMENT_INITIATED → PAID → PICKED_UP → RETURNED
                                                        (or CANCELLED)
```

| Status    | Badge  | Who sees the next action       |
| --------- | ------ | ------------------------------ |
| PLACED    | Yellow | Provider sees "Confirm"        |
| CONFIRMED | Blue   | Customer sees "Pay Now"        |
| PAID      | Purple | Provider sees "Mark Picked Up" |
| PICKED_UP | Green  | Customer has the gear          |
| RETURNED  | Gray   | Customer sees "Leave Review"   |
| CANCELLED | Red    | —                              |

---

## 📁 Project Structure

```
app/
  (publicGroup)/        # Home, gear browse/detail, payment success/cancel pages
    _actions/            # Server actions calling the public backend endpoints
    _components/
  (authGroup)/           # Login & register pages
    _actions/
    _components/
  (dashboardGroup)/      # Role-based dashboards
    dashboard/
      customer/
      provider/
      admin/
    _actions/            # Server actions for customer / provider / admin flows
    _components/
  error.tsx               # Global error boundary
  loading.tsx              # Global loading skeleton
  not-found.tsx             # 404 page
components/
  ui/                       # shadcn/ui primitives
  shared/                   # Shared layout pieces (navbar, footer, etc.)
service/
  getUser.ts                 # Fetch current user profile
  refreshToken.ts             # Access-token existence check + silent refresh
  logout.ts
  calcDays.ts
utils/
  jwt.ts                       # JWT verification helpers used by the middleware
proxy.ts                        # Next.js Middleware — auth guard & role-based redirects
lib/
  type.ts                        # Shared TypeScript types
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root (see `.env.example`):

```env
# Server-only — used inside Server Actions / Server Components
BACKEND_API_URL=https://gear-up-backend-theta.vercel.app/
JWT_ACCESS_SECRET=access-secret
JWT_REFRESH_SECRET=refresh-secret

# Exposed to the client as well
NEXT_PUBLIC_BACKEND_API_URL=https://gear-up-backend-theta.vercel.app/
```

> The `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` values must match the secrets configured on the backend, since `proxy.ts` verifies the JWTs locally before ever hitting the API.

---

## 🚀 Getting Started

```bash
# install dependencies
pnpm install

# copy env file and fill in the values
cp .env.example .env.local

# run the dev server
pnpm dev

# production build
pnpm build
pnpm start

# lint
pnpm lint
```

Open [http://localhost:3000](http://localhost:3000).

> The backend must be reachable at the `BACKEND_API_URL` you configure — either the deployed instance above or your own local instance of [gearUp-backend](https://github.com/ShadowRider7/gearUp-backend).

---

## 🔐 Test / Admin Credentials

For grading/demo purposes, use:

```
Admin Email    : admin@rentnest.com
Admin Password : admin123
```

> Replace the placeholders above with a real admin account created on the deployed backend before submitting.

---

## 💳 Payment Flow

1. Customer places a rental order (`POST /api/rentals`) from the gear details page.
2. From the customer dashboard, the checkout modal calls `createPayment` (`POST /api/payments/create`), which returns a Stripe-hosted checkout URL.
3. The browser is redirected to Stripe Checkout.
4. On completion, Stripe redirects back to `/payment?success=true` or `/payment?success=false`, which render a clear success/cancel UI and route the user back to their dashboard.
5. Stripe's webhook (handled by the backend) confirms the payment and updates the order status to `PAID`, which the UI reflects via cache-tag revalidation.

---

## 📮 Related

- Backend README & API reference: [gearUp-backend](https://github.com/ShadowRider7/gearUp-backend)
- Frontend ↔ backend endpoint mapping: [`API_INTEGRATION.md`](./API_INTEGRATION.md)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.
