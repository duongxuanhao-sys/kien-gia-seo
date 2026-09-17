import React, { useEffect, useState } from 'react'

function Card({ title, description, link }: any) {
  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      backgroundColor: '#f9f9f9'
    }} onClick={() => window.location.href = link}>
      <h3>{title}</h3>
      <p style={{ color: '#666', marginBottom: '10px' }}>{description}</p>
      <a href={link} style={{ color: '#007bff', textDecoration: 'none' }}>Go →</a>
    </div>
  )
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <div style={{ padding: '20px' }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        borderBottom: '1px solid #ddd',
        paddingBottom: '15px'
      }}>
        <h1>🔧 KIẾN GIÁ SEO Dashboard</h1>
        <div>
          <span style={{ marginRight: '20px' }}>Welcome, {user?.name || 'User'}</span>
          <button onClick={handleLogout} style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <Card title="🔍 Keyword Research" description="Find profitable keywords" link="/keywords" />
        <Card title="✍️ Content Generator" description="Generate SEO content" link="/generator" />
        <Card title="📊 Analytics" description="Track your rankings" link="/analytics" />
        <Card title="⚙️ Settings" description="Manage your account" link="/settings" />
      </div>
    </div>
  )
}