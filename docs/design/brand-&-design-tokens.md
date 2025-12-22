# Brand & Design Tokens

| | |
|---|---|
| **Document Type** | Brand & Design Tokens |
| **Category** | `design` |
| **Status** | `v1.0 - Final` |
| **Date** | `2023-10-27` |
| **Project** | `lawyers-nri-website` |

---

## 1.0 Introduction

### 1.1 Purpose

This document serves as the single source of truth for all visual design elements for the Kalanidhi Sanjeeva Kumar website. It codifies the foundational styles—colors, typography, spacing, and more—into a system of design tokens. The primary goal is to create a consistent, scalable, and maintainable user interface that reflects the brand's core identity: **a blend of traditional authority and modern efficiency**.

### 1.2 Guiding Principles

- **Authority & Trust:** The visual language must convey Mr. Kumar's 20 years of experience and legal authority. This is achieved through a structured layout, a formal color palette, and classic serif typography for headings.
- **Modern & Efficient:** The user experience must be seamless and intuitive for NRIs globally. This is reflected in clean sans-serif body copy, a clear visual hierarchy, and an accessible, responsive interface.
- **Consistency:** All components and pages must adhere to these tokens to ensure a unified and predictable user experience across the entire website.

### 1.3 Technical Implementation

These tokens are designed to be directly implemented within the project's `tailwind.config.js` file. Developers should reference these tokens through Tailwind's utility classes to style components.

---

## 2.0 Color Palette

The color palette is designed to be professional, trustworthy, and approachable. It uses a deep blue to establish authority, a brighter blue for interaction, and a warm amber as a confident accent for key actions.

### 2.1 Brand Colors

These colors define the core brand identity.

| Token Name | Swatch | HEX | Role & Usage |
| :--- | :--- | :--- | :--- |
| `brand-primary` | &#9632; | `#1B4F72` | Main brand color. Used for primary UI elements, hero section backgrounds, headers, and footers. |
| `brand-secondary`| &#9632; | `#2980B9` | Secondary brand color. Used for interactive elements like links, hover states, and secondary buttons. |
| `brand-accent` | &#9632; | `#F39C12` | Accent color. Reserved for high-priority calls-to-action (e.g., "Book a Consultation") and important highlights. |

### 2.2 Neutral & UI Colors

Neutrals provide a clean canvas for content and support the brand colors.

| Token Name | Swatch | HEX | Role & Usage |
| :--- | :--- | :--- | :--- |
| `text-primary` | &#9632; | `#2C3E50` | Primary text color for headings and body copy. |
| `text-secondary`| &#9632; | `#5D6D7E` | Secondary text color for subheadings, captions, and placeholder text. |
| `surface-ground`| &#9632; | `#FFFFFF` | The surface color for components like cards and modals. |
| `surface-bg` | &#9632; | `#F9F9F9` | Default page background color for a soft, clean look. |
| `surface-border`| &#9632; | `#EAECEE` | Standard border color for inputs, cards, and dividers. |

### 2.3 Semantic (Feedback) Colors

Used to communicate status and feedback to the user (e.g., form validation, alerts).

| Token Name | Swatch | HEX | Role & Usage |
| :--- | :--- | :--- | :--- |
| `feedback-success` | &#9632; | `#27AE60` | Success messages, valid form fields. |
| `feedback-error` | &#9632; | `#C0392B` | Error messages, invalid form fields. |
| `feedback-warning` | &#9632; | `#F1C40F` | Warnings and non-critical alerts. |
| `feedback-info` | &#9632; | `#3498DB` | Informational messages and tips. |

### 2.4 Dark Mode Palette

The dark mode theme provides a comfortable viewing experience in low-light environments, using a desaturated blue palette to maintain a professional tone.

| Light Mode Token | Dark Mode Equivalent | Swatch | HEX |
| :--- | :--- | :--- | :--- |
| `text-primary` | `dark-text-primary` | &#9632; | `#E2E8F0` |
| `text-secondary`| `dark-text-secondary` | &#9632; | `#A0AEC0` |
| `surface-ground`| `dark-surface-ground` | &#9632; | `#1A202C` |
| `surface-bg` | `dark-surface-bg` | &#9632; | `#0D1117` |
| `surface-border`| `dark-surface-border` | &#9632; | `#2D3748` |

> **Note:** Brand and Semantic colors remain the same in Dark Mode but must be tested for a minimum WCAG AA contrast ratio against the dark backgrounds.

---

## 3.0 Typography

The typography system is designed to balance traditional authority with modern readability.

### 3.1 Typefaces

- **Headings:** **Merriweather** (Serif) - A classic, legible serif that conveys authority and tradition. Imported from Google Fonts.
- **Body & UI:** **Inter** (Sans-Serif) - A modern, highly readable sans-serif perfect for body text and user interface elements. Imported from Google Fonts.

### 3.2 Typographic Scale

The scale is modular and uses `rem` units for accessibility and scalability.

