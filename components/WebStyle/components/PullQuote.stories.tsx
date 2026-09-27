import type { Meta, StoryObj } from '@storybook/react-vite';
import { PullQuote } from './PullQuote';

const meta: Meta<typeof PullQuote> = {
  title: 'WebStyle/Components/PullQuote',
  component: PullQuote,
  tags: ['autodocs'],
  argTypes: {
    float: {
      control: 'select',
      options: ['left', 'right', 'none'],
    },
    width: {
      control: 'select',
      options: ['default', 'w60', 'w80', 'w100'],
    },
    color: {
      control: 'select',
      options: ['default', 'unigrey', 'gold'],
    },
    bold: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof PullQuote>;

// ─────────────────────────────────────────────────────────────────────────────
// Default / primary story
// ─────────────────────────────────────────────────────────────────────────────

/** Default pull quote — left-floated at 50% width with standard black text. */
export const Default: Story = {
  args: {
    children:
      'This is an example of a pull quote. The text is slightly larger than regular text, centre-aligned, and contained in quotation marks.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Float variants
// ─────────────────────────────────────────────────────────────────────────────

/** Left-floated pull quote — surrounding content wraps to the right. */
export const FloatLeft: Story = {
  args: {
    float: 'left',
    children: 'Knowledge is power, and the pursuit of understanding never ends.',
  },
};

/** Right-floated pull quote — surrounding content wraps to the left. */
export const FloatRight: Story = {
  args: {
    float: 'right',
    children: 'Innovation distinguishes between a leader and a follower.',
  },
};

/** Pull quote with no float — following text will not wrap around it. */
export const NoFloat: Story = {
  args: {
    float: 'none',
    children: 'The only limit to our realisation of tomorrow will be our doubts of today.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Width override stories
// ─────────────────────────────────────────────────────────────────────────────

/** Pull quote with `w80` — 80% width of its parent container. */
export const Width80: Story = {
  args: {
    width: 'w80',
    children: 'Sit amet dictum sit amet justo donec enim diam.',
  },
};

/** Pull quote with `w100` — full width of its parent container. */
export const Width100: Story = {
  args: {
    width: 'w100',
    children:
      'A full-width pull quote stretches across the entire parent container, creating a strong visual break in the page.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Colour variant stories
// ─────────────────────────────────────────────────────────────────────────────

/** Pull quote with `text-unigrey` colour. */
export const ColorUnigrey: Story = {
  args: {
    color: 'unigrey',
    children: 'Sit amet dictum sit amet justo donec enim diam.',
  },
};

/** Pull quote with `text-gold` colour — content is automatically bold for WCAG compliance. */
export const ColorGold: Story = {
  args: {
    color: 'gold',
    children: 'Sit amet dictum sit amet justo donec enim diam.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Composition / layout stories
// ─────────────────────────────────────────────────────────────────────────────

/** Pull quote floated left with accompanying paragraph text that wraps around it. */
export const WithSurroundingText: StoryObj = {
  render: () => (
    <div>
      <PullQuote float="left" width="w80">
        Sit amet dictum sit amet justo donec enim diam.
      </PullQuote>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Elit eget gravida cum
        sociis natoque penatibus et magnis. Imperdiet nulla malesuada
        pellentesque elit eget gravida cum sociis natoque. Ut ornare lectus sit
        amet est placerat in egestas erat. Amet mauris commodo quis imperdiet
        massa tincidunt nunc pulvinar. Augue neque gravida in fermentum et
        sollicitudin ac orci.
      </p>
    </div>
  ),
};

/** Gold-coloured pull quote in context, demonstrating auto-bold and text wrapping. */
export const GoldWithSurroundingText: StoryObj = {
  render: () => (
    <div>
      <PullQuote float="left" color="gold">
        Sit amet dictum sit amet justo donec enim diam.
      </PullQuote>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Elit eget gravida cum
        sociis natoque penatibus et magnis. Imperdiet nulla malesuada
        pellentesque elit eget gravida cum sociis natoque.
      </p>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// All variants comparison
// ─────────────────────────────────────────────────────────────────────────────

/** All colour variants displayed together for quick visual comparison. */
export const AllColorVariants: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <PullQuote float="none" width="w100">
        Default colour — standard black text.
      </PullQuote>
      <PullQuote float="none" width="w100" color="unigrey">
        Unigrey colour — a softer, muted tone.
      </PullQuote>
      <PullQuote float="none" width="w100" color="gold">
        Gold colour — automatically bold for WCAG compliance.
      </PullQuote>
    </div>
  ),
};
