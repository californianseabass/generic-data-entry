import { Patient, PatientWithId } from 'PatientData'
import PatientTable from 'components/PatientTable'
import PatientTableControls from 'components/PatientTableControls'
import { join } from 'lodash'
import { ReactNode, useState } from 'react'

export default function PatientDataView({
  patients,
  GoToCreateNewPatientPage,
  onPatientRowClick,
}: {
  patients: PatientWithId[]
  GoToCreateNewPatientPage: ReactNode
  onPatientRowClick: (patientId: string) => void
}): JSX.Element {
  // These hooks are used to share the information from the control component
  // which is the UI to set filters and the table, which reacts to the
  // filters to make the table searchable.
  const [filterName, setFilterName] = useState<string | null>(null)
  const [filterAge, setFilterAge] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState<Patient['status'] | null>(
    null,
  )
  const [filterCity, setFilterCity] = useState<string | null>(null)

  const filters = {
    ...(filterName !== null ? { name: filterName } : {}),
    ...(filterAge !== null ? { age: filterAge } : {}),
    ...(filterStatus !== null ? { status: filterStatus } : {}),
    ...(filterCity !== null ? { city: filterCity } : {}),
  }

  const patientNames = patients.map(({ name }) =>
    join([name.firstName, name.middleName, name.lastName], ' '),
  )

  // We only show the city for the "Primary Address", so we'll only
  // allow the user to filter by those cities
  const cities = new Set(
    patients
      .filter(({ addresses }) => addresses.length > 0)
      .map(({ addresses }) => addresses[0].city),
  )

  return (
    <div className="flex w-full h-full justify-center">
      <div className="flex flex-col items-center w-full max-w-[720px] pt-12">
        <PatientTableControls
          patientNames={patientNames}
          name={filterName}
          onChangeName={setFilterName}
          status={filterStatus}
          onChangeStatus={setFilterStatus}
          age={filterAge}
          onChangeAge={setFilterAge}
          city={filterCity}
          onChangeCity={setFilterCity}
          cities={[...cities]}
          actionButton={GoToCreateNewPatientPage}
        />
        <PatientTable
          patients={patients}
          filters={filters}
          onPatientRowClick={onPatientRowClick}
        />
      </div>
    </div>
  )
}
