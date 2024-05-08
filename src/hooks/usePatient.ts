import { PatientWithId } from 'PatientData'
import { collection, doc, getFirestore, onSnapshot } from 'firebase/firestore'
import { PatientDocConverter } from 'firestoreDocs'

export default function usePatient(
  patientId: string,
  onUpdatePatient: (patient: PatientWithId | null) => void,
): () => void {
  const db = getFirestore()
  const patientRef = doc(collection(db, 'patients'), patientId).withConverter(
    PatientDocConverter,
  )

  return onSnapshot(patientRef, (snapshot) => {
    if (!snapshot.exists()) {
      onUpdatePatient(null)
      return
    }
    const patient = snapshot.data()
    onUpdatePatient(patient)
  })
}
