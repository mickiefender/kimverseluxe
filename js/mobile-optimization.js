/**
 * Mobile Optimizations for Kimverse Luxe
 * Enhances the mobile experience with touch-friendly interactions and responsive adjustments
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize mobile optimizations
  initMobileMenu()
  initTouchOptimizations()
  initResponsiveAdjustments()
  initFloatingWhatsAppButton()
  initLazyLoading()
  initFastClick()
})

/**
 * Initialize mobile menu with improved touch interactions
 */
function initMobileMenu() {
  // Add this code to handle the mobile menu toggle functionality

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")
  const closeMenu = document.querySelector(".close-menu")
  const body = document.body

  // Create overlay element if it doesn't exist
  let mobileMenuOverlay = document.querySelector(".mobile-menu-overlay")
  if (!mobileMenuOverlay) {
    mobileMenuOverlay = document.createElement("div")
    mobileMenuOverlay.className = "mobile-menu-overlay"
    body.appendChild(mobileMenuOverlay)
  }

  // Toggle mobile menu
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.add("active")
      mobileMenuOverlay.classList.add("active")
      mobileMenuToggle.classList.add("active")
      body.style.overflow = "hidden" // Prevent scrolling when menu is open
    })
  }

  // Close mobile menu
  if (closeMenu) {
    closeMenu.addEventListener("click", closeMobileMenu)
  }

  // Close menu when clicking on overlay
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", closeMobileMenu)
  }

  // Close menu when clicking on menu links
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu nav a")
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  function closeMobileMenu() {
    mobileMenu.classList.remove("active")
    mobileMenuOverlay.classList.remove("active")
    mobileMenuToggle.classList.remove("active")
    body.style.overflow = "" // Restore scrolling
  }

  // Handle resize events
  window.addEventListener("resize", () => {
    if (window.innerWidth > 991 && mobileMenu.classList.contains("active")) {
      closeMobileMenu()
    }
  })

  // Add touch swipe to close menu (swipe right to left)
  let touchStartX = 0
  let touchEndX = 0

  mobileMenu.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX
    },
    false,
  )

  mobileMenu.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    },
    false,
  )

  function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
      // Swipe left
      closeMobileMenu()
    }
  }

  // Add touch-friendly submenu toggles
  const hasSubmenuItems = document.querySelectorAll(".mobile-menu .has-submenu")
  hasSubmenuItems.forEach((item) => {
    const submenuToggle = document.createElement("button")
    submenuToggle.className = "submenu-toggle"
    submenuToggle.innerHTML = '<i class="fas fa-chevron-down"></i>'
    item.appendChild(submenuToggle)

    submenuToggle.addEventListener("click", function (e) {
      e.preventDefault()
      e.stopPropagation()
      const submenu = item.querySelector(".submenu")
      if (submenu) {
        submenu.classList.toggle("active")
        this.classList.toggle("active")
      }
    })
  })
}

/**
 * Initialize touch-specific optimizations
 */
function initTouchOptimizations() {
  // Detect touch device
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

  if (isTouchDevice) {
    document.body.classList.add("touch-device")

    // Make product actions always visible on touch devices
    const productCards = document.querySelectorAll(".product-card")
    productCards.forEach((card) => {
      card.classList.add("touch-optimized")
    })

    // Improve form elements for touch
    const formElements = document.querySelectorAll("input, select, textarea, button")
    formElements.forEach((element) => {
      element.classList.add("touch-optimized")
    })

    // Add active state for buttons
    const buttons = document.querySelectorAll(".btn, .action-btn")
    buttons.forEach((button) => {
      button.addEventListener("touchstart", function () {
        this.classList.add("active")
      })

      button.addEventListener("touchend", function () {
        this.classList.remove("active")
      })
    })
  }
}

/**
 * Initialize responsive adjustments based on screen size
 */
