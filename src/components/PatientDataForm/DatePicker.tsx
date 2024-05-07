import cx from 'classnames'
import * as Popover from '@radix-ui/react-popover'
import { useState } from 'react'

interface DatePickerProps {
  /**
   * Show this if no date has been selected
   */
  placeholder: string

  date?: Date

  onChangeDate: (date: Date) => void

  errorMessage?: 'Required'
}

/**
 * Used primarily for picking dates, popups calendar in a modal
 */
export default function DatePicker(props: DatePickerProps): JSX.Element {
  const { placeholder, errorMessage, onChangeDate } = props
  const [date, setDate] = useState<Date | null>(props.date ?? null)
  const [isShowCalendarModal, setIsShowCalendarModal] = useState(false)

  return (
    <Popover.Root
      open={isShowCalendarModal}
      onOpenChange={setIsShowCalendarModal}
    >
      <Popover.Trigger>
        <div
          className={cx(
            errorMessage && 'border rounded p-2 bg-red-100 border-red-400',
          )}
        >
          {date
            ? `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`
            : placeholder}
          {errorMessage !== null ? (
            <span className="text-red-500 ml-4 text-xs">{errorMessage}</span>
          ) : null}
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side="right" sideOffset={10}>
          <div
            className={cx(
              'w-full h-full p-2 ',
              'border border:zinc-900 shadow-xl',
            )}
          >
            <input
              aria-label="date"
              type="date"
              name="bday"
              onChange={(e) => {
                const date = e.target.valueAsDate
                if (date !== null) {
                  onChangeDate(date)
                }
                setDate(e.target.valueAsDate)
                setIsShowCalendarModal(false)
              }}
            />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
