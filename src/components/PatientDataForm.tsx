import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode, useState } from 'react'
import TextField from './TextField'
import { Patient } from 'PatientData'
import DatePicker from './DatePicker'
import AddressField from './AddressField'
import CustomizableField from './CustomizableFieldForm'

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
      <div>{section}</div>
    </div>
  )
}

interface NameSectionProps {
  name: Patient['name']
  onChangeName: (name: Patient['name']) => void
}
function NameSection({ name, onChangeName }: NameSectionProps): JSX.Element {
  return (
    <div className="flex-col space-y-2">
      <TextField
        value={name.firstName}
        onChange={(e) => onChangeName({ ...name, firstName: e.target.value })}
        label="First name"
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
            onChangeAdditionalFields([
              ...additionalFields.slice(0, i),
              {
                ...f,
                value: e.target.value,
              },
              ...additionalFields.slice(i + 1),
            ])
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
          <Dialog.Content className="z-30 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-4 rounded-lg">
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
  const [birthdate, setBirthdate] = useState<Date | undefined>(
    patient?.birthdate,
  )
  const [address, setAddress] = useState(
    patient?.address ?? {
      street: '',
      city: '',
      state: '',
      zipcode: '',
    },
  )

  const [additionalFields, setAdditionalFields] = useState<
    Patient['additionalFields']
  >(patient?.additionalFields ?? [])

  return (
    <form className="flex flex-col space-y-6" onSubmit={onFormSubmit} action="">
      <SectionLayout
        name="Name"
        section={<NameSection name={name} onChangeName={setName} />}
      />
      <SectionLayout
        name="Date of Birth"
        section={
          <DatePicker
            date={birthdate}
            placeholder="Add birthdate"
            onChangeDate={setBirthdate}
          />
        }
      />
      <SectionLayout
        name="Address"
        section={<AddressField address={address} onChange={setAddress} />}
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
