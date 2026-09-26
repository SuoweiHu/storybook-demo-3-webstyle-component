import React, { useEffect, useId, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Carousel
// An image carousel / slider component built with ANU WebStyle utility classes
// and Bootstrap Carousel behavior. Supports auto-play, custom intervals,
// indicator styles, controls styling, fade transitions, and bottom-bar layouts.
// ─────────────────────────────────────────────────────────────────────────────

export interface CarouselSlide {
  /** Image source URL */
  imageSrc: string;
  /** Image alt text for accessibility */
  imageAlt?: string;
  /** Optional caption heading (rendered in h5) */
  title?: string;
  /** Optional caption description text (rendered in p) */
  description?: string;
  /** Custom time interval for this specific slide in milliseconds (e.g. 1000, 2000) */
  interval?: number;
}

export interface CarouselProps {
  /** Array of slides to display in the carousel */
  slides: CarouselSlide[];
  /** Whether the carousel should automatically cycle through slides */
  autoPlay?: boolean;
  /** Delay (in milliseconds) between automatically cycling an item. Default is 5000ms (5s). */
  interval?: number;
  /** Transition effect between slides ('slide' for horizontal slide, 'fade' for cross-fade) */
  transition?: 'slide' | 'fade';
  /** Whether to display the slide indicators */
  showIndicators?: boolean;
  /** Indicator styling variant ('default' for white bars, 'gold' for ANU gold dots) */
  indicatorVariant?: 'default' | 'gold';
  /** Whether to display the previous and next control arrows */
  showControls?: boolean;
  /** Control arrow color variant ('light' for white controls, 'dark' for dark controls) */
  controlsVariant?: 'light' | 'dark';
  /** Whether to position indicators and controls in a bottom bar layout below the slides */
  bottomBar?: boolean;
  /** Whether cycling pauses when the mouse cursor enters the carousel */
  pauseOnHover?: boolean;
  /** Whether the carousel should cycle continuously or have hard stops */
  wrap?: boolean;
  /** Optional callback fired when a slide transition completes */
  onSlideChange?: (activeIndex: number) => void;
  /** Unique ID for the carousel container. If not provided, a unique ID is auto-generated. */
  id?: string;
  /** Additional CSS classes to apply to the carousel container */
  className?: string;
}

export function Carousel({
  slides,
  autoPlay = false,
  interval = 5000,
  transition = 'slide',
  showIndicators = true,
  indicatorVariant = 'default',
  showControls = true,
  controlsVariant = 'light',
  bottomBar = false,
  pauseOnHover = true,
  wrap = true,
  onSlideChange,
  id,
  className,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId().replace(/:/g, '-');
  const carouselId = id || `anu-carousel${reactId}`;

  // Manage Bootstrap Carousel instance lifecycle and auto-play
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const win = typeof window !== 'undefined' ? (window as unknown as { bootstrap?: { Carousel?: any } }) : undefined;
    const CarouselConstructor = win?.bootstrap?.Carousel;
    if (!CarouselConstructor) return;

    const instance = CarouselConstructor.getOrCreateInstance(element, {
      interval: autoPlay ? interval : false,
      ride: autoPlay ? 'carousel' : false,
      pause: pauseOnHover ? 'hover' : false,
      wrap,
    });

    if (autoPlay) {
      instance.cycle();
    } else {
      instance.pause();
    }

    const handleSlid = (event: Event & { to?: number }) => {
      if (typeof event.to === 'number' && onSlideChange) {
        onSlideChange(event.to);
      }
    };

    element.addEventListener('slid.bs.carousel', handleSlid);

    return () => {
      element.removeEventListener('slid.bs.carousel', handleSlid);
      instance.dispose();
    };
  }, [autoPlay, interval, pauseOnHover, wrap, onSlideChange]);

  if (!slides || slides.length === 0) {
    return null;
  }

  // Compose container classes
  const containerClasses = [
    'carousel',
    'slide',
    transition === 'fade' ? 'carousel-fade' : '',
    bottomBar ? 'carousel-with-bottom-bar' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Indicator classes
  const indicatorClasses = [
    'carousel-indicators',
    indicatorVariant === 'gold' ? 'carousel-indicators-gold' : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Control button classes
  const controlDarkClass = controlsVariant === 'dark' ? 'carousel-control-dark' : '';
  const prevButtonClasses = ['carousel-control-prev', controlDarkClass].filter(Boolean).join(' ');
  const nextButtonClasses = ['carousel-control-next', controlDarkClass].filter(Boolean).join(' ');

  const renderIndicators = () => (
    <div className={indicatorClasses}>
      {slides.map((_, index) => (
        <button
          key={index}
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide-to={index}
          className={index === 0 ? 'active' : ''}
          aria-current={index === 0 ? 'true' : undefined}
          aria-label={`Slide ${index + 1}`}
        />
      ))}
    </div>
  );

  const renderControls = () => (
    <>
      <button
        className={prevButtonClasses}
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="prev"
        aria-label="Previous slide"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true">
          {'\u00A0'}
        </span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className={nextButtonClasses}
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="next"
        aria-label="Next slide"
      >
        <span className="carousel-control-next-icon" aria-hidden="true">
          {'\u00A0'}
        </span>
        <span className="visually-hidden">Next</span>
      </button>
    </>
  );

  return (
    <div
      ref={containerRef}
      id={carouselId}
      className={containerClasses}
      data-bs-ride={autoPlay ? 'carousel' : 'false'}
      data-bs-interval={interval}
    >
      {/* Non-bottom-bar indicators */}
      {!bottomBar && showIndicators && renderIndicators()}

      {/* Slide items */}
      <div className="carousel-inner">
        {slides.map((slide, index) => {
          const itemClasses = ['carousel-item', index === 0 ? 'active' : ''].filter(Boolean).join(' ');
          const hasCaption = Boolean(slide.title || slide.description);

          return (
            <div
              key={index}
              className={itemClasses}
              {...(slide.interval ? { 'data-bs-interval': slide.interval } : {})}
            >
              <img
                src={slide.imageSrc}
                alt={slide.imageAlt ?? slide.title ?? `Slide ${index + 1}`}
                className="d-block w100"
              />
              {hasCaption && (
                <div className="carousel-caption d-none d-md-block">
                  {slide.title && <h5>{slide.title}</h5>}
                  {slide.description && <p>{slide.description}</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Non-bottom-bar controls */}
      {!bottomBar && showControls && renderControls()}

      {/* Bottom bar variation */}
      {bottomBar && (
        <div className="carousel-bottom-bar">
          {showIndicators && renderIndicators()}
          {showControls && <div className="carousel-buttons">{renderControls()}</div>}
        </div>
      )}
    </div>
  );
}

Carousel.displayName = 'Carousel';
