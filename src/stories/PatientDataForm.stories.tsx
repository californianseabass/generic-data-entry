import type { Meta, StoryObj } from '@storybook/react';
import PatientDataForm, { CreateNewButton } from 'components/PatientDataForm';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/PatientDataForm',
  component: PatientDataForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

} satisfies Meta<typeof PatientDataForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    submitButton: <CreateNewButton />
  },
};

export const PatientOne: Story = {
  args: {
    patient: {
      name: {
        firstName: 'Song',
        middleName: '',
        lastName: 'Sparrow'
      },
      address: {
        street: '42 Wallaby Way',
        city: 'Sydney',
        state: 'New South Wales',
        zipcode: '01001'
      },
      birthdate: new Date(2018, 4, 16),
      additionalFields: [
        { name: 'Insolyn Readout', value: 77, type: 'number' }
      ]
    },
    submitButton: <CreateNewButton />
  },
};
