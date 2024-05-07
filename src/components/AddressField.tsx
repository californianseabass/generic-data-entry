import TextField from './TextField'
import { Patient } from 'PatientData'

interface AddressFieldProps {
  address?: Patient['addresses'][number]
  invalidFields?: { [fieldName in keyof Patient['addresses'][number]]: boolean }
  onChange: (address: Patient['addresses'][number]) => void
}

const EMPTY_ADDRESS = {
  street: '',
  city: '',
  state: '',
  zipcode: ''
}

export default function AddressField({
  address,
  invalidFields,
  onChange
}: AddressFieldProps): JSX.Element {
  return (
    <div className="flex flex-col space-y-2">
      <TextField
        value={address?.street ?? ''}
        onChange={(e) => onChange({
          ...(address ?? EMPTY_ADDRESS),
          street: e.target.value
        })}
        errorMessage={invalidFields?.['street'] ? 'Required' : undefined}
        label="Street"
      />
      <TextField
        value={address?.city}
        onChange={(e) => onChange({
          ...(address ?? EMPTY_ADDRESS),
          city: e.target.value
        })}
        errorMessage={invalidFields?.['city'] ? 'Required' : undefined}
        label="City"
      />
      <TextField
        value={address?.state}
        onChange={(e) => onChange({
          ...(address ?? EMPTY_ADDRESS),
          state: e.target.value
        })}
        errorMessage={invalidFields?.['state'] ? 'Required' : undefined}
        label="State"
      />
      <TextField
        value={address?.zipcode}
        onChange={(e) => onChange({
          ...(address ?? EMPTY_ADDRESS),
          zipcode: e.target.value
        })}
        errorMessage={invalidFields?.['zipcode'] ? 'Required' : undefined}
        label="Zip Code"
      />
    </div>
  )
}
