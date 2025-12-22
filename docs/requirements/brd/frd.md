# BRD/FRD: Website for Kalanidhi Sanjeeva Kumar, Advocate

| **Document Type** | BRD / FRD (Business & Functional Requirements Document) |
| :--- | :--- |
| **Version** | 1.0 |
| **Date** | October 26, 2023 |
| **Status** | Final |
| **Author** | Technical Writer (AI) |

---

## 1. Introduction

### 1.1 Document Purpose
This document translates the business objectives and user needs gathered from the project questionnaire into a detailed set of functional requirements and user stories. It serves as the primary guide for the design, development, and implementation of the website for Kalanidhi Sanjeeva Kumar, Advocate.

### 1.2 Project Background
The project is to create a professional website for Kalanidhi Sanjeeva Kumar, a High Court advocate in Hyderabad, Telangana, with 20 years of experience. The website's primary function is to attract and engage Non-Resident Indian (NRI) clients who require legal services in India, specifically concerning ancestral properties, divorce, property litigations, and civil & criminal matters.

### 1.3 Target Audience
The primary user persona is the **Non-Resident Indian (NRI)**. This user lives abroad, likely in a different time zone (e.g., USA, UK, UAE, Australia), and is unfamiliar with the intricacies of the Indian legal system. They are looking for a trustworthy, experienced, and accessible legal expert to represent their interests in India.

### 1.4 Business Goals & Objectives
The website will be designed to achieve the following key business goals:
1.  **Lead Generation:** Generate qualified leads from NRIs seeking legal services.
2.  **Direct Booking & Revenue:** Facilitate direct online booking and payment for initial consultations.
3.  **Establish Authority:** Serve as a professional online brochure showcasing 20 years of legal expertise and building trust with a global audience.

### 1.5 Success Metrics
The success of the website will be measured against the following Key Performance Indicators (KPIs):
*   Number of booked consultations per month.
*   Number of submissions via the general contact form.
*   User engagement metrics (e.g., time on site, bounce rate, pages per session).
*   A measurable reduction in administrative time spent on scheduling and client onboarding.

---

## 2. Overall System & Design Requirements

### 2.1 General Design Philosophy
The website's aesthetic will convey a blend of **traditional authority and modern efficiency**. It must project professionalism and 20 years of experience while being approachable and easy to use for a non-technical, international audience. The design mood is **Professional, Modern, Approachable, Trustworthy, and Efficient**.

Inspiration is drawn from the clarity of *LegalZoom* and the minimalist, user-centric professionalism of *Apple*.

### 2.2 Recommended Technology Stack
*   **Frontend:** Next.js with Tailwind CSS
*   **Backend:** Node.js with Express.js
*   **Database:** PostgreSQL with Prisma ORM
*   **Deployment:** Vercel

### 2.3 Color Palette & Typography
The visual identity will be built around the following color scheme:

| Role | Color | Hex Code |
| :--- | :--- | :--- |
| Primary | Deep Blue | `#1B4F72` |
| Secondary | Sky Blue | `#2980B9` |
| Accent | Amber | `#F39C12` |
| Background | Light Gray | `#F9F9F9` |
| Text | Dark Gray | `#2C3E50` |

*   **Typography:**
    *   **Headings:** A professional serif font (e.g., Playfair Display) to convey authority.
    *   **Body Text:** A clean, readable sans-serif font (e.g., Lato, Open Sans) for modern accessibility.

### 2.4 Layout and Responsiveness
*   **Layout Type:** A modern landing page structure with clear sections.
*   **Navigation:** A fixed (sticky) top navigation bar for easy access to all main pages.
*   **Responsiveness:** The website must be fully responsive and provide an optimal viewing experience on desktop, tablet, and mobile devices.
*   **Dark Mode:** The website will include support for a dark mode theme to enhance user preference and viewing comfort.

---

## 3. Functional Requirements & User Stories

### 4.1 Core Website Pages & Content Sections

#### 4.1.1 Home Page (`/`)
*   **Description:** The Home Page is the primary entry point and must quickly communicate value, establish credibility, and guide users toward a consultation.
*   **Functional Requirements:**
    *   **FR-HP-001:** A hero section with a compelling headline targeting NRIs, a brief introduction to Kalanidhi Sanjeeva Kumar, and a primary Call-to-Action (CTA) button to "Book a Consultation".
    *   **FR-HP-002:** A "Services Offered" section with icons and brief descriptions for each practice area, linking to the main Services page.
    *   **FR-HP-003:** A condensed "About" section highlighting the 20 years of experience and linking to the full About page.
    *   **FR-HP-004:** A "Testimonials" section displaying a rotating carousel of 2-3 brief quotes from past NRI clients.
    *   **FR-HP-005:** A "Recent Articles" section previewing the 3 most recent blog posts to showcase expertise.
    *   **FR-HP-006:** A final, prominent CTA section to book a consultation.
