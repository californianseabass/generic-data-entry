import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PatientDataView from 'views/PatientDataView'
import useAuthUser from 'hooks/useAuthUser'
import usePatients from 'hooks/usePatients'
import { PatientWithId } from 'PatientData'

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
    if (userId === undefined) {
      return
    }
    if (userId === null) {
      navigate('/login')
      return
    }
    return usePatients(userId, setPatients)
  }, [userId])

  if (userId === undefined) {
    return <div>Loading</div>
  }

  if (userId === null) {
    return <div>User not signed in</div>
  }

  return (
    <div className="fixed inset-0 flex pt-24 justify-center">
      <PatientDataView
        GoToCreateNewPatientPage={<GoToCreateNewPatientPageButton />}
        onPatientRowClick={(patientId) => navigate(`edit/${patientId}`)}
        patients={patients}
      />
    </div>
  )
}
