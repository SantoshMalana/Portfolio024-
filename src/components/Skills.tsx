import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { skills } from '../data'

export default function Skills() {
  const { ref, inView } = useInView()

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: '100px 60px',
        background: '#151030',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        right: '-100px',
        top: '50%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(145,94,255,0.04), transparent 70%)',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '50px' }}
      >
        <div className="section-eyebrow">What I work with</div>
        <h2 className="section-heading">Tech <span>Stack</span></h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
        gap: '16px',
      }}>
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{
              y: -8,
              borderColor: skill.color,
              boxShadow: `0 10px 40px ${skill.color}22`,
            }}
            style={{
              background: '#1d1836',
              border: '1px solid rgba(145,94,255,0.15)',
              borderRadius: '14px',
              padding: '20px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              cursor: 'default',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Icon circle */}
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: `${skill.color}18`,
              border: `1px solid ${skill.color}44`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Syne, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              color: skill.color,
            }}>
              {skill.abbr}
            </div>
            <span style={{
              fontSize: '12px',
              color: '#aaa6c3',
              fontFamily: 'DM Sans, sans-serif',
              textAlign: 'center',
            }}>
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Category labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          display: 'flex',
          gap: '12px',
          marginTop: '40px',
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'Languages', color: '#915EFF' },
          { label: 'Frontend', color: '#00cea8' },
          { label: 'Backend', color: '#bf61ff' },
          { label: 'Databases', color: '#915EFF' },
          { label: 'DevOps', color: '#00cea8' },
        ].map((cat) => (
          <div
            key={cat.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: `${cat.color}10`,
              border: `1px solid ${cat.color}30`,
              borderRadius: '20px',
            }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: cat.color }} />
            <span style={{ fontSize: '12px', color: cat.color, fontFamily: 'DM Sans, sans-serif' }}>{cat.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
