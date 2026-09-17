import React, { useEffect, useState } from 'react'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import KeywordPage from './pages/KeywordPage'
import ContentGeneratorPage from './pages/ContentGeneratorPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import Header from './components/Header'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    setIsLoggedIn(!!token)
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)

    const path = window.location.pathname
    if (path.includes('/keywords')) {
      setCurrentPage('keywords')
    } else if (path.includes('/generator')) {
      setCurrentPage('generator')
    } else if (path.includes('/analytics')) {
      setCurrentPage('analytics')
    } else if (path.includes('/settings')) {
      setCurrentPage('settings')
    } else {
      setCurrentPage('dashboard')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setCurrentPage('dashboard')
    window.location.href = '/'
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    window.location.href = page === 'dashboard' ? '/' : `/${page}`
  }

  if (loading) return <div>Loading...</div>

  if (!isLoggedIn) return <LoginPage />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header currentUser={user} onLogout={handleLogout} onNavigate={handleNavigate} />
      
      <main style={{ flex: 1 }}>
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'keywords' && <KeywordPage />}
        {currentPage === 'generator' && <ContentGeneratorPage />}
        {currentPage === 'analytics' && <AnalyticsPage />}
        {currentPage === 'settings' && <SettingsPage />}
      </main>
    </div>
  )
}

export default App