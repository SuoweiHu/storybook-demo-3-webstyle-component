---
name: mdx-to-component
description: >-
  Given an existing Storybook MDX documentation file (*.mdx) that showcases ANU WebStyle
  CSS patterns, extracts the visual patterns and creates a standalone React component
  (*.tsx) with a typed props interface, plus a Storybook stories file (*.stories.tsx)
  with autodocs, controls, and comprehensive story variants.
---

# MDX to React Component + Stories

Reads an existing Storybook MDX documentation page (which demonstrates ANU WebStyle CSS
utility-class patterns via raw HTML/JSX examples) and produces two files:

1. **`<ComponentName>.tsx`** — A typed React component that wraps the CSS pattern.
2. **`<ComponentName>.stories.tsx`** — Storybook stories showcasing all variants.

Output directory: `components/WebStyle/components/`

---

## Workflow

### Step 1 — Analyse the source MDX

Read the target MDX file and identify:

| What to extract | Where to look in the MDX |
|---|---|
| **Visual pattern** | The rendered HTML/JSX examples (often inside `<Tab label="Use cases">` or `<Tab label="Style usage">`) |
| **CSS class names** | Every WebStyle utility class used (`bg-tint`, `overlap`, `dateblock`, `msg-error`, etc.) |
| **Structural variants** | Distinct visual configurations (e.g. "with date overlay" vs "without", "2-column grid" vs "3-column") |
| **Configurable parts** | Text content, optional elements, class toggles — these become component props |
| **Required vs optional parts** | Tables with "Required" / "Optional" labels, or logical analysis of which elements can be omitted |

### Step 2 — Design the component interface

Map the extracted patterns to a typed React `interface`:

1. **Identify every user-configurable aspect** of the pattern (content, toggles, style variants).
2. **Create a prop for each**, using appropriate TypeScript types:
   - **Content** → `string` or `React.ReactNode`
   - **CSS class toggles** → string union types (e.g. `'bg-tint' | 'bg-white' | 'bg-black'`)
   - **Optional elements** → optional props (`day?: string`) — presence/absence controls rendering
   - **Booleans** → for on/off features (e.g. `ratioImage?: boolean`)
3. **Set sensible defaults** for optional props.
4. **Add JSDoc comments** (`/** ... */`) to every prop.

#### Prop design principles

- Props should map to **user intent**, not raw CSS classes. For example, use `variant: 'error' | 'warn'` rather than `className: 'msg-error' | 'msg-warn'`.
- Keep a `className?: string` escape hatch for extra classes the user may want to append.
- If a group of CSS classes always appear together (e.g. `bg-black p-2 dateblock b-0 overlap-child`), encapsulate them inside the component — don't expose them as props.
- Use a **class map** (`Record<VariantName, string>`) when mapping prop values to CSS classes.

### Step 3 — Write the component file (`<ComponentName>.tsx`)

Create `components/WebStyle/components/<ComponentName>.tsx`:

```tsx
import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// <ComponentName>
// <Brief one-line description of what the component does.>
// ─────────────────────────────────────────────────────────────────────────────

export interface <ComponentName>Props {
  /** Description */
  propName: type;
  // ...
}

export function <ComponentName>({ prop1, prop2 = 'default', ...rest }: <ComponentName>Props) {
  // Build className string from props
  // Conditionally render optional sections
  // Return JSX that uses WebStyle utility classes
  return ( ... );
}

<ComponentName>.displayName = '<ComponentName>';
```

#### Component implementation rules

1. **Import only `React`** — no CSS imports needed (WebStyle is loaded globally via Storybook preview).
2. **Use `className` strings** — compose WebStyle utility classes; do NOT use CSS modules or inline styles.
3. **Conditionally render optional sections** based on prop presence:
   ```tsx
   {day && <div className="day">{day}</div>}
   ```
4. **Build class strings** by filtering and joining:
   ```tsx
   const classes = [baseClass, sizeClass, widthClass, className].filter(Boolean).join(' ');
   ```
5. **Set `displayName`** on every exported component for debugging.
6. **Export the component and its Props interface** as named exports.
7. If the pattern has a natural **layout wrapper** (e.g. grid), export a second helper component (e.g. `CardGrid`).

### Step 4 — Write the stories file (`<ComponentName>.stories.tsx`)

Create `components/WebStyle/components/<ComponentName>.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'WebStyle/Components/<ComponentName>',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    // Map props to appropriate Storybook controls
    variant: {
      control: 'select',
      options: ['option1', 'option2'],
    },
    boolProp: { control: 'boolean' },
    textProp: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;
```

#### Story categories to include

Write stories in this order, separated by section-comment dividers:

1. **Default / primary story** — the most common usage with typical args.
2. **One story per variant** — each distinct visual configuration gets its own story.
3. **Customisation stories** — demonstrate size, width, colour, or other modifier props.
4. **Composition / layout stories** — show the component used in grid or page context; use `render: () => (...)` for multi-component layouts.
5. **All-variants story** (optional) — renders every variant together for quick visual comparison.

#### Story implementation rules

1. **Import from `@storybook/react-vite`** (not `@storybook/react`).
2. **Always include `tags: ['autodocs']`** to auto-generate a docs page.
3. **Add `argTypes`** with appropriate controls for every prop that has a constrained set of values:
   - String unions → `control: 'select'` with `options: [...]`
   - Booleans → `control: 'boolean'`
   - Free text → `control: 'text'`
4. **Add a JSDoc comment** above each story export describing what it demonstrates.
5. **Use `args`** for single-component stories (enables controls panel).
6. **Use `render: () => (...)`** for multi-component composition stories (grids, layouts).
7. **Use varied but realistic placeholder content** across stories — don't repeat identical text in every story.
8. **Use `https://picsum.photos/seed/<unique-seed>/W/H`** for placeholder images with unique seeds per story.

### Step 5 — Update Storybook config (if needed)

Check `.storybook/preview.tsx` — if a `storySort.order` array exists, ensure `'Components'` is listed:

```ts
order: ['WebStyle', ['Introduction', 'Layout', 'Text', 'Graphics', 'Components']]
```

Only modify this if `'Components'` is not already present.

---

## Validation Checklist

After generating both files:

- [ ] `<ComponentName>.tsx` exports the component function and its `Props` interface.
- [ ] All props have JSDoc comments.
- [ ] `displayName` is set on every exported component.
- [ ] The component uses only WebStyle utility classes (no CSS imports, no inline styles).
- [ ] Optional parts render conditionally based on prop presence.
- [ ] `<ComponentName>.stories.tsx` imports from `@storybook/react-vite`.
- [ ] Meta includes `tags: ['autodocs']` and `argTypes` for constrained props.
- [ ] At least one story per visual variant exists.
- [ ] At least one composition/layout story exists (if the component is used in grids).
- [ ] Story titles follow `WebStyle/Components/<ComponentName>`.
- [ ] Each story has a JSDoc comment.
- [ ] Storybook `storySort` order includes `'Components'`.

---

## Reference: Existing examples

| Component | Source MDX | Key patterns extracted |
|---|---|---|
| `Card.tsx` | `text/DateTime.mdx` → "Style usage" tab | `bg-tint`, `overlap` + `overlap-child` image overlay, `dateblock` (`day`, `month`, `year`), content padding (`pt-2 pb-2 pl-3 pr-3`), grid layout (`col-md-6`, `col-lg-4`) |
| `Message.tsx` | `text/Message.mdx` → "General" + "Customisation" tabs | `msg-error`, `msg-warn`, `msg-info`, `msg-success`, `msg-inline`, size modifier (`large`), width modifier (`w50`, `w60`, `w80`) |
