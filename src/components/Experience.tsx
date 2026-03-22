import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { experiences } from '../data'

export default function Experience() {
  const { ref, inView } = useInView()

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: '100px 60px',
        background: '#050816',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '30%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(145,94,255,0.04), transparent 70%)',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '60px' }}
      >
        <div className="section-eyebrow">What I've done</div>
        <h2 className="section-heading">Experience & <span>Achievements</span></h2>
      </motion.div>

      {/* Timeline */}
      <div style={{ position: 'relative', maxWidth: '760px' }}>
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            position: 'absolute',
            left: '18px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, #915EFF, #00cea8, rgba(145,94,255,0.1))',
            transformOrigin: 'top',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              style={{
                display: 'flex',
                gap: '28px',
                alignItems: 'flex-start',
                paddingLeft: '0',
              }}
            >
              {/* Dot */}
              <div style={{ position: 'relative', flexShrink: 0, paddingTop: '4px' }}>
                <motion.div
                  whileInView={{ scale: [0, 1.3, 1] }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: `${exp.color}18`,
                    border: `2px solid ${exp.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    position: 'relative',
                  }}
                >
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: exp.color,
                    boxShadow: `0 0 10px ${exp.color}`,
                  }} />
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                whileHover={{ x: 4 }}
                style={{
                  background: '#1d1836',
                  border: '1px solid rgba(145,94,255,0.15)',
                  borderRadius: '14px',
                  padding: '22px 24px',
                  flex: 1,
                  transition: 'border-color 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = exp.color + '60')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(145,94,255,0.15)')}
              >
                <div style={{
                  fontSize: '11px',
                  color: exp.color,
                  letterSpacing: '1px',
                  marginBottom: '6px',
                  fontFamily: 'DM Sans, sans-serif',
                  textTransform: 'uppercase',
                }}>
                  {exp.date}
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#f3f3f3',
                  fontFamily: 'Syne, sans-serif',
                  marginBottom: '4px',
                }}>
                  {exp.title}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: exp.color,
                  marginBottom: '10px',
                  fontFamily: 'DM Sans, sans-serif',
                }}>
                  {exp.company}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#aaa6c3',
                  lineHeight: 1.7,
                  fontFamily: 'DM Sans, sans-serif',
                }}>
                  {exp.desc}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
