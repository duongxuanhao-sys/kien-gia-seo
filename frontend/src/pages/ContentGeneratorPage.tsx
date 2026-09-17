import React, { useState } from 'react'

export default function ContentGeneratorPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)

  const stepsInfo = {
    1: { title: '📝 Select Keyword', desc: 'Choose keyword for content' },
    2: { title: '🗂️ Create Outline', desc: 'AI generates outline' },
    3: { title: '✍️ Write Article', desc: 'AI writes full content' },
    4: { title: '🔍 SEO Optimization', desc: 'Optimize for search' },
    5: { title: '🔗 Add Internal Links', desc: 'Link to related content' },
    6: { title: '🚀 Publish', desc: 'Publish to platforms' }
  }

  const currentInfo = stepsInfo[currentStep as keyof typeof stepsInfo]

  const handleNext = () => {
    if (currentStep === 1 && !keyword) {
      alert('Please enter a keyword')
      return
    }
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePublish = () => {
    alert('✅ Content published successfully!')
    setKeyword('')
    setCurrentStep(1)
  }

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginTop: 0 }}>✍️ Content Generator</h1>
      <p style={{ color: '#666' }}>Create SEO content in 6 easy steps</p>

      {/* Step Progress */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', alignItems: 'center' }}>
        {[1, 2, 3, 4, 5, 6].map(step => (
          <div key={step}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: step === currentStep ? '#007bff' : step < currentStep ? '#28a745' : '#ddd',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              {step < currentStep ? '✓' : step}
            </div>
          </div>
        ))}
      </div>

      {/* Content Box */}
      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        marginBottom: '20px'
      }}>
        <h2>{currentInfo.title}</h2>
        <p style={{ color: '#666' }}>{currentInfo.desc}</p>

        {currentStep === 1 && (
          <input
            type="text"
            placeholder="Enter keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        )}

        {currentStep > 1 && (
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '4px',
            fontSize: '13px',
            lineHeight: '1.6'
          }}>
            Content preview for: <strong>{keyword}</strong>
          </div>
        )}

        {currentStep === 6 && (
          <div style={{ marginTop: '15px' }}>
            <label style={{ marginRight: '15px' }}>
              <input type="checkbox" /> Blog
            </label>
            <label style={{ marginRight: '15px' }}>
              <input type="checkbox" /> Medium
            </label>
            <label style={{ marginRight: '15px' }}>
              <input type="checkbox" /> LinkedIn
            </label>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          style={{
            padding: '10px 24px',
            backgroundColor: currentStep === 1 ? '#ddd' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ← Back
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          {currentStep < 6 && (
            <button
              onClick={handleNext}
              style={{
                padding: '10px 24px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Next →
            </button>
          )}

          {currentStep === 6 && (
            <button
              onClick={handlePublish}
              style={{
                padding: '10px 24px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              🚀 Publish
            </button>
          )}
        </div>
      </div>

      <div style={{
        marginTop: '15px',
        fontSize: '12px',
        color: '#999'
      }}>
        Step {currentStep} of 6
      </div>
    </div>
  )
}