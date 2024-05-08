import { motion } from 'framer-motion'

export default function SubmitButton({
  label,
}: {
  label: string
}): JSX.Element {
  return (
    <motion.button
      className="border rounded-md shadow-md bg-teal-600  text-white w-48 px-4 py-2"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type="submit"
    >
      {label}
    </motion.button>
  )
}
