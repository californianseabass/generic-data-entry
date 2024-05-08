import { Autocomplete, Input, Option, Select, Switch } from '@mui/joy'
import { Patient } from 'PatientData'
import { MagnifyingGlass } from 'phosphor-react'
import { ReactNode, useState } from 'react'

function AdvancedOptions({
  status,
  onChangeStatus,
  age,
  onChangeAge,
  city,
  onChangeCity,
  cities,
}: {
  status: Patient['status'] | null
  onChangeStatus: (status: Patient['status'] | null) => void
  age: number | null
  onChangeAge: (age: number | null) => void
  city: string | null
  onChangeCity: (city: string | null) => void
  cities: string[]
}): JSX.Element {
  return (
    <div className="flex px-4 items-center flex-wrap space-x-3">
      <div className="flex items-center">
        <span className="mr-2">Status</span>
        <div className="w-32">
          <Select
            value={status}
            onChange={(e, newValue) => {
              onChangeStatus(newValue)
            }}
          >
            <Option value="">&nbsp;</Option>
            <Option value="Inquiry">Inquiry</Option>
            <Option value="Onboarded">Onboarded</Option>
            <Option value="Active">Active</Option>
            <Option value="Churned">Churned</Option>
          </Select>
        </div>
      </div>
      <div className="flex items-center">
        <span className="mr-2">Age (years)</span>
        <Input
          value={age ?? undefined}
          onChange={(e) =>
            e.target.value.length === 0
              ? onChangeAge(null)
              : onChangeAge(Number(e.target.value))
          }
          className="w-24"
        />
      </div>
      <div className="flex items-center">
        <span className="mr-2">City</span>
        <Autocomplete
          value={city}
          onChange={(e, newValue) => onChangeCity(newValue)}
          className="pl-4 border-none"
          options={cities}
          sx={{ width: 200 }}
        />
      </div>
    </div>
  )
}

interface PatientControlsProps
  extends React.ComponentProps<typeof AdvancedOptions> {
  patientNames: string[]
  name: string | null
  onChangeName: (name: string | null) => void
  actionButton?: ReactNode
}

export default function PatientTableControls(
  props: PatientControlsProps,
): JSX.Element {
  const { patientNames, name, onChangeName, actionButton, ...advanced } = props
  const [isShowAdvancedOptions, setIsShowAdvancedOptions] = useState(false)

  return (
    <div className="flex flex-col justify-center space-y-2 py-3 w-full border border-zinc-300 bg-zinc-100">
      <div className="flex justify-between pr-4 flex-wrap">
        <div className="flex space-x-3 px-4 items-center flex-wrap">
          <div className="flex items-center">
            <MagnifyingGlass className="text-lg m-2" />
            <Autocomplete
              value={name}
              onChange={(e, newValue) => onChangeName(newValue)}
              className="pl-4 border-none"
              options={patientNames}
              sx={{ width: 240 }}
            />
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-xs text-zinc-500">Advanced Options</span>
            <Switch
              checked={isShowAdvancedOptions}
              onChange={(e) => setIsShowAdvancedOptions(e.target.checked)}
            />
          </div>
        </div>
        {actionButton}
      </div>
      {isShowAdvancedOptions && <AdvancedOptions {...advanced} />}
    </div>
  )
}
