import type { Meta, StoryObj } from '@storybook/react';
import TextField from 'components/TextField';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'components/TextField',
  component: TextField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const firstName: Story = {
  args: {
    label: 'First name',
  },
};

export const requiredError: Story = {
  args: {
    label: 'First name',
    errorMessage: 'Required'
  }
}
