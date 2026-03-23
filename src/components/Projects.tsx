import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { projects } from '../data'
import { Github, ExternalLink } from 'lucide-react'

function ProjectCard({ project, index, inView }: { project: typeof projects[0], index: number, inView: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientY - rect.top - rect.height / 2) / rect.height * 10
    const y = -(e.clientX - rect.left - rect.width / 2) / rect.width * 10
    setTilt({ x, y })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      style={{
        background: '#1d1836',
        border: `1px solid ${hovered ? project.color + '50' : 'rgba(145,94,255,0.15)'}`,
        borderRadius: '18px',
        overflow: 'hidden',
        cursor: 'default',
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: hovered ? 'border-color 0.3s, box-shadow 0.3s' : 'all 0.5s ease',
        boxShadow: hovered ? `0 20px 60px ${project.color}20` : 'none',
      }}
    >
      {/* Top color bar */}
      <div style={{
        height: '4px',
        background: `linear-gradient(90deg, ${project.color}, ${project.color}44)`,
      }} />

      {/* Image area */}
      <div style={{
        height: '140px',
        background: `linear-gradient(135deg, #151030, ${project.color}12)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <>
            {/* Geometric decoration */}
            <div style={{
              position: 'absolute',
              right: '-20px',
              top: '-20px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: `1px solid ${project.color}20`,
            }} />
            <div style={{
              position: 'absolute',
              right: '10px',
              top: '10px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: `1px solid ${project.color}15`,
            }} />
            <span style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '32px',
              fontWeight: 800,
              color: `${project.color}20`,
              letterSpacing: '-1px',
            }}>
              {project.name.slice(0, 2).toUpperCase()}
            </span>
          </>
        )}
        {project.featured && !project.image && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            fontSize: '10px',
            padding: '3px 10px',
            background: `${project.color}20`,
            border: `1px solid ${project.color}40`,
            borderRadius: '20px',
            color: project.color,
            fontFamily: 'DM Sans, sans-serif',
            letterSpacing: '1px',
          }}>
            Featured
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '20px' }}>
        <h3 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '17px',
          fontWeight: 700,
          color: '#f3f3f3',
          marginBottom: '8px',
        }}>
          {project.name}
        </h3>
        <p style={{
          fontSize: '13px',
          color: '#aaa6c3',
          lineHeight: 1.7,
          marginBottom: '14px',
          fontFamily: 'DM Sans, sans-serif',
        }}>
          {project.desc}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
          {project.tags.length > 4 && (
            <span className="tag-pill">+{project.tags.length - 4}</span>
          )}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ color: '#f3f3f3', borderColor: project.color }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 14px',
              border: '1px solid rgba(170,166,195,0.2)',
              borderRadius: '6px',
              color: '#aaa6c3',
              fontSize: '12px',
              textDecoration: 'none',
              fontFamily: 'DM Sans, sans-serif',
              transition: 'all 0.2s',
            }}
          >
            <Github size={13} /> GitHub
          </motion.a>
          {project.live && project.live !== '#' && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              whileHover={{ color: '#f3f3f3', borderColor: project.color }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 14px',
                border: '1px solid rgba(170,166,195,0.2)',
                borderRadius: '6px',
                color: '#aaa6c3',
                fontSize: '12px',
                textDecoration: 'none',
                fontFamily: 'DM Sans, sans-serif',
                transition: 'all 0.2s',
              }}
            >
              <ExternalLink size={13} /> Live
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView()
  const [filter, setFilter] = useState<'all' | 'featured'>('all')

  const filtered = filter === 'featured'
    ? projects.filter((p) => p.featured)
    : projects

  return (
    <section
      id="projects"
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
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '48px',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <div className="section-eyebrow">What I've built</div>
          <h2 className="section-heading">My <span>Projects</span></h2>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {(['all', 'featured'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 20px',
                background: filter === f ? '#915EFF' : 'transparent',
                border: `1px solid ${filter === f ? '#915EFF' : 'rgba(145,94,255,0.3)'}`,
                borderRadius: '20px',
                color: filter === f ? '#fff' : '#aaa6c3',
                fontSize: '12px',
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {filtered.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} inView={inView} />
        ))}
      </div>
    </section>
  )
}
