import React, { useEffect, useState } from 'react'

function StatCard({ title, value, icon, color }: any) {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: `2px solid ${color}`,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: '30px', marginBottom: '10px' }}>{icon}</div>
      <h3 style={{ margin: '0 0 10px 0', color }}>{title}</h3>
      <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{value}</p>
    </div>
  )
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user/stats', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        const data = await response.json()
        setStats(data.stats)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>

  return (
    <div style={{ padding: '30px' }}>
      <h1>📊 Analytics Dashboard</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        <StatCard
          title="Total Keywords"
          value={stats?.totalKeywords || 0}
          icon="🔍"
          color="#007bff"
        />
        <StatCard
          title="Total Articles"
          value={stats?.totalArticles || 0}
          icon="📝"
          color="#28a745"
        />
        <StatCard
          title="Published"
          value={stats?.articlesPublished || 0}
          icon="✅"
          color="#ffc107"
        />
        <StatCard
          title="Success Rate"
          value={`${stats?.totalArticles > 0 ? Math.round((stats?.articlesPublished / stats?.totalArticles) * 100) : 0}%`}
          icon="📈"
          color="#dc3545"
        />
      </div>
    </div>
  )
}