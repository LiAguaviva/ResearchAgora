import { Container } from 'react-bootstrap'
import { ContextProvider } from './context/ContextProvider'
import { AppRoutes } from './routes/AppRoutes'
import './App.css'

function App() {

  return (
    <Container fluid>
      <ContextProvider>
        <AppRoutes />
      </ContextProvider>
    </Container>
  )
}

export default App
