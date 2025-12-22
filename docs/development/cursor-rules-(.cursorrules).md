```markdown
# Project: lawyers
# Document Type: Cursor Rules (.cursorrules)
# Category: Development

This document serves as the central source of truth for the "lawyers" website project. It provides essential context, coding standards, and architectural guidelines for AI-assisted development within the Cursor IDE. All AI-generated code and contributions must strictly adhere to these rules.

## 1. Project Overview & Goals

The project is to build a professional website for Kalanidhi Sanjeeva Kumar, a High Court advocate in Hyderabad, India, with 20 years of experience.

-   **Client:** Kalanidhi Sanjeeva Kumar
-   **Contact:** +91 9440217782
-   **Specializations:** Ancestral properties, divorce, property litigations, civil, and criminal matters.
-   **Target Audience:** Non-Resident Indians (NRIs) living abroad who require legal services in India.

### Business Objectives:
1.  **Lead Generation:** Generate qualified leads from NRIs.
2.  **Direct Booking & Payment:** Enable clients to book and pay for initial consultations online.
3.  **Establish Authority:** Serve as a professional online brochure showcasing 20 years of expertise and building trust.

## 2. Target Audience & User Journey

The primary user is an NRI, likely unfamiliar with the Indian legal landscape and operating in a different time zone. The user journey must be seamless, efficient, and build trust at every step.

**Ideal User Journey:**
1.  **Discovery:** User lands on the homepage, which clearly communicates the services offered and the expertise of Kalanidhi Sanjeeva Kumar.
2.  **Exploration:** User navigates to view services, case studies, and blog articles relevant to NRI legal issues.
3.  **Scheduling:** User accesses the booking system, selects their own time zone, and sees available slots in their local time.
4.  **Booking:** User selects a consultation type (30-min audio call or document review), fills out a brief intake form, and proceeds to payment.
5.  **Confirmation:** After successful payment, the user receives an automated confirmation email with the appointment details, a WhatsApp contact for the audio call, and instructions for secure document submission.

## 3. Core Features & Priorities

-   **(High) Booking System:**
    -   Allows users to select their local time zone.
    -   Integrates in real-time with a Google Calendar to show availability.
    -   Offers two paid consultation types: "30-Minute Audio Call (WhatsApp)" and "Document Review Service".
-   **(High) Payment Gateway Integration:**
    -   Primary: **Razorpay** for handling Indian and international currencies.
    -   Secondary: **PayPal** as an alternative option for international clients.
-   **(High) Secure Document Submission:**
    -   A secure, encrypted portal or feature for clients to upload initial documents post-booking.
-   **(Medium) Case Studies & Testimonials:**
    -   A dedicated section to feature success stories and testimonials, specifically from past NRI clients.
-   **(Medium) Blog & Articles:**
    -   A content section for articles and blog posts on common legal issues faced by NRIs to establish authority and improve SEO.

## 4. Technical Stack & Architecture

-   **Frontend:** Next.js (App Router) with TypeScript
-   **Styling:** Tailwind CSS
-   **Backend:** Node.js with Express.js (or Next.js API Routes where appropriate)
-   **Database:** PostgreSQL
-   **ORM:** Prisma
-   **Deployment:** Vercel

## 5. Design System & UI/UX Guidelines

The website's aesthetic should balance traditional authority with modern efficiency. The design must be clean, professional, and trustworthy.

-   **Design Mood:** Professional, Modern, Approachable, Trustworthy, Efficient.
-   **Inspiration:** LegalZoom (for clarity), Apple (for minimalist professionalism).
-   **Layout:** Landing page style on Home, with clear top navigation.
-   **Responsiveness:** The site must be fully responsive and optimized for desktop, tablet, and mobile devices.
-   **Dark Mode:** The UI must support a dark mode theme.

### Color Palette:

-   **Primary:** `#1B4F72` (Deep Blue) - Used for headers, footers, primary buttons.
-   **Secondary:** `#2980B9` (Sky Blue) - Used for links, secondary buttons, highlights.
-   **Accent:** `#F39C12` (Amber) - Used for calls-to-action (CTAs), key highlights, and accent elements.
-   **Background:** `#F9F9F9` (Light Gray) / `#121212` (Dark Mode)
-   **Text:** `#2C3E50` (Dark Gray) / `#E0E0E0` (Light Gray for Dark Mode)

### Typography:
-   **Headings:** A modern, clean sans-serif font (e.g., 'Inter' or 'Poppins').
-   **Body Text:** A highly readable sans-serif font (e.g., 'Inter' or 'Lato').

