import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from './app/dashboard/page'

function App() {
  return (
    <Routes>
      <Route path="/home" element={<DashboardPage />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default App
