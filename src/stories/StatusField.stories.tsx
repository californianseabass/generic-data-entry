import type { Meta, StoryObj } from '@storybook/react';
import RadioSelection from 'components/PatientDataForm/RadioSelection';

const meta = {
  title: 'components/RadioSelection',
  component: RadioSelection,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

} satisfies Meta<typeof RadioSelection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Status: Story = {
  args: {
    choices: ['Inquiry', 'Onboarding', 'Active', 'Churned'],
    selected: 2,
  },
};

export const FieldType: Story = {
  args: {
    choices: ['Numerical', 'Text'],
    selected: 0,
  },
};
