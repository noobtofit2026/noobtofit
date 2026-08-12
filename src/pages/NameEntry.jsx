import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './NameEntry.module.css'

export default function NameEntry() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('ntf_auth') === 'true') navigate('/home')
    const saved = localStorage.getItem('ntf_user_name')
    if (saved) navigate('/login')
  }, [])

  function proceed() {
    if (!name.trim()) return
    localStorage.setItem('ntf_user_name', name.trim())
    navigate('/login')
  }

  return (
    <div className={styles.page}>
      <div className={styles.heroBg} />
      <div className={styles.header}>
        <img src="/logo.png" alt="NF" className={styles.logo} />
        <span className={styles.liveTag}>
          <span className={styles.liveDot} />
          MEMBERS ONLY
        </span>
      </div>

      <div className={styles.content}>
        <div className={`${styles.eyebrow} fade-up`}>STEP 1 OF 2</div>
        <h1 className={`${styles.title} fade-up-2`}>WHAT'S YOUR NAME?</h1>
        <p className={`${styles.sub} fade-up-3`}>
          Let us know who you are before entering the program.
        </p>

        <div className={`${styles.inputWrap} fade-up-4`}>
          <span className={styles.inputIcon}>👤</span>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && proceed()}
            autoFocus
          />
        </div>

        <div className="fade-up-4">
          <button className="gold-btn" onClick={proceed} disabled={!name.trim()}>
            Continue →
          </button>
        </div>
      </div>
    </div>
  )
}