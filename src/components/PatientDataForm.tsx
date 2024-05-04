import * as Dialog from '@radix-ui/react-dialog'
import { FormEvent, ReactNode, useEffect, useState } from 'react'
import TextField from './TextField'
import { Patient, isAdditionalField } from 'PatientData'
import DatePicker from './DatePicker'
import AddressField from './AddressField'
import CustomizableField from './CustomizableFieldForm'
import { trim } from 'lodash'
import RadioSelection from './RadioSelection'

interface PatientDataFormProps {
  patient?: Patient
  onFormSubmit: () => void
  submitButton: ReactNode
}

export function CreateNewButton(): JSX.Element {
  return (
    <button
      className="py-2 px-3 border-2 rounded-lg w-full max-w-96"
      type="submit"
    >
      Create
    </button>
  )
}

function SectionLayout({
  name,
  section,
}: {
  name: string
  section: ReactNode
}): JSX.Element {
  return (
    <div className="flex flex-row">
      <div className="shrink-0 w-24 mt-1 text-sm text-zinc-400">{name}</div>
      <div className="w-96">{section}</div>
    </div>
  )
}

interface NameSectionProps {
  name: Patient['name']
  onChangeName: (name: Patient['name']) => void
  invalidFields: { first: boolean; last: boolean }
}
function NameSection({
  name,
  onChangeName,
  invalidFields,
}: NameSectionProps): JSX.Element {
  return (
    <div className="flex-col space-y-2">
      <TextField
        value={name.firstName}
        onChange={(e) => onChangeName({ ...name, firstName: e.target.value })}
        label="First name"
        errorMessage={invalidFields.first ? 'Required' : undefined}
      />
      <TextField
        value={name.middleName}
        onChange={(e) => onChangeName({ ...name, middleName: e.target.value })}
        label="Middle name"
      />
      <TextField
        value={name.lastName}
        onChange={(e) => onChangeName({ ...name, lastName: e.target.value })}
        label="Last name"
        errorMessage={invalidFields.last ? 'Required' : undefined}
      />
    </div>
  )
}

interface AdditionalFieldsSectionProps {
  additionalFields: Patient['additionalFields']
  onChangeAdditionalFields: (fields: Patient['additionalFields']) => void
}

function AdditionalFieldsSection({
  additionalFields,
  onChangeAdditionalFields,
}: AdditionalFieldsSectionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col space-y-2">
      {additionalFields.map((f, i) => (
        <TextField
          onChange={(e) => {
            const fields = [
              ...additionalFields.slice(0, i),
              {
                ...f,
                value: e.target.value,
              },
              ...additionalFields.slice(i + 1),
            ]
            onChangeAdditionalFields(fields.filter(isAdditionalField))
          }}
          label={f.name}
          value={f.value}
          key={i}
        />
      ))}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger>
          <div className="mt-2">+ Add custom field</div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="z-30 animate-overlay-in absolute opacity-15 inset-0 bg-black" />
          <Dialog.Content className="z-30 fixed w-80 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-4 rounded-lg">
            <CustomizableField
              onDismiss={() => setIsOpen(false)}
              onCreateCustomizableField={(f) => {
                onChangeAdditionalFields([...additionalFields, f])
                setIsOpen(false)
              }}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default function PatientDataForm({
  patient,
  onFormSubmit,
  submitButton,
}: PatientDataFormProps): JSX.Element {
  const [name, setName] = useState(
    patient?.name ?? {
      firstName: '',
      middleName: '',
      lastName: '',
    },
  )
  const [invalidNameFields, setInvalidNameFields] = useState({
    first: false,
    last: false,
  })
  const [birthdate, setBirthdate] = useState<Date | undefined>(
    patient?.birthdate,
  )
  const [invalidBirthdate, setInvalidBirthdate] = useState(false)

  const [status, setStatus] = useState(2)

  const [address, setAddress] = useState(
    patient?.address ?? {
      street: '',
      city: '',
      state: '',
      zipcode: '',
    },
  )
  const [invalidAddressFields, setInvalidAddressFields] = useState({
    street: false,
    city: false,
    state: false,
    zipcode: false,
  })

  const [additionalFields, setAdditionalFields] = useState<
    Patient['additionalFields']
  >(patient?.additionalFields ?? [])

  // Reset error messages when user types something in
  useEffect(() => {
    if (invalidNameFields.first && trim(name.firstName).length) {
      setInvalidNameFields({ ...invalidNameFields, first: false })
    }
    if (invalidNameFields.last && trim(name.lastName).length) {
      setInvalidNameFields({ ...invalidNameFields, last: false })
    }
  }, [name])

  useEffect(() => {
    if (invalidBirthdate) {
      setInvalidBirthdate(false)
    }
  }, [birthdate])

  useEffect(() => {
    if (invalidAddressFields.street && trim(address.street).length) {
      setInvalidAddressFields({ ...invalidAddressFields, street: false })
    }
    if (invalidAddressFields.city && trim(address.city).length) {
      setInvalidAddressFields({ ...invalidAddressFields, city: false })
    }
    if (invalidAddressFields.state && trim(address.state).length) {
      setInvalidAddressFields({ ...invalidAddressFields, state: false })
    }
    if (invalidAddressFields.zipcode && trim(address.zipcode).length) {
      setInvalidAddressFields({ ...invalidAddressFields, zipcode: false })
    }
  }, [address])

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (
      trim(name.firstName) === '' ||
      trim(name.lastName) === '' ||
      trim(address.street) === '' ||
      trim(address.city) === '' ||
      trim(address.state) === '' ||
      trim(address.zipcode) === '' ||
      birthdate == null
    ) {
      setInvalidNameFields({
        first: trim(name.firstName) == '',
        last: trim(name.lastName) === '',
      })
      setInvalidAddressFields({
        street: trim(address.street) === '',
        city: trim(address.city) === '',
        state: trim(address.state) === '',
        zipcode: trim(address.zipcode) === '',
      })
      setInvalidBirthdate(birthdate == null)
      return
    }

    onFormSubmit()
  }

  return (
    <form
      className="flex flex-col space-y-6"
      onSubmit={handleFormSubmit}
      action=""
    >
      <SectionLayout
        name="Name"
        section={
          <NameSection
            name={name}
            onChangeName={setName}
            invalidFields={invalidNameFields}
          />
        }
      />
      <SectionLayout
        name="Date of Birth"
        section={
          <DatePicker
            errorMessage={invalidBirthdate ? 'Required' : undefined}
            date={birthdate}
            placeholder="Add birthdate"
            onChangeDate={setBirthdate}
          />
        }
      />
      <SectionLayout
        name="Status"
        section={
          <RadioSelection
            choices={['Inquiry', 'Onboarding', 'Active', 'Churned']}
            selected={status}
            onSelect={setStatus}
            name="status"
          />
        }
      />
      <SectionLayout
        name="Address"
        section={
          <AddressField
            address={address}
            invalidFields={invalidAddressFields}
            onChange={setAddress}
          />
        }
      />
      <SectionLayout
        name="Additional fields"
        section={
          <AdditionalFieldsSection
            additionalFields={additionalFields}
            onChangeAdditionalFields={(f) => setAdditionalFields(f)}
          />
        }
      />
      <div className="flex w-full justify-center">{submitButton}</div>
    </form>
  )
}
