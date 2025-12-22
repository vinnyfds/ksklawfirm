Of course. Here is the comprehensive Sitemap & Information Architecture document, created with the expertise of a technical writer.

---

```markdown
# Sitemap & Information Architecture

| | |
|---|---|
| **Project:** | Advocate Kalanidhi Sanjeeva Kumar Website |
| **Document Type:** | Sitemap & Information Architecture |
| **Category:** | Design |
| **Version:** | 1.0 |
| **Date:** | October 26, 2023 |
| **Author:** | AI Technical Writer |

---

## 1.0 Introduction

### 1.1 Document Purpose
This document outlines the complete sitemap and information architecture (IA) for the website of Advocate Kalanidhi Sanjeeva Kumar. It serves as the foundational blueprint for the website's structure, defining the hierarchy of pages, content organization, navigation systems, and key user flows. This plan is critical for guiding the design, content strategy, and development phases (Q4), ensuring a logical, user-centric, and efficient experience for the target audience.

### 1.2 Project Overview
The project is to create a professional website for Advocate Kalanidhi Sanjeeva Kumar, a High Court advocate with 20 years of experience based in Hyderabad, India. The website's primary business goal is to generate qualified leads from Non-Resident Indians (NRIs) seeking legal services in India for matters such as ancestral properties, divorce, and property litigation. The site will facilitate direct booking of paid consultations and serve as a portfolio to establish trust and authority.

### 1.3 Target Audience Persona
The primary user is an NRI (Non-Resident Indian) living abroad (e.g., in the USA, UK, Canada, Australia) who faces a legal issue in India.

*   **Goals:** Find a trustworthy, experienced advocate in India; understand their legal options; easily schedule a consultation across different time zones; securely share initial case details.
*   **Pain Points:** Difficulty finding reliable legal counsel from abroad; navigating time zone differences for communication; concerns about credibility and transparency; complexity of Indian legal processes.
*   **Needs:** Clear information on services, proof of expertise (case studies, testimonials), a simple and secure booking/payment process, and content that addresses their specific legal concerns as an NRI.

---

## 2.0 Information Architecture Principles

The website's structure is guided by the following core principles to meet the needs of the NRI audience and business goals:

*   **Credibility & Authority:** The architecture prioritizes content that builds trust. Key sections like 'About', 'Services', and 'Case Studies' are prominently featured to showcase Mr. Kumar's 20 years of experience and successful outcomes for NRIs.
*   **Clarity & Accessibility:** Content is organized into distinct, logically named sections. The language used in navigation and headings will be straightforward and professional, avoiding legal jargon where possible to ensure it is understood by a layperson.
*   **Efficiency & Action-Orientation:** The user journey is designed to be as frictionless as possible. A persistent, clear Call-to-Action (CTA) for booking a consultation is a central element, leading users to a streamlined booking and payment system.
*   **Findability & SEO:** The URL structure, page titles, and content hierarchy are designed with Search Engine Optimization (SEO) in mind to help NRIs discover the website when searching for relevant legal services in India.

---

## 3.0 Visual Sitemap

This hierarchical sitemap represents the complete structure of the website.

```
/ (Home)
├── /about
├── /services
│   └── /services/[slug] (Dynamic Service Page)
├── /case-studies
│   └── /case-studies/[slug] (Dynamic Case Study Page)
├── /blog
│   ├── /blog/[slug] (Dynamic Blog Post)
│   └── /blog/category/[slug] (Dynamic Category Archive)
├── /booking
├── /contact
└── / (Footer Links)
    ├── /privacy-policy
    └── /terms-of-service
