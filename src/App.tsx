import { useState } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

import ScrollProgress from './components/ScrollProgress'
import SplashScreen from './components/SplashScreen'
import BackToTop from './components/BackToTop'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>

      <ScrollProgress />
      <BackToTop />
      <SplashScreen onDone={() => setReady(true)} />

      <div
        style={{
          background: '#050816',
          minHeight: '100vh',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
