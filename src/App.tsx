import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from './app/dashboard/page'
import MarketPage from './app/market/page'
import Layout from './Layout'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<DashboardPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  )
}

export default App
