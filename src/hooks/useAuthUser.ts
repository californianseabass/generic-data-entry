import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function useAuthUser(
  onUpdate: (userId: string | null) => void,
): () => void {
  const auth = getAuth()
  return onAuthStateChanged(auth, (user) => {
    onUpdate(user?.uid ?? null)
  })
}
