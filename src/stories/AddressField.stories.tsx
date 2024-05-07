import type { Meta, StoryObj } from '@storybook/react';
import AddressField from 'components/PatientDataForm/AddressField';
import { EMPTY_ADDRESS } from 'PatientData';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'components/AddressField',
  component: AddressField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

} satisfies Meta<typeof AddressField>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const EmptyAddress: Story = {
  args: {
    address: EMPTY_ADDRESS
  },
};

