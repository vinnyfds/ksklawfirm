# Cursor Memory Configuration

- **Document Type:** Cursor Memory Configuration
- **Category:** Development
- **Project:** lawyers

## 1. Overview

This document outlines the essential configuration for the Cursor IDE to streamline the AI-assisted development workflow for the "lawyers" project. By providing the AI with deep, structured context about the project's goals, tech stack, and coding standards, we can significantly enhance its ability to generate accurate, consistent, and high-quality code.

This configuration is designed to be used with Cursor's `@` symbols and `⌘+K` / `Ctrl+K` commands, ensuring the AI is always aware of the project's specific requirements.

## 2. Core Configuration: `.cursorrules`

Create a file named `.cursorrules` in the root of the project directory and paste the following content. This file provides the foundational context for all AI interactions within the project.

```yaml
# .cursorrules - AI Configuration for the "lawyers" Project

# This file provides essential context to the Cursor AI to ensure generated code
# aligns with the project's architecture, goals, and coding standards.

# Use '@' to reference specific rules, e.g., "@project_context" or "@coding_standards".

project_context:
  - rule: "Project Name: lawyers"
  - rule: "Project Description: A professional website for Kalanidhi Sanjeeva Kumar, a High Court advocate in Hyderabad with 20 years of experience. The site targets Non-Resident Indians (NRIs) seeking legal services in India."
  - rule: "Primary Business Goal: Generate qualified leads from NRIs, facilitate direct booking and payment for consultations, and serve as a professional online brochure to build trust and authority."
  - rule: "Target Audience: NRIs living abroad, often in different time zones, who need legal assistance with Indian matters like ancestral properties, divorce, property litigations, and civil/criminal cases."
  - rule: "Core Features:
      - Booking System: Paid consultations (30-min audio call, document review) with timezone support and Google Calendar integration.
      - Payment Integration: Razorpay for Indian/international currency and PayPal as an alternative.
      - Trust Builders: Sections for Case Studies, Client Testimonials, and a Blog with articles for NRIs.
      - Secure Document Upload: A secure, encrypted area for clients to submit initial documents post-booking."
  - rule: "User Journey:
      1. NRI lands on the site, sees clear info on services and expertise.
      2. Uses a simple booking system, selects their local time zone to see available slots.
      3. Chooses a slot, fills a brief intake form, and completes payment.
      4. Receives an automated confirmation email with details for a WhatsApp audio call and a link to a secure document portal."
  - rule: "Tech Stack:
      - Frontend: Next.js (App Router) with React and TypeScript.
      - Styling: Tailwind CSS. Use utility-first classes for all styling.
      - Backend: Node.js with Express, integrated into Next.js API Routes.
      - Database: PostgreSQL with Prisma ORM.
      - Deployment: Vercel."
  - rule: "Design System:
      - Mood: Professional, Modern, Approachable, Trustworthy, Efficient.
      - Primary Color: #1B4F72 (Deep Blue)
      - Secondary Color: #2980B9 (Sky Blue)
      - Accent Color: #F39C12 (Amber)
      - Background Color: #F9F9F9 (Light Gray)
      - Text Color: #2C3E50 (Dark Gray)
      - UI Components: Utilize shadcn/ui for pre-built, accessible components (e.g., Button, Input, Card)."

coding_standards:
  - rule: "File & Folder Naming: Use kebab-case for all files and directories (e.g., `src/components/booking-form`). Exception: React components should be PascalCase (e.g., `BookingForm.tsx`)."
  - rule: "TypeScript: Use TypeScript for everything. All function arguments and return types must be explicitly typed. Define custom types and interfaces in the `src/types/index.ts` file or colocated with components where appropriate. Use `type` over `interface` for consistency."
  - rule: "React/Next.js:
      - Always create functional components with hooks.
      - Use the Next.js App Router (`src/app`).
      - Distinguish between Server Components (default) and Client Components (`'use client'`).
      - All component props must be typed.
      - Use `PascalCase` for component names."
  - rule: "Styling (Tailwind CSS):
      - Implement all styling using Tailwind CSS utility classes.
      - Avoid writing custom CSS files or using styled-components.
      - For reusable class combinations, use a utility like `clsx` or `tailwind-merge`."
  - rule: "Backend (Next.js API Routes):
      - Structure API endpoints logically within `src/app/api/`.
      - Follow RESTful conventions (e.g., `POST /api/bookings`, `GET /api/bookings/[id]`).
      - Always validate incoming data (e.g., with Zod).
      - Use a standardized JSON response format: `{ success: boolean, data: T | null, error: string | null }`."
  - rule: "Database (Prisma):
      - Define models in `prisma/schema.prisma`.
      - Model names must be `PascalCase` and singular (e.g., `Booking`, `User`).
      - Field names must be `camelCase`.
      - Use enums for fields with a fixed set of options (e.g., `BookingStatus`).
      - All database interactions must go through a single Prisma Client instance located in `src/lib/db.ts`."
  - rule: "Code Style & Formatting: The project is configured with ESLint and Prettier. All generated code must be formatted accordingly. Use `camelCase` for variables and functions, and `UPPER_SNAKE_CASE` for constants."
```

## 3. AI Change Tracking: `changelog.md`

