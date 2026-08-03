# API Integration Map

This document maps every frontend route/component to the backend endpoint(s) it consumes, per the assignment's mandatory documentation requirement.

Backend base URL: `process.env.BACKEND_API_URL` (defaults to `https://gear-up-backend-theta.vercel.app`). All authenticated calls forward the `accessToken` cookie to the backend via the `cookie` header from inside Server Actions.

---

## Public

| Frontend route / component                           | Server action                                               | Backend endpoint                                                                                         |
| ---------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `/` (home, featured gear) & `/gears` (browse/filter) | `getGearList` — `app/(publicGroup)/_actions/getAllGears.ts` | `GET /api/gear` (query: `searchTerm`, `brand`, `categoryId`, `maxPrice`, `isAvailable`, `page`, `limit`) |
| `/gears` — category filter                           | `getCategoryList` — `_actions/getAllCategory.ts`            | `GET /api/category`                                                                                      |
| `/gears` — brand filter                              | `getAllBrands` — `_actions/getAllBrands.ts`                 | `GET /api/admin/gear` (derives the distinct brand list)                                                  |
| `/gears/[id]` (gear details & rent CTA)              | `getGearDetails` — `_actions/getGearDetails.ts`             | `GET /api/gear/:id`                                                                                      |
| `/gears/[id]` — "Rent Now" form                      | `createOrder` — `_actions/createOrder.ts`                   | `POST /api/rentals`                                                                                      |
| `/payment` (Stripe return page)                      | Reads `?success=` query param set by Stripe redirect        | — (UI-only; backend confirms via `POST /api/payments/webhook`)                                           |

## Auth

| Frontend route / component                   | Server action                                              | Backend endpoint                                                                  |
| -------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `/login` — `LoginForm.tsx`                   | `loginAction` — `app/(authGroup)/_actions/authActions.tsx` | `POST /api/auth/login`                                                            |
| `/register` — `RegisterForm.tsx`             | `registerAction` — `_actions/authActions.tsx`              | `POST /api/users/register`, then `POST /api/auth/login` (auto-login after signup) |
| `proxy.ts` middleware — silent token refresh | `getNewAccessToken` — `service/refreshToken.ts`            | `POST /api/auth/refresh-token`                                                    |
| Any authenticated Server Component/action    | `getUser` — `service/getUser.ts`                           | `GET /api/users/me`                                                               |

## Customer dashboard (`/dashboard/customer`)

| Frontend component                                       | Server action                                                   | Backend endpoint                |
| -------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------- |
| Order history table                                      | `getCustomerOrderList` — `_actions/customerDashboardActions.ts` | `GET /api/rentals`              |
| `CheckOutModal.tsx` (pay for an order → Stripe redirect) | `createPayment`                                                 | `POST /api/payments/create`     |
| Order detail — "Mark Returned" action                    | `returnGear`                                                    | `PATCH /api/rentals/return/:id` |
| Review form (post-return)                                | `createReview`                                                  | `POST /api/reviews`             |
| `PaymentHistoryTable.tsx`                                | `getCustomerPaymentHistory`                                     | `GET /api/payments`             |

## Provider dashboard (`/dashboard/provider`)

| Frontend component                                          | Server action                                                   | Backend endpoint                   |
| ----------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------- |
| Orders table (full history)                                 | `getProviderOrderList` — `_actions/providerDashboardActions.ts` | `GET /api/provider/orders`         |
| Incoming orders table                                       | `getProviderIncomingOrders`                                     | `GET /api/provider/incomingOrders` |
| "Add Gear" form                                             | `addGearItem`                                                   | `POST /api/provider/gear`          |
| "Edit Gear" form                                            | `updateGearItem`                                                | `PUT /api/provider/gear/:id`       |
| Inventory list (provider's own gear)                        | `providerGearItems`                                             | `GET /api/gear?providerId=:id`     |
| Inventory — delete gear action                              | `deleteGearItem`                                                | `DELETE /api/provider/gear/:id`    |
| Order row — status action buttons (Confirm / Picked Up / …) | `updateOrderStatus`                                             | `PATCH /api/provider/orders/:id`   |
| Low-stock widget                                            | `getLowStockGears`                                              | `GET /api/provider/stock`          |

## Admin dashboard (`/dashboard/admin`)

| Frontend component                 | Server action                                      | Backend endpoint             |
| ---------------------------------- | -------------------------------------------------- | ---------------------------- |
| User management table              | `getAllUsers` — `_actions/AdminDashboardAction.ts` | `GET /api/admin/users`       |
| User row — Suspend/Activate action | `updateUserStatus`                                 | `PATCH /api/admin/users/:id` |
| Platform gear listing view         | `getAllGears`                                      | `GET /api/admin/gear`        |
| Platform rentals view              | `getAllRentalOrders`                               | `GET /api/admin/rentals`     |
| Category create form               | `createCategory`                                   | `POST /api/category/create`  |
| Category edit form                 | `updateCategory`                                   | `PUT /api/category/:id`      |

## Payments (Stripe)

| Step                                            | Frontend                                                                                                                             | Backend endpoint                                            |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| 1. Customer clicks "Pay" in `CheckOutModal.tsx` | `createPayment(rentalOrderId)`                                                                                                       | `POST /api/payments/create` → returns a Stripe Checkout URL |
| 2. Browser redirected to Stripe-hosted checkout | —                                                                                                                                    | Stripe                                                      |
| 3. Stripe redirects back                        | `/payment?success=true` or `/payment?success=false` renders the outcome UI                                                           | —                                                           |
| 4. Payment confirmed server-side                | —                                                                                                                                    | `POST /api/payments/webhook` (Stripe → backend)             |
| 5. UI reflects the new status                   | Cache tags `customer-order` / `payment-history` are revalidated (`updateTag`) so the dashboard shows `PAID` without a manual refresh | `GET /api/rentals`, `GET /api/payments`                     |

---

## Error handling pattern

Every server action returns the backend's `{ success, message, data? }` shape (or a normalized `{ success: false, message }` on network/validation failure). Consuming components:

- Show **toast notifications** (Sonner) for action-triggered errors (create/update/delete, payment, auth).
- Show **inline field errors** on `LoginForm`, `RegisterForm`, gear forms, and the review form (Zod + React Hook Form validation, plus the first backend validation message when `success: false`).
- Fall back to route-level **`error.tsx`** for unexpected/render-time errors and **`not-found.tsx`** for missing resources or unauthorized dashboard access (via `proxy.ts` redirect).