## 6. Development Workflow & Standards

-   **AI Interaction:** When generating code, always refer to this document for context. Prefix prompts with the relevant section number (e.g., "Using the Data Models in section 8, create the booking API endpoint...").
-   **Changelog:** All significant AI-generated changes (new components, API routes, schema modifications) must be briefly logged in `changelog.md` with a link to the relevant commit.
-   **Code Quality:**
    -   Code must be clean, well-commented, and self-documenting where possible.
    -   Strictly follow TypeScript types. Avoid `any` unless absolutely necessary and justified.
    -   All environment variables must be managed in a `.env.local` file (which is in `.gitignore`) and documented in `.env.example`.
-   **Error Handling:** Implement robust error handling on both the client and server sides. API responses should use standard HTTP status codes.

## 7. Data Models & Database Schema (Prisma)

Use the following Prisma schema as the foundation for the database.

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  bookings  Booking[]
}

model Booking {
  id                 String            @id @default(cuid())
  startTime          DateTime
  endTime            DateTime
  timeZone           String // e.g., "America/New_York"
  status             BookingStatus     @default(PENDING)
  notes              String?
  paymentId          String?           @unique
  paymentStatus      PaymentStatus     @default(UNPAID)
  createdAt          DateTime          @default(now())
  updatedAt          DateTime          @updatedAt
  user               User              @relation(fields: [userId], references: [id])
  userId             String
  consultationType   ConsultationType  @relation(fields: [consultationTypeId], references: [id])
  consultationTypeId String
}

model ConsultationType {
  id          String    @id @default(cuid())
  name        String // e.g., "30-Minute Audio Call", "Document Review Service"
  description String
  duration    Int // in minutes
  price       Float // in INR
  bookings    Booking[]
}

model Testimonial {
  id        String   @id @default(cuid())
  clientName String
  location  String // e.g., "USA", "UK"
  content   String   @db.Text
  isFeatured Boolean @default(false)
  createdAt DateTime @default(now())
}

model BlogPost {
  id        String    @id @default(cuid())
  title     String
  slug      String    @unique
  content   String    @db.Text
  imageUrl  String?
  isPublished Boolean @default(false)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

enum BookingStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
}

enum PaymentStatus {
  UNPAID
  PAID
  FAILED
}
```

## 8. Key API Endpoints & Logic

All API routes will be under `/pages/api/` or using the Next.js App Router API convention.

-   `GET /api/availability?date=<YYYY-MM-DD>&timezone=<TZ>`: Fetch available booking slots for a given day, adjusted for the user's timezone. This should cross-reference the Google Calendar integration.
-   `POST /api/bookings`: Create a new booking. Validates input, calculates price, and creates a `PENDING` booking record before redirecting to payment.
-   `POST /api/payment/razorpay/create-order`: Creates a Razorpay order and returns the `order_id`.
-   `POST /api/payment/razorpay/webhook`: Handles webhook events from Razorpay to confirm payment success/failure and updates the `Booking` status accordingly.
-   `POST /api/payment/paypal/create-order`: Creates a PayPal order.
-   `POST /api/payment/paypal/capture-order`: Captures the payment after user approval and updates the `Booking` status.
-   `GET /api/testimonials`: Fetch testimonials for display.
-   `GET /api/blog?slug=<slug>`: Fetch a single blog post.
-   `GET /api/blog`: Fetch a list of all published blog posts.

## 9. File & Component Naming Conventions

Consistency is key for AI understanding and project maintainability.

-   **Components:** PascalCase (`BookingCalendar.tsx`, `PrimaryButton.tsx`). Place in `/components/ui` for general UI elements and `/components/sections` for larger page sections.
-   **Pages/Routes:** kebab-case for file-based routing (`/booking`, `/case-studies`). Next.js App Router convention (`/app/booking/page.tsx`).
-   **API Routes:** kebab-case (`/api/create-booking.ts`).
-   **Hooks:** Use `use` prefix (`useAvailability.ts`).
-   **Types:** Place custom types in a `/types/index.ts` file or co-locate with the component if specific. Name with PascalCase (e.g., `BookingData`).
-   **CSS Variables (Tailwind):** Define custom colors and fonts in `tailwind.config.js` using kebab-case (`--color-primary`, `--font-heading`).

### Example Component Structure:

```
/components
├── /sections
│   ├── HeroSection.tsx
│   └── BookingSection.tsx
├── /ui
│   ├── Button.tsx
│   ├── Calendar.tsx
│   └── TimezoneSelect.tsx
└── /icons
    └── ArrowRightIcon.tsx
```
```