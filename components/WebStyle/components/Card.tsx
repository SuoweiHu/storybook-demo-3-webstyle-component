import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Card
// An event/news card built with ANU WebStyle utility classes.
// Combines an image (with optional date overlay) and text content
// on a tinted background.
// ─────────────────────────────────────────────────────────────────────────────

export interface CardProps {
  /** Image source URL */
  imageSrc: string;
  /** Image alt text */
  imageAlt?: string;
  /** Card title */
  title: string;
  /** Card description / summary */
  description?: string;
  /** URL the card title links to */
  href?: string;
  /** Day number to display in the date overlay (e.g. "15") */
  day?: string;
  /** Month abbreviation to display in the date overlay (e.g. "Jan") */
  month?: string;
  /** Year to display in the date overlay (e.g. "2024") */
  year?: string;
  /** Background variant for the card container */
  background?: 'bg-tint' | 'bg-white' | 'bg-black';
  /** Whether to enforce a 16:9 aspect ratio on the image */
  ratioImage?: boolean;
}

export function Card({
  imageSrc,
  imageAlt = '',
  title,
  description,
  href,
  day,
  month,
  year,
  background = 'bg-tint',
  ratioImage = true,
}: CardProps) {
  const showDateOverlay = day || month;
  const imgClassName = `w100${ratioImage ? ' ratio-16-9' : ''}`;

  const titleContent = href ? <a href={href}>{title}</a> : <a>{title}</a>;

  return (
    <div className={background}>
      {showDateOverlay ? (
        <div className="overlap">
          <img
            alt={imageAlt}
            className={imgClassName}
            loading="lazy"
            src={imageSrc}
          />
          <div className="bg-black p-2 dateblock b-0 overlap-child">
            {day && <div className="day">{day}</div>}
            {month && <div className="month">{month}</div>}
            {year && <div className="year">{year}</div>}
          </div>
        </div>
      ) : (
        <img
          alt={imageAlt}
          className={imgClassName}
          loading="lazy"
          src={imageSrc}
        />
      )}
      <div className="pt-2 pb-2 pl-3 pr-3">
        <h4>{titleContent}</h4>
        {description && <p className="my-0">{description}</p>}
      </div>
    </div>
  );
}

Card.displayName = 'Card';


// ─────────────────────────────────────────────────────────────────────────────
// CardGrid
// Lays out Card children in a responsive Bootstrap grid row.
// ─────────────────────────────────────────────────────────────────────────────

export interface CardGridProps {
  /** Number of columns at the lg breakpoint (2 or 3) */
  columns?: 2 | 3;
  /** Child Card elements */
  children: React.ReactNode;
}

export function CardGrid({ columns = 3, children }: CardGridProps) {
  const colClass =
    columns === 2
      ? 'col-md-6 col-12 pb-2'
      : 'col-md-6 col-lg-4 col-12 pb-2';

  return (
    <div className="row">
      {React.Children.map(children, (child, index) => (
        <div key={index} className={colClass}>
          {child}
        </div>
      ))}
    </div>
  );
}

CardGrid.displayName = 'CardGrid';
