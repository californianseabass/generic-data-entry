import { useEffect, useState } from 'react'
import TextField from './TextField'
import { Patient } from 'PatientData'

interface AddressFieldProps {
  address?: Patient['address']
  invalidFields: { [fieldName in keyof Patient['address']]: boolean }
  onChange: (address: Patient['address']) => void
}

export default function AddressField({
  address,
  invalidFields,
  onChange,
}: AddressFieldProps): JSX.Element {
  const [street, setStreet] = useState(address?.street ?? '')
  const [city, setCity] = useState(address?.city ?? '')
  const [state, setState] = useState(address?.state ?? '')
  const [zipCode, setZipCode] = useState(address?.zipcode ?? '')

  useEffect(() => {
    onChange({
      street,
      city,
      state,
      zipcode: zipCode,
    })
  }, [street, city, state, zipCode])

  return (
    <div className="flex flex-col space-y-2">
      <TextField
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        errorMessage={invalidFields['street'] ? 'Required' : undefined}
        label="Street"
      />
      <TextField
        value={city}
        onChange={(e) => setCity(e.target.value)}
        errorMessage={invalidFields['city'] ? 'Required' : undefined}
        label="City"
      />
      <TextField
        value={state.toUpperCase()}
        onChange={(e) => setState(e.target.value)}
        errorMessage={invalidFields['state'] ? 'Required' : undefined}
        label="State"
      />
      <TextField
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        errorMessage={invalidFields['zipcode'] ? 'Required' : undefined}
        label="Zip Code"
      />
    </div>
  )
}
