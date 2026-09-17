import React, { useState } from 'react'

interface HeaderProps {
  currentUser?: { name: string; email: string }
  onLogout: () => void
  onNavigate: (page: string) => void
}

export default function Header({ currentUser, onLogout, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={{
      backgroundColor: '#fff',
      borderBottom: '1px solid #e0e0e0',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }} onClick={() => onNavigate('dashboard')}>
        <span style={{ fontSize: '28px' }}>🔧</span>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>KIẾN GIÁ SEO</h2>
      </div>

      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <NavLink label="🔍 Keywords" onClick={() => onNavigate('keywords')} />
        <NavLink label="✍️ Generator" onClick={() => onNavigate('generator')} />
        <NavLink label="📊 Analytics" onClick={() => onNavigate('analytics')} />
        <NavLink label="⚙️ Settings" onClick={() => onNavigate('settings')} />
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {currentUser && (
          <>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>{currentUser.name}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{currentUser.email}</div>
            </div>
            <button onClick={onLogout} style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  )
}

function NavLink({ label, onClick }: any) {
  return (
    <button onClick={onClick} style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#007bff',
      fontWeight: '500',
      padding: '8px 12px',
      borderRadius: '4px'
    }}>
      {label}
    </button>
  )
}