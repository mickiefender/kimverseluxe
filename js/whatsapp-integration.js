/**
 * WhatsApp Integration for Kimverse Luxe
 * Enables direct communication with customers via WhatsApp
 */

// WhatsApp number (replace with your actual number)
const sellerWhatsApp = "233208517482"

// Initialize WhatsApp integration
document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppIntegration()
  initFloatingWhatsAppButton()
})

/**
 * Initialize WhatsApp integration
 */
function initWhatsAppIntegration() {
  // Add event listeners to Buy Now button
  const buyNowBtn = document.getElementById("buy-now-btn")
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      showCustomerForm()
    })
  }

  // Add event listeners to Checkout button
  const checkoutBtn = document.getElementById("checkout-btn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", (e) => {
      e.preventDefault()
      showCustomerForm()
    })
  }
}

/**
 * Format a product for WhatsApp message
 * @param {Object} product - The product object
 * @param {number} quantity - The quantity selected
 * @param {string} color - The selected color (optional)
 * @param {string} size - The selected size (optional)
 * @param {Object} customerInfo - Customer information (optional)
 * @returns {string} - Formatted WhatsApp message
 */
function formatProductForWhatsApp(product, quantity = 1, color = null, size = null, customerInfo = null) {
  if (!product) return ""

  // Format price with currency symbol
  const formattedPrice = `₵${product.price.toFixed(2)}`

  // Calculate total
  const total = product.price * quantity
  const formattedTotal = `₵${total.toFixed(2)}`

  // Build message
  let message = `*Order from Kimverse Luxe*\n\n`

  // Add customer information if provided
  if (customerInfo) {
    message += `*Customer Information:*\n`
    if (customerInfo.name) message += `Name: ${customerInfo.name}\n`
    if (customerInfo.email) message += `Email: ${customerInfo.email}\n`
    if (customerInfo.phone) message += `Phone: ${customerInfo.phone}\n`
    if (customerInfo.address) message += `Address: ${customerInfo.address}\n`
    message += `\n`
  }

  message += `*Product:* ${product.name}\n`
  message += `*Price:* ${formattedPrice}\n`
  message += `*Quantity:* ${quantity}\n`

  // Add color if selected
  if (color) {
    message += `*Color:* ${color}\n`
  }

  // Add size if selected
  if (size) {
    message += `*Size:* ${size}\n`
  }

  message += `*Total:* ${formattedTotal}\n\n`
  message += `*Product Link:* ${window.location.origin}/product.html?id=${product.id}\n\n`
  message += `I would like to order this item. Please provide payment and delivery details.`

  return encodeURIComponent(message)
}

/**
 * Format cart items for WhatsApp message
 * @param {Array} cartItems - Array of cart items with product details
 * @param {Object} customerInfo - Customer information (optional)
 * @returns {string} - Formatted WhatsApp message
 */
