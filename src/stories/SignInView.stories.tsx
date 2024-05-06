import type { Meta, StoryObj } from '@storybook/react';
import SignInView from 'views/SignInView';

const meta = {
  title: 'views/SignInView',
  component: SignInView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

} satisfies Meta<typeof SignInView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const View: Story = {
  args: {
    choices: ['Inquiry', 'Onboarding', 'Active', 'Churned'],
    selected: 2,
  },
};

