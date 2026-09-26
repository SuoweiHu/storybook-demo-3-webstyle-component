import type { Meta, StoryObj } from '@storybook/react-vite';
import { Message } from './Message';

const meta: Meta<typeof Message> = {
  title: 'WebStyle/Components/Message',
  component: Message,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'warn', 'info', 'success', 'inline'],
    },
    size: {
      control: 'select',
      options: ['default', 'large'],
    },
    width: {
      control: 'select',
      options: ['auto', 'w50', 'w60', 'w80'],
    },
    asDiv: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Message>;

// ─────────────────────────────────────────────────────────────────────────────
// Variant stories
// ─────────────────────────────────────────────────────────────────────────────

/** Error message — for critical problems or validation failures. */
export const Error: Story = {
  args: {
    variant: 'error',
    children: 'This is an error message. Something went wrong.',
  },
};

/** Warning message — for cautionary notices. */
export const Warning: Story = {
  args: {
    variant: 'warn',
    children: 'This is a warning message. Please take note.',
  },
};

/** Information message — for general guidance or tips. */
export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an informational message. Here is some useful context.',
  },
};

/** Success message — for confirmations or positive outcomes. */
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'This is a success message. The operation completed.',
  },
};

/** Inline message — a subtle, compact message style. */
export const Inline: Story = {
  args: {
    variant: 'inline',
    children: 'This is an inline message for subtle notices.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Customisation stories
// ─────────────────────────────────────────────────────────────────────────────

/** Large error message using the `large` font size modifier. */
export const LargeError: Story = {
  args: {
    variant: 'error',
    size: 'large',
    children:
      "This is a larger error message. Note that please don't use gold or white text on any message, because the combinations will not pass WCAG 2.1.",
  },
};

/** Info message constrained to 80% width of its parent container. */
export const ConstrainedWidth: Story = {
  args: {
    variant: 'info',
    width: 'w80',
    children:
      'This is a message with class w80, which makes the width of this message always 80% wide of its parent container.',
  },
};

/** Message rendered as a `<div>` instead of a `<p>`, allowing richer content. */
export const AsDiv: Story = {
  args: {
    variant: 'warn',
    asDiv: true,
    children: 'This message is rendered as a <div> element for richer content.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// All variants side-by-side
// ─────────────────────────────────────────────────────────────────────────────

/** All five message variants displayed together for comparison. */
export const AllVariants: StoryObj = {
  render: () => (
    <div>
      <Message variant="error">Error message</Message>
      <Message variant="warn">Warning message</Message>
      <Message variant="info">Information message</Message>
      <Message variant="success">Success message</Message>
      <Message variant="inline">Inline message</Message>
    </div>
  ),
};
