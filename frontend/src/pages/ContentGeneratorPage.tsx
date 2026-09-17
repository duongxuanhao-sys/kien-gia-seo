import React, { useState, useEffect } from 'react'

export default function ContentGeneratorPage() {
  const [keyword, setKeyword] = useState('')
  const [step, setStep] = useState(1) // 1: Keyword, 2: Outline, 3: Content, 4: SEO, 5: Links, 6: Publish
  const [content, setContent] = useState({
    keyword: '',
    outline: '',
    article: '',
    seoOptimized: '',
    internalLinks: [],
    title: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const kw = params.get('keyword')
    if (kw) {
      setKeyword(kw)
      setContent({ ...content, keyword: kw })
    }
  }, [])

  const handleGenerateStep = async () => {
    if (!keyword) {
      alert('Please enter a keyword')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/content/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          keyword,
          step
        })
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Generation failed')
        return
      }

      setContent({ ...content, ...data.content })
      if (step < 6) setStep(step + 1)
    } catch (err) {
      alert('Network error')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { num: 1, name: 'Keyword', icon: '🔍' },
    { num: 2, name: 'Outline', icon: '📋' },
    { num: 3, name: 'Write', icon: '✍️' },
    { num: 4, name: 'SEO', icon: '📊' },
    { num: 5, name: 'Links', icon: '🔗' },
    { num: 6, name: 'Publish', icon: '🚀' }
  ]

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1>✍️ Content Generator</h1>
        <p style={{ color: '#666' }}>Generate SEO-optimized content in 6 steps</p>
      </div>

      {/* Step Progress */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px',
        gap: '10px'
      }}>
        {steps.map((s) => (
          <div
            key={s.num}
            onClick={() => setStep(s.num)}
            style={{
              flex: 1,
              padding: '15px',
              textAlign: 'center',
              borderRadius: '8px',
              backgroundColor: step >= s.num ? '#007bff' : '#e9ecef',
              color: step >= s.num ? 'white' : '#666',
              cursor: 'pointer',
              transition: 'all 0.3s',
              border: step === s.num ? '2px solid #0056b3' : 'none'
            }}
          >
            <div style={{ fontSize: '20px', marginBottom: '5px' }}>{s.icon}</div>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {s.num}. {s.name}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
        marginBottom: '30px'
      }}>
        {/* Input Side */}
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>📝 {steps[step - 1].name} Input</h3>

          {step === 1 && (
            <>
              <label style={{ display: 'block', marginBottom: '10px' }}>Target Keyword</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value)
                  setContent({ ...content, keyword: e.target.value })
                }}
                placeholder="e.g., best running shoes"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  marginBottom: '15px',
                  boxSizing: 'border-box'
                }}
              />
            </>
          )}

          {step === 2 && (
            <p style={{ color: '#666' }}>
              AI will generate an outline based on your keyword. Click "Generate" to proceed.
            </p>
          )}

          {step === 3 && (
            <p style={{ color: '#666' }}>
              AI will write a full 2000+ word article. Click "Generate" to proceed.
            </p>
          )}

          {step === 4 && (
            <p style={{ color: '#666' }}>
              AI will optimize for SEO (meta tags, headers, keywords). Click "Generate" to proceed.
            </p>
          )}

          {step === 5 && (
            <p style={{ color: '#666' }}>
              AI will suggest internal links. Click "Generate" to proceed.
            </p>
          )}

          {step === 6 && (
            <p style={{ color: '#666' }}>
              Ready to publish! Choose your platform.
            </p>
          )}

          <button
            onClick={handleGenerateStep}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Generating...' : `Generate ${steps[step - 1].name}`}
          </button>
        </div>

        {/* Output Side */}
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          <h3>📄 Preview</h3>

          {step === 1 && (
            <p style={{ color: '#999' }}>Enter keyword and click "Generate Outline"</p>
          )}

          {step >= 2 && (
            <>
              <h4>Outline:</h4>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px', color: '#666' }}>
                {content.outline || 'Generating...'}
              </pre>
            </>
          )}

          {step >= 3 && (
            <>
              <h4>Article (First 300 words):</h4>
              <p style={{ fontSize: '12px', color: '#666' }}>
                {content.article?.substring(0, 300) || 'Generating...'}...
              </p>
            </>
          )}

          {step >= 4 && (
            <>
              <h4>SEO Meta:</h4>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px', color: '#666' }}>
                {content.seoOptimized || 'Generating...'}
              </pre>
            </>
          )}

          {step >= 5 && (
            <>
              <h4>Internal Links:</h4>
              <ul style={{ fontSize: '12px', color: '#666' }}>
                {content.internalLinks?.map((link, i) => (
                  <li key={i}>{link}</li>
                )) || <li>Generating...</li>}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ← Previous
        </button>
        <button
          onClick={() => setStep(Math.min(6, step + 1))}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Next →
        </button>
        {step === 6 && (
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginLeft: 'auto'
            }}
          >
            Publish Now
          </button>
        )}
      </div>
    </div>
  )
}