// Contact Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Initialize FAQ accordion
  initFaqAccordion()

  // Initialize contact form
  initContactForm()

  // Initialize newsletter form
  initNewsletterForm()
})

/**
 * Initialize FAQ accordion functionality
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      // Check if this item is already active
      const isActive = item.classList.contains("active")

      // Close all FAQ items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active")
      })

      // If the clicked item wasn't active, make it active
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })
}

/**
 * Initialize contact form submission
 */
function initContactForm() {
  const contactForm = document.getElementById("contact-form")
  const formSuccess = document.getElementById("form-success")
  const formError = document.getElementById("form-error")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      }

      // Validate form data
      if (!validateContactForm(formData)) {
        return
      }

      // Simulate form submission (in a real application, you would send this to a server)
      simulateFormSubmission(formData)
        .then(() => {
          // Show success message
          formSuccess.style.display = "flex"
          formError.style.display = "none"

          // Reset form
          contactForm.reset()

          // Hide success message after 5 seconds
          setTimeout(() => {
            formSuccess.style.display = "none"
          }, 5000)
        })
        .catch(() => {
          // Show error message
          formError.style.display = "flex"
          formSuccess.style.display = "none"

          // Hide error message after 5 seconds
          setTimeout(() => {
            formError.style.display = "none"
          }, 5000)
        })
    })
  }
}

/**
 * Validate contact form data
 * @param {Object} formData - The form data to validate
 * @returns {boolean} - Whether the form data is valid
 */
function validateContactForm(formData) {
  // Check if name is valid
  if (!formData.name || formData.name.trim() === "") {
    alert("Please enter your name.")
    return false
  }

  // Check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email || !emailRegex.test(formData.email)) {
    alert("Please enter a valid email address.")
    return false
  }

  // Check if subject is valid
  if (!formData.subject || formData.subject.trim() === "") {
    alert("Please enter a subject.")
    return false
  }

  // Check if message is valid
  if (!formData.message || formData.message.trim() === "") {
    alert("Please enter your message.")
    return false
  }

  return true
}

/**
 * Simulate form submission (in a real application, this would be an API call)
 * @param {Object} formData - The form data to submit
 * @returns {Promise} - A promise that resolves when the form is submitted
 */
function simulateFormSubmission(formData) {
  return new Promise((resolve, reject) => {
    // Simulate network request
    setTimeout(() => {
      // Simulate successful submission (90% success rate)
      const isSuccess = Math.random() < 0.9

      if (isSuccess) {
        console.log("Form submitted successfully:", formData)
        resolve()
      } else {
        console.error("Error submitting form:", formData)
        reject()
      }
    }, 1500) // Simulate 1.5 second network delay
  })
}

/**
 * Initialize newsletter form submission
 */
function initNewsletterForm() {
  const newsletterForm = document.getElementById("newsletter-form")
  const newsletterSuccess = document.getElementById("newsletter-success")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get email from form
      const email = newsletterForm.querySelector('input[type="email"]').value

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email || !emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate newsletter subscription
      setTimeout(() => {
        // Show success message
        newsletterSuccess.style.display = "block"

        // Reset form
        newsletterForm.reset()

        // Hide success message after 5 seconds
        setTimeout(() => {
          newsletterSuccess.style.display = "none"
        }, 5000)
      }, 1000)
    })
  }
}

/**
 * Add Google Maps functionality (if needed in the future)
 * Note: This is a placeholder function for future implementation
 */
function initGoogleMap() {
  // This would be implemented if we need custom Google Maps functionality
  // beyond the basic iframe embedding
  console.log("Google Maps initialization would go here")
}

/**
 * Store locator functionality (if needed in the future)
 * Note: This is a placeholder function for future implementation
 */
function initStoreLocator() {
  // This would be implemented if we need a more interactive store locator
  console.log("Store locator functionality would go here")
}
