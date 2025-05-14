// WhatsApp integration for product detail page

document.addEventListener("DOMContentLoaded", () => {
  console.log("Product WhatsApp integration loaded")

  // Initialize Buy Now button
  initBuyNowButton()
})

// Initialize Buy Now button
function initBuyNowButton() {
  const buyNowBtn = document.getElementById("buy-now-btn")

  if (!buyNowBtn) {
    console.error("Buy Now button not found")
    return
  }

  // Override the default Buy Now button click handler
  buyNowBtn.addEventListener("click", (e) => {
    e.preventDefault()

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get("id")

    if (!productId) {
      console.error("No product ID found in URL")
      showNotification("Product not found", "error")
      return
    }

    // Get quantity
    const quantityInput = document.getElementById("product-quantity")
    const quantity = quantityInput ? Number.parseInt(quantityInput.value) : 1

    // Open WhatsApp with product details
    if (typeof window.openWhatsAppWithProduct === "function") {
      window.openWhatsAppWithProduct(productId, quantity)
    } else {
      console.error("openWhatsAppWithProduct function not found")
      showNotification("WhatsApp integration not available", "error")
    }
  })

  console.log("Buy Now button initialized for WhatsApp")
}

// Mock showNotification function (replace with your actual implementation)
function showNotification(message, type) {
  console.log(`Notification: ${message} (Type: ${type})`)
  // You can replace this with your actual notification implementation
  // For example, using a library like SweetAlert or creating a custom notification element
}
