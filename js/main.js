// Main JavaScript for Kimverse Luxe

// DOM Elements
const body = document.body
const header = document.querySelector("header")
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const mobileMenu = document.querySelector(".mobile-menu")
const closeMenu = document.querySelector(".close-menu")
const searchToggle = document.querySelector(".search-toggle")
const searchOverlay = document.querySelector(".search-overlay")
const closeSearch = document.querySelector(".close-search")
const backToTop = document.getElementById("back-to-top")
const heroSlider = document.querySelector(".hero-slider")
const slides = document.querySelectorAll(".slide")
const sliderDots = document.querySelectorAll(".dot")
const sliderPrev = document.querySelector(".slider-prev")
const sliderNext = document.querySelector(".slider-next")
const animateSections = document.querySelectorAll(".animate-section")
const animateItems = document.querySelectorAll(".animate-item")
const tabTriggers = document.querySelectorAll(".tab-trigger")
const tabContents = document.querySelectorAll(".tab-content")

// Global Variables
let currentSlide = 0
let slideInterval
let isSliding = false
const slideDelay = 5000 // 5 seconds

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed")
  console.log("Main script loaded")

  // Initialize mobile menu
  initMobileMenu()

  // Initialize search overlay
  initSearchOverlay()

  // Initialize back to top button
  initBackToTop()

  // Initialize product sliders if they exist
  if (document.querySelector(".product-slider")) {
    initProductSliders()
  }

  // Initialize quantity controls
  initQuantityControls()

  // Initialize tabs if they exist
  if (document.querySelector(".tabs")) {
    initTabs()
  }

  // Initialize modals if they exist
  if (document.querySelector(".modal")) {
    initModals()
  }

  // Initialize tooltips
  initTooltips()

  // Initialize product gallery if on product page
  if (document.querySelector(".product-gallery")) {
    initProductGallery()
  }

  // Initialize animations
  initAnimations()

  initHeroSlider()
  initScrollEvents()
  initProductActions()
  loadCartCount()
  loadWishlistCount()
  updateWishlistButtonStates()

  // Add animation classes to sections
  document
    .querySelectorAll(
      ".features-section, .categories-section, .products-section, .testimonials-section, .newsletter-section",
    )
    .forEach((section, index) => {
      section.classList.add("scroll-animation")
      section.style.transitionDelay = `${index * 0.1}s`
    })

  // Add animation classes to hero slider
  const heroSlider = document.querySelector(".hero-slider")
  if (heroSlider) {
    heroSlider.classList.add("has-parallax")
  }

  // Add animation classes to product cards
  document.querySelectorAll(".product-card").forEach((card) => {
    card.classList.add("hover-effect")
  })

  // Add animation classes to buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.classList.add("magnetic-effect")
  })

  // Log to confirm initialization
  console.log("All initializations complete")
  console.log("Animation classes added")
})

// Initialize mobile menu
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")
  const closeMenu = document.querySelector(".close-menu")

  if (!mobileMenuToggle || !mobileMenu || !closeMenu) return

  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active")
    document.body.style.overflow = "hidden"
  })

  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    document.body.style.overflow = ""
  })

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(event.target) &&
      !mobileMenuToggle.contains(event.target)
    ) {
      mobileMenu.classList.remove("active")
      document.body.style.overflow = ""
    }
  })
}

// Initialize search overlay
function initSearchOverlay() {
  const searchToggle = document.querySelector(".search-toggle")
  const searchOverlay = document.querySelector(".search-overlay")
  const closeSearch = document.querySelector(".close-search")

  if (!searchToggle || !searchOverlay || !closeSearch) return

  searchToggle.addEventListener("click", (e) => {
    e.preventDefault()
    searchOverlay.classList.add("active")
    document.body.style.overflow = "hidden"
    setTimeout(() => {
      searchOverlay.querySelector("input").focus()
    }, 100)
  })

  closeSearch.addEventListener("click", () => {
    searchOverlay.classList.remove("active")
    document.body.style.overflow = ""
  })

  // Close search when pressing Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchOverlay.classList.contains("active")) {
      searchOverlay.classList.remove("active")
      document.body.style.overflow = ""
    }
  })
}

// Initialize back to top button
function initBackToTop() {
  const backToTopButton = document.getElementById("back-to-top")

  if (!backToTopButton) return

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible")
    } else {
      backToTopButton.classList.remove("visible")
    }
  })

  // Scroll to top when clicked
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Initialize product sliders
function initProductSliders() {
  // This is a placeholder for slider initialization
  // In a real project, you would use a library like Swiper or Slick
  console.log("Product sliders would be initialized here")
}

