import type { Meta, StoryObj } from '@storybook/react'
import PatientTable from 'components/PatientTable'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/PatientTable',
  component: PatientTable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof PatientTable>

export default meta

type Story = StoryObj<typeof meta>

const Sparrow = {
  name: {
    firstName: 'Song',
    middleName: '',
    lastName: 'Sparrow',
  },
  address: {
    street: '42 Wallaby Way',
    city: 'Sydney',
    state: 'New South Wales',
    zipcode: '01001',
  },
  birthdate: new Date(2018, 4, 16),
  status: 'Active',
  additionalFields: [{ name: 'Insolyn Readout', value: 77, type: 'number' }],
}

const Penguin = {
  name: {
    firstName: 'Emperor',
    middleName: '',
    lastName: 'Penguin',
  },
  address: {
    street: '1 Station Way',
    city: 'Amundsen-Scott',
    state: 'Antartica',
    zipcode: '10001',
  },
  birthdate: new Date(2022, 1, 27),
  status: 'Active',
  additionalFields: [
    { name: 'Wing Span', value: 48, type: 'number' },
    { name: 'Scientific name', value: 'Aptenodytes forsteri', type: 'string' },
  ],
}

const GoldFinch = {
  name: {
    firstName: 'American',
    middleName: '',
    lastName: 'GoldFinch',
  },
  address: {
    street: '11 Street Lane Way',
    city: 'Juneau',
    state: 'Alaska',
    zipcode: '18001',
  },
  birthdate: new Date(2023, 9, 7),
  status: 'Onboarding',
  additionalFields: [
    { name: 'Wing Span', value: 7, type: 'number' },
    { name: 'Scientific name', value: 'Spinus tristis', type: 'string' },
    { name: 'Conservation status', value: 'Least concern', type: 'number' },
  ],
}

const Chickadee = {
  name: {
    firstName: 'Black-capped',
    middleName: '',
    lastName: 'Chickadee',
  },
  address: {
    street: '17 Madison',
    city: 'Seattle',
    state: 'WA',
    zipcode: '98041',
  },
  birthdate: new Date(2023, 9, 7),
  status: 'Active',
  additionalFields: [
    { name: 'Scientific name', value: 'Poecile atricapillus', type: 'string' },
    { name: 'Family', value: 'Passerine', type: 'number' },
  ],
}

const Steller = {
  name: {
    firstName: "Steller's",
    middleName: 'Stellar',
    lastName: 'Jay',
  },
  address: {
    street: '11 Broadway',
    city: 'Seattle',
    state: 'WA',
    zipcode: '98011',
  },
  birthdate: new Date(2020, 10, 11),
  status: 'Inquiry',
  additionalFields: [
    { name: 'Scientific name', value: 'Cyanocitta stelleri', type: 'string' },
    { name: 'Family', value: 'Corvidae', type: 'number' },
  ],
}
export const PatientOne: Story = {
  args: {
    patients: [Sparrow, Penguin, GoldFinch, Chickadee, Steller],
  },
}