function formatCartForWhatsApp(cartItems, customerInfo = null) {
  if (!cartItems || !cartItems.length) return ""

  // Calculate cart totals
  const subtotal = window.calculateCartSubtotal
    ? window.calculateCartSubtotal()
    : cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)

  const shipping = window.calculateShippingCost ? window.calculateShippingCost() : 0
  const discount = window.calculateDiscount ? window.calculateDiscount() : 0
  const total = window.calculateCartTotal ? window.calculateCartTotal() : subtotal + shipping - discount

  // Build message
  let message = `*Cart Order from Kimverse Luxe*\n\n`

  // Add customer information if provided
  if (customerInfo) {
    message += `*Customer Information:*\n`
    if (customerInfo.name) message += `Name: ${customerInfo.name}\n`
    if (customerInfo.email) message += `Email: ${customerInfo.email}\n`
    if (customerInfo.phone) message += `Phone: ${customerInfo.phone}\n`
    if (customerInfo.address) message += `Address: ${customerInfo.address}\n`
    message += `\n`
  }

  message += `*Items:*\n`

  // Add each item
  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.product.name} - ${item.quantity} x ₵${item.product.price.toFixed(2)} = ₵${(item.product.price * item.quantity).toFixed(2)}\n`
  })

  message += `\n*Subtotal:* ₵${subtotal.toFixed(2)}\n`

  if (shipping > 0) {
    message += `*Shipping:* ₵${shipping.toFixed(2)}\n`
  } else {
    message += `*Shipping:* Free\n`
  }

  if (discount > 0) {
    message += `*Discount:* ₵${discount.toFixed(2)}\n`
  }

  message += `*Total:* ₵${total.toFixed(2)}\n\n`
  message += `I would like to order these items. Please provide payment and delivery details.`

  return encodeURIComponent(message)
}

/**
 * Create product image card for sharing
 * @param {Object} product - The product object
 * @param {number} quantity - The quantity selected
 * @param {string} color - The selected color (optional)
 * @param {string} size - The selected size (optional)
 * @param {Object} customerInfo - Customer information (optional)
 * @returns {Promise<string>} - Promise resolving to image data URL
 */
async function createProductImageCard(product, quantity = 1, color = null, size = null, customerInfo = null) {
  return new Promise((resolve, reject) => {
    try {
      // Create canvas
      const canvas = document.createElement("canvas")
      canvas.width = 800
      canvas.height = 1000
      const ctx = canvas.getContext("2d")

      // Fill background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw header
      ctx.fillStyle = "#25d366" // WhatsApp green
      ctx.fillRect(0, 0, canvas.width, 100)

      // Draw header text
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 36px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Kimverse Luxe Order", canvas.width / 2, 60)

      // Load product image
      const img = new Image()
      img.crossOrigin = "anonymous" // Prevent CORS issues

      img.onload = () => {
        // Calculate image dimensions to maintain aspect ratio
        const imgWidth = 400
        const imgHeight = (img.height / img.width) * imgWidth

        // Draw product image
        ctx.drawImage(img, (canvas.width - imgWidth) / 2, 120, imgWidth, imgHeight)

        // Draw product details
        ctx.fillStyle = "#000000"
        ctx.textAlign = "left"
        let y = 120 + imgHeight + 40

        // Product name
        ctx.font = "bold 28px Arial"
        ctx.fillText(product.name, 50, y)
        y += 40

        // Product details
        ctx.font = "24px Arial"
        ctx.fillText(`Price: ₵${product.price.toFixed(2)}`, 50, y)
        y += 35

        ctx.fillText(`Quantity: ${quantity}`, 50, y)
        y += 35

        if (color) {
          ctx.fillText(`Color: ${color}`, 50, y)
          y += 35
        }

        if (size) {
          ctx.fillText(`Size: ${size}`, 50, y)
          y += 35
        }

        // Total
        const total = product.price * quantity
        ctx.font = "bold 28px Arial"
        ctx.fillText(`Total: ₵${total.toFixed(2)}`, 50, y)
        y += 50

        // Customer info if provided
        if (customerInfo) {
          ctx.font = "bold 28px Arial"
          ctx.fillText("Customer Information", 50, y)
          y += 40

          ctx.font = "24px Arial"
          if (customerInfo.name) {
            ctx.fillText(`Name: ${customerInfo.name}`, 50, y)
            y += 35
          }

          if (customerInfo.phone) {
            ctx.fillText(`Phone: ${customerInfo.phone}`, 50, y)
            y += 35
          }

          if (customerInfo.email) {
            ctx.fillText(`Email: ${customerInfo.email}`, 50, y)
            y += 35
          }

          if (customerInfo.address) {
            ctx.fillText(`Address: ${customerInfo.address}`, 50, y)
            y += 35
          }
        }

        // Footer
        ctx.fillStyle = "#25d366"
        ctx.fillRect(0, canvas.height - 60, canvas.width, 60)

        ctx.fillStyle = "#ffffff"
        ctx.font = "20px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Thank you for shopping with Kimverse Luxe!", canvas.width / 2, canvas.height - 25)

        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8)
        resolve(dataUrl)
      }

      img.onerror = () => {
        // If image fails to load, continue with a placeholder
        ctx.fillStyle = "#f0f0f0"
        ctx.fillRect((canvas.width - 400) / 2, 120, 400, 300)

        ctx.fillStyle = "#999999"
        ctx.font = "24px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Product Image Not Available", canvas.width / 2, 270)

        // Continue with the rest of the card
        // Draw product details
        ctx.fillStyle = "#000000"
        ctx.textAlign = "left"
        let y = 120 + 300 + 40

        // Product name
        ctx.font = "bold 28px Arial"
        ctx.fillText(product.name, 50, y)
        y += 40

        // Product details
        ctx.font = "24px Arial"
        ctx.fillText(`Price: ₵${product.price.toFixed(2)}`, 50, y)
        y += 35

        ctx.fillText(`Quantity: ${quantity}`, 50, y)
        y += 35

        if (color) {
          ctx.fillText(`Color: ${color}`, 50, y)
          y += 35
        }

        if (size) {
          ctx.fillText(`Size: ${size}`, 50, y)
          y += 35
        }

        // Total
        const total = product.price * quantity
        ctx.font = "bold 28px Arial"
        ctx.fillText(`Total: ₵${total.toFixed(2)}`, 50, y)
        y += 50

        // Customer info if provided
        if (customerInfo) {
          ctx.font = "bold 28px Arial"
          ctx.fillText("Customer Information", 50, y)
          y += 40

          ctx.font = "24px Arial"
          if (customerInfo.name) {
            ctx.fillText(`Name: ${customerInfo.name}`, 50, y)
            y += 35
          }

          if (customerInfo.phone) {
            ctx.fillText(`Phone: ${customerInfo.phone}`, 50, y)
            y += 35
          }

          if (customerInfo.email) {
            ctx.fillText(`Email: ${customerInfo.email}`, 50, y)
            y += 35
          }

          if (customerInfo.address) {
            ctx.fillText(`Address: ${customerInfo.address}`, 50, y)
            y += 35
          }
        }

        // Footer
        ctx.fillStyle = "#25d366"
        ctx.fillRect(0, canvas.height - 60, canvas.width, 60)

        ctx.fillStyle = "#ffffff"
        ctx.font = "20px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Thank you for shopping with Kimverse Luxe!", canvas.width / 2, canvas.height - 25)

        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8)
        resolve(dataUrl)
      }

      // Set image source - use product image or placeholder
      if (product.image && product.image.startsWith("http")) {
        img.src = product.image
      } else if (product.image) {
        img.src = window.location.origin + product.image
      } else {
        img.src = window.location.origin + "/placeholder.svg?height=400&width=400"
      }
    } catch (error) {
      console.error("Error creating product image card:", error)
      reject(error)
    }
  })
}

/**
 * Create cart image card for sharing
 * @param {Array} cartItems - Array of cart items with product details
 * @param {Object} customerInfo - Customer information (optional)
 * @returns {Promise<string>} - Promise resolving to image data URL
 */
async function createCartImageCard(cartItems, customerInfo = null) {
  return new Promise((resolve, reject) => {
    try {
      // Calculate totals
      const subtotal = window.calculateCartSubtotal
        ? window.calculateCartSubtotal()
        : cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)

      const shipping = window.calculateShippingCost ? window.calculateShippingCost() : 0
      const discount = window.calculateDiscount ? window.calculateDiscount() : 0
      const total = window.calculateCartTotal ? window.calculateCartTotal() : subtotal + shipping - discount

      // Create canvas
      const canvas = document.createElement("canvas")
      canvas.width = 800
      // Dynamic height based on number of items
      const baseHeight = 600 // Base height
      const itemHeight = 150 // Height per item
      const customerInfoHeight = customerInfo ? 200 : 0 // Extra height for customer info
      canvas.height = baseHeight + cartItems.length * itemHeight + customerInfoHeight

      const ctx = canvas.getContext("2d")

      // Fill background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw header
      ctx.fillStyle = "#25d366" // WhatsApp green
      ctx.fillRect(0, 0, canvas.width, 100)

      // Draw header text
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 36px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Kimverse Luxe Cart Order", canvas.width / 2, 60)

      // Start y position for content
      let y = 120

      // Draw cart items
      ctx.textAlign = "left"
      ctx.font = "bold 28px Arial"
      ctx.fillStyle = "#000000"
      ctx.fillText("Cart Items:", 50, y)
      y += 40

      // Load and draw product images and details
      const loadImages = cartItems.map((item, index) => {
        return new Promise((resolveItem) => {
          const product = item.product
          const img = new Image()
          img.crossOrigin = "anonymous" // Prevent CORS issues

          img.onload = () => {
            // Draw item background
            ctx.fillStyle = index % 2 === 0 ? "#f9f9f9" : "#f0f0f0"
            ctx.fillRect(0, y, canvas.width, itemHeight)

            // Draw product image
            const imgSize = 100
            ctx.drawImage(img, 50, y + 10, imgSize, imgSize)

            // Draw product details
            ctx.fillStyle = "#000000"
            ctx.font = "bold 24px Arial"
            ctx.fillText(product.name, 170, y + 40)

            ctx.font = "20px Arial"
            ctx.fillText(
              `${item.quantity} x ₵${product.price.toFixed(2)} = ₵${(product.price * item.quantity).toFixed(2)}`,
              170,
              y + 70,
            )

            // Update y position for next item
            y += itemHeight
            resolveItem()
          }

          img.onerror = () => {
            // If image fails to load, draw a placeholder
            // Draw item background
            ctx.fillStyle = index % 2 === 0 ? "#f9f9f9" : "#f0f0f0"
            ctx.fillRect(0, y, canvas.width, itemHeight)

            // Draw placeholder
            ctx.fillStyle = "#cccccc"
            ctx.fillRect(50, y + 10, 100, 100)

            ctx.fillStyle = "#999999"
            ctx.font = "16px Arial"
            ctx.textAlign = "center"
            ctx.fillText("No Image", 100, y + 60)

            // Draw product details
            ctx.fillStyle = "#000000"
            ctx.textAlign = "left"
            ctx.font = "bold 24px Arial"
            ctx.fillText(product.name, 170, y + 40)

            ctx.font = "20px Arial"
            ctx.fillText(
              `${item.quantity} x ₵${product.price.toFixed(2)} = ₵${(product.price * item.quantity).toFixed(2)}`,
              170,
              y + 70,
            )

            // Update y position for next item
            y += itemHeight
            resolveItem()
          }

          // Set image source - use product image or placeholder
          if (product.image && product.image.startsWith("http")) {
            img.src = product.image
          } else if (product.image) {
            img.src = window.location.origin + product.image
          } else {
            img.src = window.location.origin + "/placeholder.svg?height=100&width=100"
          }
        })
      })

      // Wait for all images to load
      Promise.all(loadImages).then(() => {
        // Draw order summary
        ctx.fillStyle = "#25d366"
        ctx.fillRect(0, y, canvas.width, 40)

        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 24px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Order Summary", canvas.width / 2, y + 28)
        y += 60

        // Draw totals
        ctx.fillStyle = "#000000"
        ctx.textAlign = "left"
        ctx.font = "24px Arial"

        ctx.fillText(`Subtotal: ₵${subtotal.toFixed(2)}`, 50, y)
        y += 35

        ctx.fillText(`Shipping: ${shipping > 0 ? `₵${shipping.toFixed(2)}` : "Free"}`, 50, y)
        y += 35

        if (discount > 0) {
          ctx.fillText(`Discount: ₵${discount.toFixed(2)}`, 50, y)
          y += 35
        }

        ctx.font = "bold 28px Arial"
        ctx.fillText(`Total: ₵${total.toFixed(2)}`, 50, y)
        y += 50

        // Customer info if provided
        if (customerInfo) {
          ctx.font = "bold 28px Arial"
          ctx.fillText("Customer Information", 50, y)
          y += 40

          ctx.font = "24px Arial"
          if (customerInfo.name) {
            ctx.fillText(`Name: ${customerInfo.name}`, 50, y)
            y += 35
          }

          if (customerInfo.phone) {
            ctx.fillText(`Phone: ${customerInfo.phone}`, 50, y)
            y += 35
          }

          if (customerInfo.email) {
            ctx.fillText(`Email: ${customerInfo.email}`, 50, y)
            y += 35
          }

          if (customerInfo.address) {
            ctx.fillText(`Address: ${customerInfo.address}`, 50, y)
            y += 35
          }
        }

        // Footer
        ctx.fillStyle = "#25d366"
        ctx.fillRect(0, canvas.height - 60, canvas.width, 60)

        ctx.fillStyle = "#ffffff"
        ctx.font = "20px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Thank you for shopping with Kimverse Luxe!", canvas.width / 2, canvas.height - 25)

        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8)
        resolve(dataUrl)
      })
    } catch (error) {
      console.error("Error creating cart image card:", error)
      reject(error)
    }
  })
}

/**
 * Download image and open WhatsApp
 * @param {string} dataUrl - Image data URL
 * @param {string} filename - Filename for download
 * @param {string} whatsappMessage - Message for WhatsApp
 * @param {string} whatsappNumber - WhatsApp number
 */
function downloadImageAndOpenWhatsApp(dataUrl, filename, whatsappMessage, whatsappNumber) {
  // Create download link
  const downloadLink = document.createElement("a")
  downloadLink.href = dataUrl
  downloadLink.download = filename

  // Create modal to guide user
  const modal = document.createElement("div")
  modal.className = "whatsapp-image-modal"
  modal.innerHTML = `
    <div class="whatsapp-image-modal-content">
      <h3>Share Product Image</h3>
      <div class="image-preview">
        <img src="${dataUrl}" alt="Product Order">
      </div>
      <p>1. Click the button below to download the product image</p>
      <button class="btn primary-btn download-image-btn">Download Image</button>
      <p>2. After downloading, click continue to open WhatsApp</p>
      <p>3. Send the downloaded image to complete your order</p>
      <div class="modal-actions">
        <button class="btn outline-btn cancel-btn">Cancel</button>
        <button class="btn secondary-btn continue-btn">Continue to WhatsApp</button>
      </div>
    </div>
  `

  // Add modal to body
  document.body.appendChild(modal)

  // Add event listeners
  const downloadBtn = modal.querySelector(".download-image-btn")
  const continueBtn = modal.querySelector(".continue-btn")
  const cancelBtn = modal.querySelector(".cancel-btn")

  // Download image
  downloadBtn.addEventListener("click", () => {
    downloadLink.click()
    downloadBtn.textContent = "Image Downloaded!"
    downloadBtn.disabled = true
  })

  // Continue to WhatsApp
  continueBtn.addEventListener("click", () => {
    // Remove modal
    document.body.removeChild(modal)

    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank")
  })

  // Cancel
  cancelBtn.addEventListener("click", () => {
    document.body.removeChild(modal)
  })
}

/**
 * Open WhatsApp with product details
 * @param {string} productId - The product ID
 * @param {number} quantity - The quantity selected
 */
function openWhatsAppWithProduct(productId, quantity = 1) {
  // Get product details
  const product = window.getProductById(productId)

  if (!product) {
    console.error(`Product with ID ${productId} not found`)
    showNotification("Product not found. Please try again.", "error")
    return
  }

  // Get selected color and size if available
  const selectedColor = document.querySelector(".color-option.active")?.getAttribute("data-color") || null
  const selectedSize = document.querySelector(".size-option.active")?.getAttribute("data-size") || null

  // Show customer information form
  showCustomerForm(async (customerInfo) => {
    try {
      // Format message with customer info
      const message = formatProductForWhatsApp(product, quantity, selectedColor, selectedSize, customerInfo)

      // Get seller's WhatsApp number (replace with your actual number)
      const sellerWhatsApp = "233208517482" // Format: country code + number without +

      // Create product image card
      const imageDataUrl = await createProductImageCard(product, quantity, selectedColor, selectedSize, customerInfo)

      // Download image and open WhatsApp
      downloadImageAndOpenWhatsApp(imageDataUrl, `kimverse-order-${product.id}.jpg`, message, sellerWhatsApp)
    } catch (error) {
      console.error("Error processing product order:", error)
      showNotification("There was an error processing your order. Please try again.", "error")
    }
  })
}

/**
 * Open WhatsApp with cart details
 */
function openWhatsAppWithCart() {
  // Get cart items with product details
  const cartItems = window.getCartWithDetails ? window.getCartWithDetails() : []

  if (!cartItems || !cartItems.length) {
    showNotification("Your cart is empty.", "error")
    return
  }

  // Show customer information form
  showCustomerForm(async (customerInfo) => {
    try {
      // Format message with customer info
      const message = formatCartForWhatsApp(cartItems, customerInfo)

      // Get seller's WhatsApp number (replace with your actual number)
      const sellerWhatsApp = "233208517482" // Format: country code + number without +

      // Create cart image card
      const imageDataUrl = await createCartImageCard(cartItems, customerInfo)

      // Download image and open WhatsApp
      downloadImageAndOpenWhatsApp(imageDataUrl, `kimverse-cart-order.jpg`, message, sellerWhatsApp)
    } catch (error) {
      console.error("Error processing cart order:", error)
      showNotification("There was an error processing your order. Please try again.", "error")
    }
  })
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
      openSupportWhatsApp()
    })
  }
}

/**
 * Show customer information form
 */
function showCustomerForm() {
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

      // Check if we're on product page or cart page
      if (window.location.pathname.includes("product")) {
        sendProductToWhatsApp(customerInfo)
      } else if (window.location.pathname.includes("cart")) {
        sendCartToWhatsApp(customerInfo)
      }
    })
  }

  // Show modal
  const modal = document.querySelector(".customer-form-modal")
  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

/**
 * Send product information to WhatsApp
 */
function sendProductToWhatsApp(customerInfo) {
  // Get product information
  const productName = document.getElementById("product-name")?.textContent || "Product"
  const productPrice = document.getElementById("product-current-price")?.textContent || ""
  const productQuantity = document.getElementById("product-quantity")?.value || "1"
  const productColor = document.querySelector(".color-option.active")?.getAttribute("title") || ""
  const productSize = document.querySelector(".size-option.active")?.textContent || ""
  const productImage = document.getElementById("product-main-image")?.src || ""

  // Create message
  let message = "Hello, I would like to place an order.\n\n"

  // Add customer info
  message += `*Customer Information*\n`
  message += `Name: ${customerInfo.name}\n`
  message += `Email: ${customerInfo.email}\n`
  message += `Phone: ${customerInfo.phone}\n`
  message += `Address: ${customerInfo.address}\n`

  if (customerInfo.notes) {
    message += `Notes: ${customerInfo.notes}\n`
  }

  // Add product info
  message += "\n*Order Details*\n"
  message += `Product: ${productName}\n`
  message += `Price: ${productPrice}\n`
  message += `Quantity: ${productQuantity}\n`

  if (productColor) {
    message += `Color: ${productColor}\n`
  }

  if (productSize) {
    message += `Size: ${productSize}\n`
  }

  // Add product image if available
  if (productImage && !productImage.includes("placeholder")) {
    message += `\nProduct Image: ${window.location.origin}${productImage}\n`
  }

  // Calculate total
  const priceValue = Number.parseFloat(productPrice.replace(/[^\d.]/g, ""))
  const total = priceValue * Number.parseInt(productQuantity)

  message += `\n*Total: ₵${total.toFixed(2)}*`

  // Open WhatsApp
  window.open(`https://wa.me/${sellerWhatsApp}?text=${encodeURIComponent(message)}`, "_blank")
}

