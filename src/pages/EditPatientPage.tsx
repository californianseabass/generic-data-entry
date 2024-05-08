import { Patient } from 'PatientData'
import { collection, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { PatientDocConverter } from 'firestoreDocs'
import useAuthUser from 'hooks/useAuthUser'
import usePatient from 'hooks/usePatient'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SinglePatientView from 'views/SinglePatientView'
import { signOut } from './utils'

export default function EditPatientPage(): JSX.Element {
  const db = getFirestore()
  const navigate = useNavigate()
  const [userId, setUserId] = useState<string | null>()
  const [patient, setPatient] = useState<Patient | null>()

  const { patientId } = useParams()

  useEffect(() => {
    return useAuthUser(setUserId)
  })

  useEffect(() => {
    if (userId === undefined) {
      return () => {}
    }
    if (userId === null) {
      navigate('/login')
      return () => {}
    } else if (patientId == null) {
      navigate('/')
      return () => {}
    } else {
      return usePatient(patientId, setPatient)
    }
  }, [userId])

  function handleUpdatePatient(patient: Patient) {
    if (patientId === undefined) {
      throw new Error('Never found a patient')
    }
    const patientRef = doc(collection(db, 'patients'), patientId).withConverter(
      PatientDocConverter,
    )

    // we leave the provider field untouched
    updateDoc(patientRef, {
      name: patient.name,
      birthdate: patient.birthdate,
      addresses: patient.addresses,
      status: patient.status,
      additionalField: patient.additionalFields,
    })
      .then(() => navigate('/'))
      .catch((err) => {
        if (err instanceof Error) {
          throw err
        }
        throw new Error(JSON.stringify(err))
      })
  }

  function handleSignOut(): void {
    signOut(() => {
      navigate('/login')
    })
  }

  if (patient === undefined) {
    return <div>Loading...</div>
  }

  if (patient === null) {
    return <div>Patient not found</div>
  }

  return (
    <SinglePatientView
      patient={patient}
      onBack={() => navigate('/')}
      onFinish={handleUpdatePatient}
      onSignOut={handleSignOut}
    />
  )
}
