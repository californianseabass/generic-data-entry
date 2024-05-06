import './index.css'

import App from 'App'
import { createRoot } from 'react-dom/client'
import './firebase'

function main() {
  const rootEl = document.getElementById('root')
  if (rootEl !== null) {
    const root = createRoot(rootEl)
    root.render(<App />)
  }
}

main()