function initResponsiveAdjustments() {
  // Handle shop filters on mobile
  const filterToggle = document.querySelector(".filter-toggle")
  const shopSidebar = document.querySelector(".shop-sidebar")
  const closeFilters = document.createElement("button")

  if (filterToggle && shopSidebar) {
    // Create close button for filters
    closeFilters.className = "close-filters"
    closeFilters.innerHTML = '<i class="fas fa-times"></i>'
    shopSidebar.querySelector(".shop-filters").prepend(closeFilters)

    // Toggle filters
    filterToggle.addEventListener("click", () => {
      shopSidebar.classList.add("active")
      document.body.style.overflow = "hidden"
    })

    // Close filters
    closeFilters.addEventListener("click", () => {
      shopSidebar.classList.remove("active")
      document.body.style.overflow = ""
    })

    // Close filters when clicking outside
    document.addEventListener("click", (event) => {
      if (
        shopSidebar.classList.contains("active") &&
        !shopSidebar.contains(event.target) &&
        !filterToggle.contains(event.target)
      ) {
        shopSidebar.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  // Responsive tabs
  const tabTriggers = document.querySelectorAll(".tab-trigger")

  if (tabTriggers.length > 0) {
    // Check if we need to scroll tabs into view on small screens
    const checkTabsOverflow = () => {
      const tabsContainer = document.querySelector(".tab-triggers")
      if (tabsContainer && window.innerWidth < 768) {
        if (tabsContainer.scrollWidth > tabsContainer.clientWidth) {
          tabsContainer.classList.add("scrollable")
        } else {
          tabsContainer.classList.remove("scrollable")
        }
      }
    }

    // Initial check
    checkTabsOverflow()

    // Check on resize
    window.addEventListener("resize", checkTabsOverflow)

    // Scroll active tab into view
    tabTriggers.forEach((trigger) => {
      trigger.addEventListener("click", function () {
        if (window.innerWidth < 768) {
          this.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
        }
      })
    })
  }

  // Responsive product gallery
  const productGallery = document.querySelector(".product-gallery")
  if (productGallery) {
    const mainImage = productGallery.querySelector(".main-image img")
    const thumbnails = productGallery.querySelectorAll(".gallery-thumbnails img")

    // Make thumbnails work with touch
    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", function () {
        // Remove active class from all thumbnails
        thumbnails.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked thumbnail
        this.classList.add("active")

        // Update main image
        if (mainImage) {
          mainImage.src = this.src
          mainImage.alt = this.alt
        }
      })
    })

    // Add swipe support for product gallery
    if (mainImage) {
      let touchStartX = 0
      let touchEndX = 0

      mainImage.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX
      })

      mainImage.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      })

      function handleSwipe() {
        const threshold = 50 // Minimum swipe distance

        if (touchEndX < touchStartX - threshold) {
          // Swipe left - next image
          const activeThumb = productGallery.querySelector(".gallery-thumbnails img.active")
          const nextThumb = activeThumb ? activeThumb.nextElementSibling : null

          if (nextThumb) {
            nextThumb.click()
          }
        }

        if (touchEndX > touchStartX + threshold) {
          // Swipe right - previous image
          const activeThumb = productGallery.querySelector(".gallery-thumbnails img.active")
          const prevThumb = activeThumb ? activeThumb.previousElementSibling : null

          if (prevThumb) {
            prevThumb.click()
          }
        }
      }
    }
  }
}

/**
 * Initialize floating WhatsApp button
 */
function initFloatingWhatsAppButton() {
  // Create floating WhatsApp button if it doesn't exist
  if (!document.querySelector(".whatsapp-floating-button")) {
    const whatsappButton = document.createElement("div")
    whatsappButton.className = "whatsapp-floating-button"
    whatsappButton.innerHTML = `
      <i class="fab fa-whatsapp"></i>
      <span class="whatsapp-tooltip">Chat with us</span>
    `

    document.body.appendChild(whatsappButton)

    // Add click event
    whatsappButton.addEventListener("click", () => {
      // Replace with your WhatsApp number
      const whatsappNumber = "233123456789"
      const message = "Hello, I would like to know more about your products."

      // Open WhatsApp
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank")
    })
  }
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
  // Check if browser supports Intersection Observer
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img[data-src]")

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src

          // Load high-resolution image if available
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset
          }

          img.classList.add("loaded")
          observer.unobserve(img)
        }
      })
    })

    lazyImages.forEach((img) => {
      imageObserver.observe(img)
    })
  } else {
    // Fallback for browsers that don't support Intersection Observer
    const lazyImages = document.querySelectorAll("img[data-src]")

    function lazyLoad() {
      lazyImages.forEach((img) => {
        if (isInViewport(img)) {
          img.src = img.dataset.src

          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset
          }

          img.classList.add("loaded")
        }
      })
    }

    // Check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    }

    // Load images initially
    lazyLoad()

    // Load more images on scroll
    window.addEventListener("scroll", lazyLoad)
    window.addEventListener("resize", lazyLoad)
  }
}

/**
 * Initialize FastClick to eliminate 300ms delay on touch devices
 */
function initFastClick() {
  // Simple implementation of FastClick
  document.addEventListener("touchstart", () => {}, { passive: true })

  // Add active state to buttons on touch
  const buttons = document.querySelectorAll("button, .btn, .action-btn")
  buttons.forEach((button) => {
    button.addEventListener(
      "touchstart",
      function () {
        this.classList.add("touch-active")
      },
      { passive: true },
    )

    button.addEventListener(
      "touchend",
      function () {
        this.classList.remove("touch-active")
      },
      { passive: true },
    )
  })
}

/**
 * Detect screen orientation changes and adjust UI accordingly
 */
