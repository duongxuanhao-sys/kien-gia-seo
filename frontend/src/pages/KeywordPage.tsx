import React, { useState } from 'react'

interface KeywordResult {
  keyword: string
  volume: number
  difficulty: number
  cpc: number | string
  competition: string
}

function DifficultyBadge({ difficulty }: any) {
  let color = '#28a745'
  if (difficulty > 60) color = '#dc3545'
  else if (difficulty > 40) color = '#ffc107'
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 8px',
      backgroundColor: color,
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold'
    }}>
      {difficulty}
    </span>
  )
}

function CompetitionBadge({ competition }: any) {
  const colors: any = {
    'Low': '#28a745',
    'Medium': '#ffc107',
    'High': '#dc3545'
  }
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 8px',
      backgroundColor: colors[competition] || '#999',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold'
    }}>
      {competition}
    </span>
  )
}

export default function KeywordPage() {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<KeywordResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setError('Please enter a keyword')
      return
    }

    setLoading(true)
    setError('')
    setResults([])

    try {
      const response = await fetch('http://localhost:3001/api/keywords/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ keyword })
      })

      const data = await response.json()
      setResults(data.results || [])
    } catch (err: any) {
      setError('Failed to search keywords: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: '0 0 10px 0' }}>🔍 Keyword Research</h1>
        <p style={{ color: '#666', margin: 0 }}>Find profitable keywords for your next content</p>
      </div>

      {/* Search Bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Enter keyword (e.g., 'best running shoes')"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            flex: 1,
            padding: '12px 16px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            outline: 'none',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: '12px 32px',
            backgroundColor: loading ? '#999' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
        >
          {loading ? '🔄 Searching...' : '🔍 Search'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Results Table */}
      {results.length > 0 ? (
        <div style={{
          overflow: 'x-auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Keyword</th>
                <th style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold' }}>Search Volume</th>
                <th style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold' }}>Difficulty</th>
                <th style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold' }}>CPC</th>
                <th style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold' }}>Competition</th>
                <th style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, idx) => (
                <tr key={idx} style={{
                  borderBottom: '1px solid #dee2e6',
                  ':hover': { backgroundColor: '#f9f9f9' }
                }}>
                  <td style={{ padding: '15px', fontWeight: '500' }}>{result.keyword}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>{result.volume.toLocaleString()}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <DifficultyBadge difficulty={result.difficulty} />
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>${result.cpc}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <CompetitionBadge competition={result.competition} />
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <button style={{
                      padding: '6px 12px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}>
                      ✍️ Generate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading && keyword ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#999'
        }}>
          <p>📊 Click Search to find keywords</p>
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          color: '#999'
        }}>
          <p style={{ fontSize: '16px', marginBottom: '5px' }}>🔍 Ready to find keywords?</p>
          <p style={{ fontSize: '14px' }}>Enter a keyword above to see search volume, difficulty, CPC, and competition data</p>
        </div>
      )}

      {/* Stats */}
      {results.length > 0 && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#e7f3ff',
          borderRadius: '8px',
          border: '1px solid #b3d9ff'
        }}>
          <p style={{ margin: 0, fontSize: '14px' }}>
            ✨ Found <strong>{results.length}</strong> results for "<strong>{keyword}</strong>"
          </p>
        </div>
      )}
    </div>
  )
}