# Readequate Manifestacoes Page Layout

## Goal Description

The user reports that the **manifestacoes.html** page is visually broken and needs a redesign to match the overall design system of the application. The goal is to bring the page back to a clean, premium, and responsive layout, consistent with other pages (e.g., atendimentos.html) while preserving existing functionality.

## User Review Required

> [!IMPORTANT]
> The plan involves significant CSS and HTML adjustments. Please confirm that you want to proceed with the redesign, and let us know if there are any specific visual elements you want to keep or change.

## Proposed Changes

---
### CSS Adjustments

- **[MODIFY]** `/home/fabiano/Dados/GTameaça/manifestacoes.html`
  - Refactor inline styles into reusable CSS classes.
  - Add a dedicated section for **Manifestacoes** specific styles, improving spacing, typography, and card appearance.
  - Ensure the `.setor-selector`, `.parecer-setor`, `.historico-manifestacao`, and pagination components use the design tokens (colors, radii, shadows) defined in `:root`.
  - Introduce responsive tweaks for mobile view (already present but will be refined).
  - Align button styles with the existing `.reg-btn` variants for consistency.

---
### HTML Adjustments

- **[MODIFY]** `/home/fabiano/Dados/GTameaça/manifestacoes.html`
  - Replace many inline `style="..."` attributes with class names.
  - Wrap the main content of the page in a new `<section class="manifestacoes-page">` for scoped styling.
  - Ensure proper nesting and closing of tags (e.g., `<app-sidebar>` and `<app-header>` already close correctly).
  - Add semantic headings (`<h2>` for sections) to improve accessibility.
  - Update the pagination markup to use the existing `.pg-btn` classes without extra inline styles.

---
### JavaScript (Minor)

- No functional changes required, but we will update class names referenced in the script if they change (e.g., button class updates).

## Open Questions

> [!WARNING]
> - Do you have any custom branding colors or fonts that should override the default `Inter` font?
> - Should the **Parecer** form be displayed as a modal instead of inline? (Current design uses inline cards.)

## Verification Plan

### Automated Tests
- Run the local HTTP server (`python3 -m http.server 8080`) and manually inspect the page in a browser.
- Verify that the layout matches the design of other pages (header, sidebar, cards, buttons).
- Check responsiveness by resizing the browser window to mobile widths (<768px).

### Manual Verification
- Open `http://localhost:8080/manifestacoes.html` and confirm that:
  - The sidebar and header appear correctly.
  - The **Setor Selector** and **Parecer** sections are properly spaced and styled.
  - The historical manifestation cards display with consistent padding and shadows.
  - Pagination controls are aligned and functional.
  - No visual overflow or broken elements occur.

---
**End of Plan**
