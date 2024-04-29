interface TextFieldProps extends React.ComponentPropsWithoutRef<'input'> {
  /**
   * Name of the field
   */
  label: string
}

/**
 * Primary UI component for user interaction
 */
export default function TextField(props: TextFieldProps): JSX.Element {
  const { label, ...inputProps } = props
  return (
    <div className="relative w-64 h-14 border rounded-lg">
      <span className="absolute z-10 top-2 left-3 text-xs bg-transparent text-zinc-900">
        {label}
      </span>
      <input
        {...inputProps}
        className="absolute w-full rounded-lg h-full inset-0 pt-4 pl-3 bg-zinc-100 border focus:border focus:border-zinc-400 focus:outline-none focus:padding-0"
      />
    </div>
  )
}
