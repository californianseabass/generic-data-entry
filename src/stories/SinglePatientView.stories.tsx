import type { Meta, StoryObj } from '@storybook/react'
import SinglePatientView from 'views/SinglePatientView'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'views/SinglePatientView',
  component: SinglePatientView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: '',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof SinglePatientView>

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
  },
}

export const PatientOne: Story = {
  args: {
    patient: {
      name: {
        firstName: 'Song',
        middleName: '',
        lastName: 'Sparrow',
      },
      addresses: [
        {
          street: '42 Wallaby Way',
          city: 'Sydney',
          state: 'New South Wales',
          zipcode: '01001',
        },
      ],
      status: 'Onboarded',
      birthdate: new Date(2018, 4, 16),
      additionalFields: [
        { name: 'Insolyn Readout', value: 77, type: 'number' },
      ],
    },
  },
}

export const MultiAddress: Story = {
  args: {
    patient: {
      ...PatientOne.args.patient,
      addresses: [
        ...(PatientOne.args?.patient?.addresses ?? []),
        {
          street: '117 Broadway',
          city: 'Seattle',
          state: 'WA',
          zipcode: '98011',
        },
        {
          street: '7321 Montalke',
          city: 'Seattle',
          state: 'WA',
          zipcode: '98011',
        },
      ],
    },
  },
}
