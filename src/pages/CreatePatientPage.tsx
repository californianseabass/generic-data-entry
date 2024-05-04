import PatientDataForm, { CreateNewButton } from 'components/PatientDataForm'
import { useNavigate } from 'react-router-dom'

export default function CreatePatientPage(): JSX.Element {
  const navigate = useNavigate()

  function handleCreatePatient() {
    navigate('/')
  }

  return (
    <div className="fixed inset-y-12 inset-x-0 flex justify-center overflow-scroll">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-lg font-semibold ">Create New Patient</h2>
        <PatientDataForm
          onFormSubmit={handleCreatePatient}
          submitButton={<CreateNewButton />}
        />
      </div>
    </div>
  )
}
