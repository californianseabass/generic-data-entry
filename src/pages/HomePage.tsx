import { getAuth } from 'firebase/auth'
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PatientDataView from 'views/PatientDataView'
import usePatients from 'hooks/usePatients'
import { PatientWithId } from 'PatientData'

function GoToCreateNewPatientPageButton(): JSX.Element {
  return (
    <NavLink to="/create">
      <button>Create New Patient</button>
    </NavLink>
  )
}

export default function HomePage(): JSX.Element {
  const [userId, setUserId] = useState<string>()
  const navigate = useNavigate()
  const [patients, setPatients] = useState<PatientWithId[]>([])

  useEffect(() => {
    const auth = getAuth()
    if (auth.currentUser === null) {
      navigate('/login')
    } else {
      setUserId(auth.currentUser.uid)
    }
  }, [])

  useEffect(() => {
    if (userId === undefined) {
      return
    }
    return usePatients(userId, setPatients)
  }, [userId])

  if (userId === undefined) {
    return <div>Loading</div>
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