// Initialize quantity controls
function initQuantityControls() {
  const quantityControls = document.querySelectorAll(".quantity-control")

  quantityControls.forEach((control) => {
    const minusBtn = control.querySelector(".minus")
    const plusBtn = control.querySelector(".plus")
    const input = control.querySelector("input")

    if (!minusBtn || !plusBtn || !input) return

    minusBtn.addEventListener("click", () => {
      const value = Number.parseInt(input.value)
      if (value > Number.parseInt(input.min || 1)) {
        input.value = value - 1
        input.dispatchEvent(new Event("change"))
      }
    })

    plusBtn.addEventListener("click", () => {
      const value = Number.parseInt(input.value)
      const max = Number.parseInt(input.max)
      if (!max || value < max) {
        input.value = value + 1
        input.dispatchEvent(new Event("change"))
      }
    })

    input.addEventListener("change", function () {
      const value = Number.parseInt(this.value)
      const min = Number.parseInt(this.min || 1)
      const max = Number.parseInt(this.max)

      if (value < min) {
        this.value = min
      } else if (max && value > max) {
        this.value = max
      }
    })
  })
}

// Initialize tabs
function initTabs() {
  const tabsContainers = document.querySelectorAll(".tabs")

  tabsContainers.forEach((container) => {
    const tabs = container.querySelectorAll(".tab")
    const tabContents = container.querySelectorAll(".tab-content")

    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const target = this.getAttribute("data-tab")

        // Remove active class from all tabs and contents
        tabs.forEach((t) => t.classList.remove("active"))
        tabContents.forEach((c) => c.classList.remove("active"))

        // Add active class to clicked tab and corresponding content
        this.classList.add("active")
        document.getElementById(target).classList.add("active")
      })
    })
  })
}

// Initialize modals
function initModals() {
  const modalTriggers = document.querySelectorAll("[data-modal]")
  const closeButtons = document.querySelectorAll(".modal-close")

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault()
      const modalId = this.getAttribute("data-modal")
      const modal = document.getElementById(modalId)

      if (modal) {
        modal.classList.add("active")
        document.body.style.overflow = "hidden"
      }
    })
  })

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal")
      if (modal) {
        modal.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  })

  // Close modal when clicking outside
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      event.target.classList.remove("active")
      document.body.style.overflow = ""
    }
  })

  // Close modal when pressing Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const activeModal = document.querySelector(".modal.active")
      if (activeModal) {
        activeModal.classList.remove("active")
        document.body.style.overflow = ""
      }
    }
  })
}

// Initialize tooltips
function initTooltips() {
  const tooltips = document.querySelectorAll("[data-tooltip]")

  tooltips.forEach((tooltip) => {
    tooltip.addEventListener("mouseenter", function () {
      const text = this.getAttribute("data-tooltip")

      const tooltipElement = document.createElement("div")
      tooltipElement.className = "tooltip"
      tooltipElement.textContent = text

      document.body.appendChild(tooltipElement)

      const rect = this.getBoundingClientRect()
      const tooltipRect = tooltipElement.getBoundingClientRect()

      tooltipElement.style.top = `${rect.top - tooltipRect.height - 10 + window.scrollY}px`
      tooltipElement.style.left = `${rect.left + (rect.width / 2) - tooltipRect.width / 2}px`

      tooltipElement.classList.add("active")

      this.addEventListener("mouseleave", () => {
        tooltipElement.remove()
      })
    })
  })
}

// Initialize product gallery
function initProductGallery() {
  const mainImage = document.querySelector(".product-main-image img")
  const thumbnails = document.querySelectorAll(".product-thumbnail")

  if (!mainImage || !thumbnails.length) return

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked thumbnail
      this.classList.add("active")

      // Update main image
      const imageUrl = this.getAttribute("data-image")
      mainImage.src = imageUrl
      mainImage.parentElement.setAttribute("href", imageUrl)
    })
  })
}

