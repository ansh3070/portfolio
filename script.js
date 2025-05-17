// DOM Elements
const body = document.body
const cursorDot = document.getElementById("cursor-dot")
const cursorOutline = document.getElementById("cursor-outline")
const loadingScreen = document.getElementById("loading-screen")
const themeToggle = document.getElementById("theme-toggle")
const menuToggle = document.getElementById("menu-toggle")
const mobileMenu = document.getElementById("mobile-menu")
const languageToggle = document.getElementById("language-toggle")
const sakuraCanvas = document.getElementById("sakura-canvas")
const projectCards = document.querySelectorAll(".project-card")
const tabButtons = document.querySelectorAll(".tab-button")
const contactForm = document.getElementById("contact-form")
const characterImage = document.getElementById("character-image")
const characterText = document.getElementById("character-text")
const musicPlayerToggle = document.getElementById("music-player-toggle")
const musicPlayerExpanded = document.getElementById("music-player-expanded")
const musicPlayerClose = document.getElementById("music-player-close")
const audioPlayer = document.getElementById("audio-player")
const musicPlayBtn = document.getElementById("music-play-btn")
const musicProgressBar = document.getElementById("music-progress-bar")
const musicProgressCurrent = document.getElementById("music-progress-current")
const musicCurrentTime = document.getElementById("music-current-time")
const musicDuration = document.getElementById("music-duration")
const musicVolume = document.getElementById("music-volume")
const musicVolumeBtn = document.getElementById("music-volume-btn")
const musicPrevBtn = document.getElementById("music-prev-btn")
const musicNextBtn = document.getElementById("music-next-btn")
const shareButton = document.getElementById("share-button")
const shareModal = document.getElementById("share-modal")
const modalClose = document.getElementById("modal-close")
const copyLinkBtn = document.getElementById("copy-link-btn")
const currentYearSpan = document.getElementById("current-year")

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear()

// Check for saved theme preference or use system preference
const getThemePreference = () => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    return savedTheme
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

// Apply theme
const applyTheme = (theme) => {
  if (theme === "dark") {
    body.classList.add("dark")
  } else {
    body.classList.remove("dark")
  }
  localStorage.setItem("theme", theme)
}

// Initialize theme
applyTheme(getThemePreference())

// Custom Cursor
const updateCursor = (e) => {
  const posX = e.clientX
  const posY = e.clientY

  cursorDot.style.left = `${posX}px`
  cursorDot.style.top = `${posY}px`

  cursorOutline.style.left = `${posX}px`
  cursorOutline.style.top = `${posY}px`
}

const hideCursor = () => {
  cursorDot.style.opacity = "0"
  cursorOutline.style.opacity = "0"
}

const showCursor = () => {
  cursorDot.style.opacity = "1"
  cursorOutline.style.opacity = "1"
}

const enlargeCursor = () => {
  cursorOutline.style.width = "60px"
  cursorOutline.style.height = "60px"
}

const resetCursor = () => {
  cursorOutline.style.width = "40px"
  cursorOutline.style.height = "40px"
}

document.addEventListener("mousemove", updateCursor)
document.addEventListener("mouseenter", showCursor)
document.addEventListener("mouseleave", hideCursor)

// Add cursor effects to interactive elements
const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]')
interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", enlargeCursor)
  element.addEventListener("mouseleave", resetCursor)
})

// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 2000)
})

// Theme Toggle
themeToggle.addEventListener("click", () => {
  const currentTheme = body.classList.contains("dark") ? "dark" : "light"
  const newTheme = currentTheme === "dark" ? "light" : "dark"
  applyTheme(newTheme)
})

// Mobile Menu Toggle
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("open")
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target) && mobileMenu.classList.contains("open")) {
    mobileMenu.classList.remove("open")
  }
})

// Language Toggle
const translations = {
  en: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    blog: "Blog",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
    featuredProjects: "Featured Projects",
    getInTouch: "Get In Touch",
  },
  ja: {
    home: "ホーム",
    about: "について",
    skills: "スキル",
    projects: "プロジェクト",
    contact: "お問い合わせ",
    blog: "ブログ",
    viewProjects: "プロジェクトを見る",
    contactMe: "お問い合わせ",
    featuredProjects: "注目のプロジェクト",
    getInTouch: "お問い合わせ",
  },
}

