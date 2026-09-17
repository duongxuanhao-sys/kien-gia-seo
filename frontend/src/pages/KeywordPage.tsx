import React, { useState } from 'react'

export default function KeywordPage() {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
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

      if (!response.ok) {
        setError(data.message || 'Search failed')
        return
      }

      setResults(data.results || [])
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '30px' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px', borderBottom: '1px solid #ddd', paddingBottom: '20px' }}>
        <h1>🔍 Keyword Research</h1>
        <p style={{ color: '#666' }}>Find profitable keywords for your content</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword (e.g., 'best running shoes')"
            required
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 30px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}

      {/* Results Table */}
      {results.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Keyword</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Search Volume</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Difficulty</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>CPC</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Competition</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{result.keyword}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{result.volume?.toLocaleString()}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: getDifficultyColor(result.difficulty),
                      color: 'white',
                      fontSize: '12px'
                    }}>
                      {result.difficulty}/100
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>${result.cpc}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{result.competition}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => window.location.href = `/generator?keyword=${result.keyword}`}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Generate Content
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && results.length === 0 && keyword && (
        <p style={{ textAlign: 'center', color: '#999' }}>No results. Try searching for a different keyword.</p>
      )}

      {!loading && results.length === 0 && !keyword && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#999'
        }}>
          <p style={{ fontSize: '18px' }}>📊 Enter a keyword to get started</p>
          <p style={{ marginTop: '10px' }}>See search volume, difficulty, CPC, and more</p>
        </div>
      )}
    </div>
  )
}

function getDifficultyColor(difficulty: number): string {
  if (difficulty < 30) return '#28a745' // Green - Easy
  if (difficulty < 60) return '#ffc107' // Yellow - Medium
  return '#dc3545' // Red - Hard
}