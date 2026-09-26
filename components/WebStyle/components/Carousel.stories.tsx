import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel, type CarouselSlide } from './Carousel';

const sampleSlides: CarouselSlide[] = [
  {
    imageSrc: 'https://picsum.photos/seed/anu-carousel-1/1200/600',
    imageAlt: 'ANU Campus Spring',
    title: 'First slide label',
    description: 'Some representative placeholder content for the first slide.',
  },
  {
    imageSrc: 'https://picsum.photos/seed/anu-carousel-2/1200/600',
    imageAlt: 'Research Laboratory',
    title: 'Second slide label',
    description: 'Some representative placeholder content for the second slide.',
  },
  {
    imageSrc: 'https://picsum.photos/seed/anu-carousel-3/1200/600',
    imageAlt: 'Graduation Ceremony',
    title: 'Third slide label',
    description: 'Some representative placeholder content for the third slide.',
  },
];

const meta: Meta<typeof Carousel> = {
  title: 'WebStyle/Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    autoPlay: {
      control: 'boolean',
      description: 'Whether the carousel automatically cycles through slides',
    },
    interval: {
      control: 'number',
      description: 'Time in milliseconds between slide transitions',
    },
    transition: {
      control: 'select',
      options: ['slide', 'fade'],
      description: 'Visual transition effect between slides',
    },
    indicatorVariant: {
      control: 'select',
      options: ['default', 'gold'],
      description: 'Style of indicator buttons',
    },
    controlsVariant: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Style of prev/next navigation controls',
    },
    showIndicators: {
      control: 'boolean',
      description: 'Whether to show the slide indicators',
    },
    showControls: {
      control: 'boolean',
      description: 'Whether to show previous/next buttons',
    },
    bottomBar: {
      control: 'boolean',
      description: 'Render indicators and controls in a bottom bar layout below the slides',
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Pause cycling on mouse hover',
    },
    wrap: {
      control: 'boolean',
      description: 'Whether cycling loops continuously',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

// ─────────────────────────────────────────────────────────────────────────────
// Default Story
// ─────────────────────────────────────────────────────────────────────────────

/** Default carousel with 3 slides, captions, indicators, and navigation controls. */
export const Default: Story = {
  args: {
    slides: sampleSlides,
    autoPlay: false,
    interval: 5000,
    transition: 'slide',
    showIndicators: true,
    showControls: true,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Auto-Play Stories
// ─────────────────────────────────────────────────────────────────────────────

/** Auto-play enabled carousel cycling every 5 seconds (5000ms default interval). */
export const AutoPlayOn: Story = {
  args: {
    slides: [
      {
        imageSrc: 'https://picsum.photos/seed/autoplay-1/1200/600',
        title: 'Auto-playing Slide 1',
        description: 'This carousel cycles automatically every 5 seconds.',
      },
      {
        imageSrc: 'https://picsum.photos/seed/autoplay-2/1200/600',
        title: 'Auto-playing Slide 2',
        description: 'Hovering over the carousel pauses the cycle automatically.',
      },
      {
        imageSrc: 'https://picsum.photos/seed/autoplay-3/1200/600',
        title: 'Auto-playing Slide 3',
        description: 'Moving the mouse away resumes automatic cycling.',
      },
    ],
    autoPlay: true,
    interval: 5000,
  },
};

/** Faster auto-play with a custom 3-second (3000ms) interval across all slides. */
export const CustomInterval: Story = {
  args: {
    slides: [
      {
        imageSrc: 'https://picsum.photos/seed/interval-1/1200/600',
        title: 'Fast Cycle 1',
        description: 'Configured with a general 3000ms time interval.',
      },
      {
        imageSrc: 'https://picsum.photos/seed/interval-2/1200/600',
        title: 'Fast Cycle 2',
        description: 'Cycles smoothly every 3 seconds.',
      },
      {
        imageSrc: 'https://picsum.photos/seed/interval-3/1200/600',
        title: 'Fast Cycle 3',
        description: 'Interval is fully configurable via the interval prop.',
      },
    ],
    autoPlay: true,
    interval: 3000,
  },
};

/** Variable per-slide intervals: 1s for slide 1, 2s for slide 2, and 4s for slide 3. */
export const PerSlideInterval: Story = {
  args: {
    slides: [
      {
        imageSrc: 'https://picsum.photos/seed/perslide-1/1200/600',
        title: '1-Second Slide',
        description: 'This slide stays visible for 1000ms before advancing.',
        interval: 1000,
      },
      {
        imageSrc: 'https://picsum.photos/seed/perslide-2/1200/600',
        title: '2-Second Slide',
        description: 'This slide stays visible for 2000ms before advancing.',
        interval: 2000,
      },
      {
        imageSrc: 'https://picsum.photos/seed/perslide-3/1200/600',
        title: '4-Second Slide',
        description: 'This slide stays visible for 4000ms before advancing.',
        interval: 4000,
      },
    ],
    autoPlay: true,
    interval: 5000,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Visual Variants
// ─────────────────────────────────────────────────────────────────────────────

/** Cross-fade transition between slides instead of standard sliding motion. */
export const FadeTransition: Story = {
  args: {
    slides: [
      {
        imageSrc: 'https://picsum.photos/seed/fade-1/1200/600',
        title: 'Cross-Fade Effect 1',
        description: 'Slides fade smoothly between one another.',
      },
      {
        imageSrc: 'https://picsum.photos/seed/fade-2/1200/600',
        title: 'Cross-Fade Effect 2',
        description: 'Uses the carousel-fade utility class.',
      },
      {
        imageSrc: 'https://picsum.photos/seed/fade-3/1200/600',
        title: 'Cross-Fade Effect 3',
        description: 'Great for atmospheric photography.',
      },
    ],
    transition: 'fade',
    autoPlay: true,
    interval: 4000,
  },
};

/** ANU Gold indicators style (`carousel-indicators-gold`). */
export const GoldIndicators: Story = {
  args: {
    slides: sampleSlides,
    indicatorVariant: 'gold',
  },
};

/** Dark controls variation (`carousel-control-dark`) for lighter slide images. */
export const DarkControls: Story = {
  args: {
    slides: [
      {
        imageSrc: 'https://picsum.photos/seed/lightimg-1/1200/600?grayscale',
        title: 'High Key Slide 1',
        description: 'Dark navigation controls provide better contrast against light images.',
      },
      {
        imageSrc: 'https://picsum.photos/seed/lightimg-2/1200/600?grayscale',
        title: 'High Key Slide 2',
        description: 'Controls use inverted dark iconography.',
      },
    ],
    controlsVariant: 'dark',
    indicatorVariant: 'gold',
  },
};

/** Bottom bar layout positioning indicators and navigation buttons below the slide area. */
export const BottomBar: Story = {
  args: {
    slides: [
      {
        imageSrc: 'https://picsum.photos/seed/bottombar-1/1200/600',
        title: 'Bottom Bar Slide 1',
        description: 'Indicators and navigation buttons sit below the imagery.',
      },
      {
        imageSrc: 'https://picsum.photos/seed/bottombar-2/1200/600',
        title: 'Bottom Bar Slide 2',
        description: 'Useful for hero banners with clean, unobstructed visual presentation.',
      },
      {
        imageSrc: 'https://picsum.photos/seed/bottombar-3/1200/600',
        title: 'Bottom Bar Slide 3',
        description: 'Indicators and buttons are grouped neatly at the bottom.',
      },
    ],
    bottomBar: true,
    indicatorVariant: 'gold',
    controlsVariant: 'dark',
  },
};

/** Clean carousel without captions — images only. */
export const WithoutCaptions: Story = {
  args: {
    slides: [
      { imageSrc: 'https://picsum.photos/seed/nocap-1/1200/600', imageAlt: 'Gallery Photo 1' },
      { imageSrc: 'https://picsum.photos/seed/nocap-2/1200/600', imageAlt: 'Gallery Photo 2' },
      { imageSrc: 'https://picsum.photos/seed/nocap-3/1200/600', imageAlt: 'Gallery Photo 3' },
    ],
  },
};

/** Carousel without indicators, showing only prev/next control buttons. */
export const WithoutIndicators: Story = {
  args: {
    slides: sampleSlides,
    showIndicators: false,
  },
};

/** Carousel without prev/next navigation controls, relying solely on indicators. */
export const WithoutControls: Story = {
  args: {
    slides: sampleSlides,
    showControls: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Composition Stories
// ─────────────────────────────────────────────────────────────────────────────

/** Carousel embedded in a realistic ANU WebStyle page layout context. */
export const InPageLayout: StoryObj<typeof Carousel> = {
  render: () => (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 col-lg-8">
          <h2>Featured Research Stories</h2>
          <p className="lead">
            Discover the latest breakthroughs, academic achievements, and university life highlights across the Australian National University.
          </p>
          <Carousel
            slides={[
              {
                imageSrc: 'https://picsum.photos/seed/page-layout-1/1200/600',
                title: 'Quantum Computing Breakthrough',
                description: 'ANU researchers achieve new milestones in scalable quantum photonics.',
              },
              {
                imageSrc: 'https://picsum.photos/seed/page-layout-2/1200/600',
                title: 'Environmental Sustainability',
                description: 'Global climate researchers collaborate at the ANU Climate Institute.',
              },
              {
                imageSrc: 'https://picsum.photos/seed/page-layout-3/1200/600',
                title: 'Astronomy & Space Exploration',
                description: 'Discoveries from the Siding Spring Observatory advance celestial understanding.',
              },
            ]}
            autoPlay
            interval={4000}
            indicatorVariant="gold"
          />
        </div>
        <div className="col-12 col-lg-4 mt-4 mt-lg-0">
          <div className="bg-tint p-3">
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
              <li className="pb-2">
                <a href="#research">Research Publications</a>
              </li>
              <li className="pb-2">
                <a href="#events">Upcoming Public Lectures</a>
              </li>
              <li className="pb-2">
                <a href="#admissions">Student Admissions & Scholarships</a>
              </li>
              <li>
                <a href="#campus">Campus Maps & Visiting Information</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
};
