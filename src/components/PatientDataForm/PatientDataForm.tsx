import cx from 'classnames'
import * as Dialog from '@radix-ui/react-dialog'
import {
  FormEvent,
  ReactNode,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import TextField from '../TextField'
import {
  EMPTY_ADDRESS,
  PATIENT_STATUS,
  Patient,
  isAdditionalField,
} from 'PatientData'
import DatePicker from './DatePicker'
import AddressField from './AddressField'
import CustomizableField from './CustomizableFieldForm'
import { some, trim, values } from 'lodash'
import RadioSelection from './RadioSelection'

// Some Helper types for dealing with addresses
type Address = Patient['addresses'][number]

// We can mark any of the fields invalid with a 'city' === True
type InvalidAddress = {
  [k in keyof Address]: boolean
}

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

// Validatation Helpers

/**
 *  We go to this trouble in order to deal with multiple addresess
 */
function validateAddress(address: Address): InvalidAddress {
  return {
    street: trim(address.street) === '',
    city: trim(address.city) === '',
    state: trim(address.state) === '',
    zipcode: trim(address.zipcode) === '',
  }
}

function isAddressInvalid(address: Address): boolean {
  return some(values(validateAddress(address)), (v) => v === true)
}

/*
 * Nice to have some help with the name because there are two properties
 */
function isNameInvalid(name: Patient['name']): boolean {
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
        optional
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
          optional
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
          <Dialog.Overlay className="z-40 animate-overlay-in position-fixed opacity-15 inset-0 bg-black" />
          <Dialog.Content className="z-40 fixed w-80 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-4 rounded-lg">
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

export function CreateNewButton(): JSX.Element {
  return (
    <button
      className="border rounded-md shadow-md bg-teal-600  text-white w-48 px-4 py-2"
      type="submit"
    >
      Create
    </button>
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
    patient?.addresses ?? [EMPTY_ADDRESS],
  )

  const nameRef = useRef<HTMLDivElement>(null)
  const birthdateRef = useRef<HTMLDivElement>(null)
  const addressRef = useRef<HTMLDivElement>(null)

  const [invalidAddressFields, setInvalidAddressFields] = useState<
    InvalidAddress[]
  >([])

  const [additionalFields, setAdditionalFields] = useState<
    Patient['additionalFields']
  >(patient?.additionalFields ?? [])

  const isInvalid = useMemo(() => {
    return (
      some(values(invalidNameFields)) ||
      invalidBirthdate ||
      some(invalidAddressFields.map((a) => some(values(a))))
    )
  }, [invalidNameFields, invalidBirthdate, invalidAddressFields])

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
    if (some(invalidAddressFields.map((a) => some(values(a))))) {
      setInvalidAddressFields(addresses.map(validateAddress))
    }
  }, [addresses])

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // If anything is about to go wrong
    if (
      isNameInvalid(name) ||
      some(addresses, isAddressInvalid) ||
      birthdate == null
    ) {
      setInvalidNameFields({
        first: trim(name.firstName) == '',
        last: trim(name.lastName) === '',
      })
      if (some(addresses, isAddressInvalid)) {
        setInvalidAddressFields(addresses.map(validateAddress))
      }
      setInvalidBirthdate(birthdate == null)

      // Scroll to the latest section that is incorrect
      if (isNameInvalid(name) && nameRef?.current != null) {
        nameRef.current.scrollIntoView()
      } else if (birthdate === null && birthdateRef?.current != null) {
        birthdateRef?.current.scrollIntoView()
      } else if (
        addresses.length > 0 &&
        isAddressInvalid(addresses[0]) &&
        addressRef?.current !== null
      ) {
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
            address={addresses.length === 0 ? EMPTY_ADDRESS : addresses[0]}
            invalidFields={
              invalidAddressFields.length > 0
                ? invalidAddressFields[0]
                : undefined
            }
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
                  invalidFields={
                    invalidAddressFields.length > i + 1
                      ? invalidAddressFields[i + 1]
                      : undefined
                  }
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
      <div className={cx('flex w-full justify-center relative')}>
        {submitButton}
        {isInvalid ? (
          <div className="absolute text-lg text-red-500 right-3 top-0">
            Error above
          </div>
        ) : null}
      </div>
    </form>
  )
}
