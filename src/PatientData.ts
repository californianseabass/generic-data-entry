import { every, includes, isNumber, isString } from 'lodash'

interface Name {
  firstName: string
  middleName: string
  lastName: string
}

function isName(obj: any): obj is Name {
  return isString(obj?.firstName) &&
    isString(obj?.middleName) &&
    isString(obj?.lastName)
}

interface Address {
  street: string
  city: string
  state: string
  zipcode: string
}

function isAddress(obj: any): obj is Address {
  return isString(obj?.street) &&
    isString(obj?.city) &&
    isString(obj?.state) &&
    isString(obj?.zipcode)
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

function isCustomizableString(obj: any): obj is CustomizableString {
  return isString(obj?.name) && obj?.type === 'string' && isString(obj?.value)
}

interface CustomizableNumber {
  name: string
  type: 'number'
  value: number
}
function isCustomizableNumber(obj: any): obj is CustomizableNumber {
  return isString(obj?.name)  && obj?.type === 'number' && isNumber(obj?.value)
}

export type AdditionalField = CustomizableString | CustomizableNumber
export function isAdditionalField(obj: any): obj is AdditionalField {
  return isCustomizableString(obj) || isCustomizableNumber(obj)
}

export interface Patient {
  name: Name
  birthdate: Date
  status: Status
  address: Address
  additionalFields: AdditionalField[]
}

export function isPatient(obj: any): obj is Patient {
  return isName(obj?.name) &&
    isAddress(obj?.address) &&
    includes(PATIENT_STATUS, obj?.status) &&
    every(obj?.additionalFields, isAdditionalField)
}
