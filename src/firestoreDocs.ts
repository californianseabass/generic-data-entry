import { Patient, isPatient } from 'PatientData'
import { FirestoreDataConverter, Timestamp } from 'firebase/firestore'
import { every, isString } from 'lodash'

export interface PatientDoc extends Omit<Patient, 'birthdate'> {
  patientId: string
  providers: string[]
  birthdate: Timestamp
}

function isPatientDoc(obj: any): obj is PatientDoc {
  return (
    isString(obj?.patientId) &&
    every(obj?.providers, isString) &&
    isPatient(obj)
  )
}

export const PatientDocConverter: FirestoreDataConverter<Patient> = {
  toFirestore: (data: PatientDoc & { birthdate: Date }) => ({
    ...data,
    birthdate: Timestamp.fromDate(data.birthdate),
  }),
  fromFirestore: (snapshot) => {
    const data = snapshot.data()
    if (!isPatientDoc(data)) {
      throw new Error('Expected PatientDoc')
    }
    return {
      ...data,
      birthdate: data.birthdate.toDate(),
    }
  },
}
