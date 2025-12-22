# API Contracts: Lawyer Booking Website

**Document Purpose:** This document defines the API contracts and communication protocol between the frontend (Next.js) and backend (Node.js) services for the lawyer booking website. It establishes a clear specification for data models, endpoints, and request/response formats to facilitate parallel development and ensure seamless integration.

**Category:** Architecture

**Project:** lawyers

---

## 1. General Conventions

### 1.1. Base URL

All API endpoints described in this document are relative to the following base URL. The version is included in the path to allow for future API revisions without breaking existing clients.

-   **Development:** `http://localhost:3001/api/v1`
-   **Production:** `https://api.ksklegal.in/api/v1` (Example URL)

### 1.2. Authentication

-   Public endpoints, such as fetching availability or blog posts, do not require authentication.
-   Endpoints that handle user-specific data, such as creating a booking or uploading documents, require authentication.
-   Authentication will be handled via JSON Web Tokens (JWT). The client must include the token in the `Authorization` header with the `Bearer` scheme.
    -   `Authorization: Bearer <your_jwt_token>`

### 1.3. Date & Time Format

All dates and times in requests and responses will be in **ISO 8601 format** and expressed in **UTC**. It is the responsibility of the frontend client to convert these times to the user's selected timezone for display.

Example: `2023-10-27T10:00:00.000Z`

### 1.4. Standard Error Response

