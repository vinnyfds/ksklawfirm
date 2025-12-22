# Testing Strategy: NRI Advocate Website

- **Document Type**: Testing Strategy
- **Category**: Delivery
- **Project**: `lawyers`
- **Date**: October 26, 2023
- **Version**: 1.0

---

## 1. Introduction

### 1.1. Document Purpose
This document outlines the comprehensive testing strategy for the development of the advocate website for Kalanidhi Sanjeeva Kumar. Its purpose is to define the testing approach, methodologies, tools, and criteria required to ensure the website is reliable, secure, and meets all functional and non-functional requirements before deployment. The primary focus is on validating the critical user journeys for Non-Resident Indian (NRI) clients, specifically the consultation booking and payment processes.

### 1.2. Project Overview
The project is to build a modern, professional website for advocate Kalanidhi Sanjeeva Kumar, targeting NRIs seeking legal services in India. The website's core functionalities include a booking system for paid consultations with timezone awareness, integration with international payment gateways (Razorpay, PayPal), a secure portal for document submission, and content to establish authority and trust (blog, case studies).

**Tech Stack:**
- **Frontend**: Next.js with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel

### 1.3. Scope of Testing

#### In-Scope
- **Functional Testing**: All features defined in the project requirements, including:
    - Consultation Booking System (including timezone logic and Google Calendar sync).
    - Payment Gateway Integrations (Razorpay and PayPal).
    - Secure Document Submission.
    - User-facing pages (Home, Booking, Blog, Case Studies).
    - Contact Form functionality.
- **Non-Functional Testing**:
    - API and Frontend Performance.
    - Security of the application and data.
    - Cross-browser and cross-device responsiveness (including Dark Mode).
    - Accessibility (a11y).
- **Integration Testing**: All integrations with third-party services (Google, Razorpay, PayPal).

#### Out-of-Scope
- Performance, uptime, or security of third-party services themselves (e.g., Razorpay's internal processing, Google Calendar's API availability).
- Testing of the underlying Vercel infrastructure.
- Formal load testing beyond validating API performance under a simulated moderate load.

## 2. Testing Objectives

The key objectives of our testing process are:
- **Correctness**: To verify that all features are implemented according to the project specifications and business goals.
- **Reliability**: To ensure the critical paths—booking and payment—are robust, fault-tolerant, and function consistently.
- **Security**: To identify and mitigate security vulnerabilities, ensuring client data and payment information are handled securely.
- **Usability**: To validate that the website is intuitive, accessible, and provides a seamless experience for NRIs across different timezones and devices.
- **Performance**: To ensure fast page loads and responsive API interactions, building user trust and improving SEO.
- **Confidence**: To provide the development team and the client with high confidence for a successful production launch.

## 3. Testing Levels & Types

We will employ a multi-layered testing approach, following the principles of the testing pyramid.

### 3.1. Unit Testing
Unit tests form the foundation of our quality assurance, ensuring that individual functions and components work correctly in isolation.

- **Goal**: Verify the logic of individual units (functions, React components) without external dependencies.
- **Tools**:
    - **Frontend (Next.js)**: `Jest` and `React Testing Library`.
    - **Backend (Node.js)**: `Jest` and `supertest`.
- **Coverage Target**: We aim for a minimum of **80% code coverage** on all new business logic, particularly for utility functions (e.g., timezone conversion, date formatting) and API endpoint controllers.
- **Example (Utility Function Test with Jest)**:

```javascript
// utils/validation.js
export const isValidIndianPhoneNumber = (phone) => {
  const phoneRegex = /^(?:\+91)?[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// __tests__/utils/validation.test.js
import { isValidIndianPhoneNumber } from '../utils/validation';

describe('isValidIndianPhoneNumber', () => {
  it('should return true for a valid 10-digit number', () => {
    expect(isValidIndianPhoneNumber('9440217782')).toBe(true);
  });

  it('should return true for a valid number with +91 prefix', () => {
    expect(isValidIndianPhoneNumber('+919440217782')).toBe(true);
  });

  it('should return false for an invalid number', () => {
    expect(isValidIndianPhoneNumber('12345')).toBe(false);
  });
});
```

