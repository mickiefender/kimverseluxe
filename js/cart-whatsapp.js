// WhatsApp integration for cart page

document.addEventListener("DOMContentLoaded", () => {
  console.log("Cart WhatsApp integration loaded")

  // Initialize Checkout button
  initCheckoutButton()
})

// Initialize Checkout button
function initCheckoutButton() {
  const checkoutBtn = document.getElementById("checkout-btn")

  if (!checkoutBtn) {
    console.error("Checkout button not found")
    return
  }

  // Override the default Checkout button click handler
  checkoutBtn.addEventListener("click", (e) => {
    e.preventDefault()

    // Check if cart is empty
    const cart = window.getCart ? window.getCart() : []

    if (!cart || !cart.length) {
      showNotification("Your cart is empty", "error")
      return
    }

    // Open WhatsApp with cart details
    if (typeof window.openWhatsAppWithCart === "function") {
      window.openWhatsAppWithCart()
    } else {
      console.error("openWhatsAppWithCart function not found")
      showNotification("WhatsApp integration not available", "error")
    }
  })

  console.log("Checkout button initialized for WhatsApp")
}

// Dummy function for showNotification (replace with your actual implementation)
function showNotification(message, type) {
  console.log(`Notification: ${message} (Type: ${type})`)
  // You can replace this with your actual notification implementation (e.g., using a library like Toastify)
}