/**
 * Send cart information to WhatsApp
 */
function sendCartToWhatsApp(customerInfo) {
  // Get cart information
  const cartItems = document.querySelectorAll(".cart-item")
  const subtotal = document.getElementById("cart-subtotal")?.textContent || "₵0.00"
  const shipping = document.getElementById("cart-shipping")?.textContent || "₵0.00"
  const discount = document.getElementById("cart-discount")?.textContent || "₵0.00"
  const total = document.getElementById("cart-total")?.textContent || "₵0.00"

  // Create message
  let message = "Hello, I would like to place an order.\n\n"

  // Add customer info
  message += `*Customer Information*\n`
  message += `Name: ${customerInfo.name}\n`
  message += `Email: ${customerInfo.email}\n`
  message += `Phone: ${customerInfo.phone}\n`
  message += `Address: ${customerInfo.address}\n`

  if (customerInfo.notes) {
    message += `Notes: ${customerInfo.notes}\n`
  }

  // Add cart items
  message += "\n*Order Details*\n"

  if (cartItems.length > 0) {
    cartItems.forEach((item, index) => {
      const itemName = item.querySelector(".item-name")?.textContent || `Item ${index + 1}`
      const itemPrice = item.querySelector(".item-price")?.textContent || ""
      const itemQuantity = item.querySelector(".item-quantity")?.value || "1"
      const itemImage = item.querySelector(".item-image img")?.src || ""

      message += `${index + 1}. ${itemName} - ${itemQuantity} x ${itemPrice}\n`

      // Add item image if available
      if (itemImage && !itemImage.includes("placeholder")) {
        message += `   Image: ${window.location.origin}${itemImage}\n`
      }
    })
  } else {
    message += "No items in cart\n"
  }

  // Add totals
  message += "\n*Order Summary*\n"
  message += `Subtotal: ${subtotal}\n`
  message += `Shipping: ${shipping}\n`
  message += `Discount: ${discount}\n`
  message += `\n*Total: ${total}*`

  // Open WhatsApp
  window.open(`https://wa.me/${sellerWhatsApp}?text=${encodeURIComponent(message)}`, "_blank")
}

