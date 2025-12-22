# Identity & Authentication Security Model

- **Project:** `lawyers`
- **Document Type:** Security
- **Version:** 1.0
- **Date:** 2023-10-27
- **Author:** Technical Writer

---

## 1. Overview

### 1.1. Purpose

This document defines the identity, authentication, and authorization model for the advocate's legal services website. Its primary objective is to establish a robust security framework for managing user accounts and protecting Personally Identifiable Information (PII) and sensitive client documents. This model governs how the advocate (Administrator) accesses the backend and how clients gain temporary, secure access to a portal for document submission.

### 1.2. Scope

This document covers:
- **User Roles and Permissions:** Defines the distinct roles within the system and their associated access rights.
- **Authentication Mechanisms:** Specifies the processes for verifying the identity of both the administrator and clients.
- **Authorization Logic:** Details how the system enforces permissions and ensures users can only access data relevant to them.
- **Data Security Protocols:** Outlines measures for protecting data at rest and in transit, with a focus on PII and uploaded legal documents.

This document does **not** cover:
- Security models of third-party services like Razorpay, PayPal, or Google Calendar. These services are governed by their own security policies.
- The physical security of the deployment infrastructure (managed by Vercel).

### 1.3. Target Audience

This document is intended for the development team, including backend and frontend developers, and project stakeholders who need to understand the website's security architecture.

## 2. User Roles and Access Levels

The system will operate with two distinct user roles, each with a specific set of permissions to enforce the principle of least privilege.

| Role | Description | Permissions |
| :--- | :--- | :--- |
| **Administrator** | The advocate, Kalanidhi Sanjeeva Kumar. This role has full control over the website's content and operational settings. | - Full CRUD access to blog posts, case studies, and testimonials.<br>- Manage booking availability via Google Calendar integration.<br>- View all client bookings and submitted documents.<br>- Access the admin dashboard. |
| **Client** | An NRI who has successfully booked and paid for a consultation. This role has temporary, limited access to a secure portal. | - View their own specific booking details.<br>- Upload documents related to their specific booking.<br>- No ability to view or access any other part of the site or other client data. |

## 3. Authentication Model

Authentication is the process of verifying a user's identity. We will implement distinct, fit-for-purpose mechanisms for the Administrator and the Client.

### 3.1. Administrator Authentication

The administrator will have a persistent account to manage the website.

- **Mechanism:** Secure credential-based login (email and password).
- **Endpoint:** The admin login portal will be located at a non-standard, obfuscated URL (e.g., `/ksk-admin-portal`) instead of a common path like `/admin` or `/login` to reduce automated attacks.
- **Password Security:** Passwords will be securely stored in the PostgreSQL database using the **`bcrypt`** hashing algorithm with a cost factor of at least 12. Plain-text passwords will never be stored.
- **Session Management:** Upon successful login, the server will issue a JSON Web Token (JWT) pair:
    - **Access Token:** Short-lived (e.g., 15 minutes), stored in memory on the frontend, and used to authenticate API requests.
    - **Refresh Token:** Longer-lived (e.g., 7 days), stored in a secure, `httpOnly` cookie to prevent XSS access. It is used to obtain a new access token without requiring the user to log in again.
- **Security Measures:**
    - **Brute-Force Protection:** The login endpoint will be rate-limited to a maximum of 5 failed attempts per IP address per 15-minute window.
    - **Secure Transmission:** All authentication requests will occur exclusively over HTTPS.

### 3.2. Client Authentication

To minimize friction and enhance security, clients will **not** create persistent accounts with passwords. Instead, access to the secure document submission portal is granted on-demand following a successful booking.

- **Mechanism:** Secure Magic Link (Token-based, passwordless authentication).
- **Workflow:**
    1. A client completes the booking form and makes a successful payment via Razorpay or PayPal.
    2. Upon payment confirmation, the backend:
        a. Creates a `Client` record and a `Booking` record in the database.
        b. Generates a cryptographically secure, single-use token associated with the `Client` and `Booking` ID.
        c. Stores a hash of the token in the database with an expiration timestamp (e.g., 24 hours).
    3. The confirmation email sent to the client includes a unique "magic link" containing this token. Example: `https://<your-domain>.com/portal/upload?token=<UNIQUE_SECURE_TOKEN>`.
    4. When the client clicks the link, the frontend sends the token to a verification endpoint.
    5. The backend verifies the token is valid, unexpired, and has not been used. If valid, it issues a very short-lived session token (JWT, valid for 60 minutes) that grants access solely to the document upload portal for that specific booking.
