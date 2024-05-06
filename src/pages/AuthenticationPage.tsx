import SignInView from 'views/SignInView'

export default function AuthenticationPage({
  variant,
}: {
  variant: 'signup' | 'login'
}): JSX.Element {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <SignInView variant={variant} />
    </div>
  )
}