/**
 * Open WhatsApp for customer support
 */
function openSupportWhatsApp() {
  const message = "Hello, I would like to know more about your products."
  window.open(`https://wa.me/${sellerWhatsApp}?text=${encodeURIComponent(message)}`, "_blank")
}

// Show notification
function showNotification(message, type = "success") {
  // Check if showNotification function exists in global scope
  if (typeof window.showNotification === "function" && window.showNotification !== showNotification) {
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

// Initialize floating WhatsApp button
function initFloatingWhatsApp() {
  // Create floating button
  const floatingBtn = document.createElement("div")
  floatingBtn.className = "floating-whatsapp"
  floatingBtn.innerHTML = `
    <div class="whatsapp-button">
      <i class="fab fa-whatsapp"></i>
    </div>
    <div class="whatsapp-tooltip">Chat with us</div>
  `

  // Add to DOM
  document.body.appendChild(floatingBtn)

  // Add click event
  floatingBtn.addEventListener("click", openSupportWhatsApp)
}

// Initialize WhatsApp integration
document.addEventListener("DOMContentLoaded", () => {
  // Initialize floating WhatsApp button
  initFloatingWhatsApp()
})

// Make functions available globally
window.openWhatsAppWithProduct = openWhatsAppWithProduct
window.openWhatsAppWithCart = openWhatsAppWithCart
window.openSupportWhatsApp = openSupportWhatsApp
window.showCustomerForm = showCustomerForm
window.sendProductToWhatsApp = sendProductToWhatsApp
window.sendCartToWhatsApp = sendCartToWhatsApp