let currentLanguage = "en"

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "ja" : "en"
  updateLanguage()
})

const updateLanguage = () => {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n")
    if (translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key]
    }
  })
}

// Sakura Background Animation
if (sakuraCanvas) {
  const ctx = sakuraCanvas.getContext("2d")
  let petals = []
  let animationFrame

  const resizeCanvas = () => {
    sakuraCanvas.width = window.innerWidth
    sakuraCanvas.height = window.innerHeight
  }

  class Petal {
    constructor() {
      this.x = Math.random() * sakuraCanvas.width
      this.y = Math.random() * sakuraCanvas.height - sakuraCanvas.height
      this.size = Math.random() * 5 + 3
      this.speedX = Math.random() * 2 - 1
      this.speedY = Math.random() * 1 + 0.5
      this.rotation = Math.random() * 360
      this.rotationSpeed = Math.random() * 2 - 1

      const colors = [
        "#ffb7c5", // light pink
        "#ff8fab", // pink
        "#ffc2d1", // very light pink
        "#ffccd5", // pale pink
        "#f8bbd0", // soft pink
      ]
      this.color = colors[Math.floor(Math.random() * colors.length)]
    }

    update() {
      this.y += this.speedY
      this.x += this.speedX
      this.rotation += this.rotationSpeed

      if (this.y > sakuraCanvas.height) {
        this.y = -this.size
        this.x = Math.random() * sakuraCanvas.width
      }
    }

    draw() {
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate((this.rotation * Math.PI) / 180)

      ctx.beginPath()
      ctx.fillStyle = this.color
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, this.size / 2, this.size / 2)
      ctx.bezierCurveTo(0, this.size, -this.size / 2, this.size / 2, 0, 0)
      ctx.fill()
      ctx.closePath()

      ctx.restore()
    }
  }

  const initSakura = () => {
    resizeCanvas()
    petals = []
    const petalCount = Math.min(40, Math.floor(sakuraCanvas.width / 25))

    for (let i = 0; i < petalCount; i++) {
      petals.push(new Petal())
    }

    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }

    const animate = () => {
      ctx.clearRect(0, 0, sakuraCanvas.width, sakuraCanvas.height)

      petals.forEach((petal) => {
        petal.update()
        petal.draw()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()
  }

  window.addEventListener("resize", resizeCanvas)
  initSakura()

  // Hide petals after 10 seconds
  setTimeout(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
    sakuraCanvas.style.opacity = "0"
    setTimeout(() => {
      sakuraCanvas.style.display = "none"
    }, 500)
  }, 10000)
}

// Project Filtering
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    tabButtons.forEach((btn) => btn.classList.remove("active"))

    // Add active class to clicked button
    button.classList.add("active")

    const category = button.getAttribute("data-category")

    // Filter projects
    projectCards.forEach((card) => {
      if (category === "all" || card.getAttribute("data-category") === category) {
        card.style.display = "flex"
      } else {
        card.style.display = "none"
      }
    })
  })
})

// Contact Form Character Reactions
if (contactForm) {
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const subjectInput = document.getElementById("subject")
  const messageInput = document.getElementById("message")

  const updateCharacterReaction = () => {
    if (messageInput.value.length > 50) {
      characterImage.src = "https://via.placeholder.com/200"
      characterText.textContent = "Wow! I'm really looking forward to reading your message!"
    } else if (messageInput.value.length > 10) {
      characterImage.src = "https://via.placeholder.com/200"
      characterText.textContent = "Thanks for starting the form! I'm excited to hear from you."
    } else if (subjectInput.value.length > 5) {
      characterImage.src = "https://via.placeholder.com/200"
      characterText.textContent = "That sounds interesting! Please tell me more."
    } else if (nameInput.value && emailInput.value) {
      characterImage.src = "https://via.placeholder.com/200"
      characterText.textContent = "Thanks for starting the form! I'm excited to hear from you."
    }
  }

  nameInput.addEventListener("input", updateCharacterReaction)
  emailInput.addEventListener("input", updateCharacterReaction)
  subjectInput.addEventListener("input", updateCharacterReaction)
  messageInput.addEventListener("input", updateCharacterReaction)

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]')
    submitButton.disabled = true
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'

    setTimeout(() => {
      characterImage.src = "https://via.placeholder.com/200"
      characterText.textContent = "Thank you for your message! I'll get back to you soon."
      submitButton.innerHTML = "Message Sent!"

      // Reset form after delay
      setTimeout(() => {
        contactForm.reset()
        submitButton.disabled = false
        submitButton.innerHTML = "Send Message"
        characterText.textContent = "Hello! Please fill out the form to contact me."
      }, 3000)
    }, 1500)
  })
}



