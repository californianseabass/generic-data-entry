import cx from 'classnames'
import { X } from 'phosphor-react'
import { FormEvent, useEffect, useState } from 'react'
import TextField from '../TextField'
import { trim } from 'lodash'
import { AdditionalField } from 'PatientData'
import RadioSelection from './RadioSelection'

export default function CustomizableField({
  onCreateCustomizableField,
  onDismiss,
}: {
  onCreateCustomizableField: (field: AdditionalField) => void
  onDismiss: () => void
}): JSX.Element {
  const [name, setName] = useState('')
  const [nameFieldError, setNameFieldError] = useState<string>()

  const [type, setType] = useState<number>(0)
  const [value, setValue] = useState<number | string>('')

  const [error, setError] = useState<string>()

  useEffect(() => {
    if (nameFieldError) {
      setNameFieldError(undefined)
    }
  }, [name])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.stopPropagation()

    if (trim(name) === '') {
      setNameFieldError('Required')
      return
    }
    const fieldType: AdditionalField['type'] = type === 0 ? 'string' : 'number'
    if (fieldType === 'string' && typeof value === 'string') {
      onCreateCustomizableField({
        name,
        type: fieldType,
        value,
      })
      return
    }
    if (
      fieldType === 'number' &&
      (value === undefined || trim(value.toString()) === '')
    ) {
      setError('Numerical fields need an initial value')
      return
    }
    if (fieldType === 'number') {
      onCreateCustomizableField({
        name,
        type: fieldType,
        value: Number(value),
      })
      return
    }

    console.error('mistmatch in field type and data type')
  }

  return (
    <form className="relative flex flex-col space-y-3" onSubmit={handleSubmit}>
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
      <RadioSelection
        choices={['Text', 'Numerical']}
        selected={type}
        name="type"
        onSelect={setType}
      />
      <TextField
        type={type === 1 ? 'number' : ''}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="Value"
      />
      <div className="relative">
        {error !== undefined ? (
          <div className="absolute top-0 left-1 text-red-600 text-sm">
            {error}
          </div>
        ) : null}
        <button
          disabled={name === ''}
          className={cx(
            'w-full h-10 mt-6',
            'text-zinc-500',
            'border border-2 rounded-lg ',
            'border:teal-300',
            'disabled:border-zinc-300 disabled:bg-transparent',
            'hover:bg-teal-100 hover:border-teal-400',
          )}
          type="submit"
        >
          Done
        </button>
      </div>
    </form>
  )
}
