// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", () => {
  // Create theme toggle button
  createThemeToggle()

  // Initialize theme based on user preference or system preference
  initializeTheme()

  // Add event listener to theme toggle button
  const themeToggle = document.querySelector(".theme-toggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }
})

// Create theme toggle button and add it to the header
function createThemeToggle() {
  const headerActions = document.querySelector(".header-actions")
  const mobileNav = document.querySelector(".mobile-nav")

  if (headerActions) {
    // Create toggle button for desktop
    const themeToggle = document.createElement("div")
    themeToggle.className = "theme-toggle"
    themeToggle.setAttribute("aria-label", "Toggle dark/light mode")
    themeToggle.setAttribute("role", "button")
    themeToggle.setAttribute("tabindex", "0")
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'

    // Insert before the first child of header actions
    headerActions.insertBefore(themeToggle, headerActions.firstChild)

    // Add keyboard accessibility
    themeToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        toggleTheme()
      }
    })
  }

  if (mobileNav) {
    // Create toggle button for mobile
    const mobileThemeToggle = document.createElement("div")
    mobileThemeToggle.className = "theme-toggle mobile-theme-toggle"
    mobileThemeToggle.setAttribute("aria-label", "Toggle dark/light mode")
    mobileThemeToggle.setAttribute("role", "button")
    mobileThemeToggle.setAttribute("tabindex", "0")
    mobileThemeToggle.innerHTML = '<i class="fas fa-moon"></i>'

    // Insert after the mobile logo
    const mobileLogo = mobileNav.querySelector(".mobile-logo")
    if (mobileLogo) {
      mobileNav.insertBefore(mobileThemeToggle, mobileLogo.nextSibling)
    } else {
      mobileNav.appendChild(mobileThemeToggle)
    }

    // Add keyboard accessibility
    mobileThemeToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        toggleTheme()
      }
    })
  }
}

// Initialize theme based on user preference or system preference
function initializeTheme() {
  // Check if user has previously selected a theme
  const savedTheme = localStorage.getItem("theme")

  if (savedTheme) {
    // Apply saved theme
    document.documentElement.setAttribute("data-theme", savedTheme)
    updateThemeToggleIcon(savedTheme)
  } else {
    // Check system preference
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = prefersDarkMode ? "dark" : "light"

    document.documentElement.setAttribute("data-theme", initialTheme)
    updateThemeToggleIcon(initialTheme)

    // Save the initial theme
    localStorage.setItem("theme", initialTheme)
  }

  // Add transition class after initial theme is set
  // This prevents transition on page load
  setTimeout(() => {
    document.body.classList.add("theme-transition-enabled")
  }, 100)
}

// Toggle between light and dark themes
function toggleTheme() {
  // Get current theme
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light"
  const newTheme = currentTheme === "light" ? "dark" : "light"

  // Apply animation to theme toggle
  const themeToggles = document.querySelectorAll(".theme-toggle")
  themeToggles.forEach((toggle) => {
    toggle.classList.add("theme-changing")

    // Remove animation class after animation completes
    setTimeout(() => {
      toggle.classList.remove("theme-changing")
    }, 500)
  })

  // Update theme
  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)

  // Update icon
  updateThemeToggleIcon(newTheme)

  // Announce theme change for screen readers
  announceThemeChange(newTheme)
}

// Update the icon in the theme toggle button
function updateThemeToggleIcon(theme) {
  const themeToggles = document.querySelectorAll(".theme-toggle")

  themeToggles.forEach((toggle) => {
    const icon = toggle.querySelector("i")
    if (icon) {
      if (theme === "dark") {
        icon.className = "fas fa-sun"
      } else {
        icon.className = "fas fa-moon"
      }
    }
  })
}

// Announce theme change for accessibility
function announceThemeChange(theme) {
  const announcement = document.createElement("div")
  announcement.setAttribute("aria-live", "polite")
  announcement.className = "sr-only"
  announcement.textContent = `Theme changed to ${theme} mode`

  document.body.appendChild(announcement)

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 3000)
}

// Listen for system theme changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  // Only change theme if user hasn't manually set a preference
  if (!localStorage.getItem("theme")) {
    const newTheme = e.matches ? "dark" : "light"
    document.documentElement.setAttribute("data-theme", newTheme)
    updateThemeToggleIcon(newTheme)
  }
})
