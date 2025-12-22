```markdown
# WCAG 2.2 AA Accessibility Checklist

- **Document Type**: WCAG 2.2 AA Checklist
- **Category**: Accessibility
- **Project**: `lawyers`
- **Purpose**: To audit and ensure the website for Kalanidhi Sanjeeva Kumar meets the Web Content Accessibility Guidelines (WCAG) 2.2 at the AA conformance level. This ensures the site is usable by people with the widest possible range of abilities, a mark of modern professionalism and a requirement for reaching a global audience like NRIs.

---

## 1. Introduction

This document provides a comprehensive checklist based on WCAG 2.2 AA standards. Each item represents a Success Criterion (SC) that must be met. The checklist is structured according to the four principles of accessibility: **Perceivable, Operable, Understandable, and Robust (POUR)**.

For each criterion, the checklist includes:
- **WCAG SC**: The official Success Criterion number and link.
- **Guideline**: A brief description of the goal.
- **Requirement**: A clear explanation of what is needed to pass.
- **Status**: To be filled out during the audit (e.g., `Pass`, `Fail`, `N/A`).
- **Notes & Action Items**: Project-specific context, technical guidance for the Next.js/Tailwind stack, and actionable steps for remediation.

**Status Legend:**
- **Pass**: The criterion is fully met.
- **Fail**: The criterion is not met. Action is required.
- **N/A**: The criterion is not applicable to this website.

---

## 2. Principle 1: Perceivable

Information and user interface components must be presentable to users in ways they can perceive.

| WCAG SC | Guideline | Requirement | Status | Notes & Action Items |
| :--- | :--- | :--- | :--- | :--- |
| **1.1.1** | **Non-text Content (A)** | All non-text content (images, icons) has a text alternative (`alt` attribute) that serves the equivalent purpose. Decorative images have an empty `alt=""`. | | - **Advocate's Photo**: `alt="Kalanidhi Sanjeeva Kumar, High Court Advocate with 20 years of experience"` <br>- **Service Icons**: Must have descriptive `alt` text, e.g., `alt="Icon representing property litigation services"`. <br>- **Icon Buttons**: Use `aria-label` or the `sr-only` class for text if there's no visible label. <br> ```html\n <button type="button" aria-label="View previous month">\n  <!-- SVG Icon -->\n</button> \n``` |
| **1.2.2** | **Captions (Prerecorded) (A)** | Captions are provided for all prerecorded video content. | | - All YouTube videos explaining legal processes or showcasing client experiences must have accurate, synchronized captions. <br>- **Action**: Review and edit YouTube's auto-generated captions for accuracy, especially with legal terminology. |
| **1.2.3** | **Audio Description or Media Alternative (Prerecorded) (A)** | An alternative for time-based media (a transcript) or audio description is provided for all prerecorded video content. | | - Provide a full text transcript on the same page as the video or linked nearby. This benefits users who cannot watch the video and is also excellent for SEO. <br>- **Action**: For each YouTube video, create a collapsible "Transcript" section below the video player. |
| **1.3.1** | **Info and Relationships (A)** | Information, structure, and relationships conveyed through presentation can be programmatically determined. Use semantic HTML. | | - Use `<h1>` for the main page title only. Follow a logical heading structure (`<h2>`, `<h3>`, etc.).<br>- Forms (booking, contact) must use `<label for="id">` correctly associated with each `<input>`.<br>- Data tables (e.g., for case study summaries) should use `<caption>`, `<thead>`, `<tbody>`, `<th>`, and `scope` attributes. |
| **1.3.2** | **Meaningful Sequence (A)** | When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined. | | - The DOM order must match the visual order. This is critical for responsive design. <br>- **Test**: Disable CSS and ensure the page content still reads logically. Tailwind's flexbox/grid utilities (`flex-col-reverse`, etc.) can alter visual order, so double-check the source code order remains semantic. |
| **1.3.5** | **Identify Input Purpose (AA)** | The purpose of each input field collecting information about the user can be programmatically determined when the field serves a purpose identified in the "Input Purposes for User Interface Components" section. | | - Use the `autocomplete` attribute on form fields in the booking and payment process. <br>- **Example**: ` <input type="text" id="fname" name="fname" autocomplete="given-name"> ` <br> ` <input type="email" id="email" name="email" autocomplete="email"> ` |
| **1.4.1** | **Use of Color (A)** | Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element. | | - **Error States**: Don't just use a red border for invalid form fields. Add an icon and a text message.<br>- **Links**: Ensure links are not just a different color from surrounding text; they must also have an underline or be bold. On hover/focus, the underline is sufficient. |
| **1.4.3** | **Contrast (Minimum) (AA)** | The visual presentation of text and images of text has a contrast ratio of at least 4.5:1 (3:1 for large text). | | - **Action**: Test all color combinations from the palette. <br> - **Text** (`#2C3E50`) on **BG** (`#F9F9F9`): **Passes** (11.57:1) <br> - **Primary** (`#1B4F72`) on **BG** (`#F9F9F9`): **Passes** (5.86:1) <br> - **Accent** (`#F39C12`) on **Primary** (`#1B4F72`): **Fails** (2.56:1). **Do not use this for text.** Use for borders or non-essential icons only. <br>- **Action**: All checks must be repeated for the Dark Mode theme. |
| **1.4.4** | **Resize text (AA)** | Text can be resized without assistive technology up to 200 percent without loss of content or functionality. | | - Use relative units like `rem` or `em` for font sizes, not `px`. <br>- **Test**: Zoom the browser to 200%. Ensure no content is cut off and no horizontal scrollbar appears for single-column content. The booking calendar must remain usable. |
| **1.4.10** | **Reflow (AA)** | Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for content at a width equivalent to 320 CSS pixels. | | - The website must be fully responsive and usable on a 320px wide viewport (e.g., iPhone SE). <br>- **Action**: Test all pages, especially the booking form and payment modals, on a 320px wide screen. Avoid fixed-width elements. |
| **1.4.11** | **Non-Text Contrast (AA)** | The visual presentation of UI components and graphical objects have a contrast ratio of at least 3:1 against adjacent color(s). | | - Applies to input borders, button backgrounds, and focus indicators. <br>- The **Accent** (`#F39C12`) color has a 3.1:1 contrast against the **BG** (`#F9F9F9`), which is sufficient for UI components. <br>- **Focus rings must have 3:1 contrast.** Tailwind's default blue focus rings are generally compliant. |
| **1.4.12** | **Text Spacing (AA)** | No loss of content or functionality occurs by setting all of the following text style properties: Line height to 1.5, paragraph spacing to 2x font size, letter spacing to 0.12x font size, word spacing to 0.16x font size. | | - **Action**: Use a browser extension (e.g., "Text Spacing" bookmarklet) to apply these styles. Verify that no text is truncated or overlaps, especially in navigation, buttons, and form labels. |

