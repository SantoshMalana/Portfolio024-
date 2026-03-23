import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { certifications } from '../data'
import { Award } from 'lucide-react'

export default function Certifications() {
  const { ref, inView } = useInView()

  return (
    <section
      id="certifications"
      ref={ref}
      style={{
        padding: '100px 60px',
        background: '#050816',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute',
        right: '10%',
        top: '50%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0,206,168,0.04), transparent 70%)',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '50px' }}
      >
        <div className="section-eyebrow">Credentials</div>
        <h2 className="section-heading">Certifications & <span>Badges</span></h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '20px',
      }}>
        {certifications.map((cert, i) => {
          const CardTag = cert.link ? motion.a : motion.div
          const linkProps = cert.link ? { href: cert.link, target: '_blank', rel: 'noreferrer' } : {}

          return (
            <CardTag
              key={cert.title}
              {...linkProps}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{
                y: -6,
                borderColor: cert.color + '60',
                boxShadow: `0 16px 50px ${cert.color}15`,
              }}
              style={{
                textDecoration: 'none',
                background: '#1d1836',
                border: '1px solid rgba(145,94,255,0.15)',
                borderRadius: '16px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                cursor: cert.link ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${cert.color}, transparent)`,
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {/* Badge */}
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: cert.bg,
                  border: `1px solid ${cert.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '16px',
                  fontWeight: 800,
                  color: cert.color,
                }}>
                  {cert.abbr}
                </div>

                {cert.link && (
                  <div style={{ color: 'rgba(170,166,195,0.4)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                )}
              </div>

              <div>
                <div style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#f3f3f3',
                  fontFamily: 'Syne, sans-serif',
                  lineHeight: 1.4,
                  marginBottom: '6px',
                }}>
                  {cert.title}
                </div>
                <div style={{ fontSize: '12px', color: cert.color, marginBottom: '4px' }}>
                  {cert.issuer}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '11px',
                  color: '#aaa6c3',
                }}>
                  <Award size={11} />
                  {cert.date}
                </div>
              </div>
            </CardTag>
          )
        })}
      </div>

      {/* Education card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          marginTop: '40px',
          background: '#1d1836',
          border: '1px solid rgba(145,94,255,0.15)',
          borderRadius: '16px',
          padding: '28px 32px',
        }}
      >
        <div style={{
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#aaa6c3',
          marginBottom: '16px',
        }}>
          Education
        </div>
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {[
            {
              school: 'Lovely Professional University',
              degree: 'B.Tech — Computer Science & Engineering',
              grade: 'CGPA: 6.6',
              period: '2023 – Present',
              location: 'Phagwara, Punjab',
            },
            {
              school: 'Narayana Junior College',
              degree: 'Intermediate (PCM)',
              grade: '81%',
              period: '2022 – 2023',
              location: 'Bobbili, Andhra Pradesh',
            },
            {
              school: 'Bhashyam High School',
              degree: 'Matriculation',
              grade: '100%',
              period: '2020 – 2021',
              location: 'Salur, Andhra Pradesh',
            },
          ].map((edu) => (
            <div key={edu.school} style={{ flex: 1, minWidth: '200px' }}>
              <div style={{
                fontSize: '15px',
                fontWeight: 600,
                color: '#f3f3f3',
                fontFamily: 'Syne, sans-serif',
                marginBottom: '4px',
              }}>
                {edu.school}
              </div>
              <div style={{ fontSize: '13px', color: '#aaa6c3', marginBottom: '4px' }}>{edu.degree}</div>
              <div style={{ fontSize: '12px', color: '#915EFF' }}>{edu.grade} · {edu.period}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
