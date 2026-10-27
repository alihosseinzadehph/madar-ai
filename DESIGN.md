---
version: alpha
colors:
  primary: "#14322f"
  ink: "#14322f"
  paper: "#f7f7f0"
  mint: "#c7ef9d"
  muted: "#71807b"
  line: "#dcded3"
typography:
  display:
    fontFamily: "Vazirmatn, Tahoma, sans-serif"
    fontWeight: 700
  body:
    fontFamily: "Vazirmatn, Tahoma, sans-serif"
    lineHeight: 1.8
  utility:
    fontFamily: "Vazirmatn, Tahoma, sans-serif"
rounded:
  card: "16px"
  button: "7px"
omitted:
  - section: spacing
    reason: "Existing site uses contextual spacing; see styles.css and launch.css."
  - section: components
    reason: "Buildless marketing page; component rules are described below."
---

## Overview

Madar is a Persian brand website for AI education and agent services. Preserve the user-approved green/ivory identity and existing orbital hero. The signature is interaction and feedback expressed through a scientific model, with practical examples beside it. Avoid generic robot imagery and invented performance claims. Course posters follow a restrained academic layout with supplied speaker portraits and clear institutional marks. This is a marketing register, not an authenticated product dashboard. Product panels are explicitly conceptual demonstrations.

Runtime tokens in `styles.css :root` are canonical; this file mirrors their values. `launch.css` extends those tokens without replacing them. The brand website retains these palette tokens. The V1.1 course poster uses its own user-requested navy/cyan campaign palette, defined in assets/course/poster.css, with the same local font.

## Colors

Forest green carries text and the product section; ivory is the reading surface; lime marks selected actions and feedback. Secondary text remains readable. Status messages use text as well as color. Do not represent a planned product as a live data service.

## Typography

Use the bundled Vazirmatn variable font. Headings use weight 650–780; prose 400–500. Persian is RTL; URLs, phone numbers and times use isolated bidirectional spans. Avoid tiny captions for important course facts. Use only the four portraits and the parent-company/Sharif logos explicitly supplied for the course by the user. Keep Madar as the primary educational brand; place the parent company as a supporting brand. The Sharif mark is accompanied by دانشگاه صنعتی شریف / مرکز آموزش‌های آزاد. Do not add certificate or accreditation claims.

## Layout

Keep the existing 1240px container and 820/600px responsive transitions. Two primary sections remain education and agent products/services. Supporting sections explain the method, people and contact. A single featured course replaces sample course inventory. Product selection uses two ordinary buttons with pressed state, not fake links to unavailable dashboards. Reserve image dimensions and inline-error space.

## Elevation & Depth

Use thin borders and quiet surfaces. The course poster may use a small shadow as a physical printed artifact. The conceptual product panel has one contained elevation treatment. No overlapping glass panels or decorative UI clutter.

## Shapes

Preserve 16px cards, 7px buttons and round diagram nodes. Rings illustrate feedback; product allocation charts are labeled as synthetic data. Growth's loop is conceptual and not a quantitative chart.

## Components

Native links navigate, buttons change views, and the course details use a native dialog with Escape and focus restoration. The contact form owns inline validation, pending/error/success states, duplicate-submit prevention, and consent. It sends through FormSubmit only after email activation is confirmed; failure never implies receipt. No private API key belongs in this static repository. The site has no financial account connection or live publishing controls.

Respect reduced motion; retain visible focus and scrollbars. Mobile keeps the same content and actions, with one-column course, product and team layouts.

## Do's and Don'ts

- Preserve the established hero and brand while making the complex-systems approach explicit.
- Keep course dates and format consistent between the site and editable poster.
- Keep academic affiliations distinct from company roles and institutional endorsement.
- Do not promise guaranteed financial returns, reduced risk, SEO rankings, or unmeasured superiority.
- Preserve `CNAME` and `.nojekyll`; review local changes before public publication.

## Course poster revision — 2026-10-27

Replace the glossy generated orbital artwork with an academic poster centered on the real speakers. Maintain the website’s green/ivory identity and local Vazirmatn font. Group Rouhani with Hosseinzadeh in one column and Jafari with Hosseini in the other. Honorific دکتر is omitted. Hosseinzadeh’s affiliation now includes Shahid Beheshti University. Supplied photos remain unretouched; CSS frames control composition.

## Course campaign V1.1

The user requested a bilingual course title and a poster direction based on the supplied Sharif course examples. The poster uses navy #121b3b, cyan #63c7df, white #f5f9fc and muted #bdcede; assets/course/poster.css owns these campaign-specific values. Keep the website green/ivory. Both Persian and English names are prominent, with V1.1 as a small version marker. Portraits are approximately 98px circles on the 1080px export, and the vector diagram conveys single-agent design and interaction among agents. Use the supplied logos in their original appearance. The parent-company black-backed logo sits bottom-left. Use ordinary positioned image crops rather than transforms or blend modes, and display the poster only after all images decode. Shahin Rouhani is a faculty member of Sharif University of Technology.


## CCNet and search metadata

Use the supplied CCNet mark at the bottom-right of the poster footer, with its requested Persian caption below. Keep the parent company bottom-left and Sharif centered. The user requested a slightly larger Sharif mark, approximately 93px on the 1080px poster. Ali Hosseinzadeh’s visible title is پژوهشگر و متخصص تحلیل کمی, followed by دانشگاه شهید بهشتی on a separate line. Search metadata and structured data must match visible content, use the HTTPS canonical domain, and avoid invented ratings, fees or certifications. The exported JPG dimensions must be read from the file before setting social image metadata.

