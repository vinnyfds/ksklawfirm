```markdown
# Security Testing Plan

| | |
| --- | --- |
| **Document Type:** | Security Testing |
| **Project:** | `lawyers` |
| **Category:** | security |
| **Version:** | 1.0 |
| **Date:** | 2023-10-27 |
| **Status:** | Final |

---

## 1. Introduction

### 1.1 Purpose

This document outlines the comprehensive security testing strategy for the `lawyers` website project. The primary objective is to identify, triage, and remediate security vulnerabilities throughout the Software Development Life Cycle (SDLC). Given the website's function of handling sensitive Personally Identifiable Information (PII) and confidential legal case details for Non-Resident Indians (NRIs), a robust security posture is not only a technical requirement but a legal and ethical obligation.

This plan details the implementation of Static Application Security Testing (SAST), Dynamic Application Security Testing (DAST), and Software Composition Analysis (SCA) to proactively secure the application.

### 1.2 Scope

#### 1.2.1 In-Scope

-   **Application Codebase:** The custom-developed Next.js frontend, Node.js/Express backend, and all associated API endpoints.
-   **Database:** Interactions with the PostgreSQL database via the Prisma ORM.
-   **Core Features:**
    -   User Authentication and Authorization for the secure client portal.
    -   The entire booking and scheduling flow, including timezone handling.
    -   Secure document submission and storage mechanisms.
    -   Lead generation forms (Contact/Intake forms).
-   **CI/CD Pipeline:** Security gates and automated checks integrated into the development workflow.

#### 1.2.2 Out-of-Scope

-   **Third-Party Services:** The underlying infrastructure and security of external services are out of scope for testing. However, the *secure integration and configuration* of these services are **in-scope**.
    -   Vercel Platform Infrastructure
    -   Google Calendar API
    -   Razorpay Payment Gateway
    -   PayPal Payment Gateway
-   **Denial of Service (DoS/DDoS) Testing:** Volumetric attacks are out of scope and will be handled by Vercel's platform-level protections (e.g., Vercel Firewall).
-   **Corporate Network Infrastructure:** The physical security of the advocate's office network is not covered.

### 1.3 Data Classification

The application will handle data of varying sensitivity, which informs the priority of our security efforts.

| Data Class | Description | Examples | Handling Requirement |
| :--- | :--- | :--- | :--- |
| **Public** | Information intended for public consumption. | Blog posts, advocate's bio, service descriptions. | Low |
| **Confidential (PII)** | Personally Identifiable Information that can be used to identify an individual. | Client name, email address, phone number (`+91 9440217782`), location, IP address. | High - Must be encrypted at rest and in transit. |
| **Highly Sensitive** | Confidential legal information and documents protected by attorney-client privilege. | Case details, uploaded legal documents (property deeds, divorce papers), consultation notes. | Critical - Must be encrypted at rest and in transit, with strict access controls. |

## 2. Security Testing Strategy

We will adopt a "Shift-Left" security model, integrating automated security testing early and continuously throughout the development process. This approach minimizes the cost and complexity of remediation by catching vulnerabilities before they reach production. Our strategy is built on three core pillars:

1.  **Static Application Security Testing (SAST):** Analyzing source code for potential vulnerabilities.
2.  **Software Composition Analysis (SCA):** Scanning third-party dependencies for known vulnerabilities.
3.  **Dynamic Application Security Testing (DAST):** Testing the running application for vulnerabilities from an attacker's perspective.

## 3. Static Application Security Testing (SAST)

### 3.1 Objective

To identify security flaws, coding errors, and potential vulnerabilities directly within the Next.js and Node.js source code before deployment.

### 3.2 Tooling

We will use **Snyk Code** for its deep integration with JavaScript/TypeScript, the Vercel ecosystem, and its ability to combine SAST and SCA in one platform.

### 3.3 Implementation

-   **Integration:** Snyk will be integrated directly with our GitHub repository.
-   **Trigger:** SAST scans will be automatically triggered on every `git push` to a pull request.
-   **Policy:** A pull request will be blocked from merging if Snyk Code identifies any `Critical` or `High` severity vulnerabilities.
-   **Focus Areas:**
    -   **Cross-Site Scripting (XSS):** Scrutinize Next.js components for improper use of `dangerouslySetInnerHTML`.
    -   **Injection Flaws:** Although Prisma provides strong protection against SQL injection, scans will verify that no raw SQL queries (`$queryRawUnsafe`, `$executeRawUnsafe`) are used with unsanitized user input.
    -   **Insecure Direct Object Reference (IDOR):** Analyze API endpoints to ensure that proper authorization checks are in place before accessing resources (e.g., ensuring a user can only access their own documents).
    -   **Sensitive Data Exposure:** Scan for hardcoded secrets, API keys, or credentials.

### 3.4 Example: GitHub Actions Workflow for SAST

A new workflow file `.github/workflows/snyk-sast.yml` will be created to enforce SAST checks.

```yaml
# .github/workflows/snyk-sast.yml
name: Snyk Code (SAST) Scan

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  snyk:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Snyk to check for vulnerabilities
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          command: code test
          args: --severity-threshold=high