window.addEventListener("orientationchange", () => {
  // Delay execution to ensure DOM has updated
  setTimeout(() => {
    // Adjust hero slider height for landscape mode
    const heroSlider = document.querySelector(".hero-slider")
    if (heroSlider) {
      if (window.orientation === 90 || window.orientation === -90) {
        // Landscape
        heroSlider.style.height = "300px"
      } else {
        // Portrait - reset to CSS values
        heroSlider.style.height = ""
      }
    }

    // Adjust product gallery layout for landscape mode
    const productDetail = document.querySelector(".product-detail")
    if (productDetail && window.innerWidth <= 767) {
      if (window.orientation === 90 || window.orientation === -90) {
        // Landscape
        productDetail.classList.add("landscape-layout")
      } else {
        // Portrait
        productDetail.classList.remove("landscape-layout")
      }
    }
  }, 300)
})

/**
 * Add customer information form for WhatsApp integration
 */
function initCustomerForm() {
  // Create modal if it doesn't exist
  if (!document.querySelector(".customer-form-modal")) {
    const modal = document.createElement("div")
    modal.className = "customer-form-modal"
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Customer Information</h3>
          <button class="close-modal">&times;</button>
        </div>
        <form id="customer-info-form">
          <div class="form-group">
            <label for="customer-name">Full Name *</label>
            <input type="text" id="customer-name" name="name" required>
          </div>
          <div class="form-group">
            <label for="customer-email">Email *</label>
            <input type="email" id="customer-email" name="email" required>
          </div>
          <div class="form-group">
            <label for="customer-phone">Phone Number *</label>
            <input type="tel" id="customer-phone" name="phone" required>
          </div>
          <div class="form-group">
            <label for="customer-address">Delivery Address *</label>
            <input type="text" id="customer-address" name="address" required>
          </div>
          <div class="form-group">
            <label for="customer-notes">Order Notes (Optional)</label>
            <textarea id="customer-notes" name="notes"></textarea>
          </div>
          <div class="form-actions">
            <button type="button" class="btn outline-btn cancel-form">Cancel</button>
            <button type="submit" class="btn primary-btn">Continue to WhatsApp</button>
          </div>
        </form>
      </div>
    `

    document.body.appendChild(modal)

    // Close modal
    const closeModal = modal.querySelector(".close-modal")
    const cancelForm = modal.querySelector(".cancel-form")

    closeModal.addEventListener("click", () => {
      modal.classList.remove("active")
      document.body.style.overflow = ""
    })

    cancelForm.addEventListener("click", () => {
      modal.classList.remove("active")
      document.body.style.overflow = ""
    })

    // Submit form
    const form = modal.querySelector("#customer-info-form")
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(form)
      const customerInfo = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        notes: formData.get("notes"),
      }

      // Close modal
      modal.classList.remove("active")
      document.body.style.overflow = ""

      // Trigger WhatsApp message with customer info
      if (typeof openWhatsAppWithCustomerInfo === "function") {
        openWhatsAppWithCustomerInfo(customerInfo)
      }
    })
  }
}

/**
 * Show customer information form
 */
function showCustomerForm() {
  // Initialize form if it doesn't exist
  initCustomerForm()

  // Show modal
  const modal = document.querySelector(".customer-form-modal")
  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

/**
 * Open WhatsApp with customer information
 */
function openWhatsAppWithCustomerInfo(customerInfo) {
  // Replace with your WhatsApp number
  const whatsappNumber = "233123456789"

  // Create message with customer info
  let message = "Hello, I would like to place an order.\n\n"
  message += `*Customer Information*\n`
  message += `Name: ${customerInfo.name}\n`
  message += `Email: ${customerInfo.email}\n`
  message += `Phone: ${customerInfo.phone}\n`
  message += `Address: ${customerInfo.address}\n`

  if (customerInfo.notes) {
    message += `Notes: ${customerInfo.notes}\n`
  }

  // Add order details if available
  let cartItems = []
  let cartTotal = 0

  // Mock functions for demonstration purposes. Replace with your actual cart logic.
  function getCartItems() {
    return [
      { name: "Product 1", quantity: 2, price: 25.0 },
      { name: "Product 2", quantity: 1, price: 50.0 },
    ]
  }

  function getCartTotal() {
    let total = 0
    const items = getCartItems()
    items.forEach((item) => {
      total += item.quantity * item.price
    })
    return total
  }

  if (typeof getCartItems === "function") {
    cartItems = getCartItems()
  }

  if (typeof getCartTotal === "function") {
    cartTotal = getCartTotal()
  }

  if (cartItems && cartItems.length > 0) {
    message += "\n*Order Details*\n"

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${item.quantity} x ₵${item.price.toFixed(2)}\n`
    })

    // Add total
    message += `\n*Total: ₵${cartTotal.toFixed(2)}*`
  }

  // Open WhatsApp
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank")
}

// Make functions available globally
window.showCustomerForm = showCustomerForm
window.openWhatsAppWithCustomerInfo = openWhatsAppWithCustomerInfo
