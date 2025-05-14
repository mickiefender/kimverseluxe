// Payment Processor Integration for Kimverse Luxe
// This file handles payment processing and webhook handling

// Initialize payment processor
document.addEventListener("DOMContentLoaded", () => {
  console.log("Payment processor initialized")

  // Initialize payment forms if on checkout page
  if (document.querySelector(".payment-form")) {
    initPaymentForms()
  }
})

// Initialize payment forms
function initPaymentForms() {
  // Mobile Money payment form
  const mobileMoneyForm = document.getElementById("mobile-money-form")
  if (mobileMoneyForm) {
    mobileMoneyForm.addEventListener("submit", handleMobileMoneyPayment)
  }

  // Card payment form
  const cardPaymentForm = document.getElementById("card-payment-form")
  if (cardPaymentForm) {
    cardPaymentForm.addEventListener("submit", handleCardPayment)
  }

  // Bank transfer form
  const bankTransferForm = document.getElementById("bank-transfer-form")
  if (bankTransferForm) {
    bankTransferForm.addEventListener("submit", handleBankTransfer)
  }
}

// Handle Mobile Money payment
function handleMobileMoneyPayment(event) {
  event.preventDefault()

  // Get form data
  const form = event.target
  const mobileNumber = form.querySelector("#mobile-number").value
  const provider = form.querySelector('input[name="mobile-provider"]:checked').value
  const amount = form.getAttribute("data-amount")
  const orderId = form.getAttribute("data-order-id")

  // Show loading state
  showPaymentProcessing(form)

  // In a real application, you would call your payment gateway API here
  // For demo purposes, we'll simulate a payment process
  simulatePaymentProcess(orderId, amount, {
    method: "mobile_money",
    provider,
    mobileNumber,
  })
}

// Handle Card payment
function handleCardPayment(event) {
  event.preventDefault()

  // Get form data
  const form = event.target
  const cardNumber = form.querySelector("#card-number").value.replace(/\s/g, "")
  const cardName = form.querySelector("#card-name").value
  const expiryDate = form.querySelector("#card-expiry").value
  const cvv = form.querySelector("#card-cvv").value
  const amount = form.getAttribute("data-amount")
  const orderId = form.getAttribute("data-order-id")

  // Show loading state
  showPaymentProcessing(form)

  // In a real application, you would call your payment gateway API here
  // For demo purposes, we'll simulate a payment process
  simulatePaymentProcess(orderId, amount, {
    method: "card",
    cardNumber: maskCardNumber(cardNumber),
    cardName,
    expiryDate,
  })
}

// Handle Bank Transfer
function handleBankTransfer(event) {
  event.preventDefault()

  // Get form data
  const form = event.target
  const bankName = form.querySelector("#bank-name").value
  const accountName = form.querySelector("#account-name").value
  const amount = form.getAttribute("data-amount")
  const orderId = form.getAttribute("data-order-id")

  // Show loading state
  showPaymentProcessing(form)

  // For bank transfers, we'll mark the payment as pending and provide instructions
  showBankTransferInstructions(orderId, amount, bankName)
}

// Show payment processing state
function showPaymentProcessing(form) {
  // Disable form inputs
  const inputs = form.querySelectorAll("input, button, select")
  inputs.forEach((input) => {
    input.disabled = true
  })

  // Change submit button text
  const submitButton = form.querySelector('button[type="submit"]')
  if (submitButton) {
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'
  }

  // Show processing message
  showNotification("Processing your payment...", "info")
}

// Simulate payment process (for demo purposes)
function simulatePaymentProcess(orderId, amount, paymentDetails) {
  console.log(`Simulating payment for order ${orderId} of amount ₵${amount}`)
  console.log("Payment details:", paymentDetails)

  // Generate a transaction ID
  const transactionId = generateTransactionId()

  // Simulate API call delay
  setTimeout(() => {
    // Simulate 90% success rate
    const isSuccessful = Math.random() < 0.9

    if (isSuccessful) {
      // Payment successful
      handleSuccessfulPayment(orderId, transactionId, amount)
    } else {
      // Payment failed
      handleFailedPayment(orderId, "Payment declined by provider")
    }
  }, 2000)
}

// Handle successful payment
function handleSuccessfulPayment(orderId, transactionId, amount) {
  console.log(`Payment successful for order ${orderId}: ${transactionId}`)

  // Record payment in order system
  if (typeof window.recordPayment === "function") {
    window.recordPayment(orderId, transactionId, "completed")
  }

  // Show success message
  showNotification("Payment successful! Your order has been confirmed.", "success")

  // Redirect to order confirmation page
  setTimeout(() => {
    window.location.href = `order-confirmation.html?id=${orderId}`
  }, 1500)
}

