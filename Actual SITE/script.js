function sendMail(){
  let parms ={
      firstName : document.getElementById("firstName").value,
      lastName : document.getElementById("lastName").value,
      email : document.getElementById("email").value,
      service : document.getElementById("service").value,
      phone : document.getElementById("phone").value,
      message : document.getElementById("message").value,    

  }
  emailjs.send("service_wt57xgj","template_q82",parms).then(alert("Email Sent!!"))
}










// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.querySelector(".nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

// Enhanced Smooth Scrolling for Navigation Links and Buttons
function smoothScrollTo(targetId, duration = 1000) {
  const target = document.querySelector(targetId)
  if (!target) return

  const startPosition = window.pageYOffset
  const targetPosition = target.getBoundingClientRect().top + startPosition - 80 // Account for navbar
  const distance = targetPosition - startPosition
  let startTime = null

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  // Easing function for smooth animation
  function easeInOutCubic(t, b, c, d) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t * t + b
    t -= 2
    return (c / 2) * (t * t * t + 2) + b
  }

  requestAnimationFrame(animation)
}

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(0, 0, 0, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(255, 255, 255, 0.1)"
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Animated Counter Function
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start)
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target
    }
  }

  updateCounter()
}

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")

      // Animate counters when stats section is visible
      if (entry.target.classList.contains("about-stats")) {
        const counters = entry.target.querySelectorAll(".stat-number")
        counters.forEach((counter) => {
          const target = Number.parseInt(counter.getAttribute("data-target"))
          animateCounter(counter, target)
        })
      }
    }
  })
}, observerOptions)

// Observe elements for scroll animations
document.querySelectorAll(".service-card, .about-item, .about-stats, .contact-item").forEach((el) => {
  el.classList.add("scroll-animate")
  observer.observe(el)
})

// Contact Form Handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = Object.fromEntries(formData)

  // Simple validation
  if (!data.firstName || !data.lastName || !data.email || !data.message) {
    showNotification("Please fill in all required fields.", "error")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    showNotification("Please enter a valid email address.", "error")
    return
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true
  submitBtn.classList.add("loading")

  setTimeout(() => {
    showNotification("Thank you for your message! We will get back to you soon.", "success")
    this.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
    submitBtn.classList.remove("loading")
  }, 2000)
})

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#4CAF50" : type === "error" ? "#ff6b6b" : "#333"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove()
      }
    }, 300)
  }, 5000)
}

