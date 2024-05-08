import cx from 'classnames'
import TextField from 'components/TextField'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { MouseEvent, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

/**
 * We reuse this component, and vary the form submission handling logic
 * and the text to distinguish between signing up and logging into an
 * existing account.
 */
export default function SignInView({
  variant,
}: {
  variant: 'signup' | 'login'
}): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const auth = getAuth()

  function SignUpWithUsernameAndPassword(
    event: MouseEvent<HTMLButtonElement>,
  ): void {
    event.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        navigate('/')
      })
      .catch((error) => {
        setError(JSON.stringify(error))
      })
  }

  function LogInWithUsernameAndPassword(
    event: MouseEvent<HTMLButtonElement>,
  ): void {
    event.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        navigate('/')
      })
      .catch((error) => {
        setError(JSON.stringify(error))
      })
  }

  return (
    <div className="w-96">
      <form className="flex flex-col w-full items-center space-y-4">
        {'' !== error && <div className="w-full text-red">{error}</div>}
        <TextField
          type="email"
          label="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button
            className={cx(
              'border rounded-md shadow-md bg-teal-600  text-white w-48 px-4 py-2',
              'disabled:bg-zinc-300',
            )}
            disabled={password.length === 0 || email.length === 0}
            onClick={(event) => {
              if (variant === 'signup') {
                SignUpWithUsernameAndPassword(event)
              } else {
                LogInWithUsernameAndPassword(event)
              }
            }}
          >
            {variant === 'signup' ? 'Sign up' : 'Log in'}
          </button>
          {variant === 'login' ? (
            <span className="fixed text-center align-middle ml-3 mt-2 text-sm text-zinc-400">
              <NavLink to="/signup">First time? Sign up</NavLink>
            </span>
          ) : null}
        </div>
      </form>
    </div>
  )
}
