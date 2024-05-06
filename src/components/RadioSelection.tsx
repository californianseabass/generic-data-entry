import cx from 'classnames'
import * as Radio from '@radix-ui/react-radio-group'
import { findIndex } from 'lodash'

export default function RadioSelection({
  choices,
  selected,
  onSelect,
}: {
  choices: readonly string[]
  selected: number
  name: string
  onSelect: (index: number) => void
}): JSX.Element {
  return (
    <Radio.Root
      value={choices[selected]}
      onValueChange={(selection) =>
        onSelect(findIndex(choices, (s) => s === selection))
      }
      className="flex flex-row flex-wrap space-y-1 "
    >
      {choices.map((choice, i) => (
        <div key={i} className="flex items-center ml-2">
          <Radio.Item
            className={cx(
              'bg-white h-[20px] w-[20px] rounded-full',
              'hover:bg-zinc-100 hover:shadow-xl',
              'shadow-md border border-1 border-zinc-700',
            )}
            key={i}
            checked={i === selected}
            id={choice.toLowerCase()}
            value={choice}
          >
            <Radio.Indicator
              className={cx(
                'flex relative items-center justify-center w-full h-full relative',
                "after:w-[9px] after:h-[9px] after:bg-slate-800 after:rounded-full after:content-['']",
              )}
            />
          </Radio.Item>
          <label
            className="leading-4 text-sm ml-1 pb-0"
            htmlFor={choice.toLowerCase()}
          >
            {choice}
          </label>
        </div>
      ))}
    </Radio.Root>
  )
}
