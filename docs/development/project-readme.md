Of course. Here is the comprehensive Project README document for the development category, focusing on the AI-assisted workflow configuration.

---

```markdown
# Kalanidhi Sanjeeva Kumar - Advocate Website

**Document Type:** Project README
**Category:** Development

## 1. Project Overview

This repository contains the source code for the official website of Kalanidhi Sanjeeva Kumar, a High Court advocate in Hyderabad with 20 years of experience. The primary goal of this project is to create a professional, modern, and efficient web presence to attract and serve Non-Resident Indian (NRI) clients seeking legal services in India.

The website will function as:
- **A Lead Generation Tool:** Attracting qualified leads from NRIs.
- **A Booking Platform:** Enabling clients to book and pay for consultations across different time zones.
- **A Professional Brochure:** Showcasing Mr. Kumar's expertise in ancestral properties, divorce, property litigations, and civil/criminal matters.

---

## 2. Technical Stack

The project is built using a modern, scalable, and type-safe technology stack.

- **Frontend:** [Next.js](https://nextjs.org/) (App Router) with [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/) (via Next.js API Routes)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Deployment:** [Vercel](https://vercel.com/)
- **Development IDE:** [Cursor](https://cursor.sh/) (for AI-assisted development)

---

## 3. Design & Theming

The visual identity aims to balance traditional authority with modern efficiency to build trust with a global audience.

- **Design Mood:** Professional, Modern, Approachable, Trustworthy, Efficient.
- **Layout:** Landing page structure with clear top-bar navigation.
- **Responsiveness:** Fully responsive for desktop, tablet, and mobile devices.
- **Dark Mode:** Supported.

### Color Palette

| Role        | Color                                                              | Hex       | Tailwind Class |
| :---------- | :----------------------------------------------------------------- | :-------- | :------------- |
| **Primary** | <span style="color:#1B4F72">Deep Blue</span>                       | `#1B4F72` | `primary`      |
| **Secondary** | <span style="color:#2980B9">Sky Blue</span>                        | `#2980B9` | `secondary`    |
| **Accent**    | <span style="color:#F39C12">Amber</span>                          | `#F39C12` | `accent`       |
| **Background**| <span style="color:#F9F9F9; background-color: #2C3E50">Light Gray</span> | `#F9F9F9` | `background`   |
| **Text**      | <span style="color:#2C3E50">Dark Gray</span>                       | `#2C3E50` | `text-primary` |

---

## 4. Local Development Setup

