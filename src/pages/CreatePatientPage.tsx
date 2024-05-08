import { Patient } from 'PatientData'
import PatientDataForm from 'components/PatientDataForm'
import SubmitButton from 'components/PatientDataForm/SubmitButton'
import { collection, doc, setDoc, getFirestore } from 'firebase/firestore'
import { PatientDocConverter } from 'firestoreDocs'
import useAuthUser from 'hooks/useAuthUser'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
