import { Link } from 'react-router-dom'
import './App.css'
// Importing Components
import CustomRoutes from './routes/CustomRoutes'

// Importing CSS

function App() {

  return (
    <><h1>
      <Link to="/">
        Pokedex
      </Link></h1>
      <CustomRoutes />
    </>
  )
}

export default App
