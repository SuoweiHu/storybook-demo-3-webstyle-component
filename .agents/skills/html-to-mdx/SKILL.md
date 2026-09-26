---
name: html-to-mdx
description: >-
  Given a target filename and raw HTML snippet, transforms the HTML and creates/populates
  a complete Storybook MDX documentation file with proper layout, TabGroup tabs,
  JSX wrappers, and ANU WebStyle standards.
---

# HTML to Storybook MDX Generator

Transforms raw HTML snippets (e.g. from Drupal/WebStyle pages) into a complete, valid Storybook MDX documentation file and saves it directly to the target path.

---

## Workflow: From Filename + HTML to MDX

When given a target filepath (e.g., `components/WebStyle/text/PullQuotes.mdx`) and an HTML snippet:

1. **Derive Metadata & Scaffold**:
   - **Story Title**: Derived from relative path under `components/` with title-casing and spaces (e.g. `components/WebStyle/text/PullQuotes.mdx` → `WebStyle/Text/Pull Quotes`).
   - **Page Heading**: `# <Component Name>` (e.g. `# Pull Quotes`).
   - **TabGroup Import**: Calculate relative path to `TabGroup.tsx` (e.g. `'../layout/TabGroup'` from `text/`, or `'./TabGroup'` from `layout/`).

2. **Transform HTML to JSX/MDX** (apply transformation rules below).

3. **Assemble Full MDX File** (using standard page structure below).

4. **Write File**:
   - Write using `write_to_file`.
   - Do NOT run terminal `tsc` checks. Verify syntax and formatting directly against the checklist.

---

## Standard Page Structure

```mdx
import { Meta } from '@storybook/addon-docs/blocks';
import { Tab, TabGroup } from '../layout/TabGroup';
import { Unstyled } from '@storybook/addon-docs/blocks';


<Meta title="WebStyle/<Section>/<Component Name>" />


<Unstyled>

# <Component Name>

<div className="row">
  <div className="col">
    <div className="layout__region layout__region--first">
      <div className="block-template-default">
        <div className="field field--name-body field--type-text-with-summary field--label-hidden field__item">
          {/* Top Intro Container */}
          <div className="container pb-2">
            ...
          </div>

          {/* Tabs Container */}
          <TabGroup>
            <Tab label="General">
              ...
            </Tab>
            <Tab label="Use cases">
              ...
            </Tab>
          </TabGroup>
        </div>
      </div>
    </div>
  </div>
</div>
</Unstyled>
```

---

## Transformation Rules

### 1. Attributes & Styles
- `class="..."` → `className="..."`
- `style="overflow-x: auto;"` → `style={{ overflowX: "auto" }}` (convert CSS string to JSX style object)
- `for="..."` → `htmlFor="..."`, `tabindex="..."` → `tabIndex={0}`

### 2. Relative URLs → Absolute URLs
Prepend `https://webpublishing.anu.edu.au` to any `href` or `src` starting with `/`:
- `<a href="/web-style-guide/width">` → `<a href="https://webpublishing.anu.edu.au/web-style-guide/width">`
- Leave absolute URLs (`http://`, `https://`, `mailto:`, `#`) unchanged.

### 3. Wrap Text Nodes in JSX Expressions
Wrap all direct text nodes inside elements with `` {` ... `} ``:
- `<p>Hello world</p>` → `<p>{`Hello world`}</p>`
- `<code>.w80</code>` → `<code>{`.w80`}</code>`
- Do not wrap child tags; only text nodes.
- Escape inner backticks if present: `` \` ``.

### 4. Decode HTML Entities
- `&amp;` → `&`
- `&lt;` → `<`
- `&gt;` → `>`
- `&quot;` → `"`
- `&#39;` / `&apos;` → `'`
- `&nbsp;` → `{`\u00A0`}` (or space inside text expression)

### 5. Self-Close Void Elements
- `<img ...>` → `<img ... />`
- `<br>` → `<br />`
- `<hr>` → `<hr />`
- `<input ...>` → `<input ... />`

### 6. Comments
- Convert HTML comments `<!-- text -->` to JSX comments `{/* text */}`.

### 7. Tabs Layout (`pagetabs-nav-tint` → `<TabGroup>`)
Replace legacy Drupal tab markup:
```html
<div class="pagetabs-nav-tint">
  <ul>
    <li><a class="pagetabs-select">General</a></li>
    <li><a>Use cases</a></li>
  </ul>
  <div class="tab-content">
    <div class="tab-pane active">...</div>
    <div class="tab-pane">...</div>
  </div>
</div>
```
With React `<TabGroup>`:
```mdx
<TabGroup>
  <Tab label="General">
    ...
  </Tab>
  <Tab label="Use cases">
    ...
  </Tab>
</TabGroup>
```

---

## Validation Checklist

After generating the file:
- [ ] File created at target path with correct imports (`Meta`, `Tab`, `TabGroup`, `Unstyled`).
- [ ] No `class=` attributes remain (all `className=`).
- [ ] No inline style strings remain (converted to objects).
- [ ] No relative URLs starting with `/` remain.
- [ ] All plain text nodes wrapped in `` {` ... `} ``.
- [ ] All HTML entities decoded (`&lt;`, `&gt;`, `&amp;`).
- [ ] Void elements self-closed.
- [ ] Tabs converted to `<TabGroup>` and `<Tab>`.
