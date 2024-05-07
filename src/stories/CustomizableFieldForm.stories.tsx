import type { Meta, StoryObj } from '@storybook/react';
import CustomizableFieldForm from 'components/PatientDataForm/CustomizableFieldForm';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'components/CustomizableFieldForm',
  component: CustomizableFieldForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

} satisfies Meta<typeof CustomizableFieldForm>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddField: Story = {
  args: {
  },
};

