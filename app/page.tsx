'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import '../app/styles.css'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    const menuToggle = document.getElementById('menu-toggle')
    const mobileMenu = document.getElementById('mobile-menu')
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active')
      })
    }
  }, [])

  return (
    <>
      {/* Loading Screen */}
      <div className={`loading-screen ${isLoaded ? 'hidden' : ''}`} id="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Loading...</h2>
          <p>Showcasing My Digital Journey</p>
        </div>
      </div>

      {/* Header with Transparent Nav */}
      <header className="header transparent-header">
        <div className="container">
          <div className="header-content">
            <a href="/" className="logo">ポートフォリオ</a>
            <nav className="nav-desktop">
              <a href="#home" className="nav-link">Home</a>
              <a href="#skills" className="nav-link">Skills</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#contact" className="nav-link">Contact</a>
            </nav>
            <div className="header-actions">
              <button className="theme-toggle" id="theme-toggle">
                <i className="fas fa-sun"></i>
                <i className="fas fa-moon"></i>
              </button>
              <Link href="/admin" className="btn-admin">
                <i className="fas fa-lock"></i> Admin
              </Link>
              <button className="menu-toggle" id="menu-toggle">
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className="mobile-menu" id="mobile-menu">
        <div className="mobile-menu-content">
          <a href="#home" className="mobile-nav-link">Home</a>
          <a href="#skills" className="mobile-nav-link">Skills</a>
          <a href="#projects" className="mobile-nav-link">Projects</a>
          <a href="#contact" className="mobile-nav-link">Contact</a>
          <Link href="/admin" className="mobile-nav-link">Admin</Link>
        </div>
      </div>

      <main>
        {/* Hero Section - RESTORED WITH FUJI IMAGE & GIF */}
        <section className="hero" id="home">
          <div className="mt-fuji-background">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000162399.jpg-ppnSbpNDHlAMNsgmcszEZguR79swQT.jpeg" alt="Mount Fuji with cherry blossoms" />
            <div className="overlay"></div>
          </div>
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">ポートフォリオ</h1>
                <p className="hero-subtitle">Showcasing My Digital Journey</p>
                <div className="hero-buttons">
                  <a href="#projects" className="btn btn-primary">
                    View Projects <i className="fas fa-arrow-right"></i>
                  </a>
                  <a href="#contact" className="btn btn-outline">
                    Contact Me
                  </a>
                </div>
              </div>
              
              {/* GIF Embed */}
              <div className="hero-image">
                <div className="tenor-gif-embed" data-postid="21223608" data-share-method="host" data-aspect-ratio="1" data-width="100%">
                  <a href="https://tenor.com/view/welcome-gif-21223608">Welcome GIF</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills" id="skills">
          <div className="container">
            <h2 className="section-title">
              My Skills
              <span className="title-underline"></span>
            </h2>
            <div className="skills-grid">
              <SkillCard color="pink" icon="fa-code" title="Software Development" description="I develop practical and efficient software solutions with a strong focus on logic, user needs, and clean code structure." />
              <SkillCard color="purple" icon="fa-film" title="Animation" description="I create meaningful animations that combine storytelling with technical skill. Each animation reflects careful attention to movement, timing, and emotion." />
              <SkillCard color="indigo" icon="fa-laptop" title="Web Development" description="I design and build responsive, user-friendly websites using modern technologies with a focus on accessibility and performance." />
              <SkillCard color="blue" icon="fa-cut" title="Editing" description="I specialize in editing videos and media content with precision and creativity for events, presentations, and storytelling." />
              <SkillCard color="cyan" icon="fa-paint-brush" title="Graphic Design" description="I design visuals for events, campaigns, and communication needs combining creativity with purpose." />
            </div>
          </div>
        </section>

        {/* Projects Section - Dynamic from Database */}
        <section className="projects" id="projects">
          <div className="container">
            <h2 className="section-title">
              Featured Projects
              <span className="title-underline"></span>
            </h2>
            
            <div className="projects-tabs">
              <div className="tabs-list">
                <button className="tab-button active" data-category="all">All</button>
                <button className="tab-button" data-category="web">Web</button>
                <button className="tab-button" data-category="animation">Animation</button>
                <button className="tab-button" data-category="design">Design</button>
              </div>

              <div className="projects-grid" id="projects-grid">
                <ProjectCard category="web" image="/img/w2 c.jpg" title="Farewell Data Share" description="A dedicated website to share and manage farewell event data smoothly and efficiently." link="/projects/farewell" />
                <ProjectCard category="web" image="/img/w52 c.jpg" title="Movie Night Together" description="An interactive website designed to organize and share movie nights with friends seamlessly" link="/projects/movie" />
                <ProjectCard category="web" image="/img/w6 c.jpg" title="Home Together" description="A fully responsive app where couples can create goals and earn points on completing them." link="/projects/home" />
                <ProjectCard category="web" image="/img/w11 c.png" title="Cafe + Reservation" description="A dynamic web solution for managing café reservations with a clean and intuitive interface." link="/projects/cafe" />
                <ProjectCard category="animation" image="/img/A1.png" title="Car Garage" description="A detailed animation showcasing a car garage environment with smooth visual storytelling." link="/projects/car" />
                <ProjectCard category="animation" image="/img/a2.jpg" title="Cyber Punk Landscape" description="An atmospheric cyberpunk-style animated landscape with vibrant colors and futuristic elements." link="/projects/cyber" />
                <ProjectCard category="animation" image="/img/a33.jpg" title="Beach Landscape" description="A relaxing beach environment animation capturing the essence of a peaceful coastal scene." link="/projects/beach" />
                <ProjectCard category="animation" image="/img/a22.jpg" title="Abandoned City 3D" description="A detailed 3D animated scene of an abandoned city highlighting textures and mood." link="/projects/city" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact" id="contact">
          <div className="container">
            <h2 className="section-title">
              Get In Touch
              <span className="title-underline"></span>
            </h2>
            <div className="contact-content">
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
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

        {/* Music Player */}
        <div className="music-player-compact" id="music-player-toggle">
          <button className="music-player-button">
            <i className="fas fa-music"></i>
          </button>
        </div>

        <div className="music-player-expanded" id="music-player-expanded">
          <div className="music-player-header">
            <h3 className="music-player-track">Now Playing</h3>
            <p className="music-player-artist">Your Playlist</p>
            <button id="music-player-close">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="music-player-controls">
            <button id="music-prev-btn"><i className="fas fa-step-backward"></i></button>
            <button id="music-play-btn"><i className="fas fa-play"></i></button>
            <button id="music-next-btn"><i className="fas fa-step-forward"></i></button>
          </div>
          <audio id="audio-player"></audio>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Ansh Rajput. All rights reserved.</p>
        </div>
      </footer>

      <script src="https://tenor.com/embed.js" async></script>
    </>
  )
}

function SkillCard({ color, icon, title, description }: any) {
  return (
    <a href="#projects" className="skill-card" data-color={color}>
      <div className="skill-card-header"></div>
      <div className="skill-card-content">
        <div className="skill-icon">
          <i className={`fas ${icon}`}></i>
        </div>
        <h3 className="skill-title">{title}</h3>
        <p className="skill-description">{description}</p>
        <div className="skill-footer">
          <i className="fas fa-arrow-right skill-arrow"></i>
        </div>
      </div>
    </a>
  )
}

function ProjectCard({ category, image, title, description, link }: any) {
  return (
    <div className="project-card" data-category={category}>
      <div className="project-image">
        <img src={image} alt={title} />
        <div className="project-overlay">
          <a href={link} className="project-link">View Project <i className="fas fa-arrow-up-right"></i></a>
        </div>
      </div>
      <div className="project-content">
        <span className="project-category">{category}</span>
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <a href={link} className="project-details">View Details <i className="fas fa-arrow-up-right"></i></a>
      </div>
    </div>
  )
}
