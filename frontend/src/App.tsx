import React, { useEffect, useState } from 'react'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import KeywordPage from './pages/KeywordPage'
import ContentGeneratorPage from './pages/ContentGeneratorPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('dashboard')

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    setLoading(false)

    // Detect current page from URL
    const path = window.location.pathname
    if (path.includes('/keywords')) setCurrentPage('keywords')
    else if (path.includes('/generator')) setCurrentPage('generator')
    else setCurrentPage('dashboard')
  }, [])

  if (loading) return <div>Loading...</div>

  if (!isLoggedIn) return <LoginPage />

  return (
    <>
      {currentPage === 'dashboard' && <DashboardPage />}
      {currentPage === 'keywords' && <KeywordPage />}
      {currentPage === 'generator' && <ContentGeneratorPage />}
    </>
  )
}

export default App