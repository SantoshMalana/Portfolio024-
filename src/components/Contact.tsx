import { Suspense, lazy, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Send, Github, Linkedin, Mail, Phone } from 'lucide-react'

const Spline = lazy(() => import('@splinetool/react-spline'))

export default function Contact() {
  const { ref, inView } = useInView()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in your name, email, and message.")
      return
    }

    setSending(true)

    try {
      const response = await fetch('https://formsubmit.co/ajax/santosh24x@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || 'Portfolio Content Form',
          message: form.message
        })
      })

      if (response.ok) {
        setSent(true)
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        alert("Failed to send message. Please try again.")
      }
    } catch (err) {
      alert("An error occurred. Please check your connection.")
    } finally {
      setSending(false)
      setTimeout(() => setSent(false), 4000)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '11px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(145,94,255,0.2)',
    borderRadius: '10px',
    color: '#f3f3f3',
    fontSize: '14px',
    fontFamily: 'DM Sans, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: '100px 60px',
        background: '#151030',
        position: 'relative',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '50px' }}
      >
        <div className="section-eyebrow">Get in touch</div>
        <h2 className="section-heading">Contact <span>Me</span></h2>
      </motion.div>

      {/* Main grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: '#1d1836',
          border: '1px solid rgba(145,94,255,0.2)',
          borderRadius: '20px',
          overflow: 'hidden',
          minHeight: '520px',
        }}
      >
        {/* LEFT — Spline robot */}
        <div style={{
          background: '#151030',
          position: 'relative',
          borderRight: '1px solid rgba(145,94,255,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}>
          {/* Purple ambient glow */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 60%, rgba(145,94,255,0.08), transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Spline robot */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <Suspense fallback={
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '12px',
              }}>
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  border: '2px solid rgba(145,94,255,0.3)',
                  borderTop: '2px solid #915EFF',
                  animation: 'spin 1s linear infinite',
                }} />
                <span style={{ fontSize: '12px', color: '#aaa6c3' }}>Loading robot...</span>
              </div>
            }>
              {inView && <Spline scene="/robot.splinecode" />}
            </Suspense>
            {/* Watermark cover */}
            <div className="spline-watermark-cover-card" />
          </div>


        </div>

        {/* RIGHT — Form */}
        <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '18px' }}>
          <div>
            <h3 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '22px',
              fontWeight: 700,
              color: '#f3f3f3',
              marginBottom: '6px',
            }}>
              Let's work together
            </h3>
            <p style={{ fontSize: '13px', color: '#aaa6c3', lineHeight: 1.7 }}>
              Open to full-stack engineering roles and internships. Drop a message!
            </p>
          </div>

          {/* Name + Email row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { name: 'name', label: 'Your name', placeholder: 'John Doe', type: 'text' },
              { name: 'email', label: 'Email address', placeholder: 'john@example.com', type: 'email' },
            ].map((field) => (
              <div key={field.name}>
                <label style={{
                  fontSize: '11px',
                  color: '#aaa6c3',
                  letterSpacing: '0.5px',
                  display: 'block',
                  marginBottom: '6px',
                }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#915EFF')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(145,94,255,0.2)')}
                />
              </div>
            ))}
          </div>

          {/* Subject */}
          <div>
            <label style={{
              fontSize: '11px', color: '#aaa6c3',
              letterSpacing: '0.5px', display: 'block', marginBottom: '6px',
            }}>
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Job opportunity / Collaboration"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#915EFF')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(145,94,255,0.2)')}
            />
          </div>

          {/* Message */}
          <div>
            <label style={{
              fontSize: '11px', color: '#aaa6c3',
              letterSpacing: '0.5px', display: 'block', marginBottom: '6px',
            }}>
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Hey Santosh, I'd love to connect about..."
              rows={4}
              style={{ ...inputStyle, resize: 'none', lineHeight: 1.7 }}
              onFocus={(e) => (e.target.style.borderColor = '#915EFF')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(145,94,255,0.2)')}
            />
          </div>

          {/* Send button */}
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(145,94,255,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={sending || sent}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '13px 28px',
              background: sent ? '#00cea8' : '#915EFF',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              cursor: sending ? 'wait' : 'pointer',
              alignSelf: 'flex-start',
              transition: 'background 0.3s',
            }}
          >
            <Send size={15} />
            {sent ? 'Message Sent!' : sending ? 'Sending...' : 'Send Message'}
          </motion.button>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
            {[
              { icon: <Github size={13} />, label: 'GitHub', href: 'https://github.com/SantoshMalana', color: '#915EFF' },
              { icon: <Linkedin size={13} />, label: 'LinkedIn', href: 'https://linkedin.com/in/santosh24x', color: '#0A66C2' },
              { icon: <Mail size={13} />, label: 'Email', href: 'mailto:santosh24x@gmail.com', color: '#00cea8' },
              { icon: <Phone size={13} />, label: '+91 8144986872', href: 'tel:+918144986872', color: '#bf61ff' },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ borderColor: s.color, color: s.color }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(170,166,195,0.15)',
                  borderRadius: '6px',
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
          </div>
        </div>
      </motion.div>
    </section>
  )
}