*   **User Story:**
    ```
    As an NRI looking for a lawyer in India,
    I want to land on a homepage that immediately tells me who the lawyer is, what he specializes in, and why I should trust him,
    so I can quickly decide if he is the right fit for my legal issue.
    ```

#### 4.1.2 Services Page (`/services`)
*   **Description:** A detailed overview of all legal services offered.
*   **Functional Requirements:**
    *   **FR-SV-001:** Create dedicated sections for each practice area: Ancestral Properties, Divorce, Property Litigations, Civil Matters, and Criminal Matters.
    *   **FR-SV-002:** Each section must contain a detailed description of the service, common challenges faced by NRIs in that area, and how the advocate can help.
    *   **FR-SV-003:** Each service section should conclude with a CTA to book a relevant consultation.
*   **User Story:**
    ```
    As a potential client with a specific ancestral property dispute,
    I want to read detailed information about that particular service,
    so I can confirm the advocate has deep expertise in my exact area of need.
    ```

#### 4.1.3 Contact Page (`/contact`)
*   **Description:** A standard contact page for general inquiries.
*   **Functional Requirements:**
    *   **FR-CT-001:** A contact form with fields for Name, Email, Phone, Subject, and Message. The form must have spam protection (e.g., reCAPTCHA).
    *   **FR-CT-002:** The advocate's phone number (`+91 9440217782`) must be prominently displayed and clickable on mobile devices (`tel:` link).
    *   **FR-CT-003:** Display the physical office address and an embedded Google Map for location reference.
*   **User Story:**
    ```
    As a user with a preliminary question not yet ready for a paid consultation,
    I want to easily find a contact form or phone number,
    so I can reach out with my general inquiry.
    ```

