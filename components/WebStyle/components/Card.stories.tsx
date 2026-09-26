import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardGrid } from './Card';

const meta: Meta<typeof Card> = {
  title: 'WebStyle/Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'select',
      options: ['bg-tint', 'bg-white', 'bg-black'],
    },
    ratioImage: { control: 'boolean' },
    day: { control: 'text' },
    month: { control: 'text' },
    year: { control: 'text' },
    href: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// ─────────────────────────────────────────────────────────────────────────────
// Individual Card stories
// ─────────────────────────────────────────────────────────────────────────────

/** Default card with an image, date overlay, title, and description. */
export const Default: Story = {
  args: {
    imageSrc: 'https://picsum.photos/seed/card-default/800/450',
    imageAlt: 'Placeholder image',
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    day: '15',
    month: 'Jan',
    href: '#',
  },
};

/** Card showing day, month, and year in the date overlay. */
export const WithYear: Story = {
  args: {
    imageSrc: 'https://picsum.photos/seed/card-year/800/450',
    imageAlt: 'Event photo',
    title: 'Annual research symposium',
    description:
      'Join us for the annual research symposium featuring keynote speakers and poster presentations.',
    day: '22',
    month: 'Feb',
    year: '2024',
    href: '#',
  },
};

/** Card without a date overlay — suitable for non-event content. */
export const WithoutDate: Story = {
  args: {
    imageSrc: 'https://picsum.photos/seed/card-nodate/800/450',
    imageAlt: 'Feature image',
    title: 'Featured research highlight',
    description:
      'A simpler card variant without the date overlay, suitable for general content or features.',
    href: '#',
  },
};

/** Card without a description — title only. */
export const TitleOnly: Story = {
  args: {
    imageSrc: 'https://picsum.photos/seed/card-title/800/450',
    imageAlt: 'Minimal card image',
    title: 'A minimal card with title only',
    day: '10',
    month: 'Mar',
    href: '#',
  },
};

/** Card on a dark background. */
export const DarkBackground: Story = {
  args: {
    imageSrc: 'https://picsum.photos/seed/card-dark/800/450',
    imageAlt: 'Dark themed card',
    title: 'Dark background variant',
    description:
      'This card uses the bg-black background class for a dark appearance.',
    day: '5',
    month: 'Apr',
    background: 'bg-black',
    href: '#',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Grid layout stories
// ─────────────────────────────────────────────────────────────────────────────

/** Two-column event grid with date overlays. */
export const Grid2Columns: StoryObj<typeof CardGrid> = {
  render: () => (
    <CardGrid columns={2}>
      <Card
        imageSrc="https://picsum.photos/seed/grid2a/800/450"
        imageAlt="Event 1"
        title="Lorem ipsum dolor sit amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        day="15"
        month="Jan"
        href="#"
      />
      <Card
        imageSrc="https://picsum.photos/seed/grid2b/800/450"
        imageAlt="Event 2"
        title="Ut enim ad minim veniam"
        description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        day="22"
        month="Feb"
        href="#"
      />
    </CardGrid>
  ),
};

/** Three-column event grid with date overlays. */
export const Grid3Columns: StoryObj<typeof CardGrid> = {
  render: () => (
    <CardGrid columns={3}>
      <Card
        imageSrc="https://picsum.photos/seed/grid3a/800/1100"
        imageAlt="Event 1"
        title="Lorem ipsum dolor sit amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        day="15"
        month="Jan"
        href="#"
      />
      <Card
        imageSrc="https://picsum.photos/seed/grid3b/800/1100"
        imageAlt="Event 2"
        title="Ut enim ad minim veniam"
        description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        day="22"
        month="Feb"
        href="#"
      />
      <Card
        imageSrc="https://picsum.photos/seed/grid3c/800/1100"
        imageAlt="Event 3"
        title="Duis aute irure dolor"
        description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        day="10"
        month="Mar"
        href="#"
      />
    </CardGrid>
  ),
};

/** Mixed grid — some cards with dates, some without. */
export const MixedGrid: StoryObj<typeof CardGrid> = {
  render: () => (
    <CardGrid columns={3}>
      <Card
        imageSrc="https://picsum.photos/seed/mix1/800/1100"
        imageAlt="Event with date"
        title="Upcoming event"
        description="This card has a date overlay."
        day="5"
        month="Apr"
        href="#"
      />
      <Card
        imageSrc="https://picsum.photos/seed/mix2/800/1100"
        imageAlt="Feature without date"
        title="Featured article"
        description="This card does not have a date overlay."
        href="#"
      />
      <Card
        imageSrc="https://picsum.photos/seed/mix3/800/1100"
        imageAlt="Event with full date"
        title="Conference 2024"
        description="This card shows day, month, and year."
        day="18"
        month="Sep"
        year="2024"
        href="#"
      />
    </CardGrid>
  ),
};