All API errors (status codes `4xx` and `5xx`) will return a consistent JSON object.

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested booking could not be found.",
    "details": "Booking with ID 'bkg-123-xyz' does not exist."
  }
}
```

-   `code`: A machine-readable error code.
-   `message`: A developer-friendly error message.
-   `details`: (Optional) More specific information about the error.

### 1.5. Naming Conventions

-   Endpoints and resource names use `kebab-case`.
-   JSON properties use `camelCase`.
-   IDs are prefixed for clarity (e.g., `bkg_` for booking, `pay_` for payment).

---

## 2. Data Models (Schemas)

These are the primary data structures used throughout the API.

### 2.1. `Consultation`

Represents a type of service offered.

```json
{
  "id": "consult_30m_audio",
  "name": "30-Minute Audio Call",
  "description": "An initial 30-minute consultation via WhatsApp audio call to discuss your case.",
  "durationMinutes": 30,
  "price": {
    "amount": 5000,
    "currency": "INR"
  }
}
```

### 2.2. `AvailabilitySlot`

Represents a bookable time slot derived from Google Calendar.

```json
{
  "startTime": "2023-11-15T09:30:00.000Z",
  "endTime": "2023-11-15T10:00:00.000Z"
}
```

### 2.3. `Booking`

Represents a client's confirmed booking.

```json
{
  "id": "bkg_a1b2c3d4e5f6",
  "consultationId": "consult_30m_audio",
  "clientName": "John Doe",
  "clientEmail": "john.doe@example.com",
  "clientTimezone": "America/New_York",
  "startTime": "2023-11-15T09:30:00.000Z",
  "endTime": "2023-11-15T10:00:00.000Z",
  "status": "confirmed", // 'pending_payment', 'confirmed', 'completed', 'cancelled'
  "intakeNotes": "Brief summary of the legal issue regarding ancestral property.",
  "meetingLink": "https://wa.me/919440217782",
  "createdAt": "2023-10-27T11:00:00.000Z"
}
```

### 2.4. `PaymentOrder`

Represents a payment order created with a gateway.

```json
{
  "orderId": "order_MqiXq123456Abc",
  "gateway": "Razorpay", // 'Razorpay', 'PayPal'
  "amount": 5000,
  "currency": "INR"
}
```

---

## 3. API Endpoints

### 3.1. Availability & Consultations

#### `GET /consultations`

Fetches the list of available consultation types.

-   **Description:** Retrieves all service types that can be booked.
-   **Permissions:** Public
-   **Request:**
    -   Method: `GET`
-   **Response (200 OK):**

```json
{
  "data": [
    {
      "id": "consult_30m_audio",
      "name": "30-Minute Audio Call",
      "description": "An initial 30-minute consultation via WhatsApp audio call to discuss your case.",
      "durationMinutes": 30,
      "price": { "amount": 5000, "currency": "INR" }
    },
    {
      "id": "consult_doc_review",
      "name": "Document Review",
      "description": "Professional review of your legal documents.",
      "durationMinutes": 0,
      "price": { "amount": 10000, "currency": "INR" }
    }
  ]
}
```

---

#### `GET /availability`

Fetches available time slots for a specific consultation type. The backend will query the integrated Google Calendar and return open slots.

-   **Description:** Retrieves a list of open appointment slots for a given month and consultation type. The client is responsible for filtering these by day.
-   **Permissions:** Public
-   **Request:**
    -   Method: `GET`
    -   Query Parameters:
        -   `consultationId` (string, required): The ID of the consultation type (e.g., `consult_30m_audio`).
        -   `year` (number, required): The year to query (e.g., `2023`).
        -   `month` (number, required): The month to query, 1-12 (e.g., `11` for November).
        -   `timezone` (string, required): The client's IANA timezone (e.g., `America/New_York`). This is used for timezone-aware calculations if needed on the backend, though the primary conversion happens on the client.
-   **Response (200 OK):**
    -   Body: A list of `AvailabilitySlot` objects.

```json
{
  "data": [
    {
      "startTime": "2023-11-15T09:30:00.000Z",
      "endTime": "2023-11-15T10:00:00.000Z"
    },
    {
      "startTime": "2023-11-15T10:00:00.000Z",
      "endTime": "2023-11-15T10:30:00.000Z"
    },
    {
      "startTime": "2023-11-16T14:00:00.000Z",
      "endTime": "2023-11-16T14:30:00.000Z"
    }
  ]
}
```

-   **Error Responses:**
    -   `400 Bad Request`: Missing or invalid query parameters.

### 3.2. Booking Workflow

#### `POST /bookings`

Creates a new booking request. The initial status is `pending_payment`. This endpoint should also create a corresponding payment order.

-   **Description:** The first step in the booking process. The client selects a time slot and provides their details. The response includes payment order details for the frontend to initialize the payment gateway UI.
-   **Permissions:** Public (A user account may be created implicitly, and a JWT returned for subsequent actions).
-   **Request:**
    -   Method: `POST`
    -   Body:

```json
{
  "consultationId": "consult_30m_audio",
  "startTime": "2023-11-15T09:30:00.000Z",
  "client": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "timezone": "America/New_York"
  },
  "intakeNotes": "Need to discuss a property litigation matter in Hyderabad.",
  "paymentGateway": "Razorpay" // 'Razorpay' or 'PayPal'
}
```

-   **Response (201 Created):**
    -   The response contains the newly created booking (with status `pending_payment`) and the payment order details needed by the frontend. The `authToken` is provided for the client to use in subsequent authenticated requests.

```json
{
  "data": {
    "booking": {
      "id": "bkg_a1b2c3d4e5f6",
      "consultationId": "consult_30m_audio",
      "clientName": "John Doe",
      "clientEmail": "john.doe@example.com",
      "clientTimezone": "America/New_York",
      "startTime": "2023-11-15T09:30:00.000Z",
      "endTime": "2023-11-15T10:00:00.000Z",
      "status": "pending_payment",
      "intakeNotes": "Need to discuss a property litigation matter in Hyderabad.",
      "meetingLink": null,
      "createdAt": "2023-10-27T11:00:00.000Z"
    },
    "paymentOrder": {
      "orderId": "order_MqiXq123456Abc",
      "gateway": "Razorpay",
      "amount": 5000,
      "currency": "INR"
    },
    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

-   **Error Responses:**
    -   `400 Bad Request`: Invalid input data (e.g., malformed email, missing fields).
    -   `409 Conflict`: The requested time slot is no longer available.

---

#### `POST /bookings/verify-payment`

Verifies the payment and confirms the booking.

-   **Description:** After the user completes the payment flow on the gateway's site, the frontend calls this endpoint with the transaction details provided by the gateway. The backend verifies the payment signature and, if successful, updates the booking status to `confirmed` and triggers a confirmation email.
-   **Permissions:** Authenticated User
-   **Request:**
    -   Method: `POST`
    -   Body:

```json
{
  "bookingId": "bkg_a1b2c3d4e5f6",
  "gateway": "Razorpay",
  "gatewayResponse": {
    "razorpay_payment_id": "pay_29u11Z1s1H5T4G",
    "razorpay_order_id": "order_MqiXq123456Abc",
    "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
  }
}
```

-   **Response (200 OK):**
    -   Returns the updated booking object with the `confirmed` status.

```json
{
  "data": {
    "id": "bkg_a1b2c3d4e5f6",
    "status": "confirmed",
    "meetingLink": "https://wa.me/919440217782",
    "startTime": "2023-11-15T09:30:00.000Z",
    "...": "..."
  }
}
```

-   **Error Responses:**
    -   `400 Bad Request`: Invalid payment verification data.
    -   `402 Payment Required`: Payment verification failed.
    -   `404 Not Found`: The specified `bookingId` does not exist.

### 3.3. Secure Document Submission

#### `POST /bookings/{bookingId}/documents`

Uploads a document for a specific booking.

-   **Description:** Accepts a file upload and associates it with a booking. The backend is responsible for storing the file in a secure location (e.g., a private S3 bucket) and saving its metadata to the database.
-   **Permissions:** Authenticated User (must own the booking)
-   **Request:**
    -   Method: `POST`
    -   URL Parameters:
        -   `bookingId` (string, required): The ID of the booking.
    -   Body: `multipart/form-data`
        -   `file`: The file being uploaded.
-   **Response (201 Created):**
    -   Returns metadata about the newly uploaded document.

```json
{
  "data": {
    "id": "doc_z9y8x7w6v5",
    "bookingId": "bkg_a1b2c3d4e5f6",
    "fileName": "property-deed.pdf",
    "fileType": "application/pdf",
    "fileSize": 1234567,
    "uploadedAt": "2023-10-27T14:00:00.000Z"
  }
}
```

-   **Error Responses:**
    -   `400 Bad Request`: No file provided or file is too large.
    -   `403 Forbidden`: User does not have permission to upload to this booking.
    -   `404 Not Found`: Booking not found.

### 3.4. Content Endpoints

#### `GET /content/posts`

Retrieves a list of blog posts or articles.

-   **Description:** Fetches a paginated list of posts for the blog/articles section.
-   **Permissions:** Public
-   **Request:**
    -   Method: `GET`
    -   Query Parameters:
        -   `page` (number, optional, default: 1)
        -   `limit` (number, optional, default: 10)
-   **Response (200 OK):**

```json
{
  "data": [
    {
      "slug": "nri-property-litigation-guide",
      "title": "A Guide to Property Litigation for NRIs in India",
      "excerpt": "Understanding the complexities of property disputes from abroad...",
      "publishedAt": "2023-10-25T09:00:00.000Z"
    }
  ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10
  }
}
```

---
*This document serves as the single source of truth for the API contracts. Any changes must be versioned and communicated to both frontend and backend teams.*