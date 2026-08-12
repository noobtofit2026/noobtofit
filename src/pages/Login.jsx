import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { signInWithPopup } from 'firebase/auth'
import { db, auth, provider } from '../firebase'
import styles from './Login.module.css'

const SITE_PASS = import.meta.env.VITE_SITE_PASSWORD || 'noobtofit123'

export default function Login() {
  const [pw, setPw] = useState('')
  const [status, setStatus] = useState(null)
  const [step, setStep] = useState('password') // 'password' | 'google' | 'waiting'
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const userName = localStorage.getItem('ntf_user_name') || 'there'

  const pollIntervalRef = useRef(null)
  const pollTimeoutRef = useRef(null)

  useEffect(() => {
    if (localStorage.getItem('ntf_auth') === 'true') navigate('/home')
    if (!localStorage.getItem('ntf_user_name')) navigate('/')
  }, [])

  // If user already logged in with Google before, check approval again
  useEffect(() => {
    const savedEmail = localStorage.getItem('ntf_user_email')
    if (savedEmail) {
      checkApproval(savedEmail)
    }
  }, [])

  // Clean up any running poll when component unmounts
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current)
      if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current)
    }
  }, [])

  async function checkApproval(email) {
    try {
      const userRef = doc(db, 'users', email)
      const userSnap = await getDoc(userRef)
      if (userSnap.exists() && userSnap.data().approved) {
        localStorage.setItem('ntf_auth', 'true')
        navigate('/home')
      }
    } catch (error) {
      console.error('checkApproval error:', error)
    }
  }

  function handlePasswordVerify() {
    if (!pw.trim()) {
      return setStatus({ type: 'error', msg: 'Enter your password.' })
    }
    if (pw !== SITE_PASS) {
      return setStatus({ type: 'error', msg: 'Wrong password. Contact your trainer.' })
    }
    // Password correct → show Google login
    setStatus(null)
    setStep('google')
  }

  async function handleGoogleLogin() {
    setLoading(true)
    setStatus(null)
    try {
     const result = await signInWithPopup(auth, provider)

console.log("GOOGLE AUTH SUCCESS:", result.user.email)
console.log("AUTH USER:", auth.currentUser)

const email = result.user.email
      const displayName = result.user.displayName

      const userRef = doc(db, 'users', email)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        // New user — create record, wait for admin approval
        await setDoc(userRef, {
          email,
          name: displayName || userName,
          approved: false,
          createdAt: new Date().toISOString(),
        })
        localStorage.setItem('ntf_user_email', email)
        setStep('waiting')
        setLoading(false)
        setStatus({
          type: 'pending',
          msg: 'Request sent! Waiting for trainer approval...',
        })
        // Start polling for approval
        startPolling(email)
        return
      }

      const userData = userSnap.data()

      if (!userData.approved) {
        // Existing user but not yet approved
        localStorage.setItem('ntf_user_email', email)
        setStep('waiting')
        setLoading(false)
        setStatus({
          type: 'pending',
          msg: 'Your account is pending approval. Please wait...',
        })
        startPolling(email)
        return
      }

      // Approved! Let them in
      localStorage.setItem('ntf_user_email', email)
      localStorage.setItem('ntf_auth', 'true')
      navigate('/home')

    } catch (error) {
      console.error('Google login error:', error)
      setLoading(false)
      setStatus({ type: 'error', msg: `Google login failed: ${error.code || error.message}` })
    }
  }

  function startPolling(email) {
    pollIntervalRef.current = setInterval(async () => {
      try {
      const userRef = doc(db, 'users', email)

console.log("ABOUT TO READ FIRESTORE:", userRef.path)

const userSnap = await getDoc(userRef)

console.log("FIRESTORE READ SUCCESS:", userSnap.exists())
        if (userSnap.exists() && userSnap.data().approved) {
          clearInterval(pollIntervalRef.current)
          localStorage.setItem('ntf_auth', 'true')
          navigate('/home')
        }
      } catch (error) {
        console.error('Polling error:', error)
      }
    }, 4000)

    // Stop polling after 10 minutes
    pollTimeoutRef.current = setTimeout(() => {
      clearInterval(pollIntervalRef.current)
    }, 600000)
  }

  return (
    <div className={styles.page}>
      <div className={styles.heroBg} />

      <div className={styles.header}>
        <img src="/logo.png" alt="NF" className={styles.logo} />
        <span className={styles.liveTag}>
          <span className={styles.liveDot} />
          STEP 2 OF 2
        </span>
      </div>

      <div className={styles.hero}>
        <div className={`${styles.eyebrow} fade-up`}>
          WELCOME, {userName.toUpperCase()} 👋
        </div>
        <h1 className={`${styles.title} fade-up-2`}>NOOB TO FIT</h1>
        <p className={`${styles.subtitle} fade-up-3`}>
          The complete beginner system.<br />
          Train smarter. Fuel better. Transform.
        </p>
        <div className={`${styles.stats} fade-up-4`}>
          <div className={styles.stat}>
            <span className={styles.statNum}>4</span>
            <span className={styles.statLabel}>Phases</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>12</span>
            <span className={styles.statLabel}>Weeks</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>90</span>
            <span className={styles.statLabel}>Days</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>∞</span>
            <span className={styles.statLabel}>Results</span>
          </div>
        </div>
      </div>

      <div className={`${styles.loginBox} fade-up-4`}>
        <div className={styles.loginBoxTop}>
          <p className={styles.loginTitle}>Member Access</p>
          <p className={styles.loginSub}>
            {step === 'password' && 'Enter your password to continue'}
            {step === 'google' && 'Now sign in with Google to verify identity'}
            {step === 'waiting' && 'Waiting for trainer approval...'}
          </p>
        </div>

        {/* STEP 1 — PASSWORD */}
        {step === 'password' && (
          <>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>🔑</span>
              <input
                type="password"
                className={styles.input}
                placeholder="Access password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handlePasswordVerify()}
                autoFocus
              />
            </div>
            <button className="gold-btn" onClick={handlePasswordVerify}>
              Verify Password →
            </button>
          </>
        )}

        {/* STEP 2 — GOOGLE LOGIN */}
        {step === 'google' && (
          <>
            <div className={styles.passwordOk}>
              <span className={styles.passwordOkIcon}>✅</span>
              <span className={styles.passwordOkText}>Password verified!</span>
            </div>
            <button
              className={styles.googleBtn}
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {loading ? 'Signing in...' : 'Continue with Google'}
            </button>
          </>
        )}

        {/* STEP 3 — WAITING */}
        {step === 'waiting' && (
          <div className={styles.waitingBox}>
            <div className={styles.waitingSpinner} />
            <p className={styles.waitingText}>
              Your trainer has been notified.<br />
              You'll be let in once approved.
            </p>
            <p className={styles.waitingNote}>
              This page will update automatically when approved.
            </p>
          </div>
        )}

        {status && (
          <div className={`${styles.status} ${styles[status.type]}`}>
            {status.type === 'pending' && <span className={styles.dot} />}
            {status.msg}
          </div>
        )}

        <p className={styles.note}>🔒 Paid members only · Noob to Fit</p>
      </div>
    </div>
  )
}
