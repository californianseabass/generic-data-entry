import cx from 'classnames'

interface TextFieldProps extends React.ComponentPropsWithoutRef<'input'> {
  /**
   * Name of the field
   */
  label: string

  /**
   * Optional field for displaying error messaging
   */
  errorMessage?: string
}

/**
 * Primary UI component for user interaction
 */
export default function TextField(props: TextFieldProps): JSX.Element {
  const { label, errorMessage, ...inputProps } = props
  return (
    <div className="relative w-64 h-14 border rounded-lg">
      <span className="absolute font-medium z-10 top-2 left-3 text-xs bg-transparent text-zinc-800">
        {label}
      </span>
      <span className="absolute z-10 top-2 right-3 text-xs text-red-700">
        {errorMessage}
      </span>
      <input
        {...inputProps}
        className={cx(
          'absolute inset-0 w-full h-full pt-4 pl-3',
          'rounded-lg',
          'focus:border focus:border-zinc-400 focus:outline-none',
          errorMessage === undefined && 'bg-zinc-100',
          errorMessage && 'bg-red-100 focus:border-red-400',
        )}
      />
    </div>
  )
}