To maintain a human-auditable trail of AI-generated code, create a file named `changelog.md` in the project root. After using the AI to generate or significantly refactor a feature, add an entry to this log.

**`changelog.md` Template:**

````markdown
# AI Change Log

This document tracks significant code generation and modifications performed by the Cursor AI.

---

### 2023-10-27

**Author:** AI (prompted by *Developer Name*)

**Change:** Generated the initial `Booking` model in the Prisma schema and the corresponding API route for creation.

**Files Affected:**
- `prisma/schema.prisma`
- `src/app/api/bookings/route.ts`

**Prompt Used:**
> "Using the @coding_standards, update the `prisma/schema.prisma` file to include a `Booking` model. It needs fields for `name`, `email`, `consultationType` (enum: AUDIO_CALL, DOCUMENT_REVIEW), `status` (enum: PENDING, CONFIRMED), `scheduledAt` (DateTime), and `paymentId` (String). Then, create a Next.js API route at `src/app/api/bookings/route.ts` to handle a POST request that creates a new booking using this model. Validate the incoming body with Zod."
````

## 4. File and Directory Structure

This structure is optimized for the Next.js App Router and helps the AI understand the project's layout. It separates concerns logically, making it easier to locate files and for the AI to provide context-aware suggestions.

```text
lawyers/
├── .cursorrules             # AI context and rules
├── .env.local               # Environment variables (secret)
├── .eslintrc.json           # ESLint configuration
├── .gitignore
├── changelog.md             # Log of AI-generated changes
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── prisma/
│   └── schema.prisma        # Database schema
└── src/
    ├── app/
    │   ├── (main)/          # Main website routes group
    │   │   ├── about/
    │   │   │   └── page.tsx
    │   │   ├── blog/
    │   │   │   ├── [slug]/
    │   │   │   │   └── page.tsx
    │   │   │   └── page.tsx
    │   │   ├── booking/
    │   │   │   └── page.tsx # Booking page with form
    │   │   ├── layout.tsx   # Shared layout for main routes (nav, footer)
    │   │   └── page.tsx     # Homepage
    │   ├── api/             # Backend API routes
    │   │   ├── bookings/
    │   │   │   └── route.ts
    │   │   └── payment/
    │   │       └── razorpay/
    │   │           └── route.ts
    │   ├── favicon.ico
    │   ├── globals.css      # Global styles (base Tailwind)
    │   └── layout.tsx       # Root layout
    ├── components/
    │   ├── forms/           # Form components (e.g., BookingForm.tsx)
    │   ├── sections/        # Homepage sections (e.g., HeroSection.tsx)
    │   └── ui/              # Reusable UI elements from shadcn/ui
    ├── lib/
    │   ├── db.ts            # Prisma client instance
    │   ├── utils.ts         # General utility functions
    │   └── validators.ts    # Zod validation schemas
    └── types/
        └── index.ts         # Shared TypeScript types and interfaces
```

## 5. Recommended VS Code Extensions for Cursor

Ensure these VS Code extensions are installed to support the development workflow and coding standards:

- **Prettier - Code formatter**: Automatically formats code on save to maintain a consistent style.
- **ESLint**: Lints code to find and fix problems based on the rules in `.eslintrc.json`.
- **Prisma**: Provides syntax highlighting, formatting, and autocompletion for `schema.prisma` files.
- **Tailwind CSS IntelliSense**: Offers advanced autocompletion, syntax highlighting, and linting for Tailwind CSS classes.
- **DotENV**: Provides syntax highlighting for `.env` files.

## 6. Example AI Prompts

Use these prompts as a starting point. Reference the rules in `.cursorrules` with `@` to guide the AI effectively.

#### Prompt 1: Create a Frontend Component

> "Using @coding_standards and @project_context, create a new React client component named `BookingForm.tsx` inside `src/components/forms/`. The form should allow a user to book a consultation.
>
> It must include the following fields using `shadcn/ui` components (`Input`, `Label`, `Select`, `Textarea`, `Button`):
> - Full Name (Input)
> - Email (Input)
> - Consultation Type (Select with options: '30-min Audio Call', 'Document Review')
> - Preferred Date (use the shadcn/ui Calendar with Popover)
> - Brief Description of Legal Issue (Textarea)
>
> The component should manage its own state. Use Zod for client-side validation, defining the schema in `src/lib/validators.ts`."

#### Prompt 2: Create a Backend API Endpoint

> "Using the @coding_standards, create a new Next.js API route file `src/app/api/bookings/route.ts`.
>
> Implement a `POST` handler that:
> 1.  Reads the booking data from the request body.
> 2.  Validates the data against the Zod schema for bookings (you can ask the AI to create this if it doesn't exist).
> 3.  Uses the Prisma client from `src/lib/db.ts` to create a new record in the `Booking` table.
> 4.  Returns a standardized JSON response with `success: true` and the new booking data on success (status 201), or `success: false` and an error message on failure (status 400 or 500)."

#### Prompt 3: Refactor with Design System Colors

> "Review the file `src/app/(main)/layout.tsx`. Refactor the existing JSX to use the official color palette defined in @project_context. For example, apply the primary color `#1B4F72` to the navigation bar background and the accent color `#F39C12` to primary call-to-action buttons. Use Tailwind CSS utility classes (e.g., `bg-[#1B4F72]`, `bg-[#F39C12]`)."