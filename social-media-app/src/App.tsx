
import './App.css'
import HomePage from './components/home';
import LoginPage from './components/login'
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";


function App() {

  return (
    <Router>
    <Routes>
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  </Router>

  )
}

export default App
