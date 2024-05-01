import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from 'components/DatePicker';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'components/DatePicker',
  component: DatePicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    placeholder: 'Add birthdate'
  },
};

export const Filled: string = {
  args: {
    placeholder: '',
    date: new Date(2021, 8, 27),
  }
}

export const Required: string = {
  args: {
    placeholder: 'Add birthdate',
    errorMessage: 'Required'
  }
}
