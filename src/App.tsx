import AuthenticationPage from 'pages/AuthenticationPage'
import CreatePatientPage from 'pages/CreatePatientPage'
import EditPatientPage from 'pages/EditPatientPage'
import Home from 'pages/HomePage'

import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <AuthenticationPage variant="signup" />,
  },
  {
    path: 'login',
    element: <AuthenticationPage variant="login" />,
  },
  {
    path: '/create',
    element: <CreatePatientPage />,
  },
  {
    path: '/edit/:patientId',
    element: <EditPatientPage />,
  },
])

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}
