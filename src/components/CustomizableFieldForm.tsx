import cx from 'classnames'
import { X } from 'phosphor-react'
import { FormEvent, useEffect, useState } from 'react'
import TextField from './TextField'
import { trim } from 'lodash'
import { AdditionalField } from 'PatientData'

export default function CustomizableField({
  onCreateCustomizableField,
  onDismiss,
}: {
  onCreateCustomizableField: (field: AdditionalField) => void
  onDismiss: () => void
}): JSX.Element {
  const [name, setName] = useState('')
  const [nameFieldError, setNameFieldError] = useState<string>()

  const [type, setType] = useState<AdditionalField['type']>('string')
  const [value, setValue] = useState<number | string>('')

  useEffect(() => {
    if (type === 'number') {
      setValue(0)
    } else {
      setValue('')
    }
  }, [type])

  useEffect(() => {
    if (nameFieldError) {
      setNameFieldError(undefined)
    }
  }, [name])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (trim(name) === '') {
      setNameFieldError('Required')
      return
    }
    onCreateCustomizableField({
      name,
      type,
      value,
    })
  }

  return (
    <form
      className="relative w-full flex flex-col space-y-3"
      onSubmit={handleSubmit}
    >
      <h3 className="text-xl">Add custom field</h3>
      <X
        className="absolute right-1 -top-2 cursor-pointer"
        onClick={onDismiss}
      />
      <TextField
        name={name}
        errorMessage={nameFieldError}
        onChange={(e) => setName(e.target.value)}
        label="Name"
      />
      <div className="flex space-x-4">
        <div className="flex space-x-1">
          <input
            type="radio"
            id="string"
            checked={type === 'string'}
            name="type"
            onChange={() => setType('string')}
          />
          <label onClick={() => setType('string')}>Text</label>
        </div>
        <div className="flex space-x-1">
          <input
            type="radio"
            id="number"
            checked={type === 'number'}
            name="type"
            onChange={() => setType('number')}
          />
          <label onClick={() => setType('number')}>Numerical</label>
        </div>
      </div>
      <TextField
        type={type === 'number' ? type : ''}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="Value"
      />
      <div>
        <button
          className={cx(
            'w-full h-10 mt-6',
            'text-zinc-500',
            'border border-2 rounded-lg border:zinc-800',
            'hover:bg-zinc-300 hover:border-zinc-400',
          )}
          type="submit"
        >
          Done
        </button>
      </div>
    </form>
  )
}
