import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Message
// An inline message/alert component built with ANU WebStyle utility classes.
// Supports error, warning, info, success, and inline variants, each with
// its own colour and icon defined by the WebStyle CSS.
// ─────────────────────────────────────────────────────────────────────────────

export type MessageVariant = 'error' | 'warn' | 'info' | 'success' | 'inline';
export type MessageSize = 'default' | 'large';
export type MessageWidth = 'auto' | 'w50' | 'w60' | 'w80';

export interface MessageProps {
  /** The message variant / severity */
  variant: MessageVariant;
  /** Message content (text or rich content) */
  children: React.ReactNode;
  /** Font size modifier */
  size?: MessageSize;
  /** Width constraint class */
  width?: MessageWidth;
  /** Optional extra CSS class names to append */
  className?: string;
  /** Render as a `<div>` instead of the default `<p>` */
  asDiv?: boolean;
}

const variantClassMap: Record<MessageVariant, string> = {
  error: 'msg-error',
  warn: 'msg-warn',
  info: 'msg-info',
  success: 'msg-success',
  inline: 'msg-inline',
};

export function Message({
  variant,
  children,
  size = 'default',
  width = 'auto',
  className,
  asDiv = false,
}: MessageProps) {
  const classes = [
    variantClassMap[variant],
    size === 'large' ? 'large' : undefined,
    width !== 'auto' ? width : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Tag = asDiv ? 'div' : 'p';

  return <Tag className={classes}>{children}</Tag>;
}

Message.displayName = 'Message';
