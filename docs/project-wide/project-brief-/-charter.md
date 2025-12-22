```markdown
# Project Brief & Charter: Advocate Kalanidhi Sanjeeva Kumar Website

-   **Document Type:** Project Brief / Charter
-   **Category:** project-wide
-   **Version:** 1.0
-   **Date:** 2023-10-27
-   **Author:** Technical Writer (AI)

---

### **Document Purpose**

This document establishes the foundational project goals, stakeholders, and success metrics for the development of a professional website for Advocate Kalanidhi Sanjeeva Kumar. It serves as the single source of truth to ensure alignment among all project stakeholders from initiation to completion.

---

## 1.0 Executive Summary

This project entails the design, development, and deployment of a modern, professional website for Kalanidhi Sanjeeva Kumar, a High Court advocate with 20 years of experience based in Hyderabad, India. The primary purpose of the website is to attract and engage Non-Resident Indian (NRI) clients seeking legal services in India.

The platform will function as a multi-faceted tool: a lead generation engine, a direct booking and payment system for initial consultations, and a professional portfolio to showcase expertise and build trust. The website will be built using a modern technology stack (Next.js, Node.js) to ensure performance, security, and a seamless user experience, with a key focus on features tailored to an international audience, such as time zone-aware scheduling and international payment processing.

## 2.0 Project Goals & Objectives

The project is designed to achieve the following business goals, derived directly from stakeholder requirements:

1.  **Generate Qualified Leads:** To be the primary channel for attracting NRI clients seeking legal counsel in ancestral properties, divorce, property litigations, and civil/criminal matters.
2.  **Streamline Client Onboarding:** To facilitate direct, online booking and payment for initial consultations (30-min audio calls and document reviews), reducing administrative overhead and simplifying the process for international clients.
3.  **Establish Authority and Trust:** To serve as a professional online brochure that showcases 20 years of legal expertise, builds credibility with an NRI audience through testimonials, case studies, and expert content, and conveys a brand image of "Traditional Authority and Modern Efficiency."

## 3.0 Target Audience & User Journey

-   **Primary Audience:** Non-Resident Indians (NRIs) living abroad (e.g., in the USA, UK, Canada, Australia) who require legal representation or services within India, specifically in Hyderabad.
-   **Audience Needs:**
    -   Clear, trustworthy information on legal services.
    -   Easy-to-use scheduling that respects international time zones.
    -   Secure and reliable international payment options.
    -   Evidence of expertise and successful outcomes with other NRI clients.
    -   A professional and accessible point of contact.

-   **Ideal User Journey:**
    1.  An NRI user discovers the website via an online search or referral.
    2.  The user lands on the homepage and is immediately presented with a clear value proposition, highlighting the expertise in NRI-specific legal issues.
    3.  The user explores the 'Services' and 'About' pages, building confidence through the detailed bio, case studies, and testimonials.
    4.  The user navigates to the 'Booking' page and selects a consultation type (e.g., 30-min Audio Call).
    5.  The booking system displays available slots in the user's local time zone.
    6.  The user selects a time, fills out a brief intake form, and proceeds to payment via Razorpay or PayPal.
    7.  Upon successful payment, the user receives an automated confirmation email containing the appointment details, a WhatsApp contact for the audio call, and a link to a secure portal to upload any initial documents.

## 4.0 Scope of Work

### 4.1 In-Scope Features

| Priority | Feature                     | Description                                                                                                                                                             |
| :------- | :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **High** | **Booking System**          | An integrated scheduling system allowing users to book paid consultations. Must include time zone conversion and automatic real-time sync with Google Calendar.          |
| **High** | **Payment Gateway**         | Integration with **Razorpay** and **PayPal** to securely process international payments for consultation services.                                                          |
| **High** | **Secure Document Upload**  | A secure, encrypted portal or feature for clients to submit initial documents post-booking. This simplifies onboarding and ensures confidentiality.                       |
| **Medium** | **Case Studies/Testimonials** | Dedicated sections to showcase successful case outcomes and client testimonials, specifically focusing on past NRI clients to build social proof.                      |
| **Medium** | **Blog / Articles Section**   | A content management system (CMS) for publishing articles and blog posts on common legal issues for NRIs. This will aid in SEO and establish subject matter authority. |
| **-**      | **Responsive Design**       | The website will be fully responsive, providing an optimal user experience on desktop, tablet, and mobile devices.                                                       |
-      | **Dark Mode Support**       | A user-toggleable dark mode theme to enhance accessibility and user preference.                                                                                       |

### 4.2 Out-of-Scope for Initial Launch (Version 1.0)

-   Multi-language support (The website will be in English only).
-   Live chat functionality.
-   Advanced client portal with case tracking.
-   Direct video conferencing integration within the website (links will be provided via email/WhatsApp).
-   Full CRM integration beyond Google Calendar sync.

## 5.0 Success Metrics & KPIs

The success of the project will be measured against the following Key Performance Indicators (KPIs), to be reviewed on a monthly basis post-launch:

-   **Primary KPIs:**
    -   Number of successfully booked and paid consultations per month.
    -   Number of qualified leads generated via the contact form.
-   **Secondary KPIs:**
    -   User engagement metrics (e.g., average time on site, bounce rate, pages per session).
    -   Reduction in administrative time spent on manual scheduling and client follow-up.
    -   Keyword rankings for NRI-related legal search terms.

## 6.0 Stakeholders

| Name                      | Role                          | Contact                    |
| :------------------------ | :---------------------------- | :------------------------- |
| Kalanidhi Sanjeeva Kumar  | Client / Subject Matter Expert| +91 9440217782             |
| [Project Manager Name]    | Project Manager               | [TBD]                      |
| [Lead Developer Name]     | Lead Developer                | [TBD]                      |
| [UI/UX Designer Name]     | UI/UX Designer                | [TBD]                      |

## 7.0 Technical & Design Specifications

### 7.1 Technology Stack

-   **Frontend:** Next.js with Tailwind CSS
-   **Backend:** Node.js with Express.js
-   **Database:** PostgreSQL with Prisma ORM
-   **Deployment:** Vercel
-   **Development IDE:** Cursor

### 7.2 Design & User Experience

-   **Design Mood:** Professional, Modern, Approachable, Trustworthy, Efficient.
-   **Inspiration:** LegalZoom (clarity), Apple (minimalism, professionalism).
-   **Color Palette:**
    -   Primary: `#1B4F72` (Deep Blue)
    -   Secondary: `#2980B9` (Sky Blue)
    -   Accent: `#F39C12` (Amber)
    -   Background: `#F9F9F9` (Light Gray)
    -   Text: `#2C3E50` (Dark Gray)