// Initialize animations
function initAnimations() {
  // Animate elements when they come into view
  const animatedElements = document.querySelectorAll(".animate")

  if (!animatedElements.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

// Hero Slider
function initHeroSlider() {
  if (!heroSlider || !slides.length) {
    console.log("Hero slider elements not found")
    return
  }

  console.log(`Found ${slides.length} slides`)

  // Set up the first slide
  slides[0].classList.add("active")
  if (sliderDots && sliderDots.length) {
    sliderDots[0].classList.add("active")
  }

  // Activate slide content animations for the first slide
  const firstSlideItems = slides[0].querySelectorAll(".animate-item")
  firstSlideItems.forEach((item) => {
    item.style.opacity = "1"
    item.style.transform = "translateY(0)"
  })

  // Start autoplay
  startSlideInterval()

  // Event listeners for manual navigation
  if (sliderPrev) {
    sliderPrev.addEventListener("click", () => {
      if (isSliding) return
      clearInterval(slideInterval)
      changeSlide("prev")
      startSlideInterval()
    })
  }

  if (sliderNext) {
    sliderNext.addEventListener("click", () => {
      if (isSliding) return
      clearInterval(slideInterval)
      changeSlide("next")
      startSlideInterval()
    })
  }

  // Dot navigation
  if (sliderDots && sliderDots.length) {
    sliderDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (isSliding || currentSlide === index) return
        clearInterval(slideInterval)
        goToSlide(index)
        startSlideInterval()
      })
    })
  }

  console.log("Hero slider initialized")
}

function startSlideInterval() {
  slideInterval = setInterval(() => {
    changeSlide("next")
  }, slideDelay)
}

function changeSlide(direction) {
  if (isSliding || !slides.length) return
  isSliding = true

  // Reset animations on current slide
  const currentSlideItems = slides[currentSlide].querySelectorAll(".animate-item")
  currentSlideItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
  })

  // Remove active class from current slide and dot
  slides[currentSlide].classList.remove("active")
  if (sliderDots && sliderDots.length) {
    sliderDots[currentSlide].classList.remove("active")
  }

  // Calculate next slide index
  if (direction === "next") {
    currentSlide = (currentSlide + 1) % slides.length
  } else {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length
  }

  console.log(`Changing to slide ${currentSlide}`)

  // Add active class to new slide and dot
  slides[currentSlide].classList.add("active")
  if (sliderDots && sliderDots.length) {
    sliderDots[currentSlide].classList.add("active")
  }

  // Activate animations on new slide
  setTimeout(() => {
    const newSlideItems = slides[currentSlide].querySelectorAll(".animate-item")
    newSlideItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1"
        item.style.transform = "translateY(0)"
      }, index * 200)
    })

    isSliding = false
  }, 300)
}

function goToSlide(index) {
  if (isSliding || index === currentSlide || index >= slides.length) return
  isSliding = true

  // Reset animations on current slide
  const currentSlideItems = slides[currentSlide].querySelectorAll(".animate-item")
  currentSlideItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
  })

  // Remove active class from current slide and dot
  slides[currentSlide].classList.remove("active")
  if (sliderDots && sliderDots.length) {
    sliderDots[currentSlide].classList.remove("active")
  }

  // Set new current slide
  currentSlide = index

  // Add active class to new slide and dot
  slides[currentSlide].classList.add("active")
  if (sliderDots && sliderDots.length) {
    sliderDots[currentSlide].classList.add("active")
  }

  // Activate animations on new slide
  setTimeout(() => {
    const newSlideItems = slides[currentSlide].querySelectorAll(".animate-item")
    newSlideItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1"
        item.style.transform = "translateY(0)"
      }, index * 200)
    })

    isSliding = false
  }, 300)
}

// Scroll Events
function initScrollEvents() {
  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      if (header) header.classList.add("scrolled")
      if (backToTop) backToTop.classList.add("visible")
    } else {
      if (header) header.classList.remove("scrolled")
      if (backToTop) backToTop.classList.remove("visible")
    }

    // Animate sections on scroll
    animateSections.forEach((section) => {
      if (isElementInViewport(section)) {
        section.classList.remove("hidden")
      }
    })

    // Animate items on scroll
    animateItems.forEach((item) => {
      if (isElementInViewport(item)) {
        item.classList.remove("hidden")
      }
    })
  })

  // Back to top button
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Trigger initial check
  setTimeout(() => {
    window.dispatchEvent(new Event("scroll"))
  }, 100)

  console.log("Scroll events initialized")
}

// Check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
}

// Tabs
function initTabSection() {
  if (!tabTriggers.length || !tabContents.length) {
    console.log("Tab elements not found")
    return
  }

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab")

      // Remove active class from all triggers and contents
      tabTriggers.forEach((t) => t.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked trigger and corresponding content
      this.classList.add("active")
      document.querySelector(`.tab-content[data-tab="${tabName}"]`)?.classList.add("active")
    })
  })

  console.log("Tabs initialized")
}

