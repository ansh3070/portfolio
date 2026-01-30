'use client'

import { useEffect, useRef } from 'react'

export default function Home() {
  const loadingScreenRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorOutlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load the script
    const script = document.createElement('script')
    script.src = '/script.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" id="cursor-dot" ref={cursorDotRef}></div>
      <div className="cursor-outline" id="cursor-outline" ref={cursorOutlineRef}></div>

      {/* Loading Screen */}
      <div className="loading-screen" id="loading-screen" ref={loadingScreenRef}>
        <div className="loading-content">
          <div className="loading-icon">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50,10 C70,25 75,40 50,50 C25,40 30,25 50,10 Z" fill="none" stroke="url(#gradient)" strokeWidth="4" />
              <path d="M50,50 C75,60 70,75 50,90 C30,75 25,60 50,50 Z" fill="none" stroke="url(#gradient)" strokeWidth="4" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 className="loading-text">Loading...</h2>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <a href="/" className="logo">ポートフォリオ</a>
            <nav className="nav-desktop">
              <a href="#" className="nav-link" data-i18n="home">Home</a>
              <a href="#skills" className="nav-link" data-i18n="about">About</a>
              <a href="#skills" className="nav-link" data-i18n="skills">Skills</a>
              <a href="#projects" className="nav-link" data-i18n="projects">Projects</a>
              <a href="#contact" className="nav-link" data-i18n="contact">Contact</a>
            </nav>
            <div className="header-actions">
              <button className="language-toggle" id="language-toggle">
                <i className="fas fa-globe"></i>
              </button>
              <button className="theme-toggle" id="theme-toggle">
                <i className="fas fa-sun"></i>
                <i className="fas fa-moon"></i>
              </button>
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
          <a href="#" className="mobile-nav-link" data-i18n="home">Home</a>
          <a href="#skills" className="mobile-nav-link" data-i18n="about">About</a>
          <a href="#skills" className="mobile-nav-link" data-i18n="skills">Skills</a>
          <a href="#projects" className="mobile-nav-link" data-i18n="projects">Projects</a>
          <a href="#contact" className="mobile-nav-link" data-i18n="contact">Contact</a>
        </div>
      </div>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="hero">
          <canvas id="sakura-canvas" className="sakura-canvas"></canvas>
          <div className="mt-fuji-background">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000162399.jpg-ppnSbpNDHlAMNsgmcszEZguR79swQT.jpeg" alt="Mount Fuji with cherry blossoms" />
            <div className="overlay"></div>
          </div>
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title"><br/><br/><br/>ポートフォリオ</h1>
                <p className="hero-subtitle">Showcasing My Digital Journey</p>
                <div className="hero-buttons">
                  <a href="#projects" className="btn btn-primary" data-i18n="viewProjects">
                    View Projects <i className="fas fa-arrow-right"></i>
                  </a>
                  <a href="#contact" className="btn btn-outline" data-i18n="contactMe">
                    Contact Me
                  </a>
                </div>
              </div>
              
              <div className="tenor-gif-embed" data-postid="21223608" data-share-method="host" data-aspect-ratio="1" data-width="30%" className="hero-image">
                <a href="https://tenor.com/view/welcome-gif-21223608">Welcome GIF</a>from <a href="https://tenor.com/search/welcome-gifs">Welcome GIFs</a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills" id="skills">
          <div className="paper-texture"></div>
          <div className="container">
            <h2 className="section-title" data-i18n="skills">
              My Skills
              <span className="title-underline"></span>
            </h2>
            <div className="skills-grid">
              <SkillCard color="pink" icon="fa-code" title="Software Development" description="I develop practical and efficient software solutions with a strong focus on logic, user needs, and clean code structure. My work often involves building systems that solve real-world problems through thoughtful design and modern programming techniques." />
              <SkillCard color="purple" icon="fa-film" title="Animation" description="I create meaningful animations that combine storytelling with technical skill. Each animation reflects careful attention to movement, timing, and emotion—skills that help me express ideas visually and connect with audiences." />
              <SkillCard color="indigo" icon="fa-laptop" title="Web Development" description="I design and build responsive, user-friendly websites using modern technologies. My goal is to create experiences that are visually appealing and technically sound, with a focus on accessibility, performance, and structure." />
              <SkillCard color="blue" icon="fa-cut" title="Editing" description="I specialize in editing videos and media content with precision and creativity. Whether for events, presentations, pramotion, advertisment or storytelling, I ensure every frame supports the message clearly and professionally." />
              <SkillCard color="cyan" icon="fa-paint-brush" title="Graphic Design" description="I design visuals for events, campaigns, and communication needs. My work combines creativity with purpose—delivering messages in a way that is both attractive and effective, whether for school functions, promotions, or digital platforms." />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects" id="projects">
          <div className="paper-texture light"></div>
          <div className="container">
            <h2 className="section-title" data-i18n="featuredProjects">
              Featured Projects
              <span className="title-underline"></span>
            </h2>
            
            <div className="projects-tabs">
              <div className="tabs-list">
                <button className="tab-button active" data-category="all">All</button>
                <button className="tab-button" data-category="software">Software</button>
                <button className="tab-button" data-category="animation">Animation</button>
                <button className="tab-button" data-category="web">Web</button>
                <button className="tab-button" data-category="design">Editing</button>
              </div>

              <div className="projects-grid">
                <ProjectCard category="web" image="/img/w2 c.jpg" title="farewell data share" description="A dedicated website to share and manage farewell event data smoothly and efficiently." link="fare.html" />
                <ProjectCard category="web" image="/img/w52 c.jpg" title="movie night together" description="An interactive website designed to organize and share movie nights with friends seamlessly" link="mo.html" />
                <ProjectCard category="web" image="/img/w6 c.jpg" title="home together" description="A fully responsive wheer couples can create there goals and get poin on completing it, use it to gift things." link="ho.html" />
                <ProjectCard category="web" image="/img/w11 c.png" title="cafe + reservation" description="A dynamic web solution for managing café reservations with a clean and intuitive interface." link="ca1.html" />
                <ProjectCard category="web" image="/img/s11.jpg" title="cafe frontend" description="cafe frontend design." link="ca2.html" />
                <ProjectCard category="web" image="/img/g111.jpg" title="arcade game shop + cafe" description="UI design for a Japanese-themed mobile arcade game shop, focusing on easy navigation and appealing aesthetics." link="ac.html" />
                <ProjectCard category="animation" image="/img/A1.png" title="car garage" description="A detailed animation showcasing a car garage environment with smooth visual storytelling." link="car.html" />
                <ProjectCard category="animation" image="/img/a2.jpg" title="cyber punk style landscape" description="An atmospheric cyberpunk-style animated landscape with vibrant colors and futuristic elements." link="cyb.html" />
                <ProjectCard category="animation" image="/img/a33.jpg" title="beach landscape" description="A relaxing beach environment animation capturing the essence of a peaceful coastal scene." link="beach.html" />
                <ProjectCard category="animation" image="/img/a22.jpg" title="abandoned city 3d enironment" description="A detailed 3D animated scene of an abandoned city, highlighting textures and mood." link="aban.html" />
                <ProjectCard category="animation" image="/img/ganesh ji.jpg" title="a robot discover an anicient cave" description="An imaginative animation telling the story of a robot exploring a mysterious ancient cave." link="robo.html" />
                <ProjectCard category="animation" image="/img/ram.jpg" title="ram" description="Animation project." link="ram.html" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact" id="contact">
          <div className="paper-texture"></div>
          <div className="container">
            <h2 className="section-title" data-i18n="getInTouch">
              Get In Touch
              <span className="title-underline"></span>
            </h2>
            <div className="contact-content">
              <div className="contact-character">
                <img id="character-image" src="https://via.placeholder.com/200" alt="Character" />
                <p id="character-text">Hello! Please fill out the form to contact me.</p>
              </div>
              <form id="contact-form" className="contact-form">
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

        {/* Music Player */}
        <div className="music-player-compact" id="music-player-toggle">
          <button className="music-player-button">
            <i className="fas fa-music"></i>
          </button>
        </div>

        <div className="music-player-expanded" id="music-player-expanded">
          <div className="music-player-header">
            <h3 className="music-player-track">Song</h3>
            <p className="music-player-artist">Artist</p>
            <button id="music-player-close">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="music-player-controls">
            <button id="music-prev-btn"><i className="fas fa-step-backward"></i></button>
            <button id="music-play-btn"><i className="fas fa-play"></i></button>
            <button id="music-next-btn"><i className="fas fa-step-forward"></i></button>
          </div>
          <div className="music-player-progress">
            <div id="music-progress-bar" className="music-progress-bar">
              <div id="music-progress-current" className="music-progress-current"></div>
            </div>
            <div className="music-player-time">
              <span id="music-current-time">0:00</span>
              <span id="music-duration">0:00</span>
            </div>
          </div>
          <div className="music-player-volume">
            <button id="music-volume-btn"><i className="fas fa-volume-up"></i></button>
            <input type="range" id="music-volume" min="0" max="1" step="0.1" defaultValue="0.5" />
          </div>
        </div>

        <audio id="audio-player"></audio>

        {/* Share Modal */}
        <div className="share-modal" id="share-modal">
          <div className="share-modal-content">
            <button id="modal-close"><i className="fas fa-times"></i></button>
            <h2>Share Portfolio</h2>
            <input type="text" id="share-url" defaultValue={typeof window !== 'undefined' ? window.location.href : ''} readOnly />
            <button id="copy-link-btn"><i className="fas fa-copy"></i> Copy Link</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; <span id="current-year">{new Date().getFullYear()}</span> Ansh Rajput. All rights reserved.</p>
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
        <span className="project-category">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <a href={link} className="project-details">View Details <i className="fas fa-arrow-up-right"></i></a>
      </div>
    </div>
  )
}