// Add notification animations to CSS
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification button {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
    }
    
    .notification button:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`
document.head.appendChild(notificationStyles)

// Enhanced Marquee Gallery Functionality
function initMarqueeGallery() {
  const marqueeRows = document.querySelectorAll(".marquee-row")

  marqueeRows.forEach((row, index) => {
    const content = row.querySelector(".marquee-content")
    const items = content.querySelectorAll(".gallery-item")

    // Clone items for infinite scroll
    items.forEach((item) => {
      const clone = item.cloneNode(true)
      content.appendChild(clone)
    })

    // Add intersection observer for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            content.style.animationPlayState = "running"
          } else {
            content.style.animationPlayState = "paused"
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    observer.observe(row)
  })
}

// SERVICES CAROUSEL - MOBILE ONLY, DESKTOP UNTOUCHED
let currentServiceSlide = 0
const totalServiceSlides = 5
let mobileCarouselInitialized = false

function initMobileServicesCarousel() {
  console.log("🚀 Initializing Mobile Services Carousel...")

  // Only run on mobile devices
  if (window.innerWidth > 768) {
    console.log("Desktop mode - carousel disabled, restoring original layout")
    restoreDesktopLayout()
    return
  }

  // Prevent multiple initializations
  if (mobileCarouselInitialized) {
    console.log("Mobile carousel already initialized")
    return
  }

  const servicesGrid = document.getElementById("servicesGrid")
  const nextBtn = document.getElementById("nextService")
  const prevBtn = document.getElementById("prevService")
  const indicators = document.querySelectorAll(".indicator")

  if (!servicesGrid || !nextBtn || !prevBtn) {
    console.log("❌ Required elements not found")
    return
  }

  console.log("✅ Setting up mobile carousel...")

  // Reset to first slide
  currentServiceSlide = 0

  // Store original cards before modification
  const originalCards = Array.from(servicesGrid.querySelectorAll(".service-card"))

  // COMPLETELY REWRITE THE GRID STRUCTURE FOR MOBILE
  servicesGrid.style.cssText = `
    display: block !important;
    width: 100% !important;
    height: 450px !important;
    overflow: hidden !important;
    position: relative !important;
    margin: 0 !important;
    padding: 0 !important;
  `

  // CREATE A CAROUSEL WRAPPER
  const carouselWrapper = document.createElement("div")
  carouselWrapper.style.cssText = `
    width: 500% !important;
    height: 100% !important;
    position: relative !important;
    transition: transform 0.4s ease !important;
    transform: translateX(0%) !important;
    display: flex !important;
    flex-direction: row !important;
  `
  carouselWrapper.id = "carouselWrapper"

  // Move all service cards into the wrapper
  originalCards.forEach((card, index) => {
    // Style each card for mobile carousel
    card.style.cssText = `
      width: 20% !important;
      height: 100% !important;
      min-height: 450px !important;
      margin: 0 !important;
      padding: 1.5rem !important;
      box-sizing: border-box !important;
      display: flex !important;
      flex-direction: column !important;
      background: var(--white) !important;
      border-radius: 16px !important;
      box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      color: var(--black) !important;
      flex-shrink: 0 !important;
      flex-grow: 0 !important;
    `

    // Move card to wrapper
    carouselWrapper.appendChild(card)
    console.log(`✅ Moved card ${index + 1} to mobile carousel wrapper`)
  })

  // Clear the grid and add the wrapper
  servicesGrid.innerHTML = ""
  servicesGrid.appendChild(carouselWrapper)

  // Remove existing event listeners by cloning buttons
  const newNextBtn = nextBtn.cloneNode(true)
  const newPrevBtn = prevBtn.cloneNode(true)
  nextBtn.parentNode.replaceChild(newNextBtn, nextBtn)
  prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn)

  // Add event listeners to new buttons
  newNextBtn.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("🔥 NEXT button clicked!")
    moveToNextSlide()
  })

  newNextBtn.addEventListener("touchend", (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("🔥 NEXT button touched!")
    moveToNextSlide()
  })

  newPrevBtn.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("🔥 PREV button clicked!")
    moveToPrevSlide()
  })

  newPrevBtn.addEventListener("touchend", (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("🔥 PREV button touched!")
    moveToPrevSlide()
  })

  // Setup indicator events
  indicators.forEach((indicator, index) => {
    const newIndicator = indicator.cloneNode(true)
    indicator.parentNode.replaceChild(newIndicator, indicator)

    newIndicator.addEventListener("click", (e) => {
      e.preventDefault()
      console.log(`🎯 Indicator ${index} clicked`)
      goToSlide(index)
    })

    newIndicator.addEventListener("touchend", (e) => {
      e.preventDefault()
      console.log(`🎯 Indicator ${index} touched`)
      goToSlide(index)
    })
  })

  // Mark as initialized
  mobileCarouselInitialized = true

  // Initial update
  updateCarousel()
  console.log("✅ Mobile carousel initialized - showing 1 card at a time!")
}

function restoreDesktopLayout() {
  const servicesGrid = document.getElementById("servicesGrid")
  if (!servicesGrid) return

  // Reset mobile carousel flag
  mobileCarouselInitialized = false

  // Check if we need to restore from mobile layout
  const carouselWrapper = document.getElementById("carouselWrapper")
  if (carouselWrapper) {
    console.log("🖥️ Restoring desktop layout from mobile carousel...")

    // Get all cards from the carousel wrapper
    const cards = Array.from(carouselWrapper.querySelectorAll(".service-card"))

    // Clear the grid
    servicesGrid.innerHTML = ""

    // Restore original desktop styles to the grid
    servicesGrid.style.cssText = `
      display: grid !important;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
      gap: 1.5rem !important;
      max-width: 1200px !important;
      margin: 0 auto !important;
      width: auto !important;
      height: auto !important;
      overflow: visible !important;
      position: static !important;
      padding: 0 !important;
    `

    // Restore original desktop styles to each card
    cards.forEach((card, index) => {
      card.style.cssText = `
        background: var(--white);
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
        position: relative;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: var(--black);
        display: flex;
        flex-direction: column;
        width: auto;
        height: auto;
        min-height: auto;
        margin: 0;
        flex-shrink: 1;
        flex-grow: 1;
      `

      // Add card back to grid
      servicesGrid.appendChild(card)
      console.log(`✅ Restored card ${index + 1} to desktop grid`)
    })
  }

  console.log("🖥️ Desktop layout restored!")
}

function moveToNextSlide() {
  if (currentServiceSlide < totalServiceSlides - 1) {
    currentServiceSlide++
    console.log(`➡️ Moving to slide ${currentServiceSlide + 1}`)
    updateCarousel()
  } else {
    console.log("❌ Already at last slide")
  }
}

function moveToPrevSlide() {
  if (currentServiceSlide > 0) {
    currentServiceSlide--
    console.log(`⬅️ Moving to slide ${currentServiceSlide + 1}`)
    updateCarousel()
  } else {
    console.log("❌ Already at first slide")
  }
}

function goToSlide(index) {
  if (index >= 0 && index < totalServiceSlides) {
    currentServiceSlide = index
    console.log(`🎯 Going to slide ${currentServiceSlide + 1}`)
    updateCarousel()
  }
}

function updateCarousel() {
  // Only update if we're on mobile and carousel is initialized
  if (window.innerWidth > 768 || !mobileCarouselInitialized) return

  const carouselWrapper = document.getElementById("carouselWrapper")
  if (!carouselWrapper) {
    console.log("❌ Carousel wrapper not found")
    return
  }

  // Calculate transform: each slide moves by 20% (since each card is 20% of 500% width)
  const translateValue = -(currentServiceSlide * 20)
  const transformString = `translateX(${translateValue}%)`

  console.log(`🔄 Updating: slide ${currentServiceSlide + 1}/${totalServiceSlides}, transform: ${transformString}`)

  // Apply transform to the wrapper
  carouselWrapper.style.transform = transformString

  // Update indicators
  const indicators = document.querySelectorAll(".indicator")
  indicators.forEach((indicator, index) => {
    if (index === currentServiceSlide) {
      indicator.classList.add("active")
      indicator.style.background = "var(--white)"
      indicator.style.transform = "scale(1.3)"
    } else {
      indicator.classList.remove("active")
      indicator.style.background = "rgba(255, 255, 255, 0.3)"
      indicator.style.transform = "scale(1)"
    }
  })

  // Update button states
  const nextBtn = document.getElementById("nextService")
  const prevBtn = document.getElementById("prevService")

  if (nextBtn && prevBtn) {
    // Previous button
    if (currentServiceSlide === 0) {
      prevBtn.style.opacity = "0.5"
      prevBtn.style.background = "rgba(255, 255, 255, 0.5)"
      prevBtn.disabled = true
    } else {
      prevBtn.style.opacity = "1"
      prevBtn.style.background = "var(--white)"
      prevBtn.disabled = false
    }

    // Next button
    if (currentServiceSlide === totalServiceSlides - 1) {
      nextBtn.style.opacity = "0.5"
      nextBtn.style.background = "rgba(255, 255, 255, 0.5)"
      nextBtn.disabled = true
    } else {
      nextBtn.style.opacity = "1"
      nextBtn.style.background = "var(--white)"
      nextBtn.disabled = false
    }
  }

  console.log(`✅ Updated to slide ${currentServiceSlide + 1}/${totalServiceSlides}`)
}

function addMobileSwipeSupport() {
  if (window.innerWidth > 768) return

  const carouselWrapper = document.getElementById("carouselWrapper")
  if (!carouselWrapper) return

  let startX = 0
  let startY = 0
  let isDragging = false

  carouselWrapper.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      isDragging = true
      console.log("👆 Touch start on carousel wrapper")
    },
    { passive: true },
  )

  carouselWrapper.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return

      const currentX = e.touches[0].clientX
      const currentY = e.touches[0].clientY
      const diffX = Math.abs(currentX - startX)
      const diffY = Math.abs(currentY - startY)

      // Prevent vertical scrolling if horizontal swipe is detected
      if (diffX > diffY && diffX > 10) {
        e.preventDefault()
      }
    },
    { passive: false },
  )

  carouselWrapper.addEventListener(
    "touchend",
    (e) => {
      if (!isDragging) return
      isDragging = false

      const endX = e.changedTouches[0].clientX
      const diffX = startX - endX
      const threshold = 50

      console.log("👆 Touch end on carousel wrapper, difference:", diffX)

      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          // Swipe left - next slide
          console.log("👆 Swipe left detected")
          moveToNextSlide()
        } else {
          // Swipe right - previous slide
          console.log("👆 Swipe right detected")
          moveToPrevSlide()
        }
      }
    },
    { passive: true },
  )
}

// Initialize everything with proper desktop/mobile detection
document.addEventListener("DOMContentLoaded", () => {
  console.log("📱 DOM loaded - checking device type...")

  if (window.innerWidth <= 768) {
    console.log("📱 Mobile device detected - initializing mobile carousel...")
    // Multiple initialization attempts for mobile
    setTimeout(initMobileServicesCarousel, 50)
    setTimeout(initMobileServicesCarousel, 200)
    setTimeout(initMobileServicesCarousel, 500)
    setTimeout(initMobileServicesCarousel, 1000)
    setTimeout(initMobileServicesCarousel, 2000)

    // Add swipe support for mobile
    setTimeout(addMobileSwipeSupport, 1200)
  } else {
    console.log("🖥️ Desktop device detected - using original grid layout")
    restoreDesktopLayout()
  }
})

// Handle resize events properly
window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    console.log("📱 Resized to mobile - initializing mobile carousel...")
    setTimeout(initMobileServicesCarousel, 100)
    setTimeout(addMobileSwipeSupport, 300)
  } else {
    console.log("🖥️ Resized to desktop - restoring desktop layout...")
    setTimeout(restoreDesktopLayout, 100)
  }
})

// Force init when services section is visible (mobile only)
const servicesSection = document.getElementById("services")
if (servicesSection) {
  const servicesObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && window.innerWidth <= 768) {
          console.log("👀 Services section visible on mobile - force init...")
          setTimeout(initMobileServicesCarousel, 50)
          setTimeout(initMobileServicesCarousel, 200)
          setTimeout(addMobileSwipeSupport, 300)
        }
      })
    },
    { threshold: 0.1 },
  )

  servicesObserver.observe(servicesSection)
}

console.log("🎨 Dhwam Barcode Systems website loaded successfully!")