| Token Name | Font Size (rem/px) | Font Weight | Line Height | Font Family | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `text-display` | `3rem` / 48px | 700 (Bold) | `1.2` | Merriweather | Main hero section headline. |
| `text-h1` | `2.25rem` / 36px | 700 (Bold) | `1.2` | Merriweather | Page titles. |
| `text-h2` | `1.875rem` / 30px| 700 (Bold) | `1.3` | Merriweather | Major section headings. |
| `text-h3` | `1.5rem` / 24px | 700 (Bold) | `1.4` | Merriweather | Sub-section headings. |
| `text-h4` | `1.25rem` / 20px | 600 (SemiBold) | `1.4` | Inter | Minor headings, card titles. |
| `text-body-lg` | `1.125rem` / 18px| 400 (Regular) | `1.6` | Inter | Long-form article text. |
| `text-body-md` | `1rem` / 16px | 400 (Regular) | `1.7` | Inter | Default body text. |
| `text-body-sm` | `0.875rem` / 14px| 400 (Regular) | `1.5` | Inter | Captions, meta-text, labels. |
| `text-button` | `1rem` / 16px | 500 (Medium) | `1.5` | Inter | Button text. |

### 3.3 Font Weights

- **Merriweather:** `700` (Bold)
- **Inter:** `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold)

---

## 4.0 Spacing

A consistent 4px-based scale is used for all `padding`, `margin`, and `gap` utilities to create a harmonious and rhythmic layout.

| Token | rem | px | | Token | rem | px |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `space-0.5` | 0.125rem | 2px | | `space-8` | 2rem | 32px |
| `space-1` | 0.25rem | 4px | | `space-10` | 2.5rem | 40px |
| `space-2` | 0.5rem | 8px | | `space-12` | 3rem | 48px |
| `space-3` | 0.75rem | 12px | | `space-16` | 4rem | 64px |
| `space-4` | 1rem | 16px | | `space-20` | 5rem | 80px |
| `space-5` | 1.25rem | 20px | | `space-24` | 6rem | 96px |
| `space-6` | 1.5rem | 24px | | `space-32` | 8rem | 128px |

---

## 5.0 Border Radius

Consistent corner rounding is used to soften UI elements and align with the modern aspect of the brand.

| Token Name | Value | Usage |
| :--- | :--- | :--- |
| `rounded-sm` | `0.125rem` (2px) | Tags, subtle rounding. |
| `rounded-md` | `0.375rem` (6px) | Default for buttons and inputs. |
| `rounded-lg` | `0.5rem` (8px) | Default for cards and containers. |
| `rounded-xl` | `0.75rem` (12px)| Larger containers, modals. |
| `rounded-full`| `9999px` | Avatars, pills. |

---

## 6.0 Shadows (Elevation)

Shadows create a sense of depth and elevation, helping to distinguish interactive elements from the background.

| Token Name | CSS `box-shadow` Value | Usage |
| :--- | :--- | :--- |
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle elevation, cards on hover. |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Default for cards, modals. |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`| Emphasized elements, dropdowns. |
| `shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`| Popovers, elements needing significant focus. |

---

## 7.0 Implementation in Tailwind CSS

Add the following configuration to `tailwind.config.js` to implement all the tokens defined in this document.

```javascript
// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable dark mode support
  theme: {
    extend: {
      colors: {
        // 2.1 Brand Colors
        brand: {
          primary: '#1B4F72',
          secondary: '#2980B9',
          accent: '#F39C12',
        },
        // 2.2 Neutral & UI Colors
        text: {
          primary: '#2C3E50',
          secondary: '#5D6D7E',
        },
        surface: {
          ground: '#FFFFFF',
          bg: '#F9F9F9',
          border: '#EAECEE',
        },
        // 2.3 Semantic (Feedback) Colors
        feedback: {
          success: '#27AE60',
          error: '#C0392B',
          warning: '#F1C40F',
          info: '#3498DB',
        },
        // 2.4 Dark Mode Palette
        dark: {
          text: {
            primary: '#E2E8F0',
            secondary: '#A0AEC0',
          },
          surface: {
            ground: '#1A202C',
            bg: '#0D1117',
            border: '#2D3748',
          },
        },
      },
      fontFamily: {
        // 3.1 Typefaces
        sans: ['Inter', ...fontFamily.sans],
        serif: ['Merriweather', ...fontFamily.serif],
      },
      fontSize: {
        // 3.2 Typographic Scale
        'display': ['3rem', { lineHeight: '1.2' }],
        'h1': ['2.25rem', { lineHeight: '1.2' }],
        'h2': ['1.875rem', { lineHeight: '1.3' }],
        'h3': ['1.5rem', { lineHeight: '1.4' }],
        'h4': ['1.25rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'button': ['1rem', { lineHeight: '1.5' }],
      },
      // Note: Spacing, borderRadius, and boxShadow tokens map directly to Tailwind's default naming convention and scale, so we only need to add custom values if necessary. This config relies on the default spacing scale and adds custom radii.
      borderRadius: {
        // 5.0 Border Radius
        'sm': '0.125rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
      },
    },
  },
  plugins: [],
};
```

### Example Usage in a Next.js Component

```jsx
// Example component using the design tokens via Tailwind CSS

function PrimaryButton({ children }) {
  return (
    <button className="
      px-6 py-3
      bg-brand-accent 
      text-white 
      font-sans font-medium text-button
      rounded-md 
      shadow-md
      hover:opacity-90 transition-opacity
    ">
      {children}
    </button>
  );
}

function ArticleCard({ title, excerpt }) {
  return (
    <div className="
      p-6
      bg-surface-ground dark:bg-dark-surface-ground
      border border-surface-border dark:border-dark-surface-border
      rounded-lg
      shadow-md
    ">
      <h3 className="text-h3 font-serif text-text-primary dark:text-dark-text-primary mb-2">
        {title}
      </h3>
      <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
        {excerpt}
      </p>
    </div>
  );
}
```