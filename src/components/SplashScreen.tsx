import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 600)
    }, 1800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#050816',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Initials */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'backOut' }}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '72px',
              fontWeight: 800,
              color: '#f3f3f3',
              lineHeight: 1,
              letterSpacing: '-2px',
            }}
          >
            S<span style={{ color: '#915EFF' }}>M</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#00cea8',
            }}
          >
            Full-Stack Engineer
          </motion.p>

          {/* Loader bar */}
          <motion.div
            style={{
              width: '140px',
              height: '2px',
              background: 'rgba(145,94,255,0.2)',
              borderRadius: '2px',
              overflow: 'hidden',
              marginTop: '12px',
            }}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, #915EFF, #00cea8)',
                boxShadow: '0 0 8px rgba(145,94,255,0.8)',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
