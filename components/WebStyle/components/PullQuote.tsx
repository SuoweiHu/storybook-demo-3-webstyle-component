import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// PullQuote
// A highlighted quote component built with the ANU WebStyle `pullquote` class.
// Text is rendered slightly larger than regular content, centre-aligned, and
// wrapped in quotation marks by the CSS.
// ─────────────────────────────────────────────────────────────────────────────

export type PullQuoteFloat = 'left' | 'right' | 'none';
export type PullQuoteWidth = 'default' | 'w60' | 'w80' | 'w100';
export type PullQuoteColor = 'default' | 'unigrey' | 'gold';

export interface PullQuoteProps {
  /** The quote content (text or rich content). */
  children: React.ReactNode;
  /** Float direction — controls alignment and text wrapping behaviour. */
  float?: PullQuoteFloat;
  /** Width override — by default, pull quotes are 50% of their parent container. */
  width?: PullQuoteWidth;
  /** Text colour variant. `gold` automatically wraps content in `<strong>` for WCAG compliance. */
  color?: PullQuoteColor;
  /** Wrap the content in a `<strong>` tag for emphasis and accessibility. Automatically enabled when `color` is `gold`. */
  bold?: boolean;
  /** Optional extra CSS class names to append. */
  className?: string;
}

const colorClassMap: Record<PullQuoteColor, string | undefined> = {
  default: undefined,
  unigrey: 'text-unigrey',
  gold: 'text-gold',
};

export function PullQuote({
  children,
  float = 'left',
  width = 'default',
  color = 'default',
  bold,
  className,
}: PullQuoteProps) {
  // Gold text requires <strong> for WCAG compliance
  const shouldBold = bold ?? color === 'gold';

  const classes = [
    'pullquote',
    float !== 'none' ? float : undefined,
    width !== 'default' ? width : undefined,
    colorClassMap[color],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = shouldBold ? <strong>{children}</strong> : children;

  return (
    <div className={classes}>
      <p>{content}</p>
    </div>
  );
}

PullQuote.displayName = 'PullQuote';
