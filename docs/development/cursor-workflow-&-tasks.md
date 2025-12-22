# Cursor Workflow & Tasks

**Category:** Development
**Project:** Advocate Kalanidhi Website (`lawyers`)
**Author:** [Your Name/Team Name]
**Version:** 1.0
**Date:** [Current Date]

---

## 1.0 Overview

This document outlines the essential configuration, workflows, and best practices for using the Cursor IDE in the `lawyers` project. The primary goal is to establish a consistent, efficient, and high-quality development process by leveraging Cursor's AI capabilities.

Adhering to these guidelines will ensure that all developers, with the assistance of AI, produce code that is maintainable, scalable, and aligned with the project's technical and business requirements.

## 2.0 Core Project Configuration for AI

To effectively prime Cursor's AI, we will use a `.cursor` directory at the root of our project. This directory will contain rules and context that the AI will reference during all interactions.

### 2.1 Project Rules (`.cursorrules`)

Create a file named `.cursorrules` inside a `.cursor` directory at the project root (`/.cursor/.cursorrules`). This file is the single source of truth for the AI. Populate it with the following content:

```plaintext
You are an expert full-stack developer specializing in Next.js, Node.js, and PostgreSQL. Your task is to assist in building a professional booking website for an advocate in India.

### Project Context
- **Project Name:** lawyers
- **Website Purpose:** A booking and informational website for Advocate Kalanidhi Sanjeeva Kumar, targeting Non-Resident Indians (NRIs).
- **Primary Goals:** 
  1. Generate qualified leads from NRIs.
  2. Facilitate direct booking and payment for initial consultations.
  3. Serve as a professional online brochure showcasing 20 years of legal expertise.
- **Target Audience:** NRIs living abroad who need legal services in India (ancestral properties, divorce, property litigations, civil/criminal matters).

### Core Features
- **Booking System:** Allow users to schedule paid consultations (30-min audio call, document review). Must include timezone support and sync with Google Calendar.
- **Payment Integration:** Use Razorpay for Indian/multi-currency payments and PayPal as a secondary option.
- **Secure Document Upload:** A secure, encrypted area for clients to submit initial documents post-booking.
- **Content Sections:** Case Studies, Testimonials (from NRIs), and a Blog/Articles section on legal topics for NRIs.

### Tech Stack & Standards
- **Frontend:** Next.js (App Router) with TypeScript.
- **Styling:** Tailwind CSS. Use utility-first classes. Do NOT write custom CSS files unless absolutely necessary for complex animations.
- **Backend:** Node.js with Express.js for API routes handled within Next.js.
- **Database:** PostgreSQL.
- **ORM:** Prisma. Always generate and use Prisma Client for database interactions.
- **Deployment:** Vercel. Ensure code is compatible with Vercel's serverless environment.

### Design & UX
- **Design Mood:** Professional, Modern, Trustworthy, Efficient, Approachable.
- **Layout:** Landing page style, top navigation, fully responsive.
- **Color Palette:**
  - `primary`: '#1B4F72' (Deep Blue)
  - `secondary`: '#2980B9' (Sky Blue)
  - `accent`: '#F39C12' (Amber)
  - `background`: '#F9F9F9' (Light Gray)
  - `text`: '#2C3E50' (Dark Gray)
- **Dark Mode:** The site must support dark mode. Use Tailwind's `dark:` variant. The background in dark mode should be a shade of `text` like `#2C3E50` and text should be `background` or a lighter gray.
- **Typography:** Use a clean, professional sans-serif font like Inter or Lato.

### Coding Rules
1.  **Language:** Use TypeScript for all new code. Use strict type checking.
2.  **File Naming:**
    - Components: `PascalCase.tsx` (e.g., `BookingForm.tsx`).
    - API Routes: `route.ts` within `app/api/path-name/` directories.
    - Pages: `page.tsx` within `app/page-name/` directories.
    - Lib/Utils: `camelCase.ts` (e.g., `dateUtils.ts`).
3.  **Component Structure:** Create components in the `/components` directory. Use subdirectories for organization (e.g., `/components/ui`, `/components/booking`). Components must be functional and use React Hooks.
4.  **State Management:** For simple state, use `useState` and `useContext`. For complex global state, we will evaluate Zustand if needed. Do not introduce Redux.
5.  **API Development:**
    - All API logic resides in `app/api/`.
    - Use Prisma Client for all database queries. Do not write raw SQL.
    - Always include robust error handling and return meaningful status codes (e.g., 200, 201, 400, 404, 500).
    - Validate incoming request bodies using a library like Zod.
6.  **Environment Variables:** Prefix all environment variables with `NEXT_PUBLIC_` for client-side access. Store secrets like `DATABASE_URL` and API keys without the prefix and access them only on the server.
7.  **Comments:** Write JSDoc comments for all major functions, API endpoints, and complex logic to explain the *why*, not the *what*.
```

### 2.2 AI Change Tracking (`changelog.md`)

To maintain visibility on AI-driven changes, we will use a `changelog.md` file. After using Cursor's "Generate" or "Edit" (`Cmd+K`) features to apply a significant change, add a brief entry to this file.

Create a file named `changelog.md` at the project root and add the following initial content:

```markdown
# AI Change Log

