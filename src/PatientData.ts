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
  address: Address
  birthdate: Date
  additionalFields: AdditionalField[]
}
