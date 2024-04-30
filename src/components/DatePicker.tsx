import * as Popover from '@radix-ui/react-popover'
import { useEffect, useState } from 'react'

interface DatePickerProps {
  /**
   * Show this if no date has been selected
   */
  placeholder: string

  date?: Date

  onChangeDate: (date: Date) => void
}

/**
 * Used primarily for picking dates, popups calendar in a modal
 */
export default function DatePicker(props: DatePickerProps): JSX.Element {
  const { placeholder, onChangeDate } = props
  const [date, setDate] = useState<Date | null>(props.date ?? null)
  const [isShowCalendarModal, setIsShowCalendarModal] = useState(false)

  useEffect(() => {
    if (date !== null) {
      onChangeDate(date)
    }
  }, [date])

  return (
    <Popover.Root
      open={isShowCalendarModal}
      onOpenChange={setIsShowCalendarModal}
    >
      <Popover.Trigger>
        <div>
          {date
            ? `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`
            : placeholder}
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side="right" sideOffset={10}>
          <div className="w-full h-full border border:zinc-900 p-2 shadow-xl">
            <input
              aria-label="date"
              type="date"
              name="bday"
              onChange={(e) => {
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