```

### 3.1 Page-by-Page Breakdown

#### **L1: Home**
*   **URL:** `/`
*   **Purpose:** To immediately establish credibility, communicate the core value proposition to NRIs, and drive users toward key content and the booking process.
*   **Key Content Modules:**
    1.  **Hero Section:** Compelling headline targeting NRIs (e.g., "Expert Legal Counsel in India for NRIs"). Sub-headline mentioning 20 years of experience and key practice areas. Primary CTA: "Book a Consultation".
    2.  **Services Overview:** A grid or card-based summary of the main practice areas (Ancestral Properties, Divorce, Property Litigations, Civil & Criminal). Each card links to the respective detailed service page.
    3.  **Credibility Bar:** Showcase key stats: "20+ Years Experience", "High Court Advocate", "Specializing in NRI Legal Matters".
    4.  **Testimonial Spotlight:** A featured testimonial from a past NRI client.
    5.  **Final CTA Section:** A strong concluding call to action to book a consultation or contact for inquiries.
*   **Primary CTA:** Book a Consultation (`/booking`)

#### **L1: About**
*   **URL:** `/about`
*   **Purpose:** To build a personal connection and reinforce trust by detailing Advocate Kalanidhi Sanjeeva Kumar's extensive experience, qualifications, and professional philosophy.
*   **Key Content Modules:**
    1.  **Professional Bio:** Detailed narrative of his 20-year career, education, and specialization.
    2.  **Mission/Philosophy:** A statement on his approach to helping NRIs navigate the Indian legal system.
    3.  **Qualifications & Bar Admissions:** List of credentials.
    4.  **Photo:** A professional headshot.
*   **Primary CTA:** View Services (`/services`)

#### **L1: Services**
*   **URL:** `/services`
*   **Purpose:** An index page that provides an overview of all legal services offered, allowing users to navigate to the area most relevant to them.
*   **Key Content Modules:**
    1.  **Introduction:** A brief paragraph summarizing the scope of services.
    2.  **Service Grid:** Detailed cards for each service area (Ancestral Properties, Divorce, etc.). Each card includes a title, short description, and a "Learn More" link.
*   **Primary CTA:** Book a Consultation (`/booking`)

#### **L2: Service Detail Page (Dynamic)**
*   **URL:** `/services/[slug]` (e.g., `/services/ancestral-property-disputes`)
*   **Purpose:** To provide in-depth information on a specific practice area, addressing common questions and concerns for NRIs.
*   **Key Content Modules:**
    1.  **Service Title & Description:** Detailed explanation of the legal service.
    2.  **"For NRIs" Section:** Specific challenges and considerations for NRIs related to this service.
    3.  **Our Process:** Step-by-step overview of how Mr. Kumar handles such cases.
    4.  **Related Case Studies:** Links to case studies relevant to this service.
    5.  **FAQ Section:** Frequently asked questions about this legal area.
*   **Primary CTA:** Book a Consultation (`/booking`)

#### **L1: Case Studies**
*   **URL:** `/case-studies`
*   **Purpose:** To provide tangible proof of successful outcomes, building immense credibility with potential clients.
*   **Key Content Modules:**
    1.  **Introduction:** A statement on the importance of real-world results.
    2.  **Case Study Grid:** A filterable gallery of case studies. Each card shows the service area, a brief anonymized client profile (e.g., "NRI from USA"), and a compelling title.
*   **Primary CTA:** Read Our Success Stories (links to individual studies)

#### **L2: Case Study Detail Page (Dynamic)**
*   **URL:** `/case-studies/[slug]` (e.g., `/case-studies/resolving-hyderabad-property-dispute-for-us-client`)
*   **Purpose:** To tell a compelling story of a problem and its successful resolution.
*   **Key Content Modules:**
    1.  **Title:** Outcome-focused title.
    2.  **Summary Box:** Client Profile, Challenge, Solution, Outcome.
    3.  **The Challenge:** Detailed description of the client's situation.
    4.  **The Solution:** The legal strategy and actions taken by Mr. Kumar.
    5.  **The Outcome:** The final result and benefit to the client.
    6.  **Client Testimonial:** A direct quote from the client (if available).
*   **Primary CTA:** Book a Consultation (`/booking`)

#### **L1: Blog**
*   **URL:** `/blog`
*   **Purpose:** To establish thought leadership, improve SEO, and provide value to NRIs by addressing their common legal questions.
*   **Key Content Modules:**
    1.  **Featured Post:** The most recent or a pinned article.
    2.  **Post Listing:** A reverse-chronological list of all blog posts with title, excerpt, and featured image.
    3.  **Categories/Search:** Filters to sort posts by topic (e.g., "Property Law", "Divorce").
*   **Primary CTA:** Read Article (links to post)

#### **L1: Booking**
*   **URL:** `/booking`
*   **Purpose:** The functional core of the website. A dedicated page for the multi-step consultation booking process.
*   **Key Content Modules:**
    1.  **Service Selection:** User chooses between "30-Minute Audio Call" and "Document Review Service". Prices are clearly displayed.
    2.  **Booking Widget:** An embedded calendar (synced with Google Calendar) that allows users to select their local time zone, then view and select an available date/time slot.
    3.  **Intake Form:** A form to collect user's Name, Email, Phone, Country of Residence, and a brief description of their legal matter.
    4.  **Payment Gateway:** Integration with Razorpay and PayPal.
*   **Primary CTA:** Select a Time Slot / Proceed to Payment

#### **L1: Contact**
*   **URL:** `/contact`
*   **Purpose:** To provide a clear channel for general inquiries that are not booking-related.
*   **Key Content Modules:**
    1.  **Contact Form:** For general messages.
    2.  **Direct Contact Information:** Phone Number (+91 9440217782), Email Address.
    3.  **Office Address & Map:** (Optional, but good for local credibility).
*   **Primary CTA:** Send Message

#### **Utility Pages (Footer)**
*   **/privacy-policy:** Details on data collection, usage, and protection.
*   **/terms-of-service:** Terms for using the website and booking services.

---

## 4.0 URL Structure & Naming Conventions

The URL structure will be simple, semantic, and SEO-friendly, following Next.js conventions for dynamic routing.

*   **Rule:** Use lowercase letters and hyphens (`-`) to separate words.
*   **Rule:** Keep URLs as short and descriptive as possible.
*   **Examples:**
    *   **Static Page:** `https://[domain].com/about`
    *   **Service Detail:** `https://[domain].com/services/property-litigation`
    *   **Blog Post:** `https://[domain].com/blog/nri-guide-to-ancestral-property-claims`
    *   **Case Study:** `https://[domain].com/case-studies/divorce-settlement-for-uk-nri`