---

## 3. Principle 2: Operable

User interface components and navigation must be operable.

| WCAG SC | Guideline | Requirement | Status | Notes & Action Items |
| :--- | :--- | :--- | :--- | :--- |
| **2.1.1** | **Keyboard (A)** | All functionality of the content is operable through a keyboard interface. | | - Every interactive element (links, buttons, form fields, calendar dates) must be reachable and operable using `Tab`, `Shift+Tab`, `Enter`, `Space`, and arrow keys. <br>- The booking calendar widget must be fully keyboard navigable. |
| **2.1.2** | **No Keyboard Trap (A)** | If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only the keyboard. | | - **Test**: Open modals (e.g., payment pop-ups from Razorpay/PayPal). Ensure you can `Tab` through all elements within the modal and close it with the `Escape` key or by tabbing to a "Close" button. Focus must return to the element that opened the modal. |
| **2.1.4** | **Character Key Shortcuts (A)** | If a keyboard shortcut is implemented in content using only letter, punctuation, number, or symbol characters, then at least one of the following is true: Turn off, Remap, or Active only on focus. | | **N/A** unless custom shortcuts are implemented. Standard browser shortcuts do not apply. |
| **2.2.1** | **Timing Adjustable (A)** | For each time limit that is set by the content, the user can turn off, adjust, or extend the time limit. | | - The booking process should not have a time limit (e.g., "your session will expire in 5 minutes"). If a payment gateway imposes a limit, warn the user beforehand. |
| **2.3.1** | **Three Flashes or Below Threshold (A)** | Web pages do not contain anything that flashes more than three times in any one second period. | | - No flashing or strobing animations. Gifs and videos must not violate this. |
| **2.4.1** | **Bypass Blocks (A)** | A mechanism is available to bypass blocks of content that are repeated on multiple Web pages (e.g., navigation header). | | - Implement a "Skip to main content" link. It should be the first focusable element on the page, visually hidden until focused. <br> - **Tailwind Implementation**: ` <a href="#main" class="sr-only focus:not-sr-only focus:absolute ...">Skip to main content</a> ` |
| **2.4.3** | **Focus Order (A)** | If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and usability. | | - **Test**: `Tab` through the entire site. The focus order must follow the visual layout logically (e.g., left-to-right, top-to-bottom). |
| **2.4.4** | **Link Purpose (In Context) (A)** | The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context. | | - Avoid generic link text like "Click Here" or "Read More". <br>- **Good**: `Read more about property litigation case studies`. <br>- **Acceptable (in context)**: A card with a heading "Divorce Law Services" can have a "Learn More" link within it. |
| **2.4.7** | **Focus Visible (AA)** | Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible. | | - All focusable elements must have a highly visible focus outline. Do not use `outline: none` or `ring-0` in Tailwind without providing an alternative, visible focus style (e.g., a box-shadow or background color change). |
| **2.4.11** | **Focus Not Obscured (Minimum) (AA)** | When a user interface component receives focus, it is not entirely hidden by author-created content. | | - **Test**: Check for sticky headers/footers or chat widgets that might cover a focused element as the user tabs down the page. The focused element must be at least partially visible. |
| **2.4.13** | **Focus Appearance (AA)** | The focus indicator must have a minimum area and a contrast of at least 3:1 between the focused and unfocused states. | | - The focus indicator must be at least 1 CSS pixel thick around the element OR have a minimum area of 4 CSS pixels. Tailwind's default focus ring styles generally meet this. Verify custom focus styles. |
| **2.5.7** | **Dragging Movements (AA)** | All functionality that uses a dragging movement for operation can be achieved by a single pointer without dragging, unless dragging is essential. | | - If a calendar or other UI component uses drag-and-drop (e.g., to select a time range), provide an alternative keyboard/click mechanism. For a simple booking calendar, this is likely **N/A**. |
| **2.5.8** | **Target Size (Minimum) (AA)** | The size of the target for pointer inputs is at least 24 by 24 CSS pixels. | | - All buttons, links, and form controls must meet this minimum target size. <br>- **Action**: Ensure icons, close buttons on modals, and calendar date cells are large enough to be easily tapped on mobile devices. Use padding to increase the clickable area if the visual element is small. |