This log tracks significant code changes and additions generated or assisted by the Cursor AI. The purpose is to maintain a high-level overview of AI contributions to the codebase.

---

### YYYY-MM-DD

- **File(s):** `/app/booking/page.tsx`, `/components/booking/BookingCalendar.tsx`
- **Author:** [Your Name]
- **Change:** Generated the initial structure for the booking page and a client-side `BookingCalendar` component. The component fetches initial availability slots and handles date selection state.
- **Prompt:** "Create a Next.js page component for `/booking`. It should have a title 'Book a Consultation' and include a client-side component called `BookingCalendar`. The calendar component should display a grid of available days for the current month and allow a user to select a day."
```

## 3.0 AI-Assisted Development Workflow

Integrate Cursor's AI features into your daily workflow to accelerate development and ensure consistency.

### 3.1 Generating New Code (`Cmd+K` -> Generate)

Use the "Generate" feature to scaffold new components, functions, API routes, and tests. Always provide context by referencing the `.cursorrules` and other relevant files.

**Example: Creating the Testimonials Component**

> **Prompt:** "Using the project's tech stack and color scheme, create a new React component named `TestimonialsSection`. It should be a server component that displays a list of testimonials. Each testimonial should have a quote, the client's name, and their location (e.g., 'USA'). Style it with Tailwind CSS using a card-based layout. Use the `primary` color for quotes and the `text` color for the client's name."

### 3.2 Editing and Refactoring Code (`Cmd+K` -> Edit)

Select a block of code and use the "Edit" feature to refactor, debug, or add functionality. This is highly effective for tasks like adding types, implementing logic, or applying styling.

**Example: Adding Dark Mode to a Component**

1.  Select the JSX of a component (e.g., a `Card` component).
2.  Press `Cmd+K`.
3.  **Prompt:** "Add dark mode support to this component. The background should become `dark:bg-gray-800` and the text should be `dark:text-gray-200`."

### 3.3 Chat and Codebase-Aware Questions (`@` symbols)

Use the chat pane to ask high-level questions, plan implementation, or find relevant code.

-   **`@file`:** Reference one or more specific files.
    > **Prompt:** "@`./app/api/booking/route.ts` review this API endpoint for security vulnerabilities and suggest improvements."

-   **`@Codebase`:** Ask questions about the entire project.
    > **Prompt:** "@Codebase where in the project is the Google Calendar API key being used? I need to implement the logic for fetching available time slots."

-   **`@Docs`:** Reference documentation for a specific library.
    > **Prompt:** "@Docs(Prisma) how do I write a query to create a new `Booking` and a related `Client` in a single transaction if the client doesn't already exist?"

## 4.0 Common Development Tasks & AI Prompts

Here are specific, actionable prompts for tasks central to this project.

### Task 1: Create a Booking API Endpoint

**Goal:** Create an API route to handle new bookings.

> **Prompt:** "Create a new Next.js API route in `/app/api/booking/create/route.ts`. It should handle a POST request to create a new booking. The request body will contain `clientName`, `clientEmail`, `serviceType` ('audio' or 'document'), and `slot` (a an ISO 8601 datetime string). Use Zod for validation. Use Prisma to create a `Booking` record in the database. Return the created booking object on success or a 400 error on validation failure."

### Task 2: Implement a Secure Document Upload Component

**Goal:** Create the UI and logic for uploading documents.

> **Prompt:** "Create a client component named `SecureDocumentUpload` in `/components/booking/`. This component should contain a form with a file input field. When a user selects a file, make a call to a server action named `uploadDocument`. The server action (to be created in `app/actions.ts`) should handle uploading the file to a secure storage service (placeholder logic for now). The component should display loading states and success/error messages. Style it with Tailwind CSS."

### Task 3: Fetch Availability from Google Calendar

**Goal:** Create a utility function to connect to Google Calendar.

> **Prompt:** "In `/lib/googleCalendar.ts`, create an async function named `getAvailableSlots`. This function should use the official Google Calendar API client for Node.js (`googleapis`). It should fetch busy/free information for the advocate's primary calendar for the next 30 days. It needs to handle authentication using a service account key stored in environment variables (`GOOGLE_PRIVATE_KEY`, `GOOGLE_CLIENT_EMAIL`). The function should return an array of available time slots, taking into account the advocate's working hours (e.g., 10 AM to 6 PM IST)."

### Task 4: Style a Component with the Project Theme

**Goal:** Apply consistent styling to a new UI element.

1.  Select the JSX of the element you want to style.
2.  Press `Cmd+K`.
3.  **Prompt:** "Style this button as a primary action button. It should use the `primary` background color, have white text, and use the `accent` color for its hover and focus states. Add medium padding, rounded corners, and a subtle box shadow."

By following these workflows, we can harness the power of AI to build the `lawyers` website efficiently while upholding high standards of code quality and project consistency.