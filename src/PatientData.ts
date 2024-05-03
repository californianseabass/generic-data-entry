interface Name {
  firstName: string
  middleName: string
  lastName: string
}

interface Address {
  street: string
  city: string
  state: string
  zipcode: string
}

export const PATIENT_STATUS = [
  'Inquiry',
  'Onboarded',
  'Active',
  'Churned',
] as const
export type Status = (typeof PATIENT_STATUS)[number]

interface CustomizableString {
  name: string
  type: 'string'
  value: string
}

interface CustomizableNumber {
  name: string
  type: 'number'
  value: number
}

export type AdditionalField = CustomizableString | CustomizableNumber

export interface Patient {
  name: Name
  birthdate: Date
  status: Status
  address: Address
  additionalFields: AdditionalField[]
}