// Product Actions
function initProductActions() {
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn")
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      e.stopPropagation()

      const productId = this.getAttribute("data-product-id")
      if (!productId) return

      addToCart(productId, 1)
      showNotification("Product added to cart!")
    })
  })

  // Wishlist buttons
  const wishlistButtons = document.querySelectorAll(".wishlist-btn")
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      e.stopPropagation()

      const productId = this.getAttribute("data-product-id")
      if (!productId) return

      if (typeof window.toggleWishlistItem === "function") {
        window.toggleWishlistItem(productId, this)
      } else {
        this.classList.toggle("active")
        const isActive = this.classList.contains("active")

        if (this.querySelector("i")) {
          this.querySelector("i").className = isActive ? "fas fa-heart" : "far fa-heart"
        }

        showNotification(isActive ? "Product added to wishlist!" : "Product removed from wishlist!")
      }
    })
  })

  // Quick view buttons
  const quickViewButtons = document.querySelectorAll(".quick-view-btn")
  quickViewButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      e.stopPropagation()

      const productId = this.getAttribute("data-product-id")
      if (!productId) return

      showQuickView(productId)
    })
  })

  console.log("Product actions initialized")
}

// Add to Cart
function addToCart(productId, quantity = 1) {
  // Check if addToCart function exists in cart.js
  if (typeof window.addToCart === "function" && window.addToCart !== addToCart) {
    window.addToCart(productId, quantity)
    return
  }

  // Get current cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Check if product already in cart
  const existingProductIndex = cart.findIndex((item) => item.id === productId)

  if (existingProductIndex !== -1) {
    // Update quantity if product already in cart
    cart[existingProductIndex].quantity += quantity
  } else {
    // Add new product to cart
    cart.push({
      id: productId,
      quantity: quantity,
      addedAt: new Date().toISOString(),
    })
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update cart count
  updateCartCount()

  console.log(`Added product ${productId} to cart (quantity: ${quantity})`)
}

// Update Cart Count
function updateCartCount() {
  // Check if updateCartCount function exists in cart.js
  if (typeof window.updateCartCount === "function" && window.updateCartCount !== updateCartCount) {
    return window.updateCartCount()
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Update all cart count elements
  const cartCountElements = document.querySelectorAll(".cart-count")
  cartCountElements.forEach((element) => {
    element.textContent = cartCount
  })

  return cartCount
}

// Load Cart Count
function loadCartCount() {
  updateCartCount()
}

// Load Wishlist Count
function loadWishlistCount() {
  // Check if updateWishlistCount function exists in wishlist.js
  if (typeof window.updateWishlistCount === "function") {
    window.updateWishlistCount()
  } else {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
    const wishlistCount = wishlist.length

    // Update all wishlist count elements
    const wishlistCountElements = document.querySelectorAll(".wishlist-count")
    wishlistCountElements.forEach((element) => {
      element.textContent = wishlistCount
    })
  }
}

// Update Wishlist Button States
function updateWishlistButtonStates() {
  // Check if updateWishlistButtonStates function exists in wishlist.js
  if (
    typeof window.updateWishlistButtonStates === "function" &&
    window.updateWishlistButtonStates !== updateWishlistButtonStates
  ) {
    window.updateWishlistButtonStates()
  }
}

// Show notification
function showNotification(message, type = "success", duration = 3000) {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  // Add to DOM
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.classList.add("show")
  }, 10)

  // Remove after delay
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, duration)
}