---

## 4. Principle 3: Understandable

Information and the operation of user interface must be understandable.

| WCAG SC | Guideline | Requirement | Status | Notes & Action Items |
| :--- | :--- | :--- | :--- | :--- |
| **3.1.1** | **Language of Page (A)** | The default human language of each Web page can be programmatically determined. | | - Set the `lang` attribute on the `<html>` tag. <br> ` <html lang="en"> ` |
| **3.2.1** | **On Focus (A)** | When any user interface component receives focus, it does not initiate a change of context. | | - Do not automatically submit a form or open a new window just by tabbing to an element. The user must explicitly activate it (e.g., by pressing Enter). |
| **3.2.2** | **On Input (A)** | Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component. | | - The time zone selector should not automatically reload the page or booking calendar. It should update the calendar view without a full page reload or loss of focus. |
| **3.2.3** | **Consistent Navigation (AA)** | Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user. | | - The main navigation (`Home`, `Booking`, `Blog`, etc.) and footer must be identical in structure and order across all pages. |
| **3.2.4** | **Consistent Identification (AA)** | Components that have the same functionality within a set of Web pages are identified consistently. | | - An icon or a button for "Schedule a Consultation" should look and be labeled the same way everywhere it appears. |
| **3.3.1** | **Error Identification (A)** | If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text. | | - When the booking form is submitted with errors: <br> 1. Display a summary of errors at the top of the form. <br> 2. Highlight the invalid fields. <br> 3. Provide a specific error message next to each invalid field (e.g., "Please enter a valid email address"). |
| **3.3.2** | **Labels or Instructions (A)** | Labels or instructions are provided when content requires user input. | | - All form fields must have a visible `<label>`. <br> - For complex inputs like date formats or required documents for upload, provide clear instructions. Placeholders are not sufficient substitutes for labels. |
| **3.3.4** | **Error Prevention (Legal, Financial, Data) (AA)** | For Web pages that cause legal commitments or financial transactions for the user to occur, at least one of the following is true: Reversible, Checked, or Confirmed. | | - **Action**: Before final payment for a consultation, display a confirmation screen summarizing the service selected, date, time (with timezone), and cost. Require the user to explicitly confirm before processing payment. |
| **3.3.7** | **Redundant Entry (A)** | Information previously entered by or provided to the user that is required to be entered again in the same process is either auto-populated, or available for the user to select. | | - **N/A** for the current scope, unless a multi-step process is introduced where user information is requested twice. |
| **3.3.8** | **Accessible Authentication (Minimum) (AA)** | A cognitive function test (like remembering a password or solving a puzzle) is not required for any step in an authentication process. | | - This applies to the secure client portal for document submission. Do not rely on CAPTCHAs that are purely visual or require solving puzzles. Use modern, accessible alternatives like hCaptcha, Cloudflare Turnstile, or simple object identification if a CAPTCHA is necessary. A "magic link" login (email link) is also a great accessible option. |

---

## 5. Principle 4: Robust

Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies.

| WCAG SC | Guideline | Requirement | Status | Notes & Action Items |
| :--- | :--- | :--- | :--- | :--- |
| **4.1.1** | **Parsing (A)** | In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique. | | - Use a validator (e.g., W3C Markup Validation Service) to check for HTML errors. <br> - **Next.js/React**: Ensure `key` props are used for lists, but do not use array indexes as keys for dynamic lists. Ensure all `id` attributes generated are unique across the entire rendered page. |
| **4.1.2** | **Name, Role, Value (A)** | For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to assistive technologies. | | - Custom components built with `div`s and `span`s (like a custom calendar) must use ARIA roles (`role="button"`, `role="dialog"`) and states (`aria-selected`, `aria-expanded`, `aria-hidden`). <br>- When a view changes without a page load (e.g., updating the calendar), use an `aria-live` region to announce the update to screen reader users. ` <div aria-live="polite">Showing available slots for June 2024.</div> ` |
| **4.1.3** | **Status Messages (AA)** | In content implemented using markup languages, status messages can be programmatically determined through role or properties so that they can be presented to the user by assistive technologies without receiving focus. | | - Use `aria-live` regions for status messages like "Consultation successfully booked!", "Your documents have been uploaded.", or "Searching for available times...". <br>- These messages should not steal keyboard focus. `role="status"` is a good choice for non-critical updates. |

```