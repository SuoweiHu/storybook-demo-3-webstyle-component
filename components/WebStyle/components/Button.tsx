import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Button
// A call-to-action button built with ANU WebStyle utility classes.
// Renders as an <a> element with gold, black, or white styling variants
// and optional percentage-based width control.
// ─────────────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'default' | 'black' | 'white';
export type ButtonWidth =
  | 'auto'
  | 'w20'
  | 'w30'
  | 'w40'
  | 'w50'
  | 'w60'
  | 'w70'
  | 'w80'
  | 'w90'
  | 'w100';

export interface ButtonProps {
  /** The visual style variant of the button */
  variant?: ButtonVariant;
  /** Button label (text or rich content) */
  children: React.ReactNode;
  /** URL the button links to */
  href?: string;
  /** Percentage-based width constraint (e.g. 'w80' = 80% of parent) */
  width?: ButtonWidth;
  /** Optional extra CSS class names to append */
  className?: string;
}

const variantClassMap: Record<ButtonVariant, string> = {
  default: 'anu-btn',
  black: 'anu-btn-black',
  white: 'anu-btn-white',
};

export function Button({
  variant = 'default',
  children,
  href = '#',
  width = 'auto',
  className,
}: ButtonProps) {
  const classes = [
    variantClassMap[variant],
    width !== 'auto' ? width : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a className={classes} href={href}>
      {children}
    </a>
  );
}

Button.displayName = 'Button';
