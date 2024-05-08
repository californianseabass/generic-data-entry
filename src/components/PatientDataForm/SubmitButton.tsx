export default function SubmitButton({
  label,
}: {
  label: string
}): JSX.Element {
  return (
    <button
      className="border rounded-md shadow-md bg-teal-600  text-white w-48 px-4 py-2"
      type="submit"
    >
      {label}
    </button>
  )
}
