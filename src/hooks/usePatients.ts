import { Patient } from 'PatientData'
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { PatientDocConverter } from 'firestoreDocs'

export default function usePatients(
  userId: string,
  onUpdatePatients: (patients: Patient[]) => void,
): () => void {
  const db = getFirestore()
  const queryForPatients = query(
    collection(db, 'patients'),
    where('providers', 'array-contains', userId),
  ).withConverter(PatientDocConverter)
  return onSnapshot(queryForPatients, (snapshot) => {
    const patients = snapshot.docs.map((d) => d.data())
    onUpdatePatients(patients)
  })
}
