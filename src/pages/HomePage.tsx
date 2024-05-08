import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PatientDataView from 'views/PatientDataView'
import useAuthUser from 'hooks/useAuthUser'
import usePatients from 'hooks/usePatients'
import { PatientWithId } from 'PatientData'
import PageLayout from 'components/PageLayout'

/**
 * Because this component contains navigation logic we write at the top level and
 * pass it down to the view that uses it, in order to keep a separation of concerns
 */
function GoToCreateNewPatientPageButton(): JSX.Element {
  return (
    <NavLink to="/create">
      <button className="border rounded-md shadow-md p-2 text-sm text-white bg-teal-600">
        Create New Patient
      </button>
    </NavLink>
  )
}

export default function HomePage(): JSX.Element {
  const [userId, setUserId] = useState<string | null>()
  const navigate = useNavigate()
  const [patients, setPatients] = useState<PatientWithId[]>([])

  useEffect(() => {
    return useAuthUser(setUserId)
  }, [])

  useEffect(() => {
    // user is still loading
    if (userId === undefined) {
      return
    }
    // user is not signed in
    if (userId === null) {
      navigate('/login')
      return
    }

    // we can return the patients this user is a provider of
    return usePatients(userId, setPatients)
  }, [userId])

  if (userId === undefined) {
    return <div>Loading</div>
  }

  if (userId === null) {
    return <div>User not signed in</div>
  }

  return (
    <PageLayout onSignOut={() => console.log('signout')}>
      <PatientDataView
        GoToCreateNewPatientPage={<GoToCreateNewPatientPageButton />}
        onPatientRowClick={(patientId) => navigate(`edit/${patientId}`)}
        patients={patients}
      />
    </PageLayout>
  )
}
