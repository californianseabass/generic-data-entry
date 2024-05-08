import { Patient } from 'PatientData'
import { collection, doc, setDoc, getFirestore } from 'firebase/firestore'
import { PatientDocConverter } from 'firestoreDocs'
import useAuthUser from 'hooks/useAuthUser'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SinglePatientView from 'views/SinglePatientView'

export default function CreatePatientPage(): JSX.Element {
  const db = getFirestore()
  const navigate = useNavigate()
  const [userId, setUserId] = useState<string | null>('')

  useEffect(() => {
    useAuthUser(setUserId)
  }, [])

  useEffect(() => {
    if (userId === null) {
      navigate('/login')
    }
  }, [userId])

  function handleCreatePatient(patient: Patient) {
    const patientRef = doc(collection(db, 'patients')).withConverter(
      PatientDocConverter,
    )
    const patientDoc = {
      patientId: patientRef.id,
      providers: [userId],
      ...patient,
    }
    setDoc(patientRef, patientDoc)
    navigate('/')
  }

  if (userId === undefined) {
    return <div>Loading...</div>
  }

  if (userId === null) {
    return <div>User must be logged in</div>
  }

  return (
    <SinglePatientView
      onFinish={handleCreatePatient}
      onSignOut={() => console.log('signout')}
    />
  )
}
