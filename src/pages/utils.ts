import { getAuth } from 'firebase/auth'

export function signOut(onSignOut: () => void): void {
  const auth = getAuth()
  if (auth.currentUser !== null) {
    auth.signOut().then(onSignOut)
  }
}
