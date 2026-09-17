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