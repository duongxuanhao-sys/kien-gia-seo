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

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginTop: 0 }}>Welcome, {user?.name || 'User'}! 👋</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Choose a feature to get started</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <Card title="🔍 Keyword Research" description="Find profitable keywords" link="/keywords" />
        <Card title="✍️ Content Generator" description="Generate SEO content" link="/generator" />
        <Card title="📊 Analytics" description="Track your rankings" link="/analytics" />
        <Card title="⚙️ Settings" description="Manage your account" link="/settings" />
      </div>
    </div>
  )
}