- **Security Measures:**
    - **Time-Limited:** Magic link tokens expire after 24 hours to limit the window of opportunity for misuse.
    - **Single-Use:** Once a token is used to generate a session, it is invalidated in the database and cannot be used again.
    - **Secure Transmission:** All communication occurs over HTTPS.

## 4. Authorization Model

Authorization determines what an authenticated user is allowed to do. This will be enforced on the backend for every API request requiring permissions.

- **Administrator:** The admin's JWT will contain a `role: 'ADMIN'` claim. API middleware will check for this role on all administrative routes (e.g., `api/admin/*`). The admin has global access to all bookings and client data.

- **Client:** The client's short-lived JWT will contain a `role: 'CLIENT'` claim, as well as the `bookingId` and `clientId`. API middleware will enforce the following rule:
    - A client can only access resources where the resource's `bookingId` or `clientId` matches the one in their JWT.
    - This prevents a client from accessing another client's data by guessing URLs (e.g., `/api/bookings/123` will fail if the token is for booking `456`).

### Example: API Route Protection (Node.js/Express)

```javascript
// middleware/auth.js

import jwt from 'jsonwebtoken';

// Middleware to protect admin routes
export const protectAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Middleware to protect client portal routes
export const protectClient = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_CLIENT_SECRET);
    if (decoded.role !== 'CLIENT') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    // Attach client and booking IDs to the request for further checks
    req.client = { id: decoded.clientId, bookingId: decoded.bookingId };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Session expired or invalid' });
  }
};

// Example usage in an Express route
// router.get('/admin/bookings', protectAdmin, getAllBookings);
// router.post('/portal/documents', protectClient, handleDocumentUpload);
```

## 5. Data Security and PII Handling

Protecting client data is paramount. The following measures will be implemented.

- **Data in Transit:** All website traffic will be forced to use **HTTPS (TLS 1.2+).** The Vercel deployment platform provides automated SSL certificates and enforces this by default.
- **Data at Rest:**
    - **Database:** The PostgreSQL database will be configured with encryption at rest.
    - **Client Documents:** All uploaded documents will be stored in a secure, private object storage bucket (e.g., AWS S3 or compatible). **Server-Side Encryption (SSE-S3 with AES-256)** will be enabled on the bucket to ensure all objects are encrypted automatically. Documents will be accessed via pre-signed, short-lived URLs generated by the backend, ensuring they are not publicly accessible.
- **Session Security:**
    - All JWTs will be signed using a strong secret (`HS256` algorithm) stored securely as an environment variable (`JWT_SECRET`).
    - The administrator's refresh token will be stored in an `httpOnly`, `secure`, and `SameSite=Strict` cookie to mitigate CSRF and XSS attacks.
- **PII Handling:** Access to PII (client names, emails, phone numbers, case details) will be strictly limited by the authorization model. All security event logs will be sanitized to exclude any PII.

### Example: Prisma Schema for Authorization

The database schema will be designed to enforce data isolation between clients.

```prisma
// schema.prisma

model Client {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String
  phone     String?
  bookings  Booking[]
}

model Booking {
  id         String     @id @default(cuid())
  client     Client     @relation(fields: [clientId], references: [id])
  clientId   String
  createdAt  DateTime   @default(now())
  // ... other booking details
  documents  Document[]
}

model Document {
  id         String   @id @default(cuid())
  fileName   String
  storageKey String   // The key/path in the S3 bucket
  booking    Booking  @relation(fields: [bookingId], references: [id])
  bookingId  String
  uploadedAt DateTime @default(now())
}
```
This structure ensures that a document is always tied to a booking, which is in turn tied to a single client, making authorization checks at the API level straightforward.

## 6. Security Best Practices Summary

- **OWASP Top 10:** The design and development process will actively mitigate risks outlined in the OWASP Top 10, including Injection, Broken Authentication, and Insecure Design.
- **Dependency Management:** Use `npm audit` or similar tools regularly to scan for and patch vulnerable dependencies.
- **Error Handling:** Generic error messages will be returned to the client to avoid revealing implementation details, while detailed errors are logged on the server.
- **Security Headers:** The application will be configured to send security headers such as `Content-Security-Policy`, `X-Content-Type-Options`, and `Strict-Transport-Security`.

---
## 7. Document Revision History

| Version | Date       | Author           | Changes                                      |
| :------ | :--------- | :--------------- | :------------------------------------------- |
| 1.0     | 2023-10-27 | Technical Writer | Initial draft of the Identity & Auth document. |