document.addEventListener("DOMContentLoaded", () => {
  updateSongInfo();
  audioPlayer.volume = 0.5;

  // Try autoplay on page load (will likely be blocked by browser)
  audioPlayer.play().catch((error) => {
    console.warn("Autoplay blocked, waiting for user interaction...");

    // Wait for the first interaction
    const enableAutoplay = () => {
      audioPlayer.play().then(() => {
        console.log("Autoplay started after interaction");
      }).catch((error) => {
        console.error("Still failed to play:", error);
      });

      // Remove listeners after first attempt
      document.removeEventListener("click", enableAutoplay);
      document.removeEventListener("touchstart", enableAutoplay);
      document.removeEventListener("keydown", enableAutoplay);
    };

    document.addEventListener("click", enableAutoplay);
    document.addEventListener("touchstart", enableAutoplay);
    document.addEventListener("keydown", enableAutoplay);
  });
});





window.addEventListener("beforeunload", () => {
  const musicState = {
    index: currentSongIndex,
    time: audioPlayer.currentTime,
    isPlaying: isPlaying,
    volume: audioPlayer.volume,
  };
  localStorage.setItem("musicState", JSON.stringify(musicState));
});


document.addEventListener("DOMContentLoaded", () => {
  const savedState = JSON.parse(localStorage.getItem("musicState"));

  if (savedState) {
    currentSongIndex = savedState.index || 0;
    updateSongInfo();

    audioPlayer.currentTime = savedState.time || 0;
    audioPlayer.volume = savedState.volume ?? 0.5;

    if (savedState.isPlaying) {
      audioPlayer.play().catch((error) => {
        console.warn("Autoplay blocked, waiting for interaction...");

        const enableAutoplay = () => {
          audioPlayer.play();
          document.removeEventListener("click", enableAutoplay);
          document.removeEventListener("touchstart", enableAutoplay);
        };

        document.addEventListener("click", enableAutoplay);
        document.addEventListener("touchstart", enableAutoplay);
      });
    }
  } else {
    updateSongInfo(); // If nothing saved, load first song
  }
});






// Music Player
const songs = [
  {
    title: "sparkel",
    artist: "radwimps",
    src: "vid/Sparkle(RADWIMPS).mp3", // Replace with actual audio file
  },
  {
    title: "tada koe hitotsu",
    artist: "rokudenashi",
    src: "vid/y2meta.com - ロクデナシ -  ただ声一つ「Rokudenashi-Tada koe hitotsu」_Just one voice (Lyrics) (320 kbps).mp3", // Replace with actual audio file
  },
  {
    title: "wasureji",
    artist: "mirai kodai",
    src: "vid/wasureji-no-kotonoha-bez-wokalu.mp3", // Replace with actual audio file
  },
]

let currentSongIndex = 0
let isPlaying = false

const updateSongInfo = () => {
  const song = songs[currentSongIndex]
  document.querySelector(".music-player-track").textContent = song.title
  document.querySelector(".music-player-artist").textContent = song.artist
  audioPlayer.src = song.src
}

const togglePlay = () => {
  if (isPlaying) {
    audioPlayer.pause()
  } else {
    audioPlayer.play().catch((error) => {
      console.error("Playback failed:", error)
    })
  }
}

const updatePlayButton = () => {
  if (isPlaying) {
    musicPlayBtn.classList.add("playing")
  } else {
    musicPlayBtn.classList.remove("playing")
  }
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
}

musicPlayerToggle.addEventListener("click", () => {
  musicPlayerExpanded.classList.toggle("open")
  if (musicPlayerExpanded.classList.contains("open") && !audioPlayer.src) {
    updateSongInfo()
  }
})

