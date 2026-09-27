import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'WebStyle/Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'black', 'white'],
    },
    width: {
      control: 'select',
      options: ['auto', 'w20', 'w30', 'w40', 'w50', 'w60', 'w70', 'w80', 'w90', 'w100'],
    },
    href: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─────────────────────────────────────────────────────────────────────────────
// Default / Primary story
// ─────────────────────────────────────────────────────────────────────────────

/** Default button — white background with gold border. */
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Apply now',
    width: 'w80',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Variant stories
// ─────────────────────────────────────────────────────────────────────────────

/** Black button — black background and border. Best used on light backgrounds. */
export const Black: Story = {
  args: {
    variant: 'black',
    children: 'Explore programs',
    width: 'w80',
  },
};

/** White button — white background with black border. Best used on dark backgrounds. */
export const White: Story = {
  args: {
    variant: 'white',
    children: 'Learn more',
    width: 'w80',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Width customisation stories
// ─────────────────────────────────────────────────────────────────────────────

/** Auto-width button — width fits the label text plus padding. */
export const AutoWidth: Story = {
  args: {
    variant: 'default',
    children: 'Contact us',
  },
};

/** Full-width button (w100) — spans the entire width of its parent container. */
export const FullWidth: Story = {
  args: {
    variant: 'default',
    children: 'Call-to-action button',
    width: 'w100',
  },
};

/** Narrow button (w40) — constrained to 40% of the parent container. */
export const NarrowWidth: Story = {
  args: {
    variant: 'default',
    children: 'Submit',
    width: 'w40',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Composition / layout stories
// ─────────────────────────────────────────────────────────────────────────────

/** All three button variants side-by-side for visual comparison. */
export const AllVariants: StoryObj = {
  render: () => (
    <div className="row">
      <div className="col-sm-6 col-md-4">
        <Button variant="default" width="w80">Apply now</Button>
      </div>
      <div className="col-sm-6 col-md-4">
        <Button variant="black" width="w80">Apply now</Button>
      </div>
      <div className="col-sm-6 col-md-4">
        <Button variant="white" width="w80">Apply now</Button>
      </div>
    </div>
  ),
};

/** Full-width button used in a sidebar call-to-action context. */
export const SidebarCallToAction: StoryObj = {
  render: () => (
    <div className="row">
      <div className="col-sm-8">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="col-sm-4">
        <Button variant="default" width="w100">Call-to-action button</Button>
      </div>
    </div>
  ),
};

/** Button inside a featured section on a tinted background. */
export const InsideFeature: StoryObj = {
  render: () => (
    <div className="row equal g-0 bg-tint p-0">
      <div className="col-md-6 col-lg-8 col-12">
        <img
          alt="Featured scholarship"
          draggable={false}
          src="https://picsum.photos/seed/btn-feature/920/600"
        />
      </div>
      <div className="col-md-6 col-lg-4 col-12">
        <div className="p-3 mb-0">
          <p className="small uppercase text-unigrey">
            <strong>FEATURED</strong>
          </p>
          <h2>
            <strong>New scholarship opportunity for Indigenous public servants</strong>
          </h2>
          <p className="small uppercase text-unigrey">SCHOLARSHIPS</p>
          <p>
            The Sir Roland Wilson Foundation has launched a new scholarship
            that aims to develop the skills of Indigenous public servants to
            become Australia&apos;s...
          </p>
          <div className="text-right mb-0">
            <Button variant="white" width="w60">Apply now</Button>
          </div>
        </div>
      </div>
    </div>
  ),
};

/** White button on a dark background to demonstrate proper contrast. */
export const OnDarkBackground: StoryObj = {
  render: () => (
    <div className="bg-black p-3">
      <Button variant="white" width="w60">Enquire today</Button>
    </div>
  ),
};
