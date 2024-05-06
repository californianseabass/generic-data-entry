import { Button } from '@mui/joy'
import { getAuth } from 'firebase/auth'
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PatientDataView from 'views/PatientDataView'

function GoToCreateNewPatientPageButton(): JSX.Element {
  return (
    <NavLink to="/create">
      <Button variant="contained">Create New Patient</Button>
    </NavLink>
  )
}

export default function HomePage(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const auth = getAuth()
    if (auth.currentUser === null) {
      navigate('/login')
    } else {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div className="fixed inset-0 flex pt-24 justify-center">
      <PatientDataView
        GoToCreateNewPatientPage={<GoToCreateNewPatientPageButton />}
        patients={[]}
      />
    </div>
  )
}
