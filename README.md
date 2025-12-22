# Kalanidhi Sanjeeva Kumar - Advocate Website

A professional website for Kalanidhi Sanjeeva Kumar, a High Court advocate in Hyderabad, India, targeting Non-Resident Indians (NRIs) seeking legal services.

## Tech Stack

- **Frontend:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Node.js with Next.js API Routes
- **Database:** PostgreSQL with Prisma ORM
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- PostgreSQL database
- npm or pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Authentication
JWT_SECRET="your-super-secret-key-for-jwt-signing"
JWT_CLIENT_SECRET="your-client-jwt-secret-key"

# Google Calendar API
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account-email@project-id.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="base64_encoded_private_key"
GOOGLE_CALENDAR_ID="advocate_primary_calendar_id@group.calendar.google.com"

# Payment Gateways
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
PAYPAL_API_BASE="https://api-m.sandbox.paypal.com"

# AWS S3 (for Document Storage)
AWS_ACCESS_KEY_ID="your-iam-user-access-key"
AWS_SECRET_ACCESS_KEY="your-iam-user-secret-key"
AWS_REGION="ap-south-1"
S3_BUCKET_NAME="lawyers-client-documents-prod"

# Email Service
RESEND_API_KEY="your-resend-api-key"
ADVOCATE_EMAIL="kalanidhi@example.com"

# Site Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

3. Set up the database:
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed the database
npm run prisma:seed
```

4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main website routes
│   │   ├── about/
│   │   ├── blog/
│   │   ├── booking/
│   │   ├── case-studies/
│   │   ├── contact/
│   │   ├── services/
│   │   └── page.tsx       # Homepage
│   ├── api/               # API routes
│   │   ├── availability/
│   │   ├── bookings/
│   │   ├── consultations/
│   │   ├── payment/
│   │   └── uploads/
│   ├── globals.css
│   └── layout.tsx
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── ui/               # Reusable UI components
│   ├── forms/            # Form components
│   └── sections/         # Page sections
├── lib/                  # Utilities
│   ├── db.ts            # Prisma client
│   ├── utils.ts         # Helper functions
│   ├── validators.ts    # Zod schemas
│   ├── google-calendar.ts
│   └── email.ts
└── types/               # TypeScript types
    └── index.ts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:seed` - Seed the database

## Features

- **Booking System:** Timezone-aware consultation booking with Google Calendar integration
- **Payment Integration:** Razorpay and PayPal support for international payments
- **Secure Document Upload:** Encrypted portal for client document submission
- **Content Management:** Blog, case studies, and testimonials sections
- **Responsive Design:** Fully responsive with dark mode support

## Documentation

Comprehensive documentation is available in the `docs/` directory, including:
- Architecture overview
- API contracts
- Database schema
- Design tokens
- Security guidelines
- Testing strategy

## License

Private project for Kalanidhi Sanjeeva Kumar.

