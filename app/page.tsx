'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Hide loading screen after content loads
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      <div className="cursor-dot" id="cursor-dot"></div>
      <div className="cursor-outline" id="cursor-outline"></div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">Portfolio</div>
            <nav className="nav-desktop">
              <a href="#home" className="nav-link">Home</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#skills" className="nav-link">Skills</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#contact" className="nav-link">Contact</a>
            </nav>
            <div className="header-actions">
              <button className="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
                <i className="fas fa-moon"></i>
              </button>
              <button className="menu-toggle" id="menu-toggle" aria-label="Toggle menu">
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className="mobile-menu" id="mobile-menu">
        <a href="#home" className="mobile-nav-link">Home</a>
        <a href="#about" className="mobile-nav-link">About</a>
        <a href="#skills" className="mobile-nav-link">Skills</a>
        <a href="#projects" className="mobile-nav-link">Projects</a>
        <a href="#contact" className="mobile-nav-link">Contact</a>
      </div>

      <main>
        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-content">
            <h1 className="hero-title">ANSH RAJPUT</h1>
            <p className="hero-subtitle">Creative Developer & Designer</p>
            <p className="hero-description">Building beautiful digital experiences through code, animation, and design</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-outline">Get in Touch</a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about" id="about">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div className="about-content">
              <div className="about-text">
                <p>I'm a passionate developer and designer focused on creating meaningful digital experiences. With expertise in web development, animation, and graphic design, I bring ideas to life with precision and creativity.</p>
                <p>I believe in combining technical excellence with beautiful design to create solutions that not only work well but feel great to use.</p>
              </div>
              <div className="about-stats">
                <div className="stat">
                  <h3>50+</h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat">
                  <h3>100%</h3>
                  <p>Client Satisfaction</p>
                </div>
                <div className="stat">
                  <h3>5+</h3>
                  <p>Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills" id="skills">
          <div className="container">
            <h2 className="section-title">My Skills</h2>
            <div className="skills-grid">
              <SkillCard icon="fa-code" title="Web Development" description="React, Next.js, TypeScript, Tailwind CSS" />
              <SkillCard icon="fa-palette" title="UI/UX Design" description="Figma, Adobe XD, Design Systems" />
              <SkillCard icon="fa-film" title="Animation" description="Three.js, Framer Motion, WebGL" />
              <SkillCard icon="fa-pencil-ruler" title="Graphic Design" description="Branding, Illustrations, Motion Graphics" />
              <SkillCard icon="fa-server" title="Backend" description="Node.js, Express, MongoDB, PostgreSQL" />
              <SkillCard icon="fa-video" title="Video Editing" description="Premiere Pro, After Effects, DaVinci" />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects" id="projects">
          <div className="container">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-grid">
              <ProjectCard
                title="Farewell Data Share"
                description="Web platform for sharing and managing farewell event data"
                category="Web"
                image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop"
              />
              <ProjectCard
                title="Movie Night Together"
                description="Interactive platform to organize and share movie nights"
                category="Web"
                image="https://images.unsplash.com/photo-1533928298208-27ff66555d0d?w=400&h=300&fit=crop"
              />
              <ProjectCard
                title="Home Together"
                description="Couples goal tracking and achievement app with rewards"
                category="Web"
                image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
              />
              <ProjectCard
                title="Cafe + Reservation"
                description="Dynamic café reservation management system"
                category="Web"
                image="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop"
              />
              <ProjectCard
                title="Arcade Game Shop UI"
                description="Japanese-themed arcade and café UI design"
                category="Design"
                image="https://images.unsplash.com/photo-1538481143235-c8f86291821f?w=400&h=300&fit=crop"
              />
              <ProjectCard
                title="3D Environments"
                description="Collection of immersive 3D animated scenes"
                category="Animation"
                image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact" id="contact">
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <div className="contact-wrapper">
              <div className="contact-info">
                <h3>Let's connect</h3>
                <p>I'm always interested in hearing about new projects and opportunities.</p>
                <div className="contact-details">
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <p>your.email@example.com</p>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <p>+1 (555) 123-4567</p>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <p>Your Location</p>
                  </div>
                </div>
                <div className="social-links">
                  <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                  <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
                  <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Ansh Rajput. All rights reserved.</p>
        </div>
      </footer>

      <CursorScript />
      <ThemeScript />
    </>
  )
}

function LoadingScreen() {
  return (
    <div className="loading-screen" id="loading-screen">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <h2>Welcome</h2>
        <p>Loading your portfolio...</p>
      </div>
    </div>
  )
}

function SkillCard({ icon, title, description }: any) {
  return (
    <div className="skill-card">
      <div className="skill-icon">
        <i className={`fas ${icon}`}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function ProjectCard({ title, description, category, image }: any) {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={image} alt={title} loading="lazy" />
        <div className="project-overlay">
          <span className="project-category">{category}</span>
        </div>
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href="#" className="project-link">View Project →</a>
      </div>
    </div>
  )
}

function CursorScript() {
  useEffect(() => {
    const cursorDot = document.getElementById('cursor-dot')
    const cursorOutline = document.getElementById('cursor-outline')

    if (!cursorDot || !cursorOutline) return

    const updateCursor = (e: MouseEvent) => {
      cursorDot.style.left = `${e.clientX}px`
      cursorDot.style.top = `${e.clientY}px`
      cursorOutline.style.left = `${e.clientX}px`
      cursorOutline.style.top = `${e.clientY}px`
    }

    document.addEventListener('mousemove', updateCursor)

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('active')
      })
      el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('active')
      })
    })

    return () => {
      document.removeEventListener('mousemove', updateCursor)
    }
  }, [])

  return null
}

function ThemeScript() {
  useEffect(() => {
    const themeToggle = document.getElementById('theme-toggle')
    const menuToggle = document.getElementById('menu-toggle')
    const mobileMenu = document.getElementById('mobile-menu')

    const getThemePreference = () => {
      const saved = localStorage.getItem('theme')
      if (saved) return saved
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const applyTheme = (theme: string) => {
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
      localStorage.setItem('theme', theme)
    }

    // Initialize theme
    applyTheme(getThemePreference())

    // Theme toggle
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const current = localStorage.getItem('theme') || 'light'
        const next = current === 'dark' ? 'light' : 'dark'
        applyTheme(next)
      })
    }

    // Mobile menu toggle
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active')
      })

      const links = mobileMenu.querySelectorAll('a')
      links.forEach((link) => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('active')
        })
      })
    }

    return () => {
      if (themeToggle) themeToggle.removeEventListener('click', () => {})
      if (menuToggle) menuToggle.removeEventListener('click', () => {})
    }
  }, [])

  return null
}
