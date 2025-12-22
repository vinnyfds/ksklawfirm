```markdown
# Core Web Vitals Budgets

| | |
|---|---|
| **Project** | lawyers |
| **Document Type** | Core Web Vitals Budgets |
| **Category** | Performance |
| **Status** | Defined |
| **Version** | 1.0 |

---

## 1. Introduction & Purpose

This document establishes the performance budgets for the `lawyers` website project. The primary goal is to ensure a fast, responsive, and visually stable experience for all users, with a specific focus on Non-Resident Indians (NRIs) accessing the site from various global locations and on potentially unreliable networks.

Adhering to these budgets is critical for:
- **User Retention:** A slow website frustrates users and leads to high bounce rates.
- **Credibility & Trust:** A high-performance site reflects the professionalism and efficiency of Kalanidhi Sanjeeva Kumar's legal practice.
- **Business Goals:** A faster site directly correlates with higher conversion rates for lead generation and consultation bookings.

These budgets are not guidelines; they are strict targets that must be met and maintained throughout the development lifecycle and post-launch.

## 2. Target User Profile & Conditions

To ensure a high-quality experience for the widest possible audience, all performance testing and budgeting will be based on the following baseline conditions:

- **Device:** Mid-tier Mobile (e.g., Moto G4)
- **Network:** Fast 3G (1.6 Mbps download / 768 Kbps upload, 150ms RTT)
- **Location:** Global. We must account for high latency. Vercel's Edge Network will be crucial for minimizing Time to First Byte (TTFB), but front-end asset size remains a primary concern.

Optimizing for this baseline ensures that users on faster devices and networks (e.g., 5G, Fiber) will experience near-instant load times.

## 3. Core Web Vitals (CWV) Explained

Our performance metrics are based on Google's Core Web Vitals, which measure key aspects of the user experience.

- **Largest Contentful Paint (LCP):** Measures *loading performance*. It marks the point in the page load timeline when the main content has likely loaded. A fast LCP helps reassure the user that the page is useful.
- **Interaction to Next Paint (INP):** Measures *responsiveness*. It assesses the latency of all user interactions with a page. A low INP ensures the page feels snappy and responsive to user input, such as clicking buttons or opening menus.
- **Cumulative Layout Shift (CLS):** Measures *visual stability*. It quantifies how much unexpected layout shift occurs during the entire lifespan of the page. A low CLS prevents frustrating experiences where users click on the wrong thing because an element moved.

## 4. Performance Budgets

The following budgets are defined for the 75th percentile of users under the target conditions specified above.

### 4.1. Metric-Based Budgets

These are the primary user-experience targets.

| Metric | Target (Good) |
|---|---|
| **Largest Contentful Paint (LCP)** | ≤ 2.5 seconds |
| **Interaction to Next Paint (INP)** | ≤ 200 milliseconds |
| **Cumulative Layout Shift (CLS)** | ≤ 0.1 |
| **Time to First Byte (TTFB)** | ≤ 600 milliseconds |

### 4.2. Resource-Based Budgets

To achieve the metric-based budgets, we must strictly limit the size and number of assets loaded by the browser.

| Resource Type | Budget (per page load) | Notes |
|---|---|---|
| **Total Page Size** | **≤ 500 KB** (gzipped) | A strict limit to ensure fast loads on slow networks. |
| **JavaScript** | **≤ 200 KB** (gzipped) | The largest contributor to poor interactivity. Be mindful of framework and third-party script costs. |
| **Images** | **≤ 150 KB** (above the fold) | Images are critical for LCP. All hero/banner images must be highly optimized. |
| **CSS** | **≤ 50 KB** (gzipped) | Tailwind CSS's JIT compiler makes this achievable. |
| **Fonts** | **≤ 100 KB** (WOFF2 format) | Self-host fonts and limit variants. Use `font-display: swap`. |
| **HTTP Requests** | **≤ 20** (initial load) | Minimize requests to reduce network overhead and latency. |
| **Third-Party Scripts** | **≤ 2** (initial blocking) | Scripts like payment gateways must be loaded asynchronously or on interaction. |

## 5. Budget by Page Type

Budgets are applied to key page templates.

| Page Template | Max JS | Max Total Size | Key LCP Element | Key INP Element |
|---|---|---|---|---|
| **Home (`/`)** | 180 KB | 450 KB | Hero image or main heading | Navigation menu, "Book Now" CTA |
| **Booking (`/booking`)| 220 KB | 550 KB | Page Title | Booking widget, Timezone selector |

**Note on `/booking` page:** The booking system (e.g., Calendly, TidyCal, or a custom component) is the main performance risk. It must be loaded dynamically using `next/dynamic` to prevent it from bloating the initial JavaScript bundle and negatively impacting INP on other pages.

## 6. Implementation & Enforcement Strategy

### 6.1. Tooling & Automation

Performance budgets will be enforced automatically within the CI/CD pipeline.

- **Local Development:** Use the Lighthouse panel in Chrome DevTools for on-the-spot checks.
- **Continuous Integration:** Use **Lighthouse CI** with Vercel Deployments. A `lighthouserc.json` file will be added to the repository to assert budgets on every pull request. A failed performance check will block the merge.

#### Example `lighthouserc.json`

```json
{
  "ci": {
    "collect": {
      "url": ["https://lawyers-website-preview.vercel.app/", "https://lawyers-website-preview.vercel.app/booking"],
      "startServerCommand": "npm run start"
    },
    "assert": {
      "preset": "lighthouse:no-pwa",
      "assertions": {
        "core-web-vitals": "error",
        "categories:performance": ["error", { "minScore": 0.9 }],
        "interactive": ["error", { "maxNumericValue": 3500 }],
        "resource-summary:total:size": ["warn", { "maxNumericValue": 500000 }],
        "resource-summary:script:size": ["error", { "maxNumericValue": 200000 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### 6.2. Code-Level Optimizations

The development team must adhere to the following best practices:

- **Images:** Use the `next/image` component for all images. It provides automatic optimization, resizing, and format conversion (WebP/AVIF). All LCP image candidates must have the `priority` prop.
- **JavaScript:**
    - Leverage Next.js's automatic code-splitting per page.
    - Use `next/dynamic` to lazy-load components that are not visible on initial load, especially the booking widget, testimonials slider, and YouTube video embeds.
    - Use `next/script` with the `strategy="afterInteractive"` or `worker` attribute for third-party scripts (e.g., Analytics, Payment Gateways SDKs for Razorpay/PayPal). This prevents them from blocking the main thread.
- **CSS:** Tailwind CSS with its JIT compiler will be used to ensure only the necessary CSS is shipped, keeping the bundle size minimal. Dark mode styles should be implemented efficiently without duplicating large style blocks.
- **Fonts:** Fonts will be preloaded and self-hosted from the `/public` directory to avoid an extra DNS lookup. Use the `next/font` package for optimal loading.
- **Secure Document Upload:** The component for secure document submission must be loaded dynamically only after a user has booked a consultation and is logged into a client area, not on the main marketing pages.

## 7. Monitoring & Reporting

Performance is not a one-time task. We will continuously monitor the live website to ensure budgets are met for real users.

- **Primary Tool:** **Vercel Analytics** will be enabled for this project. It provides RUM (Real User Monitoring) data for all Core Web Vitals, automatically collected from the global NRI user base.
- **Reporting:** The development team will review the Vercel Analytics dashboard on a **bi-weekly basis**.
- **Alerting:** Vercel can be configured to send alerts (e.g., via Slack or email) if the 75th percentile score for any Core Web Vital drops from 'Good' to 'Needs Improvement' for a sustained period. This will trigger an immediate investigation and remediation.

---

## 8. Document History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2023-10-27 | AI Technical Writer | Initial document creation based on project requirements. |
```