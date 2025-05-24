import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Components
import ReduxProvider from './components/providers/ReduxProvider'
import MainLayout from './components/layouts/MainLayout'
import { NotificationProvider } from './components/notifications'

// Pages
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'

function App() {
  return (
    <ReduxProvider>
      <NotificationProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MainLayout>
        </Router>
      </NotificationProvider>
    </ReduxProvider>
  )
}

export default App