Follow these steps to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or later)
- [pnpm](https://pnpm.io/installation)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/download/) running locally or a connection string to a hosted instance.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd lawyers-website
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project by copying the example file.
    ```bash
    cp .env.example .env.local
    ```
    Now, fill in the required values in `.env.local`. These include database credentials, payment gateway keys, and Google API keys for calendar integration.

    **.env.example:**
    ```env
    # Prisma/PostgreSQL
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

    # Authentication (if using NextAuth.js)
    # NEXTAUTH_SECRET="your-super-secret-key"
    # NEXTAUTH_URL="http://localhost:3000"

    # Google API (for Calendar Sync)
    GOOGLE_CLIENT_ID="your-google-client-id"
    GOOGLE_CLIENT_SECRET="your-google-client-secret"
    GOOGLE_REFRESH_TOKEN="your-google-refresh-token" # For server-side calendar access

    # Payment Gateways
    RAZORPAY_KEY_ID="your-razorpay-key-id"
    RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
    PAYPAL_CLIENT_ID="your-paypal-client-id"
    PAYPAL_CLIENT_SECRET="your-paypal-client-secret"

    # Other
    NEXT_PUBLIC_SITE_URL="http://localhost:3000"
    ```

4.  **Run database migrations:**
    Apply the database schema to your local PostgreSQL instance.
    ```bash
    pnpm prisma migrate dev
    ```
    This will also generate the Prisma Client based on your `schema.prisma` file.

5.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.

---

## 5. AI-Assisted Workflow (Cursor IDE)

This project is optimized for an AI-assisted development workflow using **Cursor**. The following conventions are essential for maintaining code quality and maximizing AI efficiency.

### `.cursorrules` Configuration

The `.cursorrules` file at the project root provides context to the AI about our project, coding standards, and libraries. This ensures that generated code is consistent and correct. **Do not delete or modify this file without team consensus.**

```
# .cursorrules - AI Rules for Kalanidhi Sanjeeva Kumar Advocate Website

# 1. Project Context
- This is a website for Kalanidhi Sanjeeva Kumar, a lawyer in Hyderabad, India.
- The target audience is NRIs (Non-Resident Indians) living abroad.
- Core features include a booking system with timezone support, payment integration (Razorpay, PayPal), case studies, a blog, and secure document upload.
- The website should convey trust, authority, and modern efficiency.

# 2. Tech Stack & Libraries
- Frontend: Next.js 14+ (App Router), React, TypeScript.
- Styling: Tailwind CSS. Do not write inline styles or use separate CSS files. Use Tailwind utility classes.
- UI Components: We may use shadcn/ui. Check the `components/ui` directory.
- State Management: Use React hooks (`useState`, `useContext`, `useReducer`) for local state. For server state, use React Server Components and Server Actions where possible.
- Backend: API routes are built with Next.js API Routes in the `app/api/` directory.
- Database: Use Prisma Client for all database interactions. The client is imported from `@prisma/client`. Never write raw SQL.

# 3. Coding Standards & Conventions
- Language: Always use TypeScript. Provide types for all function parameters and return values.
- File Naming:
  - Components: `PascalCase.tsx` (e.g., `BookingForm.tsx`).
  - API Routes: Use folder-based routing, e.g., `app/api/booking/route.ts`.
- Component Structure:
  - Use functional components with React Hooks.
  - Keep components small and focused on a single responsibility.
  - Use Server Components by default. Only add the `"use client";` directive when client-side interactivity is necessary (e.g., hooks, event handlers).
- Theming:
  - Colors: Use theme colors defined in `tailwind.config.js`. Example: `bg-primary`, `text-accent`. Do not use arbitrary values like `bg-[#1B4F72]`.
    - Primary: `primary` (#1B4F72)
    - Secondary: `secondary` (#2980B9)
    - Accent: `accent` (#F39C12)
- Error Handling: Wrap async operations in try/catch blocks. Return structured JSON responses from API routes: `{ success: boolean, data: any }` or `{ success: false, error: string }`.
- Comments: Add JSDoc comments to complex functions, utility functions, and API endpoints to explain their purpose, parameters, and return values.

# 4. AI Prompting Guidelines
- Be specific. Instead of "make a form", say "Create a React component named `ConsultationForm` using TypeScript and Tailwind CSS with fields for name, email, and legal issue (textarea). Use a Server Action to handle form submission."
- Reference files. Use `@` to reference files or symbols for context, e.g., "Refactor `@components/BookingCalendar.tsx` to fetch availability from the `@app/api/availability/route.ts` endpoint."
- When generating code, instruct the AI to "Follow the rules in the .cursorrules file."
```

### `changelog.md` for AI Edits

To maintain transparency and simplify code reviews, all significant changes made by the AI (e.g., generating new components, refactoring logic) **must** be logged in `changelog.md`.

**Format:**
```markdown
### YYYY-MM-DD

- **Feature/Fix:** A brief description of the change.
- **File(s) Affected:** `path/to/file.ts`, `path/to/another/file.tsx`
- **AI Prompt Used:** "A concise version of the prompt that led to the change."
- **Review Notes:** (Optional) Any manual adjustments or observations.
```

### Structuring Code for AI Context

- **Single Responsibility:** Keep files and functions focused. A file named `date-utils.ts` should only contain functions for manipulating dates.
- **Descriptive Naming:** Use clear, unambiguous names for variables, functions, and components (e.g., `fetchNriTestimonials` is better than `getData`).
- **JSDoc Comments:** Add comments to complex logic. The AI uses these comments to understand intent.

```typescript
/**
 * Fetches available time slots for a given date, adjusted for the client's timezone.
 * @param date - The selected date (YYYY-MM-DD format).
 * @param clientTimezone - The IANA timezone string of the client (e.g., 'America/New_York').
 * @returns A promise that resolves to an array of available time slots in the client's timezone.
 */
export async function getAvailableSlots(date: string, clientTimezone: string): Promise<string[]> {
  // ... implementation
}
```

---

## 6. Project Scripts

Commonly used scripts are defined in `package.json`:

| Command                 | Description                                                 |
| :---------------------- | :---------------------------------------------------------- |
| `pnpm dev`              | Starts the Next.js development server.                      |
| `pnpm build`            | Creates a production-ready build of the application.        |
| `pnpm start`            | Starts the production server (requires `pnpm build` first). |
| `pnpm lint`             | Runs ESLint to check for code quality and style issues.     |
| `pnpm format`           | Formats all code using Prettier.                            |
| `pnpm prisma:migrate`   | `pnpm prisma migrate dev` - Creates and applies a new migration. |
| `pnpm prisma:generate`  | `pnpm prisma generate` - Regenerates the Prisma Client.     |
| `pnpm prisma:studio`    | `pnpm prisma studio` - Opens the Prisma Studio GUI.         |

---

## 7. Commit Message Convention

This project uses the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This helps in automating changelogs and makes the commit history more readable.

**Format:** `type(scope): subject`

- **`feat`:** A new feature.
- **`fix`:** A bug fix.
- **`docs`:** Documentation only changes.
- **`style`:** Changes that do not affect the meaning of the code (white-space, formatting).
- **`refactor`:** A code change that neither fixes a bug nor adds a feature.
- **`test`:** Adding missing tests or correcting existing tests.
- **`chore`:** Changes to the build process or auxiliary tools.

**Example:**
```
feat(booking): add timezone selector to consultation form
```
```

```