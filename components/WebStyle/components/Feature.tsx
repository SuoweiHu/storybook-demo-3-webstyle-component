import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Feature
// A promotional feature block built with ANU WebStyle utility classes.
// Supports image-left, image-right, and text-only layouts with configurable
// background/border styles.
// ─────────────────────────────────────────────────────────────────────────────

export interface FeatureProps {
  /** Layout variant controlling image position */
  layout?: 'image-left' | 'image-right' | 'text-only';
  /** Small uppercase label displayed above the title (e.g. "FEATURED") */
  label?: string;
  /** Main heading text */
  title: string;
  /** Small uppercase subtitle displayed below the title (e.g. "ONLINE EXHIBITION") */
  subtitle?: string;
  /** Descriptive body text */
  description?: string;
  /** URL for the "Read More" link */
  readMoreHref?: string;
  /** Text for the read more link */
  readMoreText?: string;
  /** Image source URL (required for image-left and image-right layouts) */
  imageSrc?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Container style variant */
  containerStyle?: 'bg-tint' | 'box-bdr-gold' | 'box-bdr-black' | 'bg-white';
  /** Additional CSS class names to append to the outer wrapper */
  className?: string;
}

export function Feature({
  layout = 'image-left',
  label,
  title,
  subtitle,
  description,
  readMoreHref,
  readMoreText = 'Read More',
  imageSrc,
  imageAlt = '',
  containerStyle = 'bg-tint',
  className,
}: FeatureProps) {
  // Build the text content block (shared across all layouts)
  const textBlock = (
    <div className="p-3 mb-0">
      {label && (
        <p className="small uppercase text-unigrey">
          <strong>{label}</strong>
        </p>
      )}
      <h2>
        <strong>{title}</strong>
      </h2>
      {subtitle && (
        <p className="small uppercase text-unigrey">{subtitle}</p>
      )}
      {description && <p>{description}</p>}
      {readMoreHref && (
        <p className="text-right mb-0">
          <a href={readMoreHref}>{readMoreText} </a>
          {`»`}
        </p>
      )}
    </div>
  );

  // Text-only layout — no image columns, just the text block
  if (layout === 'text-only') {
    const outerClasses = [containerStyle, 'p-3', className]
      .filter(Boolean)
      .join(' ');
    return (
      <div className={outerClasses}>
        {label && (
          <p className="small text-unigrey">
            <strong>{label}</strong>
          </p>
        )}
        <h2>
          <strong>{title}</strong>
        </h2>
        {subtitle && (
          <p className="small text-unigrey">{subtitle}</p>
        )}
        {description && <p>{description}</p>}
        {readMoreHref && (
          <p className="text-right mb-0">
            <a href={readMoreHref}>{readMoreText} </a>
            {`»`}
          </p>
        )}
      </div>
    );
  }

  // Image element used in image-left / image-right layouts
  const imageElement = (
    <div className="col-md-6 col-lg-8 col-12">
      <img
        alt={imageAlt}
        draggable={false}
        loading="lazy"
        src={imageSrc}
      />
    </div>
  );

  const textColumn = (
    <div className="col-md-6 col-lg-4 col-12">{textBlock}</div>
  );

  const rowClasses = ['row equal g-0', containerStyle, 'p-0', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rowClasses}>
      {layout === 'image-left' ? (
        <>
          {imageElement}
          {textColumn}
        </>
      ) : (
        <>
          {textColumn}
          {imageElement}
        </>
      )}
    </div>
  );
}

Feature.displayName = 'Feature';


// ─────────────────────────────────────────────────────────────────────────────
// FeatureGrid
// Lays out Feature (text-only) children in a responsive Bootstrap grid row.
// ─────────────────────────────────────────────────────────────────────────────

export interface FeatureGridProps {
  /** Number of columns at the lg breakpoint (2 or 3) */
  columns?: 2 | 3;
  /** Child Feature elements */
  children: React.ReactNode;
}

export function FeatureGrid({ columns = 3, children }: FeatureGridProps) {
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

FeatureGrid.displayName = 'FeatureGrid';
