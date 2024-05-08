import { Patient } from 'PatientData'
import PatientDataForm from 'components/PatientDataForm'
import SubmitButton from 'components/PatientDataForm/SubmitButton'
import { getAuth } from 'firebase/auth'
import { collection, doc, setDoc, getFirestore } from 'firebase/firestore'
import { PatientDocConverter } from 'firestoreDocs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreatePatientPage(): JSX.Element {
  const db = getFirestore()
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const auth = getAuth()
    if (auth.currentUser === null) {
      navigate('/login')
    } else {
      setUserId(auth.currentUser.uid)
    }
  }, [])

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

  return (
    <div className="fixed inset-y-12 inset-x-0 flex justify-center overflow-scroll">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-lg font-semibold ">Create New Patient</h2>
        <PatientDataForm
          onFormSubmit={handleCreatePatient}
          submitButton={<SubmitButton label="Create" />}
        />
      </div>
    </div>
  )
}