// Handle failed payment
function handleFailedPayment(orderId, reason) {
  console.log(`Payment failed for order ${orderId}: ${reason}`)

  // Record failed payment in order system
  if (typeof window.recordPayment === "function") {
    window.recordPayment(orderId, null, "failed")
  }

  // Show error message
  showNotification(`Payment failed: ${reason}. Please try again or use a different payment method.`, "error")

  // Re-enable payment form
  const paymentForms = document.querySelectorAll(".payment-form")
  paymentForms.forEach((form) => {
    // Enable form inputs
    const inputs = form.querySelectorAll("input, button, select")
    inputs.forEach((input) => {
      input.disabled = false
    })

    // Reset submit button text
    const submitButton = form.querySelector('button[type="submit"]')
    if (submitButton) {
      submitButton.textContent = "Pay Now"
    }
  })
}

// Show bank transfer instructions
function showBankTransferInstructions(orderId, amount, bankName) {
  // Create a transaction reference
  const reference = `KL-${orderId}`

  // Create modal with bank details
  const modal = document.createElement("div")
  modal.className = "modal bank-transfer-modal"
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Bank Transfer Instructions</h3>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <p>Please transfer the exact amount to the following bank account:</p>
        <div class="bank-details">
          <div class="detail-row">
            <span class="detail-label">Bank:</span>
            <span class="detail-value">Kimverse Bank</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Account Name:</span>
            <span class="detail-value">Kimverse Luxe Ltd</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Account Number:</span>
            <span class="detail-value">1234567890</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Branch:</span>
            <span class="detail-value">Main Branch</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Amount:</span>
            <span class="detail-value">₵${amount}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Reference:</span>
            <span class="detail-value">${reference}</span>
          </div>
        </div>
        <div class="important-note">
          <p><strong>Important:</strong> Please include the reference number in your transfer description so we can match your payment to your order.</p>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary confirm-btn">I've Completed the Transfer</button>
        <button class="btn btn-outline cancel-btn">Cancel</button>
      </div>
    </div>
  `

  // Add to DOM
  document.body.appendChild(modal)
  document.body.style.overflow = "hidden"

  // Add event listeners
  const closeBtn = modal.querySelector(".close-modal")
  closeBtn.addEventListener("click", () => {
    closeModal(modal)
  })

  const cancelBtn = modal.querySelector(".cancel-btn")
  cancelBtn.addEventListener("click", () => {
    closeModal(modal)
  })

  const confirmBtn = modal.querySelector(".confirm-btn")
  confirmBtn.addEventListener("click", () => {
    // Record pending payment
    if (typeof window.recordPayment === "function") {
      window.recordPayment(orderId, reference, "pending")
    }

    // Show confirmation message
    showNotification("Thank you! We'll process your order once we confirm your payment.", "success")

    // Redirect to order confirmation page
    setTimeout(() => {
      window.location.href = `order-confirmation.html?id=${orderId}`
    }, 1500)

    closeModal(modal)
  })

  // Close on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal)
    }
  })

  // Show modal with animation
  setTimeout(() => {
    modal.classList.add("active")
  }, 10)
}

// Close modal
function closeModal(modal) {
  modal.classList.remove("active")
  setTimeout(() => {
    modal.remove()
    document.body.style.overflow = ""
  }, 300)
}

// Generate transaction ID
function generateTransactionId() {
  const prefix = "TXN"
  const timestamp = new Date().getTime().toString().slice(-8)
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `${prefix}${timestamp}${random}`
}

// Mask card number for security
function maskCardNumber(cardNumber) {
  return cardNumber.slice(0, 4) + " **** **** " + cardNumber.slice(-4)
}

// Show notification
function showNotification(message, type = "success") {
  // Check if showNotification function exists in global scope
  if (typeof window.showNotification === "function") {
    window.showNotification(message, type)
    return
  }

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
  }, 3000)
}

// Process payment webhook (for API endpoints)
function processPaymentWebhook(webhookData) {
  // Validate webhook signature (in a real app)
  if (!validateWebhookSignature(webhookData)) {
    return {
      success: false,
      message: "Invalid webhook signature",
    }
  }

  // Process the webhook data
  if (typeof window.handlePaymentWebhook === "function") {
    return window.handlePaymentWebhook(webhookData)
  }

  return {
    success: false,
    message: "Payment webhook handler not available",
  }
}

// Validate webhook signature (mock function)
function validateWebhookSignature(webhookData) {
  // In a real application, you would verify the signature from your payment provider
  // For demo purposes, we'll always return true
  return true
}

// Make functions available globally
window.handleMobileMoneyPayment = handleMobileMoneyPayment
window.handleCardPayment = handleCardPayment
window.handleBankTransfer = handleBankTransfer
window.processPaymentWebhook = processPaymentWebhook