---

## 5.0 Navigation Systems

### 5.1 Primary Navigation (Header)
The main navigation bar will be present on all pages and will include links to the most critical sections of the site.

*   **Links:** Home, About, Services, Case Studies, Blog
*   **Primary CTA Button:** `Book a Consultation` (styled differently to stand out).

### 5.2 Footer Navigation
The footer will be divided into columns for clarity and will contain secondary and utility links.

*   **Column 1 (Services):** Links to top 3-4 service detail pages.
*   **Column 2 (Quick Links):** About, Case Studies, Blog, Contact.
*   **Column 3 (Legal):** Privacy Policy, Terms of Service.
*   **Column 4 (Contact):** Advocate Kalanidhi Sanjeeva Kumar, Phone: +91 9440217782, Email.
*   **Copyright:** `© [Year] Advocate Kalanidhi Sanjeeva Kumar. All Rights Reserved.`

---

## 6.0 User Flow: Booking a Paid Consultation

This flow outlines the ideal journey for an NRI from landing on the site to having a confirmed appointment.

1.  **Entry Point:** User lands on the Homepage (`/`).
2.  **Action:** Clicks the primary "Book a Consultation" CTA in the hero section or header.
3.  **Navigate:** User is directed to the Booking page (`/booking`).
4.  **Step 1: Select Service:** User chooses between the "30-Minute Audio Call" or "Document Review Service".
5.  **Step 2: Select Time:**
    *   User selects their local time zone from a dropdown.
    *   The calendar widget updates to show Mr. Kumar's availability in the user's selected time zone.
    *   User picks a date and a time slot.
6.  **Step 3: Provide Details:** User fills out the intake form with their name, email, phone (with country code), and a summary of their legal issue.
7.  **Step 4: Payment:**
    *   The total cost is displayed.
    *   User selects a payment method (Razorpay or PayPal).
    *   User is redirected to the chosen payment gateway to complete the transaction.
8.  **Step 5: Confirmation:**
    *   Upon successful payment, the user is redirected to a "Thank You / Confirmation" page on the website.
    *   This page summarizes the appointment details and informs the user to check their email.
9.  **Step 6: Automated Follow-up:**
    *   An automated confirmation email is sent to the user.
    *   The email contains:
        *   Appointment date and time.
        *   Instructions for the audio call via WhatsApp.
        *   A link to a secure portal/page to upload any initial documents for review.
