import { Patient } from 'PatientData'
import PatientTable from 'components/PatientTable'
import PatientTableControls from 'components/PatientTableControls'
import { join } from 'lodash'
import { ReactNode, useState } from 'react'

export default function PatientDataView({
  patients,
  GoToCreateNewPatientPage,
}: {
  patients: Patient[]
  GoToCreateNewPatientPage: ReactNode
}): JSX.Element {
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

  const cities = new Set(
    patients
      .filter(({ addresses }) => addresses.length > 0)
      .map(({ addresses }) => addresses[0].city),
  )

  return (
    <div className="flex flex-col items-center space-y-4 w-[660px]">
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
        nameFilter={filterName ?? undefined}
        filters={filters}
      />
    </div>
  )
}
