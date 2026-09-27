import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateTime, DateTimeList } from './DateTime';

const meta: Meta<typeof DateTime> = {
  title: 'WebStyle/Components/DateTime',
  component: DateTime,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['date', 'time'],
    },
    showSeparator: { control: 'boolean' },
    background: {
      control: 'select',
      options: ['none', 'bg-tint'],
    },
    day: { control: 'text' },
    month: { control: 'text' },
    year: { control: 'text' },
    topLabel: { control: 'text' },
    middleLabel: { control: 'text' },
    bottomLabel: { control: 'text' },
    timeStart: { control: 'text' },
    description: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DateTime>;

// ─────────────────────────────────────────────────────────────────────────────
// Default / Primary stories
// ─────────────────────────────────────────────────────────────────────────────

/** Default dateblock with day, month, and descriptive text. */
export const Default: Story = {
  args: {
    mode: 'date',
    day: '15',
    month: 'Jan',
    description: 'Some descriptive text near the date.',
  },
};

/** Dateblock showing day, month, year, and descriptive text. */
export const WithYear: Story = {
  args: {
    mode: 'date',
    day: '22',
    month: 'Feb',
    year: '2024',
    description: 'Annual research symposium registration opens.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Separator variant
// ─────────────────────────────────────────────────────────────────────────────

/** Dateblock with a vertical separator line between the block and text. */
export const WithSeparatorLine: Story = {
  args: {
    mode: 'date',
    day: '15',
    month: 'Jan',
    showSeparator: true,
    description: 'Separator line appears between the dateblock and text.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Generic label stories
// ─────────────────────────────────────────────────────────────────────────────

/** Generic label dateblock — useful for weeks, numbered items, etc. */
export const GenericLabels: Story = {
  args: {
    mode: 'date',
    topLabel: 'Week',
    middleLabel: '1',
    bottomLabel: '2013',
    showSeparator: true,
    description: 'A generic block, with a top, middle and bottom label.',
  },
};

/** Dateblock showing time at the top, day in the middle, and month at the bottom. */
export const TimeDateCombo: Story = {
  args: {
    mode: 'date',
    topLabel: '10.00am',
    middleLabel: '15',
    bottomLabel: 'January',
    description: 'A dateblock showing the time first.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Time-mode stories
// ─────────────────────────────────────────────────────────────────────────────

/** Time-only block with a start time and descriptive text. */
export const TimeBlock: Story = {
  args: {
    mode: 'time',
    timeStart: '10.00am',
    description: 'A block that is just for time only.',
  },
};

/** Time block without descriptive text. */
export const TimeBlockNoDescription: Story = {
  args: {
    mode: 'time',
    timeStart: '2.30pm',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Background variant
// ─────────────────────────────────────────────────────────────────────────────

/** Dateblock on a tinted background with padding. */
export const WithTintBackground: Story = {
  args: {
    mode: 'date',
    day: '15',
    month: 'Jan',
    year: '2010',
    showSeparator: true,
    background: 'bg-tint',
    description: 'Dateblock on a tinted background.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Composition / Layout stories
// ─────────────────────────────────────────────────────────────────────────────

/** Multiple dateblock entries stacked in a news sidebar layout. */
export const NewsSidebar: StoryObj<typeof DateTimeList> = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <h2 className="mb-2">News</h2>
      <DateTimeList>
        <DateTime
          day="15"
          month="Jan"
          year="2022"
          showSeparator
          description={<a>Update on hail repairs — Chifley Library »</a>}
        />
        <DateTime
          day="3"
          month="Feb"
          year="2022"
          showSeparator
          description={<a>New study spaces now available at Hancock »</a>}
        />
        <DateTime
          day="28"
          month="Mar"
          year="2022"
          showSeparator
          description={<a>Library hours extended for exam period »</a>}
        />
      </DateTimeList>
    </div>
  ),
};

/** Mixed date and time entries stacked together. */
export const MixedList: StoryObj<typeof DateTimeList> = {
  render: () => (
    <DateTimeList>
      <DateTime
        day="10"
        month="Apr"
        description="Morning keynote registration."
      />
      <DateTime
        mode="time"
        timeStart="9.00am"
        description="Keynote address begins."
      />
      <DateTime
        mode="time"
        timeStart="12.00pm"
        description="Lunch break and networking."
      />
    </DateTimeList>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// All variants side-by-side
// ─────────────────────────────────────────────────────────────────────────────

/** All date/time block variants displayed together for quick visual comparison. */
export const AllVariants: StoryObj = {
  render: () => (
    <div>
      <h3>Dateblock (no separator)</h3>
      <div className="clear pb-2">
        <DateTime day="15" month="Jan" year="2010" description="Day / Month / Year" />
      </div>

      <h3>Dateblock (with separator line)</h3>
      <div className="clear pb-2">
        <DateTime day="15" month="Jan" showSeparator description="Day / Month with separator" />
      </div>

      <h3>Generic labels</h3>
      <div className="clear pb-2">
        <DateTime topLabel="Week" middleLabel="1" bottomLabel="2013" showSeparator description="Top / Middle / Bottom labels" />
      </div>

      <h3>Time + Date combo</h3>
      <div className="clear pb-2">
        <DateTime topLabel="10.00am" middleLabel="15" bottomLabel="January" description="Time at top, day middle, month bottom" />
      </div>

      <h3>Timeblock</h3>
      <div className="clear pb-2">
        <DateTime mode="time" timeStart="10.00am" description="Time-only block" />
      </div>

      <h3>Tinted background</h3>
      <div className="clear pb-2">
        <DateTime day="15" month="Jan" showSeparator background="bg-tint" description="On a tinted background" />
      </div>
    </div>
  ),
};