musicPlayerClose.addEventListener("click", () => {
  musicPlayerExpanded.classList.remove("open")
})

musicPlayBtn.addEventListener("click", togglePlay)

musicPrevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length
  updateSongInfo()
  if (isPlaying) {
    audioPlayer.play().catch((error) => {
      console.error("Playback failed:", error)
    })
  }
})

musicNextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length
  updateSongInfo()
  if (isPlaying) {
    audioPlayer.play().catch((error) => {
      console.error("Playback failed:", error)
    })
  }
})

musicVolume.addEventListener("input", () => {
  audioPlayer.volume = musicVolume.value
  if (Number.parseFloat(musicVolume.value) === 0) {
    musicVolumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
  } else {
    musicVolumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
  }
})

musicVolumeBtn.addEventListener("click", () => {
  if (audioPlayer.volume > 0) {
    audioPlayer.volume = 0
    musicVolume.value = 0
    musicVolumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
  } else {
    audioPlayer.volume = 0.7
    musicVolume.value = 0.7
    musicVolumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
  }
})

musicProgressBar.addEventListener("click", (e) => {
  const rect = musicProgressBar.getBoundingClientRect()
  const pos = (e.clientX - rect.left) / musicProgressBar.offsetWidth
  audioPlayer.currentTime = pos * audioPlayer.duration
})

audioPlayer.addEventListener("play", () => {
  isPlaying = true
  updatePlayButton()
})

audioPlayer.addEventListener("pause", () => {
  isPlaying = false
  updatePlayButton()
})

audioPlayer.addEventListener("timeupdate", () => {
  const currentTime = audioPlayer.currentTime
  const duration = audioPlayer.duration || 1
  const progressPercent = (currentTime / duration) * 100

  musicProgressCurrent.style.width = `${progressPercent}%`
  musicCurrentTime.textContent = formatTime(currentTime)
})

audioPlayer.addEventListener("loadedmetadata", () => {
  musicDuration.textContent = formatTime(audioPlayer.duration)
})

audioPlayer.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length
  updateSongInfo()
  audioPlayer.play().catch((error) => {
    console.error("Playback failed:", error)
  })
})

// Share Modal
shareButton.addEventListener("click", () => {
  shareModal.classList.add("open")
})

modalClose.addEventListener("click", () => {
  shareModal.classList.remove("open")
})

shareModal.addEventListener("click", (e) => {
  if (e.target === shareModal) {
    shareModal.classList.remove("open")
  }
})

copyLinkBtn.addEventListener("click", () => {
  const shareUrl = document.getElementById("share-url")
  shareUrl.select()
  document.execCommand("copy")

  copyLinkBtn.innerHTML = '<i class="fas fa-check"></i>'
  setTimeout(() => {
    copyLinkBtn.innerHTML = '<i class="fas fa-copy"></i>'
  }, 2000)
})

// Scroll Animation
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".skill-card, .project-card, .section-title")

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const screenPosition = window.innerHeight / 1.2

    if (elementPosition < screenPosition) {
      element.style.animation = "slideUp 0.5s forwards"
    }
  })
}

window.addEventListener("scroll", animateOnScroll)
animateOnScroll() // Run once on load






// If you're using the JavaScript version (script.js)
document.addEventListener("DOMContentLoaded", () => {
  // ... existing code ...
  
  // Add this to make it autoplay when the page loads
  window.addEventListener("load", () => {
    const audioPlayer = document.getElementById("audio-player");
    if (audioPlayer) {
      audioPlayer.volume = 0.5; // Start at 50% volume
      audioPlayer.play().catch(error => {
        console.error("Autoplay failed:", error);
        // Most browsers require user interaction before autoplay
        // Show a play button or notification to the user
      });
    }
  });
});

// In script.js
audioPlayer.addEventListener("ended", () => {
  if (currentSongIndex < songs.length - 1) {
    currentSongIndex++;
  } else {
    currentSongIndex = 0; // Loop back to the first song
  }
  updateSongInfo();
  audioPlayer.play().catch(error => {
    console.error("Autoplay of next song failed:", error);
  });
});