10. **Step 7: Calendar Sync:** The appointment is automatically added to Mr. Kumar's Google Calendar, blocking off the time slot to prevent double bookings.

---

## 7.0 Platform-Specific Implementation Notes (Cursor IDE)

To facilitate efficient AI-assisted development in Cursor, the project should adhere to the following conventions.

### 7.1 `.cursorrules` Configuration

Create a `.cursorrules` file at the root of the project with the following content to provide consistent context to the AI.

```
# .cursorrules

# Project Context & Coding Standards for "lawyers" Project

## Project Overview
- **Project Name:** lawyers
- **Description:** A booking and portfolio website for Advocate Kalanidhi Sanjeeva Kumar, targeting NRIs needing legal services in Hyderabad, India.
- **Core Goal:** Generate qualified leads and enable direct booking of paid consultations.
- **Target Audience:** NRIs living abroad.
- **Key Features:** Booking system with timezone support, Google Calendar sync, Razorpay/PayPal payments, secure document submission, blog, and case studies.

## Tech Stack
- **Frontend:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Node.js with Express.js (for any custom server functions if needed beyond Next.js API routes)
- **Database/ORM:** PostgreSQL with Prisma
- **Deployment:** Vercel

## Code Style & Conventions
- **Language:** Use TypeScript for all JavaScript/React files. Enforce strong typing.
- **Component Structure:** Create components in `/components`. Use sub-folders for organization (e.g., `/components/ui`, `/components/booking`).
- **File Naming:** Use `PascalCase` for React components (e.g., `BookingCalendar.tsx`). Use `kebab-case` for other files (e.g., `api-helpers.ts`).
- **API Routes:** Use Next.js App Router API Routes located in `app/api/`. For example, `app/api/booking/route.ts`.
- **Styling:** Use Tailwind CSS utility classes directly in JSX. Avoid custom CSS files unless absolutely necessary for complex animations or overrides.
- **State Management:** Use React Hooks (`useState`, `useContext`, `useReducer`) for local/shared state. Consider React Query (`@tanstack/react-query`) for server state management (fetching, caching).
- **Comments:** Write clear JSDoc comments for functions and components, explaining their purpose, parameters, and return values.

## Content & IA
- **Sitemap:** Refer to the Information Architecture document. Key pages: `/`, `/about`, `/services`, `/services/[slug]`, `/case-studies`, `/case-studies/[slug]`, `/blog`, `/blog/[slug]`, `/booking`, `/contact`.
- **Dynamic Routes:** Use Next.js dynamic routing for services, case studies, and blog posts. Slugs should be generated from titles (e.g., 'Ancestral Property' -> 'ancestral-property').
```

### 7.2 File & Directory Structure
Structure the Next.js `app` directory to mirror the sitemap for intuitive navigation and optimal AI context.

```
/app
├── /about/page.tsx
├── /api/
│   ├── /booking/route.ts       // Handles booking logic
│   └── /payment/route.ts       // Handles payment webhooks
├── /blog/
│   ├── /[slug]/page.tsx
│   └── /page.tsx
├── /booking/page.tsx
├── /case-studies/
│   ├── /[slug]/page.tsx
│   └── /page.tsx
├── /contact/page.tsx
├── /services/
│   ├── /[slug]/page.tsx
│   └── /page.tsx
├── /components/
│   ├── /ui/                    // Reusable UI elements (Button, Card, etc.)
│   ├── /booking/               // Booking-specific components
│   └── /layout/                // Header, Footer, etc.
├── /lib/                       // Helper functions, Prisma client, etc.
├── layout.tsx
├── page.tsx                    // Homepage
└── globals.css                 // Tailwind base styles
```

### 7.3 Changelog
Maintain a `changelog.md` file at the project root. All significant changes generated or assisted by the AI should be logged here to track evolution and simplify debugging.

**Example `changelog.md` entry:**

```markdown
### 2023-10-26 (AI-Assisted)
- **Feature:** Implemented the initial structure for the `/booking` page.
- **Generated:** Created the `BookingCalendar.tsx` component with basic state management for date selection.
- **Refactored:** Updated the main CTA button in `Header.tsx` to link to the `/booking` page.
```
```