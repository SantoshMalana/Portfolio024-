import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../data'
import { Menu, X, Download } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll spy — highlight whichever section is in view
  useEffect(() => {
    const ids = ['about', 'skills', 'experience', 'projects', 'certifications', 'contact']
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 40px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(5,8,22,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '0.5px solid rgba(145,94,255,0.15)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Logo placeholder — keeps flex layout balanced */}
      <div style={{ width: '40px' }} />

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {navLinks.map((link) => (
          <motion.button
            key={link.id}
            whileHover={{ color: '#f3f3f3' }}
            onClick={() => scrollTo(link.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              color: active === link.id ? '#915EFF' : '#aaa6c3',
              fontFamily: 'DM Sans, sans-serif',
              letterSpacing: '0.3px',
              transition: 'color 0.2s',
              position: 'relative',
              padding: '4px 0',
            }}
          >
            {link.title}
            {active === link.id && (
              <motion.div
                layoutId="nav-indicator"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: '#915EFF',
                }}
              />
            )}
          </motion.button>
        ))}

        <motion.a
          href="/Santosh_Malana_Resume.pdf"
          download="Santosh_Malana_Resume.pdf"
          whileHover={{ scale: 1.05, backgroundColor: '#915EFF', color: '#fff' }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 18px',
            border: '1px solid #915EFF',
            borderRadius: '8px',
            color: '#915EFF',
            fontSize: '12px',
            fontFamily: 'DM Sans, sans-serif',
            textDecoration: 'none',
            transition: 'all 0.2s',
            background: 'transparent',
          }}
        >
          <Download size={13} />
          Resume
        </motion.a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: '#f3f3f3',
          cursor: 'pointer',
        }}
        className="mobile-menu-btn"
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              background: 'rgba(5,8,22,0.98)',
              borderBottom: '1px solid rgba(145,94,255,0.2)',
              padding: '20px 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  color: '#aaa6c3',
                  fontFamily: 'DM Sans, sans-serif',
                  textAlign: 'left',
                }}
              >
                {link.title}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
