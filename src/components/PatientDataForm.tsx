import * as Dialog from '@radix-ui/react-dialog'
import {
  FormEvent,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react'
import TextField from './TextField'
import { PATIENT_STATUS, Patient, isAdditionalField } from 'PatientData'
import DatePicker from './DatePicker'
import AddressField from './AddressField'
import CustomizableField from './CustomizableFieldForm'
import { trim } from 'lodash'
import RadioSelection from './RadioSelection'

interface PatientDataFormProps {
  patient?: Patient
  onFormSubmit: (patient: Patient) => void
  submitButton: ReactNode
}

function AddAdditionalAddress({
  onUpdateAddresses,
}: {
  onUpdateAddresses: () => void
}): JSX.Element {
  return (
    <div
      className="w-full text-center mt-2 border border-zinc-200 p-2 cursor-pointer rounded-md"
      onClick={onUpdateAddresses}
    >
      + Add additional Address
    </div>
  )
}

function addressIsInvalid(address: Patient['addresses'][number]): boolean {
  return (
    trim(address.street) === '' ||
    trim(address.city) === '' ||
    trim(address.state) === '' ||
    trim(address.zipcode) === ''
  )
}

function nameIsInvalid(name: Patient['name']): boolean {
  return trim(name.firstName) === '' || trim(name.lastName) === ''
}

interface SectionLayoutProps {
  name: string
  secondaryLabel?: ReactNode
  section: ReactNode
  additionalSection?: ReactNode
}

const SectionLayoutFn: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SectionLayoutProps
> = (props, ref) => {
  const { name, secondaryLabel, section, additionalSection } = props
  return (
    <div ref={ref} className="flex flex-row">
      <div className="shrink-0 w-24">
        <div className="mt-1 text-sm text-zinc-400">{name}</div>
        {secondaryLabel !== undefined ? secondaryLabel : null}
      </div>
      <div className="w-96">
        {section}
        {additionalSection !== undefined ? additionalSection : null}
      </div>
    </div>
  )
}

const SectionLayout = forwardRef(SectionLayoutFn)

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
          <div className="w-full text-center mt-2 border border-zinc-200 p-2 cursor-pointer rounded-md">
            + Add custom field
          </div>
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

  const [addresses, setAddresses] = useState<Patient['addresses']>(
    patient?.addresses ?? [],
  )

  const nameRef = useRef<HTMLDivElement>(null)
  const birthdateRef = useRef<HTMLDivElement>(null)
  const addressRef = useRef<HTMLDivElement>(null)

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
    const address = addresses[0]
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
  }, [addresses])

  function createNewAddress(): void {
    setAddresses([
      ...addresses,
      { street: '', city: '', state: '', zipcode: '' },
    ])
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const address = addresses[0]
    if (nameIsInvalid(name) || addressIsInvalid(address) || birthdate == null) {
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
      if (nameIsInvalid(name) && nameRef?.current != null) {
        nameRef.current.scrollIntoView()
      } else if (birthdate === null && birthdateRef?.current != null) {
        birthdateRef?.current.scrollIntoView()
      } else if (addressIsInvalid(address) && addressRef?.current !== null) {
        addressRef?.current.scrollIntoView()
      }

      return
    }

    onFormSubmit({
      name,
      birthdate,
      addresses,
      status: PATIENT_STATUS[status],
      additionalFields,
    })
  }

  return (
    <form
      className="flex flex-col space-y-6"
      onSubmit={handleFormSubmit}
      action=""
    >
      <SectionLayout
        ref={nameRef}
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
        ref={birthdateRef}
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
            choices={PATIENT_STATUS}
            selected={status}
            onSelect={setStatus}
            name="status"
          />
        }
      />
      <SectionLayout
        ref={addressRef}
        name="Primary Address"
        section={
          <AddressField
            address={addresses[0]}
            invalidFields={invalidAddressFields}
            onChange={(a) => {
              setAddresses([a].concat(addresses.slice(1)))
            }}
          />
        }
        additionalSection={
          addresses.length === 1 ? (
            <AddAdditionalAddress
              onUpdateAddresses={() => {
                setAddresses([
                  ...addresses,
                  { street: '', city: '', state: '', zipcode: '' },
                ])
              }}
            />
          ) : null
        }
      />
      {addresses.length > 1
        ? addresses.slice(1).map((a, i) => (
            <SectionLayout
              key={i}
              name={`Address ${(i + 2).toString()}`}
              secondaryLabel=<div
                className="text-xs text-red-600 cursor-pointer"
                onClick={() => {
                  setAddresses([
                    ...addresses.slice(0, i + 1),
                    ...addresses.slice(i + 2),
                  ])
                }}
              >
                Delete
              </div>
              section={
                <AddressField
                  address={a}
                  onChange={(update) => {
                    setAddresses([
                      ...addresses.slice(0, i + 1),
                      update,
                      ...addresses.slice(i + 2),
                    ])
                  }}
                />
              }
              additionalSection={
                i === addresses.length - 2 ? (
                  <AddAdditionalAddress
                    onUpdateAddresses={() => {
                      setAddresses([
                        ...addresses,
                        { street: '', city: '', state: '', zipcode: '' },
                      ])
                    }}
                  />
                ) : null
              }
            />
          ))
        : null}
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
