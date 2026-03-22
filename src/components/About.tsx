import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Code2, Server, Wifi, Cloud } from 'lucide-react'

const cards = [
  { icon: <Code2 size={20} color="#915EFF" />, title: 'Full-Stack Dev', sub: 'React · Next.js · Node.js' },
  { icon: <Wifi size={20} color="#00cea8" />, title: 'Real-Time Systems', sub: 'WebRTC · Socket.IO · Redis' },
  { icon: <Server size={20} color="#bf61ff" />, title: 'Backend APIs', sub: 'Express · FastAPI · JWT' },
  { icon: <Cloud size={20} color="#915EFF" />, title: 'Cloud & DevOps', sub: 'Docker · Vercel · Render' },
]

export default function About() {
  const { ref, inView } = useInView()

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: '100px 60px',
        background: '#050816',
        position: 'relative',
      }}
    >
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '20%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(145,94,255,0.05), transparent 70%)',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '16px' }}
      >
        <div className="section-eyebrow">Introduction</div>
        <h2 className="section-heading">About <span>Me</span></h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'start',
        marginTop: '40px',
      }}>
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p style={{
            fontSize: '15px',
            color: '#aaa6c3',
            lineHeight: 1.9,
            marginBottom: '20px',
            fontFamily: 'DM Sans, sans-serif',
          }}>
            I'm a B.Tech CSE student at <span style={{ color: '#f3f3f3', fontWeight: 500 }}>Lovely Professional University</span> with a deep passion for building full-stack systems that actually scale. From WebRTC-powered collaboration platforms to Next.js 15 carpooling apps, I ship production-ready software with clean architecture.
          </p>
          <p style={{
            fontSize: '15px',
            color: '#aaa6c3',
            lineHeight: 1.9,
            marginBottom: '28px',
            fontFamily: 'DM Sans, sans-serif',
          }}>
            Currently focused on placement preparation and deepening my expertise in distributed systems, backend architecture, and DSA. I believe great software is built at the intersection of clean code, solid architecture, and real-world impact.
          </p>

          {/* Micro1 badge */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              background: 'rgba(0,206,168,0.06)',
              border: '1px solid rgba(0,206,168,0.25)',
              borderRadius: '10px',
              marginBottom: '12px',
            }}
          >
            <div style={{
              width: '8px', height: '8px',
              borderRadius: '50%',
              background: '#00cea8',
              boxShadow: '0 0 8px #00cea8',
            }} />
            <span style={{ fontSize: '13px', color: '#00cea8', fontFamily: 'DM Sans, sans-serif' }}>
              Micro1 Certified — Backend JSON Schema Developer
            </span>
          </motion.div>

          <br />

          {/* LPU badge */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              background: 'rgba(145,94,255,0.06)',
              border: '1px solid rgba(145,94,255,0.25)',
              borderRadius: '10px',
            }}
          >
            <div style={{
              width: '8px', height: '8px',
              borderRadius: '50%',
              background: '#915EFF',
              boxShadow: '0 0 8px #915EFF',
            }} />
            <span style={{ fontSize: '13px', color: '#915EFF', fontFamily: 'DM Sans, sans-serif' }}>
              B.Tech CSE · Lovely Professional University
            </span>
          </motion.div>
        </motion.div>

        {/* Right — cards */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '14px',
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -4, borderColor: 'rgba(145,94,255,0.5)' }}
              style={{
                background: '#1d1836',
                border: '1px solid rgba(145,94,255,0.15)',
                borderRadius: '14px',
                padding: '22px 18px',
                cursor: 'default',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                width: '38px', height: '38px',
                background: 'rgba(145,94,255,0.1)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}>
                {card.icon}
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#f3f3f3',
                fontFamily: 'Syne, sans-serif',
                marginBottom: '4px',
              }}>
                {card.title}
              </div>
              <div style={{ fontSize: '11px', color: '#aaa6c3' }}>{card.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
