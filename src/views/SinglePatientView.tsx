import { Patient } from 'PatientData'
import PageLayout from 'components/PageLayout'
import PatientDataForm from 'components/PatientDataForm'
import SubmitButton from 'components/PatientDataForm/SubmitButton'

export default function SinglePatientView({
  patient,
  onSignOut,
  onFinish,
}: {
  patient?: Patient
  onSignOut: () => void
  onFinish: (patient: Patient) => void
}): JSX.Element {
  return (
    <PageLayout onSignOut={onSignOut}>
      <div className="w-full my-8 flex flex-col items-center space-y-4">
        <h2 className="text-lg font-semibold ">Create New Patient</h2>
        <PatientDataForm
          patient={patient}
          onFormSubmit={onFinish}
          submitButton={<SubmitButton label="Edit" />}
        />
      </div>
    </PageLayout>
  )
}
