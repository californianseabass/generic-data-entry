import type { Meta, StoryObj } from '@storybook/react'
import PatientTableControls from 'components/PatientTableControls'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'componentS/PatientTableControls',
  component: PatientTableControls,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof PatientTableControls>

export default meta

type Story = StoryObj<typeof meta>


export const Patients: Story = {
  args: {
    patientNames: ['Song Sparrow', 'Humboldt Penguin', 'Siberian GoldFinch', 'Chestnut-backed Chickadee', 'Steller\'s Jay'],
    cities: ['San Francisco', 'San Mateo', 'Oakland', 'Piedmont', 'Fremont']
  },
}