### 3.2. Integration Testing
Integration tests verify that different parts of the system work together as expected.

- **Goal**: Test the interaction between components, such as frontend-to-backend API calls, backend-to-database operations, and integrations with third-party APIs.
- **Tools**: `React Testing Library` (for component integration), `supertest` with a dedicated test database (for API-DB integration).
- **Key Scenarios**:
    - **API & Database**: Submitting a new booking via an API call and verifying that the correct record is created in the PostgreSQL database using Prisma.
    - **Frontend & Backend**: A user fills out the booking form on the Next.js frontend, and we verify that the correct API request is sent to the Node.js backend.
    - **Third-Party Services**:
        - On successful booking, verify that a call is made to the Google Calendar API to create an event.
        - When initiating payment, verify that the backend correctly generates a payment order with Razorpay/PayPal.
        - **Note**: These external API calls will be mocked to avoid actual side effects and ensure test reliability.

### 3.3. End-to-End (E2E) Testing
E2E tests simulate complete user journeys from the user's perspective, running the full application in a browser.

- **Goal**: Validate critical business flows from start to finish.
- **Tool**: `Cypress`.
- **Critical User Journeys**:
    1.  **Successful Booking (Razorpay)**: User lands on the site, navigates to `/booking`, selects a service, chooses a timezone-adjusted slot, fills in personal details, is redirected to Razorpay, completes a test payment, is redirected back, and sees a confirmation message.
    2.  **Successful Booking (PayPal)**: Same flow as above, but using the PayPal payment option.
    3.  **Booking with Failed Payment**: User attempts a payment that fails, is shown a clear error message, and is allowed to retry the payment.
    4.  **Google Calendar Sync Validation**: After a successful test booking, manually (or via a test-only API endpoint) verify that the corresponding event was created in the test Google Calendar.
    5.  **Secure Document Upload**: After booking, the user navigates to the secure client area and successfully uploads a test document.
    6.  **Responsive and Dark Mode Checks**: The E2E suite will run against various viewports (mobile, tablet, desktop) to ensure responsiveness. A specific test will toggle dark mode and assert key UI elements have the correct styling.
- **Example (Cypress E2E Test Snippet)**:

```javascript
// cypress/e2e/booking.cy.js
describe('Booking Flow', () => {
  it('allows an NRI user to book and pay for a consultation', () => {
    cy.visit('/booking');

    // Section 1: Select service and time
    cy.contains('30-minute Audio Call').click();
    cy.get('[data-cy="timezone-select"]').select('America/New_York');
    cy.get('[data-cy="available-slot"]').first().click();

    // Section 2: Fill details
    cy.get('input[name="name"]').type('Test NRI Client');
    cy.get('input[name="email"]').type('test.client@example.com');
    cy.get('textarea[name="legalIssue"]').type('Query about ancestral property.');
    cy.get('[data-cy="submit-booking-details"]').click();

    // Section 3: Payment (mocked in test environment)
    cy.contains('Proceed to Payment').click();
    // Cypress commands to interact with mocked Razorpay/PayPal flow
    cy.get('[data-cy="mock-payment-success"]').click();

    // Section 4: Confirmation
    cy.url().should('include', '/booking/success');
    cy.contains('Your consultation is confirmed!');
  });
});
```

### 3.4. User Acceptance Testing (UAT)
UAT is the final phase of testing, where the client validates the website against the business requirements.

- **Executor**: Kalanidhi Sanjeeva Kumar (or a designated representative).
- **Environment**: A password-protected staging environment deployed on Vercel.
- **Process**: The client will be provided with a checklist of test scenarios that mirror the E2E user journeys. Feedback and bugs will be logged in GitHub Issues for resolution. UAT sign-off is mandatory for production deployment.

## 4. Non-Functional Testing

### 4.1. Performance Testing
- **Tools**: Google Lighthouse, Vercel Analytics.
- **Metrics & Goals**:
    - **Largest Contentful Paint (LCP)**: Below 2.5 seconds.
    - **First Input Delay (FID)**: Below 100ms.
    - **Cumulative Layout Shift (CLS)**: Below 0.1.
    - **API Response Time**: P95 response time for critical endpoints (e.g., `/api/availability`, `/api/booking`) should be under 500ms.

