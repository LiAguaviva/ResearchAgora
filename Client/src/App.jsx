import { ContextProvider } from './context/ContextProvider'
import { AppRoutes } from './routes/AppRoutes'
import './App.css'
import './variables.css'

function App() {

  return (
      <ContextProvider>
        <AppRoutes />
      </ContextProvider>
  )
}

export default App