// Show Quick View
function showQuickView(productId) {
  // Get product data
  const product = getProductById(productId)
  if (!product) {
    console.error(`Product with ID ${productId} not found`)
    return
  }

  // Create modal element
  const modal = document.createElement("div")
  modal.className = "quick-view-modal"

  // Check if product is in wishlist
  const isInWishlist = typeof window.isInWishlist === "function" ? window.isInWishlist(productId) : false
  const wishlistIcon = isInWishlist ? "fas fa-heart" : "far fa-heart"
  const wishlistText = isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"

  // Generate modal content
  modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <div class="product-quick-view">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details">
                    <h2>${product.name}</h2>
                    <div class="product-price">
                        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ""}
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                    </div>
                    <div class="product-rating">
                        ${generateStarRating(product.rating)}
                        <span class="rating-count">(${product.reviews || 0} reviews)</span>
                    </div>
                    <p class="product-description">${product.description || "No description available."}</p>
                    <div class="product-actions">
                        <div class="quantity-selector">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" value="1" min="1" class="quantity-input">
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="btn primary-btn add-to-cart-btn" data-product-id="${product.id}">
                            Add to Cart
                        </button>
                        <button class="btn outline-btn wishlist-btn ${isInWishlist ? "active" : ""}" data-product-id="${product.id}">
                            <i class="${wishlistIcon}"></i> ${wishlistText}
                        </button>
                    </div>
                    <div class="product-meta">
                        <p><strong>Category:</strong> ${product.category || "Uncategorized"}</p>
                        <p><strong>Tags:</strong> ${product.tags ? product.tags.join(", ") : "None"}</p>
                    </div>
                </div>
            </div>
        </div>
    `

  // Add to DOM
  document.body.appendChild(modal)
  document.body.style.overflow = "hidden"

  // Animate in
  setTimeout(() => {
    modal.classList.add("active")
  }, 10)

  // Close button
  const closeButton = modal.querySelector(".close-modal")
  closeButton.addEventListener("click", () => {
    closeQuickView(modal)
  })

  // Close on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeQuickView(modal)
    }
  })

  // Quantity buttons
  const quantityInput = modal.querySelector(".quantity-input")
  const minusButton = modal.querySelector(".quantity-btn.minus")
  const plusButton = modal.querySelector(".quantity-btn.plus")

  minusButton.addEventListener("click", () => {
    const currentValue = Number.parseInt(quantityInput.value)
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1
    }
  })

  plusButton.addEventListener("click", () => {
    const currentValue = Number.parseInt(quantityInput.value)
    quantityInput.value = currentValue + 1
  })

  // Add to cart button
  const addToCartButton = modal.querySelector(".add-to-cart-btn")
  addToCartButton.addEventListener("click", () => {
    const quantity = Number.parseInt(quantityInput.value)
    addToCart(product.id, quantity)
    showNotification(`${quantity} ${quantity > 1 ? "items" : "item"} added to cart!`)
    closeQuickView(modal)
  })

  // Wishlist button
  const wishlistButton = modal.querySelector(".wishlist-btn")
  wishlistButton.addEventListener("click", function () {
    if (typeof window.toggleWishlistItem === "function") {
      window.toggleWishlistItem(product.id, this)
    } else {
      this.classList.toggle("active")
      const isActive = this.classList.contains("active")

      if (this.querySelector("i")) {
        this.querySelector("i").className = isActive ? "fas fa-heart" : "far fa-heart"
      }

      this.innerHTML = `<i class="${isActive ? "fas" : "far"} fa-heart"></i> ${isActive ? "Remove from Wishlist" : "Add to Wishlist"}`

      showNotification(
        isActive ? "Product added to wishlist!" : "Product removed from wishlist!",
        isActive ? "success" : "info",
      )
    }
  })

  console.log(`Quick view opened for product ${productId}`)
}

// Close Quick View
function closeQuickView(modal) {
  modal.classList.remove("active")
  setTimeout(() => {
    modal.remove()
    document.body.style.overflow = ""
  }, 300)
}

// Generate Star Rating HTML
function generateStarRating(rating) {
  // Check if generateStarRating function exists in product.js
  if (typeof window.generateStarRating === "function" && window.generateStarRating !== generateStarRating) {
    return window.generateStarRating(rating)
  }

  let stars = ""
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<i class="fas fa-star"></i>'
    } else if (i - 0.5 <= rating) {
      stars += '<i class="fas fa-star-half-alt"></i>'
    } else {
      stars += '<i class="far fa-star"></i>'
    }
  }
  return stars
}

// Get Product by ID
function getProductById(id) {
  // This is a placeholder. In a real application, you would fetch this from an API or a more comprehensive data source.
  // For now, we'll use the products array from the global scope if available
  if (window.products) {
    return window.products.find((product) => product.id === id)
  }

  // Fallback to dummy product if products array is not available
  return {
    id: id,
    name: "Product Name",
    price: 99.99,
    rating: 4.5,
    reviews: 10,
    image: "/placeholder.svg?height=300&width=300",
    description: "This is a product description.",
    category: "Category",
    tags: ["Tag 1", "Tag 2"],
  }
}

// Direct checkout function
function buyNow(productId, quantity = 1) {
  // Add product to cart
  addToCart(productId, quantity)

  // Redirect to checkout
  window.location.href = "checkout.html"
}

// Make functions available globally
window.showNotification = showNotification
window.addToCart = addToCart
window.updateCartCount = updateCartCount
window.showQuickView = showQuickView
window.generateStarRating = generateStarRating
window.getProductById = getProductById
window.updateWishlistButtonStates = updateWishlistButtonStates
window.buyNow = buyNow