### 7.3 Core Page Wireframes

-   **Layout Type:** Landing page style with clear, distinct sections.
-   **Navigation:** Top-fixed navigation bar.
-   **Pages:**
    1.  **Home (`/`)**:
        -   **Section 1 (Hero):** Compelling headline targeting NRIs, brief intro to Kalanidhi Sanjeeva Kumar, and a primary Call-to-Action (CTA) button: "Book a Consultation".
        -   **Section 2 (Services):** Cards outlining key practice areas (Ancestral Properties, Divorce, etc.) with short descriptions.
    2.  **Booking (`/booking`)**:
        -   **Section 1 (Service Selection):** Options to select "30-Minute Audio Call" or "Document Review Service," including price and description.
        -   **Section 2 (Scheduler):** An interactive calendar interface (e.g., Calendly embed or custom build) showing availability, with a time zone selector.

## 8.0 Project Governance & Management

### 8.1 Timeline

-   **Target Launch:** Within 3 months from project kickoff. A detailed project plan with specific milestones will be created separately.

### 8.2 Budget

-   A detailed budget will be finalized and approved following a comprehensive breakdown of the defined scope and feature implementation plan.

### 8.3 Assumptions & Constraints

-   **Assumptions:**
    -   The client will provide all necessary content (biography, service descriptions, case study details, testimonials, blog articles) in a timely manner.
    -   The client will provide administrative access to a Google Calendar for integration.
    -   The client will set up and provide API keys for Razorpay and PayPal business accounts.
-   **Constraints:**
    -   The 3-month timeline is a key constraint and scope changes will be managed via a formal change request process to assess impact.
    -   The initial budget is not yet defined and will be a primary constraint once established.

## 9.0 Platform-Specific Development Standards (Cursor IDE)

To ensure efficient AI-assisted development, all work will adhere to standards compatible with the Cursor IDE.

### 9.1 AI Context (`.cursorrules`)

The following `.cursorrules` file will be placed in the project root to provide consistent context to the AI for all code generation and editing tasks.

```
# .cursorrules

# 1. Project Context
# This is a website for Advocate Kalanidhi Sanjeeva Kumar, an Indian lawyer targeting NRI clients.
# The site's primary goals are lead generation and direct booking of paid consultations.
# The target audience is NRIs who need legal services in Hyderabad, India.
# The tone should be professional, trustworthy, and modern.

# 2. Tech Stack
# Frontend: Next.js (App Router) with TypeScript and Tailwind CSS.
# Backend: Node.js with Express.js, TypeScript, and Prisma ORM.
# Database: PostgreSQL.
# Deployment: Vercel.

# 3. Coding Standards
# - Use TypeScript for all new code.
# - Follow functional component patterns in React/Next.js with Hooks.
# - Name components using PascalCase (e.g., BookingCalendar.tsx).
# - Name utility functions and variables using camelCase.
# - Use absolute imports for modules within the `src` directory (e.g., `import Component from '@/components/Component'`).
# - All environment variables must be prefixed with `NEXT_PUBLIC_` for frontend access or handled server-side.
# - Write clear, descriptive commit messages.

# 4. Key Features to Remember
# - Booking system syncs with Google Calendar.
# - Payments are handled by Razorpay and PayPal.
# - Time zone conversion is critical for the booking feature.
# - A secure document upload feature is required post-booking.
```

### 9.2 Change Tracking (`changelog.md`)

A `changelog.md` file will be maintained to track significant changes, especially those generated or modified by the AI. This provides a human-readable history of the project's evolution.

**Example Initial Entry:**

```markdown
# Changelog

## [1.0.0-alpha] - 2023-10-27

### Added
-   **[AI-generated]** Initialized project structure with Next.js 14, Tailwind CSS, and TypeScript.
-   **[AI-generated]** Created basic layout components: `Navbar`, `Footer`, and `Section`.
-   **[Human-authored]** Set up `.cursorrules` and `changelog.md` for project governance.
```

## 10.0 Approval & Sign-off

This document requires sign-off from the primary stakeholder to confirm agreement on the project's direction, scope, and success criteria before development work commences.

---

**Client:** Kalanidhi Sanjeeva Kumar

**Signature:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Date:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

**Project Manager:** [Project Manager Name]

**Signature:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Date:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
```