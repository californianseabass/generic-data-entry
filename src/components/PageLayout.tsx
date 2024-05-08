import cx from 'classnames'
import { ReactNode } from 'react'

export default function PageLayout({
  children,
  onBack,
  onSignOut,
}: {
  children: ReactNode
  onBack?: () => void
  onSignOut: () => void
}): JSX.Element {
  return (
    <>
      <header
        className={cx(
          'block p-4 w-full bg-zinc-100 flex justify-end',
          onBack && 'justify-between',
        )}
      >
        {onBack !== undefined ? (
          <button
            className="text-teal-800 border-teal-800 border rounded-md p-2"
            onClick={onBack}
          >
            Back
          </button>
        ) : null}
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
