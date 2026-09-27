import type { Meta, StoryObj } from '@storybook/react-vite';
import { Feature, FeatureGrid } from './Feature';

const meta: Meta<typeof Feature> = {
  title: 'WebStyle/Components/Feature',
  component: Feature,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['image-left', 'image-right', 'text-only'],
    },
    containerStyle: {
      control: 'select',
      options: ['bg-tint', 'box-bdr-gold', 'box-bdr-black', 'bg-white'],
    },
    label: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    description: { control: 'text' },
    readMoreHref: { control: 'text' },
    readMoreText: { control: 'text' },
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Feature>;

// ─────────────────────────────────────────────────────────────────────────────
// Default / primary story
// ─────────────────────────────────────────────────────────────────────────────

/** Default featured box with image on the left and text on the right. */
export const Default: Story = {
  args: {
    layout: 'image-left',
    label: 'FEATURED',
    title: 'Reds Under the Bed: 100 Years of Communism in Australia',
    subtitle: 'ONLINE EXHIBITION',
    description:
      'In August 1946 the Australian National University Act 1946 was passed, establishing the ANU as the only Australian university instituted by a ....',
    readMoreHref: '#',
    imageSrc: 'https://picsum.photos/seed/feat-default/800/500',
    imageAlt: 'Featured image',
    containerStyle: 'bg-tint',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Layout variant stories
// ─────────────────────────────────────────────────────────────────────────────

/** Featured box with the image positioned on the left (default layout). */
export const ImageLeft: Story = {
  args: {
    layout: 'image-left',
    label: 'FEATURED',
    title: 'Climate Science Research Centre Opens',
    subtitle: 'CAMPUS NEWS',
    description:
      'The new state-of-the-art research facility will house leading climate scientists from across the globe, enabling groundbreaking collaborative research.',
    readMoreHref: '#',
    imageSrc: 'https://picsum.photos/seed/feat-left/800/500',
    imageAlt: 'Research facility',
    containerStyle: 'bg-tint',
  },
};

/** Featured box with the image positioned on the right, using a gold border. */
export const ImageRight: Story = {
  args: {
    layout: 'image-right',
    label: 'FEATURED',
    title: 'Annual Alumni Awards Ceremony',
    subtitle: 'EVENT',
    description:
      'Celebrating outstanding achievements by ANU alumni across academia, public service, and industry. Join us for an evening of recognition and inspiration.',
    readMoreHref: '#',
    imageSrc: 'https://picsum.photos/seed/feat-right/800/500',
    imageAlt: 'Awards ceremony',
    containerStyle: 'box-bdr-gold',
  },
};

/** Text-only feature card without an image — suitable for grid layouts. */
export const TextOnly: Story = {
  args: {
    layout: 'text-only',
    label: 'FEATURED',
    title: 'Indigenous Astronomy and Knowledge Systems',
    subtitle: 'ONLINE EXHIBITION',
    description:
      'Explore the rich tradition of Aboriginal and Torres Strait Islander astronomical knowledge through this interactive digital exhibition.',
    readMoreHref: '#',
    containerStyle: 'bg-tint',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Customisation stories
// ─────────────────────────────────────────────────────────────────────────────

/** Feature block with a gold border container style. */
export const GoldBorder: Story = {
  args: {
    layout: 'image-left',
    label: 'SPOTLIGHT',
    title: 'Vice-Chancellor Scholarship Applications Open',
    subtitle: 'SCHOLARSHIPS',
    description:
      'Applications are now open for the prestigious Vice-Chancellor Scholarship. This merit-based award covers full tuition and provides a living stipend.',
    readMoreHref: '#',
    imageSrc: 'https://picsum.photos/seed/feat-gold/800/500',
    imageAlt: 'Scholarship announcement',
    containerStyle: 'box-bdr-gold',
  },
};

/** Feature block with a black border container style. */
export const BlackBorder: Story = {
  args: {
    layout: 'image-right',
    label: 'ANNOUNCEMENT',
    title: 'New Engineering Building Grand Opening',
    subtitle: 'INFRASTRUCTURE',
    description:
      'The Faculty of Engineering and Computer Science is proud to announce the completion of its new purpose-built facility on campus.',
    readMoreHref: '#',
    imageSrc: 'https://picsum.photos/seed/feat-black/800/500',
    imageAlt: 'Engineering building',
    containerStyle: 'box-bdr-black',
  },
};

/** Minimal feature with only a title — no label, subtitle, description, or link. */
export const Minimal: Story = {
  args: {
    layout: 'image-left',
    title: 'A minimal feature headline',
    imageSrc: 'https://picsum.photos/seed/feat-min/800/500',
    imageAlt: 'Minimal feature image',
    containerStyle: 'bg-tint',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Composition / grid layout stories
// ─────────────────────────────────────────────────────────────────────────────

/** Three-column grid of text-only feature cards. */
export const Grid3Columns: StoryObj<typeof FeatureGrid> = {
  render: () => (
    <FeatureGrid columns={3}>
      <Feature
        layout="text-only"
        label="FEATURED"
        title="Quantum Computing Breakthrough"
        subtitle="RESEARCH"
        description="Researchers at ANU have achieved a significant milestone in quantum error correction, bringing practical quantum computing one step closer."
        readMoreHref="#"
        containerStyle="bg-tint"
      />
      <Feature
        layout="text-only"
        label="FEATURED"
        title="Pacific Studies Forum 2024"
        subtitle="EVENT"
        description="An international forum bringing together scholars, policymakers, and community leaders to discuss contemporary Pacific affairs."
        readMoreHref="#"
        containerStyle="bg-tint"
      />
      <Feature
        layout="text-only"
        label="FEATURED"
        title="Indigenous Astronomy Exhibition"
        subtitle="ONLINE EXHIBITION"
        description="Explore the rich tradition of Aboriginal and Torres Strait Islander astronomical knowledge through this interactive exhibition."
        readMoreHref="#"
        containerStyle="bg-tint"
      />
    </FeatureGrid>
  ),
};

/** Two-column grid of text-only feature cards with gold borders. */
export const Grid2Columns: StoryObj<typeof FeatureGrid> = {
  render: () => (
    <FeatureGrid columns={2}>
      <Feature
        layout="text-only"
        label="NEWS"
        title="Chancellor Medal Recipients Announced"
        subtitle="AWARDS"
        description="The University has announced the recipients of this year's Chancellor Medal, recognising exceptional academic achievement."
        readMoreHref="#"
        containerStyle="box-bdr-gold"
      />
      <Feature
        layout="text-only"
        label="NEWS"
        title="Summer Research Internship Program"
        subtitle="OPPORTUNITIES"
        description="Undergraduate students are invited to apply for the 10-week summer research internship program across all faculties."
        readMoreHref="#"
        containerStyle="box-bdr-gold"
      />
    </FeatureGrid>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// All-variants comparison story
// ─────────────────────────────────────────────────────────────────────────────

/** All three layout variants rendered together for visual comparison. */
export const AllVariants: Story = {
  render: () => (
    <div>
      <h3>Image Left (bg-tint)</h3>
      <Feature
        layout="image-left"
        label="FEATURED"
        title="Climate Science Research Centre Opens"
        subtitle="CAMPUS NEWS"
        description="The new state-of-the-art research facility will house leading climate scientists from across the globe."
        readMoreHref="#"
        imageSrc="https://picsum.photos/seed/all-left/800/500"
        imageAlt="Research facility"
        containerStyle="bg-tint"
      />
      <h3 className="pt-2">Image Right (box-bdr-gold)</h3>
      <Feature
        layout="image-right"
        label="FEATURED"
        title="Annual Alumni Awards Ceremony"
        subtitle="EVENT"
        description="Celebrating outstanding achievements by ANU alumni across academia, public service, and industry."
        readMoreHref="#"
        imageSrc="https://picsum.photos/seed/all-right/800/500"
        imageAlt="Awards ceremony"
        containerStyle="box-bdr-gold"
      />
      <h3 className="pt-2">Text Only (bg-tint)</h3>
      <FeatureGrid columns={3}>
        <Feature
          layout="text-only"
          label="FEATURED"
          title="Quantum Computing Breakthrough"
          subtitle="RESEARCH"
          description="Researchers have achieved a significant milestone in quantum error correction."
          readMoreHref="#"
          containerStyle="bg-tint"
        />
        <Feature
          layout="text-only"
          label="FEATURED"
          title="Pacific Studies Forum 2024"
          subtitle="EVENT"
          description="An international forum to discuss contemporary Pacific affairs."
          readMoreHref="#"
          containerStyle="bg-tint"
        />
        <Feature
          layout="text-only"
          label="FEATURED"
          title="Indigenous Astronomy Exhibition"
          subtitle="ONLINE EXHIBITION"
          description="Explore the rich tradition of Aboriginal and Torres Strait Islander astronomical knowledge."
          readMoreHref="#"
          containerStyle="bg-tint"
        />
      </FeatureGrid>
    </div>
  ),
};
