import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from './app/dashboard/page'
import MarketPage from './app/market/page'
import WalletPage from './app/wallet/page'
import Layout from './Layout'
import { AppKitProvider } from './AppKitProvider'

function App() {
  return (
    <AppKitProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </AppKitProvider>
  )
}

export default App
