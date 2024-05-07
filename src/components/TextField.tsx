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

  /**
   * Optional - we want to let the user which fields are optional
   */
  optional?: boolean
}

/**
 * Primary UI component for user interaction
 */
export default function TextField(props: TextFieldProps): JSX.Element {
  const { label, optional, errorMessage, ...inputProps } = props
  return (
    <div className="relative w-full h-14 border rounded-lg">
      <span className={cx(
        "absolute font-medium z-10 top-2 left-3 text-xs bg-transparent text-zinc-800",
        optional && "after:content-['Optional'] after:text-xs block after:ml-2 after:text-zinc-500"
      )}>
        {label}
      </span>
      <span className="absolute z-10 top-2 right-3 text-xs text-red-700">
        {errorMessage}
      </span>
      <input
        {...inputProps}
        required={errorMessage === 'Required'}
        className={cx(
          'absolute inset-0 w-full h-full pt-4 pl-3',
          'rounded-lg',
          'focus:border focus:border-zinc-400 focus:outline-none',
          errorMessage === undefined && 'bg-zinc-100',
          errorMessage && 'required:bg-red-100 required:focus:border-red-400',
        )}
      />
    </div>
  )
}