```

## 4. Software Composition Analysis (SCA)

### 4.1 Objective

To identify and manage vulnerabilities within the open-source dependencies (`npm` packages) used by the project. A single vulnerable package can compromise the entire application.

### 4.2 Tooling

We will use a combination of **GitHub Dependabot** and **Snyk Open Source**.

-   **Dependabot:** For automated dependency updates and security alerts directly within GitHub.
-   **Snyk Open Source:** For deeper vulnerability analysis and license compliance checks within the CI/CD pipeline.

### 4.3 Implementation

-   **Continuous Monitoring:** Both tools will monitor the `package.json` and `package-lock.json` files.
-   **Automated Patching:** Dependabot will be configured to automatically create pull requests to update dependencies with known vulnerabilities. These PRs will be tested by our CI pipeline before merging.
-   **CI/CD Gate:** The Snyk scan in the pipeline will fail the build if a new `Critical` or `High` severity vulnerability is introduced via a dependency.
-   **Local Audits:** Developers are required to run `npm audit` locally before committing code to catch issues early.

### 4.4 Example: Dependabot Configuration

Create a `.github/dependabot.yml` file in the repository root.

```yaml
# .github/dependabot.yml
version: 2
updates:
  # Maintain dependencies for npm
  - package-ecosystem: "npm"
    directory: "/" # Location of package manifests
    schedule:
      interval: "daily"
    # Create pull requests for security updates
    open-pull-requests-limit: 10
    reviewers:
      - "project-lead-github-username" # Add relevant reviewer
```

## 5. Dynamic Application Security Testing (DAST)

### 5.1 Objective

To simulate external attacks against a running instance of the website to find vulnerabilities that are not visible in the source code, such as server configuration issues, authentication flaws, and access control problems.

### 5.2 Tooling

We will use **OWASP Zed Attack Proxy (ZAP)**, an industry-standard, open-source DAST scanner.

### 5.3 Implementation

-   **Target Environment:** DAST scans will be performed against the staging environment, which is deployed automatically by Vercel for each pull request (Preview Deployments).
-   **Scan Types:**
    -   **Baseline Scan (Passive):** A non-intrusive scan will run on every pull request to check for passive vulnerabilities like missing security headers or insecure cookie configurations.
    -   **Full Scan (Active):** An aggressive, in-depth active scan will be run weekly against the main staging branch. This scan will actively probe for vulnerabilities like XSS, SQL Injection, and Path Traversal.
-   **Authenticated Scanning:** ZAP will be configured with test user credentials to scan authenticated areas, specifically the secure document portal, to test for authorization flaws like IDOR.

### 5.4 Example: GitHub Actions Workflow for DAST

A new workflow file `.github/workflows/owasp-zap.yml` will be created to run a baseline DAST scan.

```yaml
# .github/workflows/owasp-zap-baseline.yml
name: OWASP ZAP Baseline Scan

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  zap_scan:
    runs-on: ubuntu-latest
    name: Scan Vercel Preview URL
    steps:
      - name: ZAP Scan
        uses: zaproxy/action-baseline@v0.7.0
        with:
          # Vercel provides the preview URL via an output from their action
          # Assuming another job provides this URL. For simplicity, we use a placeholder.
          target: ${{ needs.deploy_preview.outputs.preview_url }} # Example: Get URL from a previous deployment step
          # Or for a static staging site:
          # target: 'https://staging.lawyer-website.com'
          fail_action: true
```

## 6. Manual Penetration Testing

### 6.1 Objective

To complement automated tools by using human intelligence to discover complex vulnerabilities, business logic flaws, and authorization issues that automated scanners typically miss.

### 6.2 Scope and Frequency

A manual penetration test will be conducted by a qualified third-party security consultant:
1.  Prior to the initial website launch.
2.  Annually thereafter.
3.  After any major changes to authentication, payment processing, or the document handling system.

### 6.3 Key Focus Areas

-   **Authorization Bypass:** Attempting to access the documents or case details of another user by manipulating identifiers in API requests (IDOR).
-   **Business Logic Flaws:**
    -   Can the payment step for a consultation be bypassed?
    -   Can appointment slots be manipulated or double-booked?
    -   Can the Google Calendar integration be exploited to view or modify appointments maliciously?
-   **File Upload Vulnerabilities:** Attempting to upload malicious files (e.g., web shells, XSS payloads) to the secure document submission portal.
-   **Payment Integration Security:** Verifying that payment tokens are handled securely and that tampering with payment amounts on the client-side is not possible.

## 7. Vulnerability Management

### 7.1 Triage and Prioritization

All identified vulnerabilities will be logged as issues in the project's GitHub repository. They will be triaged based on the **CVSS 3.1** scoring system and business impact.

-   **Critical (9.0-10.0):** Direct, exploitable threat to highly sensitive data.
-   **High (7.0-8.9):** Threat to PII or could lead to significant system compromise.
-   **Medium (4.0-6.9):** A potential threat that is harder to exploit.
-   **Low (0.1-3.9):** Minor issue with low impact.

### 7.2 Remediation Service Level Agreements (SLAs)

The following timelines for remediation will be enforced from the time of discovery:

| Severity | Remediation SLA | Build Status |
| :--- | :--- | :--- |
| **Critical** | 7 Days | Blocks Deployment |
| **High** | 30 Days | Blocks Deployment |
| **Medium** | 90 Days | Allowed |
| **Low** | 180 Days / At discretion | Allowed |

## 8. Document Control

### 8.1 Version History

| Version | Date | Author | Changes |
| :--- | :--- | :--- | :--- |
| 1.0 | 2023-10-27 | Technical Writer | Initial draft of the Security Testing Plan. |
```