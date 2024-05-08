import { ReactNode } from 'react'

export default function PageLayout({
  children,
  onSignOut,
}: {
  children: ReactNode
  onSignOut: () => void
}): JSX.Element {
  return (
    <>
      <header className="block p-4 w-full bg-zinc-100 flex justify-end">
        <button
          className="text-teal-800 border-teal-800 border rounded-md p-2"
          onClick={onSignOut}
        >
          Logout
        </button>
      </header>
      <div className="block ">{children}</div>
    </>
  )
}
