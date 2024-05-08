import { Patient } from 'PatientData'
import PageLayout from 'components/PageLayout'
import PatientDataForm from 'components/PatientDataForm'
import { ReactNode } from 'react'

export default function SinglePatientView({
  patient,
  title,
  SubmitButton,
  onSignOut,
  onBack,
  onFinish,
}: {
  patient?: Patient
  title: string
  SubmitButton: ReactNode
  onSignOut: () => void
  onBack: () => void
  onFinish: (patient: Patient) => void
}): JSX.Element {
  return (
    <PageLayout onBack={onBack} onSignOut={onSignOut}>
      <div className="w-full my-8 flex flex-col items-center space-y-4">
        <h2 className="text-lg font-semibold ">{title}</h2>
        <PatientDataForm
          patient={patient}
          onFormSubmit={onFinish}
          submitButton={SubmitButton}
        />
      </div>
    </PageLayout>
  )
}
