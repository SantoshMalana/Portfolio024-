import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const roles = [
  'Full Stack Developer',
  'Backend Engineer',
  'WebRTC Builder',
  'WebSockets Architect',
  'JSON Schema Designer',
  'Cloud-Native Developer',
  'API Craftsman',
]

export default function Hero() {
  const starsRef = useRef<HTMLDivElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!starsRef.current) return
    const container = starsRef.current
    for (let i = 0; i < 120; i++) {
      const star = document.createElement('div')
      const size = Math.random() * 2 + 0.5
      star.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        background:white;border-radius:50%;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        animation:twinkle ${2 + Math.random() * 4}s infinite;
        animation-delay:${Math.random() * 4}s;
        opacity:0.3;
      `
      container.appendChild(star)
    }
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#050816',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: '80px',
      }}
    >
      {/* Stars */}
      <div ref={starsRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Spline — full background, boosted opacity */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: 1,
          transform: 'scale(1.55) translateX(12%)',
          transformOrigin: 'center center',
        }}
      >
        <Suspense fallback={
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 70% 40%, rgba(145,94,255,0.18), transparent 60%)',
          }} />
        }>
          <Spline scene="/boxes.splinecode" />
        </Suspense>
        {/* Watermark cover */}
        <div className="spline-watermark-cover" />
      </div>

      {/* Gradient overlay — left side darker so text is readable */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        background: 'linear-gradient(90deg, rgba(5,8,22,0.97) 0%, rgba(5,8,22,0.80) 42%, rgba(5,8,22,0.05) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '160px',
        zIndex: 2,
        background: 'linear-gradient(to top, #050816, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{
          position: 'relative',
          zIndex: 3,
          padding: '0 60px',
          maxWidth: '760px',
        }}
      >
        {/* Greeting */}
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: '18px',
            color: '#aaa6c3',
            fontFamily: 'DM Sans, sans-serif',
            marginBottom: '4px',
            fontWeight: 400,
          }}
        >
          Hi, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(52px, 8vw, 90px)',
            fontWeight: 800,
            lineHeight: 1.0,
            color: '#f3f3f3',
            marginBottom: '14px',
          }}
        >
          <span style={{ color: '#915EFF' }}>Santosh</span>{' '}
          Malana.
        </motion.h1>

        {/* Animated role badge */}
        <motion.div
          variants={fadeUp}
          style={{
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            height: '28px',
          }}
        >
          <span style={{ width: '28px', height: '1px', background: '#00cea8', display: 'inline-block', flexShrink: 0 }} />
          <div style={{ overflow: 'hidden', height: '28px', position: 'relative', minWidth: '280px' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{
                  fontSize: '13px',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  color: '#00cea8',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 600,
                  position: 'absolute',
                  whiteSpace: 'nowrap',
                }}
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.p
          variants={fadeUp}
          style={{
            fontSize: '16px',
            color: '#aaa6c3',
            lineHeight: 1.8,
            maxWidth: '460px',
            marginBottom: '32px',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          I build <span style={{ color: '#00cea8', fontWeight: 500 }}>scalable web systems</span> — real-time collaboration
          platforms, carpooling apps &amp; financial tools that handle thousands of users.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          style={{ display: 'flex', gap: '14px', marginBottom: '40px', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(145,94,255,0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '13px 30px',
              background: '#915EFF',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              cursor: 'pointer',
              letterSpacing: '0.3px',
            }}
          >
            View Projects
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, borderColor: '#915EFF', color: '#915EFF' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '13px 30px',
              background: 'transparent',
              color: '#f3f3f3',
              border: '1px solid rgba(145,94,255,0.4)',
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: 'DM Sans, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} style={{ display: 'flex', gap: '36px', marginBottom: '40px' }}>
          {[
            { num: '8+', label: 'Projects' },
            { num: '5+', label: 'Certifications' },
            { num: '3', label: 'Live Deploys' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '26px', fontWeight: 700, color: '#915EFF' }}>{s.num}</div>
              <div style={{ fontSize: '12px', color: '#aaa6c3', letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div variants={fadeUp} style={{ display: 'flex', gap: '14px' }}>
          {[
            { icon: <Github size={16} />, href: 'https://github.com/SantoshMalana', label: 'GitHub' },
            { icon: <Linkedin size={16} />, href: 'https://linkedin.com/in/santosh24x', label: 'LinkedIn' },
            { icon: <Mail size={16} />, href: 'mailto:santosh24x@gmail.com', label: 'Email' },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1, borderColor: '#915EFF', color: '#915EFF' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                border: '1px solid rgba(170,166,195,0.2)',
                borderRadius: '8px',
                color: '#aaa6c3',
                fontSize: '12px',
                textDecoration: 'none',
                fontFamily: 'DM Sans, sans-serif',
                transition: 'all 0.2s',
              }}
            >
              {s.icon}
              {s.label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToAbout}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: '#aaa6c3',
        }}
      >
        <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} color="#915EFF" />
        </motion.div>
      </motion.button>
    </section>
  )
}