### 4.2. Security Testing
- **Approach**: A proactive, checklist-based approach focusing on common web vulnerabilities.
- **Key Areas**:
    - **Data Handling**: All sensitive data will be transmitted over HTTPS (enforced by Vercel). Payment tokens from gateways will be handled on the client-side and never stored on our server.
    - **Input Sanitization**: All user inputs will be validated on both the frontend and backend to prevent Cross-Site Scripting (XSS). Prisma ORM will be used to prevent SQL injection.
    - **Secure File Uploads**: The document submission feature will use pre-signed URLs to upload files directly to a secure, private cloud storage bucket (e.g., AWS S3), ensuring files do not pass through our server.
    - **Dependency Scanning**: Use `npm audit` or GitHub's Dependabot to scan for vulnerabilities in third-party packages.
    - **Environment Variables**: All secrets (API keys, database URLs) will be managed as environment variables in Vercel and will not be committed to the repository.

### 4.3. Compatibility & Accessibility Testing
- **Browser Support**: Latest two versions of Chrome, Firefox, Safari, and Edge.
- **Device Support**: Testing on emulated and real devices for common mobile, tablet, and desktop resolutions.
- **Accessibility (a11y)**:
    - Adherence to WCAG 2.1 Level AA guidelines.
    - Use of semantic HTML5.
    - Ensuring full keyboard navigability.
    - Use of ARIA attributes where necessary.
    - **Tool**: Automated checks using `eslint-plugin-jsx-a11y` and browser tools like `axe`.

## 5. Test Environment & Data Management

| Environment       | URL                                  | Database                  | Purpose                                        |
| ----------------- | ------------------------------------ | ------------------------- | ---------------------------------------------- |
| **Local**         | `localhost:3000`                     | Local PostgreSQL instance | Development and unit/integration testing       |
| **Staging/Preview** | `*-lawyers.vercel.app` (per PR)      | Dedicated Test Database   | E2E testing, Integration testing, UAT          |
| **Production**    | `[final-domain.com]`                 | Production Database       | Live user traffic                              |

- **Test Data**: The test database will be seeded with non-sensitive, realistic data. Test accounts for Razorpay, PayPal, and Google Calendar will be configured in the Staging environment. **No production data will ever be used for testing.**

## 6. Defect Management

- **Tool**: GitHub Issues.
- **Process**: Defects will be logged with a standard template including:
    - **Title**: A clear, concise summary.
    - **Description**: Detailed steps to reproduce the issue.
    - **Expected vs. Actual Results**.
    - **Environment**: (e.g., Browser, OS, Staging URL).
    - **Priority**:
        - **P1 (Blocker)**: Prevents critical functionality; no workaround.
        - **P2 (Critical)**: Major functionality is broken; a workaround exists but is difficult.
        - **P3 (Major)**: A non-critical feature is broken or has a significant issue.
        - **P4 (Minor)**: UI/UX issue, typo, or cosmetic bug.
    - **Screenshots/Logs**.

## 7. Roles & Responsibilities

- **Developer(s)**: Write and maintain unit and integration tests. Fix bugs reported during testing cycles.
- **QA/Test Lead**: Design and maintain E2E test suites. Execute manual exploratory testing. Manage the defect lifecycle.
- **Project Manager**: Oversee the entire testing process and ensure adherence to the strategy.
- **Client (Kalanidhi Sanjeeva Kumar)**: Participate in and provide sign-off for User Acceptance Testing (UAT).

## 8. Entry and Exit Criteria

### 8.1. Entry Criteria (For starting a formal test cycle)
- Feature development for the sprint/milestone is complete.
- The build is successfully deployed to the Staging environment.
- All unit and integration tests are passing in the CI/CD pipeline.

### 8.2. Exit Criteria (For production deployment)
- All E2E tests for critical paths are passing.
- 100% of P1 and P2 defects are resolved and verified.
- No known critical regressions from previous versions.
- UAT has been completed and formally signed off by the client.
- Performance, accessibility, and security checks meet the defined targets.