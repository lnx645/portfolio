import { useEffect, useRef, useState } from 'react'
import {
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaGraduationCap,
  FaCashRegister, FaServer, FaBullseye, FaTools, FaSeedling,
  FaRocket, FaEnvelope, FaMagic, FaArrowDown, FaBars, FaTimes,
} from 'react-icons/fa'
import { SiJavascript, SiMysql } from 'react-icons/si'
import Particles from './Particles'
import './App.css'

/* ---------- Hooks ---------- */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.15 }
    )
    el.querySelectorAll('.reveal').forEach((n) => obs.observe(n))
    return () => obs.disconnect()
  }, [])
  return ref
}

function useTypewriter(words) {
  const [text, setText] = useState('')
  useEffect(() => {
    let w = 0, c = 0, del = false, t
    const tick = () => {
      const word = words[w]
      c += del ? -1 : 1
      setText(word.slice(0, c))
      let speed = del ? 40 : 90
      if (!del && c === word.length) { speed = 1600; del = true }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; speed = 400 }
      t = setTimeout(tick, speed)
    }
    t = setTimeout(tick, 500)
    return () => clearTimeout(t)
  }, [])
  return text
}

/* 3D tilt wrapper */
function Tilt({ children, className = '', max = 10 }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateY(-6px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }
  return (
    <div ref={ref} className={`tilt ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  )
}

/* ---------- Data ---------- */
const stack = ['React', 'JavaScript', 'Node.js', 'Python', 'MySQL', 'Git', 'Linux', 'Docker', 'Vite', 'Express']

const skills = [
  { name: 'JavaScript', level: 85, Icon: SiJavascript, color: '#f7df1e' },
  { name: 'React', level: 80, Icon: FaReact, color: '#61dafb' },
  { name: 'Node.js', level: 75, Icon: FaNodeJs, color: '#8cc84b' },
  { name: 'Python', level: 70, Icon: FaPython, color: '#4b8bbe' },
  { name: 'MySQL', level: 78, Icon: SiMysql, color: '#f29111' },
  { name: 'Git & Linux', level: 82, Icon: FaGitAlt, color: '#f05032' },
]

const projects = [
  {
    title: 'Sistem Informasi Akademik',
    desc: 'Platform pengelolaan data mahasiswa, KRS online, dan rekap nilai dengan dashboard analitik.',
    tags: ['React', 'Node.js', 'MySQL'],
    grad: 'linear-gradient(135deg,#8b5cf6,#ec4899)',
    Icon: FaGraduationCap,
  },
  {
    title: 'Aplikasi Kasir UMKM',
    desc: 'Point of sale modern untuk usaha kecil: transaksi cepat, stok, dan laporan penjualan otomatis.',
    tags: ['React', 'Express', 'SQLite'],
    grad: 'linear-gradient(135deg,#22d3ee,#8b5cf6)',
    Icon: FaCashRegister,
  },
  {
    title: 'Server Monitor',
    desc: 'Dashboard real-time memantau CPU, RAM, dan disk banyak server dengan alert Telegram.',
    tags: ['JavaScript', 'WebSocket', 'Linux'],
    grad: 'linear-gradient(135deg,#f59e0b,#ec4899)',
    Icon: FaServer,
  },
]

const journey = [
  { year: '2023', title: 'Mulai Kuliah Informatika', desc: 'Memasuki STMIK Mardira Indonesia, jatuh cinta pada web development.' },
  { year: '2024', title: 'Fokus Full-Stack', desc: 'Mendalami React, Node.js, dan database. Mengerjakan proyek freelance pertama.' },
  { year: '2025', title: 'DevOps & Server', desc: 'Belajar Linux server administration, Docker, dan CI/CD.' },
  { year: '2026', title: 'Semester Akhir', desc: 'Menyelesaikan skripsi dan membangun portfolio profesional.' },
]

const highlights = [
  { Icon: FaBullseye, color: '#ec4899', title: 'Fokus', desc: 'Web app yang cepat & user-friendly' },
  { Icon: FaTools, color: '#8b5cf6', title: 'Tools', desc: 'React, Node.js, Docker, Linux' },
  { Icon: FaSeedling, color: '#22d3ee', title: 'Prinsip', desc: 'Clean code & continuous learning' },
]

/* ---------- Components ---------- */
function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    ['#about', 'Tentang'],
    ['#skills', 'Keahlian'],
    ['#projects', 'Proyek'],
    ['#journey', 'Perjalanan'],
  ]
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <a href="#" className="logo">DH<span>.</span></a>
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>Kontak</a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  const typed = useTypewriter(['Web Developer', 'Full-Stack Engineer', 'DevOps Enthusiast', 'Problem Solver'])
  return (
    <header className="hero">
      <div className="aurora"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
      <Particles />
      <div className="hero-content">
        <div className="hero-badge reveal"><FaMagic /> Tersedia untuk proyek freelance</div>
        <p className="hero-greet">Halo, saya</p>
        <h1>Dadan Hidayat</h1>
        <h2 className="typewriter">{typed}<span className="caret" /></h2>
        <p className="hero-desc">
          Mahasiswa Teknik Informatika yang mengubah ide menjadi aplikasi web
          yang cepat, indah, dan berdampak nyata.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary"><FaRocket /> Lihat Proyek</a>
          <a href="#contact" className="btn btn-glass">Hubungi Saya</a>
        </div>
        <div className="hero-stats">
          <div><strong>10+</strong><span>Proyek Selesai</span></div>
          <div><strong>3.71</strong><span>IPK</span></div>
          <div><strong>3+</strong><span>Tahun Coding</span></div>
        </div>
      </div>
      <a href="#about" className="scroll-hint"><FaArrowDown /></a>
    </header>
  )
}

function Marquee() {
  const items = [...stack, ...stack]
  return (
    <div className="marquee-wrap">
      <div className="marquee">
        {items.map((s, i) => <span key={i} className="marquee-item">{s}</span>)}
      </div>
    </div>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <h2 className="section-title reveal">Tentang Saya</h2>
      <div className="about-grid">
        <div className="glass-card reveal">
          <p>
            Saya <strong>Dadan Hidayat</strong>, mahasiswa semester 7 Teknik Informatika
            di STMIK Mardira Indonesia. Perjalanan coding saya dimulai dari rasa
            penasaran — sekarang menjadi passion membangun solusi digital.
          </p>
          <p>
            Spesialisasi saya adalah <strong>pengembangan web full-stack</strong>:
            dari antarmuka yang memukau hingga server yang tangguh. Saya juga
            mendalami <strong>DevOps</strong> — terbiasa mengelola VPS Linux,
            CI/CD, dan monitoring infrastruktur.
          </p>
        </div>
        <div className="about-highlights">
          {highlights.map(({ Icon, color, title, desc }) => (
            <div key={title} className="highlight reveal">
              <span className="highlight-icon" style={{ color }}><Icon /></span>
              <div><strong>{title}</strong><p>{desc}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section">
      <h2 className="section-title reveal">Keahlian Teknis</h2>
      <div className="skills-grid">
        {skills.map(({ name, level, Icon, color }) => (
          <Tilt key={name} max={7} className="reveal">
            <div className="skill-card">
              <div className="skill-icon" style={{ color }}><Icon /></div>
              <div className="skill-head"><span>{name}</span><span>{level}%</span></div>
              <div className="skill-bar"><div className="skill-fill" style={{ '--w': `${level}%` }} /></div>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="section-title reveal">Proyek Pilihan</h2>
      <div className="projects-grid">
        {projects.map(({ title, desc, tags, grad, Icon }) => (
          <Tilt key={title} className="reveal">
            <article className="project-card">
              <div className="project-cover" style={{ background: grad }}>
                <span className="project-icon"><Icon /></span>
                <div className="project-shine" />
              </div>
              <div className="project-body">
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="tags">{tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            </article>
          </Tilt>
        ))}
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section id="journey" className="section">
      <h2 className="section-title reveal">Perjalanan Saya</h2>
      <div className="timeline">
        {journey.map((j) => (
          <div key={j.year} className="timeline-item reveal">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <span className="timeline-year">{j.year}</span>
              <h3>{j.title}</h3>
              <p>{j.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="contact-card reveal">
        <h2>Punya ide proyek? <FaRocket className="inline-icon" /></h2>
        <p>Mari wujudkan bersama. Saya selalu terbuka untuk kolaborasi, freelance, atau sekadar diskusi teknologi.</p>
        <a href="mailto:hello@dadan.dev" className="btn btn-primary btn-lg"><FaEnvelope /> Kirim Email</a>
      </div>
    </section>
  )
}

export default function App() {
  const ref = useReveal()
  return (
    <div ref={ref}>
      <Navbar />
      <Hero />
      <Marquee />
      <main className="container">
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <footer className="footer">
        <p>© 2026 Dadan Hidayat · Dibangun dengan <FaReact className="inline-icon" /> React + Vite · Dihosting di VPS pribadi</p>
      </footer>
    </div>
  )
}
