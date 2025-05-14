/**
 * Kimverse Luxe - Advanced Animations
 *
 * This file contains all the custom animations and transitions
 * that make the Kimverse Luxe website extraordinary and unique.
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing advanced animations")

  // Initialize all animations
  initParallaxEffects()
  initScrollAnimations()
  initHoverEffects()
  initTextAnimations()
  initProductAnimations()
  initMagneticElements()
  initSmoothScrolling()
  initImageReveal()
})

// Parallax Effects
function initParallaxEffects() {
  // Find elements with parallax class
  const parallaxElements = document.querySelectorAll(".parallax")

  if (parallaxElements.length === 0) {
    // If no parallax elements exist, add to hero section
    const heroSection = document.querySelector(".hero-slider")
    if (heroSection) {
      heroSection.classList.add("has-parallax")

      // Add parallax layers
      const slides = heroSection.querySelectorAll(".slide")
      slides.forEach((slide) => {
        // Create parallax overlay
        const overlay = document.createElement("div")
        overlay.className = "parallax-overlay"
        slide.appendChild(overlay)

        // Add floating elements
        for (let i = 0; i < 5; i++) {
          const floatingElement = document.createElement("div")
          floatingElement.className = "floating-element"
          floatingElement.style.left = `${Math.random() * 100}%`
          floatingElement.style.top = `${Math.random() * 100}%`
          floatingElement.style.animationDelay = `${Math.random() * 5}s`
          floatingElement.style.animationDuration = `${Math.random() * 10 + 10}s`
          overlay.appendChild(floatingElement)
        }
      })
    }

    // Add parallax to collection banner
    const collectionBanner = document.querySelector(".collection-banner")
    if (collectionBanner) {
      collectionBanner.classList.add("parallax")
      collectionBanner.setAttribute("data-parallax-speed", "0.2")
    }
  }

  // Handle parallax on scroll
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY

    document.querySelectorAll(".parallax").forEach((element) => {
      const speed = element.getAttribute("data-parallax-speed") || 0.2
      const yPos = -(scrollY * speed)
      element.style.backgroundPosition = `50% ${yPos}px`
    })

    document.querySelectorAll(".has-parallax").forEach((section) => {
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = 1 - (rect.top + rect.height) / (viewportHeight + rect.height)
        const layers = section.querySelectorAll(".parallax-overlay")

        layers.forEach((layer) => {
          const yPos = progress * 100
          layer.style.transform = `translateY(${yPos}px)`
        })
      }
    })
  })
}

// Scroll Animations
function initScrollAnimations() {
  // Create intersection observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view")

        // Add staggered animation to child elements if needed
        if (entry.target.classList.contains("stagger-children")) {
          const children = entry.target.querySelectorAll(".stagger-item")
          children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`
            child.classList.add("in-view")
          })
        }

        // Unobserve after animation
        if (!entry.target.classList.contains("keep-observing")) {
          observer.unobserve(entry.target)
        }
      } else if (entry.target.classList.contains("keep-observing")) {
        // Remove class when out of view for elements that should be re-animated
        entry.target.classList.remove("in-view")

        const children = entry.target.querySelectorAll(".stagger-item")
        children.forEach((child) => {
          child.classList.remove("in-view")
        })
      }
    })
  }, observerOptions)

  // Add scroll animation classes to elements
  const sections = document.querySelectorAll("section, .animate-on-scroll")
  sections.forEach((section) => {
    section.classList.add("scroll-animation")
    observer.observe(section)
  })

  // Add staggered animations to product grids
  const productGrids = document.querySelectorAll(".products-grid, .categories-grid, .testimonials-grid")
  productGrids.forEach((grid) => {
    grid.classList.add("stagger-children")

    const items = grid.children
    for (let i = 0; i < items.length; i++) {
      items[i].classList.add("stagger-item")
    }

    observer.observe(grid)
  })

  // Add scroll animations to features
  const features = document.querySelectorAll(".feature-item")
  features.forEach((feature, index) => {
    feature.classList.add("scroll-animation")
    feature.style.transitionDelay = `${index * 0.1}s`
    observer.observe(feature)
  })
}

// Hover Effects
function initHoverEffects() {
  // Add magnetic hover effect to buttons
  const buttons = document.querySelectorAll(".primary-btn, .secondary-btn, .outline-btn")
  buttons.forEach((button) => {
    button.classList.add("magnetic-effect")
  })

  // Add hover effect to product cards
  const productCards = document.querySelectorAll(".product-card")
  productCards.forEach((card) => {
    card.classList.add("hover-effect")

    // Add 3D tilt effect
    card.addEventListener("mousemove", (e) => {
      if (window.innerWidth < 768) return // Disable on mobile

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    })

    // Reset on mouse leave
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
    })
  })

  // Add hover effect to category cards
  const categoryCards = document.querySelectorAll(".category-card")
  categoryCards.forEach((card) => {
    card.classList.add("hover-zoom")
  })

  // Add hover effect to navigation items
  const navItems = document.querySelectorAll(".main-nav a")
  navItems.forEach((item) => {
    item.classList.add("hover-underline")
  })
}

// Text Animations
function initTextAnimations() {
  // Find headings to animate
  const headings = document.querySelectorAll(".section-header h2, .banner-content h2, .slide-content h2")

  headings.forEach((heading) => {
    // Skip if already processed
    if (heading.classList.contains("text-animated")) return

    // Split text into spans for letter animation
    const text = heading.textContent
    let html = ""

    // First wrap each word
    const words = text.split(" ")
    words.forEach((word, wordIndex) => {
      html += `<span class="word-wrapper">`

      // Then wrap each letter
      for (let i = 0; i < word.length; i++) {
        html += `<span class="letter" style="animation-delay: ${wordIndex * 0.05 + i * 0.03}s">${word[i]}</span>`
      }

      html += `</span> `
    })

    heading.innerHTML = html
    heading.classList.add("text-animated")
  })

  // Animate text on scroll
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-text")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  headings.forEach((heading) => {
    observer.observe(heading)
  })
}

// Product Animations
function initProductAnimations() {
  // Add animation to product actions
  const productActions = document.querySelectorAll(".product-actions")
  productActions.forEach((actions) => {
    const buttons = actions.querySelectorAll("button")
    buttons.forEach((button, index) => {
      button.style.transitionDelay = `${index * 0.05}s`
    })
  })

  // Add quick view animation
  const quickViewModal = document.querySelector(".quick-view-modal")
  if (quickViewModal) {
    quickViewModal.classList.add("animated-modal")
  }

  // Override showQuickView function to add animations
  const originalShowQuickView = window.showQuickView
  if (typeof originalShowQuickView === "function") {
    window.showQuickView = (productId) => {
      originalShowQuickView(productId)

      // Add animation classes after modal is created
      setTimeout(() => {
        const modal = document.querySelector(".quick-view-modal")
        if (modal) {
          modal.classList.add("animated-modal")

          const content = modal.querySelector(".modal-content")
          if (content) {
            content.classList.add("animate-in")
          }
        }
      }, 10)
    }
  }

  // Add animation to add-to-cart notification
  const originalShowNotification = window.showNotification
  if (typeof originalShowNotification === "function") {
    window.showNotification = (message, type = "success") => {
      originalShowNotification(message, type)

      // Add animation classes after notification is created
      setTimeout(() => {
        const notification = document.querySelector(".notification")
        if (notification) {
          notification.classList.add("animated-notification")
        }
      }, 10)
    }
  }
}

// Custom Cursor
function initCustomCursor() {
  // Only on desktop
  if (window.innerWidth < 1024) return

  // Create custom cursor elements
  const cursorOuter = document.createElement("div")
  cursorOuter.className = "cursor-outer"

  const cursorInner = document.createElement("div")
  cursorInner.className = "cursor-inner"

  document.body.appendChild(cursorOuter)
  document.body.appendChild(cursorInner)

  // Add cursor-none class to body
  document.body.classList.add("cursor-none")

  // Track cursor position
  let mouseX = 0
  let mouseY = 0
  let outerX = 0
  let outerY = 0
  let innerX = 0
  let innerY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  // Interactive elements that change cursor
  const interactiveElements = "a, button, .btn, .product-card, .category-card, input, textarea, select, .interactive"

  document.querySelectorAll(interactiveElements).forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorOuter.classList.add("hover")
      cursorInner.classList.add("hover")
    })

    el.addEventListener("mouseleave", () => {
      cursorOuter.classList.remove("hover")
      cursorInner.classList.remove("hover")
    })
  })

  // Animate cursor
  const animateCursor = () => {
    // Smooth follow for outer cursor
    outerX += (mouseX - outerX) * 0.2
    outerY += (mouseY - outerY) * 0.2

    // Immediate follow for inner cursor
    innerX = mouseX
    innerY = mouseY

    // Apply transforms
    cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px)`
    cursorInner.style.transform = `translate(${innerX}px, ${innerY}px)`

    requestAnimationFrame(animateCursor)
  }

  animateCursor()
}

// Magnetic Elements
function initMagneticElements() {
  // Only on desktop
  if (window.innerWidth < 1024) return

  const magneticElements = document.querySelectorAll(".magnetic-effect")

  magneticElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      // Calculate distance from center
      const distance = Math.sqrt(x * x + y * y)
      const maxDistance = Math.max(rect.width, rect.height) / 2

      // Calculate movement based on distance from center
      const strength = 15
      const moveX = (x / maxDistance) * strength
      const moveY = (y / maxDistance) * strength

      element.style.transform = `translate(${moveX}px, ${moveY}px)`
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = "translate(0, 0)"
    })
  })
}

// Smooth Scrolling
function initSmoothScrolling() {
  // Check if browser supports smooth scrolling
  if ("scrollBehavior" in document.documentElement.style) {
    // Native smooth scrolling is supported
    document.documentElement.style.scrollBehavior = "smooth"
  } else {
    // Fallback for browsers that don't support smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        if (targetId === "#") return

        const targetElement = document.querySelector(targetId)
        if (!targetElement) return

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
        const startPosition = window.pageYOffset
        const distance = targetPosition - startPosition
        const duration = 1000
        let start = null

        function step(timestamp) {
          if (!start) start = timestamp
          const progress = timestamp - start
          const percentage = Math.min(progress / duration, 1)

          // Easing function (easeInOutCubic)
          const easing =
            percentage < 0.5 ? 4 * percentage * percentage * percentage : 1 - Math.pow(-2 * percentage + 2, 3) / 2

          window.scrollTo(0, startPosition + distance * easing)

          if (progress < duration) {
            window.requestAnimationFrame(step)
          }
        }

        window.requestAnimationFrame(step)
      })
    })
  }
}

// Image Reveal Animation
function initImageReveal() {
  // Create intersection observer for image reveal
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        const container = img.parentElement

        // Add reveal animation
        container.classList.add("reveal")

        // Unobserve after animation
        observer.unobserve(img)
      }
    })
  }, observerOptions)

  // Add image reveal containers
  document.querySelectorAll(".product-image img, .category-image img, .slide img").forEach((img) => {
    // Skip if already in a reveal container
    if (img.parentElement.classList.contains("img-reveal-container")) return

    // Create reveal container
    const parent = img.parentElement
    const container = document.createElement("div")
    container.className = "img-reveal-container"

    // Move the image into the container
    parent.insertBefore(container, img)
    container.appendChild(img)

    // Add overlay
    const overlay = document.createElement("div")
    overlay.className = "img-reveal-overlay"
    container.appendChild(overlay)

    // Observe the image
    observer.observe(img)
  })
}

// Remove the page transition effect by commenting out or removing the relevant code
// This will disable the brown color overlay when navigating between pages

// Find and remove or comment out the page transition code, which might look something like this:
/*
function initPageTransitions() {
    // Page transition code that creates the brown overlay
    // ...
}
*/

// Or modify the transition to be transparent instead of brown:
function updatePageTransition() {
  const pageTransition = document.querySelector(".page-transition")
  if (pageTransition) {
    pageTransition.style.backgroundColor = "transparent"
    pageTransition.style.display = "none"
  }
}

// Call this function when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
  updatePageTransition()
})
