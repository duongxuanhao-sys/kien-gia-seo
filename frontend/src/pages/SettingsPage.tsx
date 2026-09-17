import React, { useState, useEffect } from 'react'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [subscription, setSubscription] = useState('free')
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword) {
      alert('Vui lòng điền đầy đủ thông tin')
      return
    }
    if (newPassword.length < 6) {
      alert('Mật khẩu phải ít nhất 6 ký tự')
      return
    }
    alert('✅ Đổi mật khẩu thành công!')
    setOldPassword('')
    setNewPassword('')
    setShowPasswordForm(false)
  }

  const handleUpgradeSubscription = (tier: string) => {
    setSubscription(tier)
    alert(`✅ Nâng cấp lên ${tier === 'pro' ? 'Pro' : 'Enterprise'} thành công!`)
  }

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ marginTop: 0 }}>⚙️ Cài Đặt</h1>
      <p style={{ color: '#666' }}>Quản lý tài khoản và gói dịch vụ</p>

      {/* User Profile Section */}
      <div style={{
        backgroundColor: '#fff',
        padding: '25px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        marginBottom: '25px'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px' }}>👤 Thông Tin Tài Khoản</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '5px' }}>
            Tên người dùng
          </label>
          <input
            type="text"
            value={user?.name || ''}
            disabled
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
              backgroundColor: '#f5f5f5'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '5px' }}>
            Email
          </label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
              backgroundColor: '#f5f5f5'
            }}
          />
        </div>

        <button
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {showPasswordForm ? 'Hủy' : '🔐 Đổi Mật Khẩu'}
        </button>

        {showPasswordForm && (
          <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>
                Mật khẩu cũ
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>
                Mật khẩu mới
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              onClick={handleChangePassword}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ✅ Xác Nhận
            </button>
          </div>
        )}
      </div>

      {/* Subscription Section */}
      <div style={{
        backgroundColor: '#fff',
        padding: '25px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        marginBottom: '25px'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px' }}>💎 Gói Dịch Vụ Của Bạn</h2>

        <div style={{
          padding: '15px',
          backgroundColor: '#e7f3ff',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '2px solid #007bff'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>
            Gói hiện tại: <span style={{ color: '#007bff' }}>
              {subscription === 'free' ? '🎁 Miễn Phí' : subscription === 'pro' ? '⭐ Pro' : '👑 Enterprise'}
            </span>
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {/* Free Tier */}
          <div style={{
            padding: '20px',
            border: subscription === 'free' ? '2px solid #28a745' : '1px solid #ddd',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: subscription === 'free' ? '#f0f8f5' : '#fff'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>🎁 Miễn Phí</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>0đ</p>
            <ul style={{ textAlign: 'left', fontSize: '13px', color: '#666', margin: '15px 0' }}>
              <li>✓ 5 bài viết/tháng</li>
              <li>✓ Tìm kiếm từ khoá cơ bản</li>
              <li>✗ Không có hỗ trợ</li>
            </ul>
            {subscription === 'free' && (
              <button disabled style={{
                padding: '10px 20px',
                backgroundColor: '#ddd',
                color: '#999',
                border: 'none',
                borderRadius: '4px',
                cursor: 'not-allowed'
              }}>
                Gói hiện tại
              </button>
            )}
          </div>

          {/* Pro Tier */}
          <div style={{
            padding: '20px',
            border: subscription === 'pro' ? '2px solid #ffc107' : '1px solid #ddd',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: subscription === 'pro' ? '#fffbf0' : '#fff'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>⭐ Pro</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>199k/tháng</p>
            <ul style={{ textAlign: 'left', fontSize: '13px', color: '#666', margin: '15px 0' }}>
              <li>✓ 50 bài viết/tháng</li>
              <li>✓ Tìm kiếm nâng cao</li>
              <li>✓ Email support</li>
            </ul>
            <button
              onClick={() => handleUpgradeSubscription('pro')}
              disabled={subscription === 'pro'}
              style={{
                padding: '10px 20px',
                backgroundColor: subscription === 'pro' ? '#ddd' : '#ffc107',
                color: subscription === 'pro' ? '#999' : '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: subscription === 'pro' ? 'not-allowed' : 'pointer',
                fontWeight: 'bold'
              }}
            >
              {subscription === 'pro' ? 'Gói hiện tại' : 'Nâng cấp'}
            </button>
          </div>

          {/* Enterprise Tier */}
          <div style={{
            padding: '20px',
            border: subscription === 'enterprise' ? '2px solid #dc3545' : '1px solid #ddd',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: subscription === 'enterprise' ? '#fef5f5' : '#fff'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>👑 Enterprise</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>1.5M/tháng</p>
            <ul style={{ textAlign: 'left', fontSize: '13px', color: '#666', margin: '15px 0' }}>
              <li>✓ Unlimited bài viết</li>
              <li>✓ Tìm kiếm chuyên sâu</li>
              <li>✓ Hỗ trợ 24/7</li>
            </ul>
            <button
              onClick={() => handleUpgradeSubscription('enterprise')}
              disabled={subscription === 'enterprise'}
              style={{
                padding: '10px 20px',
                backgroundColor: subscription === 'enterprise' ? '#ddd' : '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: subscription === 'enterprise' ? 'not-allowed' : 'pointer',
                fontWeight: 'bold'
              }}
            >
              {subscription === 'enterprise' ? 'Gói hiện tại' : 'Nâng cấp'}
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div style={{
        backgroundColor: '#fff',
        padding: '25px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        borderLeft: '4px solid #dc3545'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#dc3545' }}>⚠️ Khu Vực Nguy Hiểm</h2>

        <button style={{
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }} onClick={() => {
          if (window.confirm('Bạn chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!')) {
            alert('❌ Tài khoản đã xóa')
          }
        }}>
          🗑️ Xóa Tài Khoản
        </button>
      </div>
    </div>
  )
}