### 4.2 Booking System (High Priority)
*   **Description:** An integrated system that allows NRI clients to schedule and pay for consultations seamlessly.
*   **Functional Requirements:**
    *   **FR-BK-001 (Time Zone Selection):** The booking interface MUST present a dropdown menu for the user to select their local time zone. All available appointment slots MUST dynamically adjust and display in the user's selected time zone.
    *   **FR-BK-002 (Consultation Types):** The system will offer two distinct, paid services on the booking page (`/booking`):
        1.  **30-Minute Audio Call:** Includes a price and description.
        2.  **Document Review Service:** Includes a price and a description of what it entails (e.g., "Review of up to X pages of legal documents followed by a summary email").
    *   **FR-BK-003 (Google Calendar Sync):** The system MUST integrate with Kalanidhi Sanjeeva Kumar's Google Calendar via API. The integration must be two-way:
        *   Reads the advocate's "busy" slots from Google Calendar to show only real-time availability.
        *   Writes new, confirmed appointments from the website directly into the Google Calendar, including client details and consultation type.
    *   **FR-BK-004 (Intake Form):** After a user selects a service and time slot, a mandatory intake form must be displayed. Fields: Full Name, Email, Phone Number (with country code selector), and a multi-line text area for "Brief Description of Your Legal Matter."
    *   **FR-BK-005 (Automated Confirmation Email):** Upon successful payment, the system MUST automatically trigger a confirmation email to the client's provided email address.
    *   **FR-BK-006 (Confirmation Email Content):** The confirmation email template MUST contain:
        *   Client Name
        *   Appointment Type (e.g., "30-Minute Audio Call")
        *   Date and Time (displayed in the client's chosen time zone)
        *   Payment receipt/confirmation number.
        *   Clear instructions: "Mr. Kumar will contact you via WhatsApp audio call at the scheduled time on the phone number you provided."
        *   A link to the secure document submission portal (see Section 4.5).
*   **User Stories:**
    ```
    As an NRI living in California,
    I want to see the advocate's availability in my local Pacific Standard Time (PST),
    so I can book a meeting at a convenient time without manual time zone calculations.
    ```
    ```
    As an advocate,
    I want my website's booking system to automatically sync with my Google Calendar,
    so that my availability is always accurate and I avoid any scheduling conflicts.
    ```

### 4.3 Payment Gateway Integration (High Priority)
*   **Description:** Integration of secure payment gateways to process international payments for consultations.
*   **Functional Requirements:**
    *   **FR-PG-001 (Primary Gateway - Razorpay):** Integrate Razorpay as the primary payment processor to handle a wide range of payment methods, including international credit/debit cards and other methods it supports.
    *   **FR-PG-002 (Secondary Gateway - PayPal):** Integrate PayPal as an alternative payment option to provide flexibility and trust for users who prefer it.
    *   **FR-PG-003 (Secure Checkout Flow):** The checkout process must redirect to the payment gateway's secure interface or use the gateway's secure iframe/modal. No sensitive payment information (e.g., credit card numbers) shall be stored on the website's database.
    *   **FR-PG-004 (Payment Confirmation):** Upon successful payment, the gateway's API response must trigger the booking confirmation process (see FR-BK-005). If payment fails, the user must be shown a clear error message and allowed to try again.
*   **User Story:**
    ```
    As an NRI from the UK,
    I want to pay for my consultation using my credit card or PayPal,
    so I can complete the transaction using a familiar and secure method.
    ```

### 4.4 Trust-Building Content (Medium Priority)

#### 4.4.1 Case Studies & Testimonials
*   **Description:** Sections dedicated to showcasing past successes and client satisfaction to build credibility.
*   **Functional Requirements:**
    *   **FR-CS-001:** A "Case Studies" page (`/case-studies`) that allows for the creation of individual case study entries. Each entry must have fields for: Title, Problem/Challenge, Legal Strategy/Process, and Outcome. All client data must be anonymized.
    *   **FR-TS-001:** A "Testimonials" page (`/testimonials`) that displays client testimonials. Each testimonial must include fields for: Client Quote, Client Name (First Name, Last Initial), and Client Location (e.g., "USA," "Dubai").
*   **User Story:**
    ```
    As a cautious potential client,
    I want to read about real-world case studies and see testimonials from other NRIs,
    so I can gain confidence that this advocate has a proven track record of success with clients like me.
    ```

#### 4.4.2 Blog & Multimedia Content
*   **Description:** An expert blog and video section to establish thought leadership and improve SEO.
*   **Functional Requirements:**
    *   **FR-BG-001:** A blog section (`/blog`) with a main page listing all articles (title, excerpt, featured image) and individual pages for each full article.
    *   **FR-BG-002:** Article pages must support rich text formatting, images, and embedded YouTube videos.
    *   **FR-BG-003:** Article topics should focus on legal issues relevant to NRIs to attract organic search traffic.
*   **User Story:**
    ```
    As an NRI researching a property issue in India,
    I want to find insightful articles or videos that explain the complexities involved,
    so I can educate myself and recognize the author as an authority on the subject.
    ```

### 4.5 Secure Document Submission (High Priority)
*   **Description:** A secure, private area for clients to upload sensitive documents prior to a consultation.
*   **Functional Requirements:**
    *   **FR-DS-001 (Secure Client Portal):** Upon successful booking, the system will generate a unique, time-limited, and authenticated access link for the client to a private upload page. This link will be included in the confirmation email.
    *   **FR-DS-002 (File Upload Interface):** The upload page will feature a simple drag-and-drop or file-selection interface. It must support common document types (`.pdf`, `.docx`, `.jpg`, `.png`) with a file size limit of 10MB per file and allow multiple file uploads.
    *   **FR-DS-003 (Secure Storage):** All uploaded files MUST be stored in a secure, private cloud storage bucket (e.g., AWS S3 or equivalent with private access controls) and not in a publicly accessible web server directory. All data transfer must be encrypted via HTTPS.
    *   **FR-DS-004 (Admin Retrieval):** The advocate will have a secure admin dashboard where they can view bookings and download the associated documents for each client.
*   **User Story:**
    ```
    As a client preparing for a document review consultation,
    I want a secure and easy-to-use portal to upload my confidential legal papers,
    so the advocate can review them beforehand and our consultation time is used effectively.
    ```

---

## 5. Non-Functional Requirements

| ID | Category | Requirement |
| :--- | :--- | :--- |
| **NFR-01** | **Performance** | The website must achieve a Google PageSpeed Insights score of 85+ on both mobile and desktop. First Contentful Paint (FCP) should be under 1.8 seconds. |
| **NFR-02** | **Security** | The entire website must be served over HTTPS. Implement security best practices including Content Security Policy (CSP), HSTS headers, and protection against XSS and CSRF. |
| **NFR-03** | **SEO** | The site must be built with SEO in mind, including semantic HTML5, dynamic generation of `sitemap.xml`, a `robots.txt` file, and unique, descriptive meta titles and descriptions for all pages. |
| **NFR-04** | **Accessibility** | The website must comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. This includes keyboard-only navigation, sufficient color contrast ratios (4.5:1 for normal text), and ARIA labels for interactive elements. |
| **NFR-05** | **Scalability** | The backend architecture and database schema must be designed to handle an initial load of up to 100 concurrent users and a growing number of client records without performance degradation. |
| **NFR-06** | **Usability** | The user journey from landing on the site to booking a consultation should be intuitive and require a minimal number of clicks. All forms and interactive elements must be clearly labeled. |

---

## 6. Assumptions and Dependencies

*   **Content Provision:** All written content (bios, service descriptions), case study details, and testimonials will be provided by the client, Kalanidhi Sanjeeva Kumar, in a timely manner.
*   **Account Setup:** The client is responsible for creating and providing access credentials for the Google Calendar account, as well as setting up merchant accounts for Razorpay and PayPal.
*   **Timeline:** The target 3-month launch timeline is dependent on prompt feedback on design mockups, UAT, and the timely delivery of all required content and credentials.
*   **Scope:** Any feature or functionality not explicitly defined in this document is considered out of scope for the initial launch and will require a separate change request.