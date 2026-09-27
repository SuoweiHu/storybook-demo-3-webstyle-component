import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// DateTime
// A date or time block built with ANU WebStyle utility classes.
// Supports dateblock mode (day/month/year or generic top/middle/bottom labels)
// and timeblock mode (start time display), each with optional companion text.
// ─────────────────────────────────────────────────────────────────────────────

export type DateTimeMode = 'date' | 'time';

export interface DateTimeProps {
  /** Whether to render a dateblock or a timeblock */
  mode?: DateTimeMode;

  // ── Date-mode props ──────────────────────────────────────────────────────

  /** Day number (1–31) displayed in the dateblock */
  day?: string;
  /** Month abbreviation (e.g. "Jan") displayed in the dateblock */
  month?: string;
  /** Year (e.g. "2024") displayed in the dateblock — use sparingly */
  year?: string;

  // ── Generic label props (date-mode alternative) ──────────────────────────

  /** Small text above the middle label (e.g. "Week", "10.00am") */
  topLabel?: string;
  /** Large text in the centre of the dateblock (e.g. "1", "15") */
  middleLabel?: string;
  /** Small text below the middle label (e.g. "2013", "January") */
  bottomLabel?: string;

  // ── Time-mode props ──────────────────────────────────────────────────────

  /** Start time string displayed in the timeblock (e.g. "10.00am") */
  timeStart?: string;

  // ── Shared props ─────────────────────────────────────────────────────────

  /** Show a faint vertical separator line between the block and text */
  showSeparator?: boolean;
  /** Companion descriptive text rendered beside the block */
  description?: React.ReactNode;
  /** Optional extra CSS class names to append to the outer wrapper */
  className?: string;
  /** Background class for an outer tinted wrapper (e.g. "bg-tint") */
  background?: 'none' | 'bg-tint';
}

export function DateTime({
  mode = 'date',
  day,
  month,
  year,
  topLabel,
  middleLabel,
  bottomLabel,
  timeStart,
  showSeparator = false,
  description,
  className,
  background = 'none',
}: DateTimeProps) {
  // ── Date block ───────────────────────────────────────────────────────────
  const renderDateBlock = () => {
    const blockClass = showSeparator ? 'dateblock-line' : 'dateblock';
    const useGenericLabels = topLabel || middleLabel || bottomLabel;

    return (
      <div className={blockClass}>
        {useGenericLabels ? (
          <>
            {topLabel && <div className="top-label">{topLabel}</div>}
            {middleLabel && <div className="middle-label">{middleLabel}</div>}
            {bottomLabel && <div className="bottom-label">{bottomLabel}</div>}
          </>
        ) : (
          <>
            {day && <div className="day">{day}</div>}
            {month && <div className="month">{month}</div>}
            {year && <div className="year">{year}</div>}
          </>
        )}
      </div>
    );
  };

  // ── Time block ───────────────────────────────────────────────────────────
  const renderTimeBlock = () => (
    <div className="timeblock">
      {timeStart && <div className="timestart">{timeStart}</div>}
    </div>
  );

  // ── Companion text ───────────────────────────────────────────────────────
  const textClass = mode === 'time' ? 'timetext' : 'datetext';

  // ── Outer wrapper ────────────────────────────────────────────────────────
  const wrapperClasses = [
    background !== 'none' ? `${background} left p-1` : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {mode === 'time' ? renderTimeBlock() : renderDateBlock()}
      {description && (
        <div className={textClass}>
          {typeof description === 'string' ? <p>{description}</p> : description}
        </div>
      )}
    </>
  );

  if (wrapperClasses) {
    return <div className={wrapperClasses}>{content}</div>;
  }

  return <>{content}</>;
}

DateTime.displayName = 'DateTime';


// ─────────────────────────────────────────────────────────────────────────────
// DateTimeList
// Stacks multiple DateTime entries with proper float clearing so they
// don't collapse into each other.
// ─────────────────────────────────────────────────────────────────────────────

export interface DateTimeListProps {
  /** Child DateTime elements */
  children: React.ReactNode;
  /** Optional extra CSS class names for the list wrapper */
  className?: string;
}

export function DateTimeList({ children, className }: DateTimeListProps) {
  const wrapperClass = ['left', className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="clear pb-1">
          {child}
        </div>
      ))}
    </div>
  );
}

DateTimeList.displayName = 'DateTimeList';
