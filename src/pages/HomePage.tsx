import { Button } from '@mui/joy'
import PatientDataView from 'views/PatientDataView'
import { NavLink } from 'react-router-dom'

function GoToCreateNewPatientPageButton(): JSX.Element {
  return (
    <NavLink to="/create">
      <Button invariant="contained">Create New Patient</Button>
    </NavLink>
  )
}

export default function HomePage(): JSX.Element {
  return (
    <div className="fixed inset-0 flex pt-24 justify-center">
      <PatientDataView
        GoToCreateNewPatientPage={<GoToCreateNewPatientPageButton />}
        patients={[]}
      />
    </div>
  )
}
