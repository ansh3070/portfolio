'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.push('/admin')
      }
    }
    checkAuth()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      router.push('/admin')
    } catch (err: any) {
      setError(err.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      })

      if (signUpError) throw signUpError
      setError('') // Clear error on success
      alert('Check your email to confirm your account!')
    } catch (err: any) {
      setError(err.message || 'Failed to sign up')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <style>{`
        body {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
      `}</style>

      <Link href="/" style={styles.backLink}>
        ← Back to Portfolio
      </Link>

      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.title}>Admin Login</h1>
          <p style={styles.subtitle}>Manage your portfolio projects</p>

          <form onSubmit={handleLogin} style={styles.form}>
            {error && <div style={styles.error}>{error}</div>}

            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
                placeholder="your@email.com"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={styles.divider}>or</div>

          <button
            onClick={handleSignUp}
            disabled={loading}
            style={{
              ...styles.button,
              ...styles.signUpButton,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing up...' : 'Create Account'}
          </button>

          <p style={styles.info}>
            Note: Store your credentials securely. This is your personal admin panel.
          </p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    padding: '1rem',
  },
  backLink: {
    position: 'absolute' as const,
    top: '2rem',
    left: '2rem',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'opacity 0.2s ease',
  },
  wrapper: {
    width: '100%',
    maxWidth: '400px',
  },
  card: {
    background: 'white',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#1e293b',
  },
  subtitle: {
    color: '#64748b',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  formGroup: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  label: {
    fontWeight: 600,
    color: '#1e293b',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
  },
  button: {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    fontSize: '1rem',
  },
  signUpButton: {
    background: '#e2e8f0',
    color: '#1e293b',
  },
  divider: {
    textAlign: 'center' as const,
    margin: '1.5rem 0',
    color: '#64748b',
    position: 'relative' as const,
  },
  error: {
    background: '#fee2e2',
    color: '#dc2626',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    fontSize: '0.95rem',
  },
  info: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginTop: '1rem',
    textAlign: 'center' as const,
  },
}
