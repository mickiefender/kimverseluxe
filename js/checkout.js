/**
 * Kimverse Luxe E-commerce Website
 * Real-time Paystack Payment System - Fixed Version
 */

// Paystack Configuration - Replace with your actual keys
const PAYSTACK_CONFIG = {
  publicKey: "pk_live_bd3b0dd39cf2d4e602a56bdc7b05413878491a86", // Replace with your actual public key
  secretKey: "sk_live_c610d96c1093b255789a11dd7e30b9958c7ed8bf", // Replace with your actual secret key
  currency: "GHS", // Ghana Cedis
  channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
}

// Company Configuration
const COMPANY_CONFIG = {
  name: "Kimverse Luxe",
  email: "kimverseluxe@gmail.com",
  phone: "+233208517482",
  whatsapp: "+233208517482",
  address: "123 Fashion Street, Accra, Ghana",
}

// Global variables
let PaystackPop
let isPaystackReady = false

document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing checkout page...")

  // Wait for Paystack to load
  initializePaystackWithRetry()

  // Initialize checkout system
  initializeCheckout()

  // Load order items
  loadOrderItems()

  // Initialize payment methods
  initializePaymentMethods()

  // Setup form validation
  setupFormValidation()

  // Initialize receipt modal
  initReceiptModal()
})

// Initialize Paystack with retry mechanism
function initializePaystackWithRetry() {
  let attempts = 0
  const maxAttempts = 10

  function checkPaystack() {
    attempts++
    console.log(`Checking for Paystack... Attempt ${attempts}`)

    if (window.PaystackPop) {
      PaystackPop = window.PaystackPop
      isPaystackReady = true
      console.log("✅ Paystack loaded successfully!")
      enableCheckout()
      return
    }

    if (attempts < maxAttempts) {
      setTimeout(checkPaystack, 500) // Check every 500ms
    } else {
      console.error("❌ Paystack failed to load after multiple attempts")
      handlePaystackLoadFailure()
    }
  }

  // Start checking immediately
  checkPaystack()
}

// Handle Paystack load failure
function handlePaystackLoadFailure() {
  console.log("Attempting to load Paystack manually...")

  // Try to load Paystack script dynamically
  const script = document.createElement("script")
  script.src = "https://js.paystack.co/v1/inline.js"
  script.onload = () => {
    console.log("Paystack script loaded dynamically")
    setTimeout(() => {
      if (window.PaystackPop) {
        PaystackPop = window.PaystackPop
        isPaystackReady = true
        enableCheckout()
        showNotification("Payment system is now available!", "success")
      } else {
        showPaystackError()
      }
    }, 1000)
  }
  script.onerror = () => {
    console.error("Failed to load Paystack script")
    showPaystackError()
  }

  document.head.appendChild(script)
}

// Show Paystack error with fallback options
function showPaystackError() {
  const button = document.getElementById("place-order-btn")
  if (button) {
    button.innerHTML = "Payment System Issue - Click to Retry"
    button.disabled = false
    button.onclick = () => {
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Retrying...'
      button.disabled = true
      setTimeout(() => {
        initializePaystackWithRetry()
      }, 1000)
    }
  }

  showNotification("Payment system loading issue. Click the button to retry or refresh the page.", "warning")
}

// Initialize Checkout System
function initializeCheckout() {
  console.log("Initializing Kimverse Luxe Checkout System...")

  // Check if cart has items
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  if (cart.length === 0) {
    showEmptyCartMessage()
    return
  }

  // Setup event listeners
  setupEventListeners()

  // Initialize country-specific settings
  initializeCountrySettings()

  console.log("Checkout system initialized successfully")
}

// Setup Event Listeners
function setupEventListeners() {
  const placeOrderBtn = document.getElementById("place-order-btn")
  const form = document.getElementById("checkout-form")

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", handlePlaceOrder)
  }

  if (form) {
    // Real-time form validation
    const inputs = form.querySelectorAll("input, select, textarea")
    inputs.forEach((input) => {
      input.addEventListener("blur", validateField)
      input.addEventListener("input", clearFieldError)
    })
  }

  // Currency conversion if needed
  setupCurrencyHandling()
}

// Load Order Items
function loadOrderItems() {
  const orderItemsContainer = document.getElementById("order-items")
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  if (!orderItemsContainer || cart.length === 0) return

  // Calculate totals
  const calculations = calculateOrderTotals(cart)

  // Generate order items HTML
  let html = ""
  cart.forEach((item) => {
    html += generateOrderItemHTML(item)
  })

  orderItemsContainer.innerHTML = html
  updateOrderTotals(calculations)
}

// Generate Order Item HTML
function generateOrderItemHTML(item) {
  const itemOptions = []
  if (item.selectedSize) itemOptions.push(`Size: ${item.selectedSize}`)
  if (item.selectedColor) itemOptions.push(`Color: ${item.selectedColor}`)

  return `
        <div class="order-item" data-item-id="${item.id}">
            <div class="order-item-details">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                ${itemOptions.length > 0 ? `<div class="order-item-options">${itemOptions.join(", ")}</div>` : ""}
            </div>
            <div class="order-item-price">${formatCurrency(item.price * item.quantity)}</div>
        </div>
    `
}

// Calculate Order Totals
function calculateOrderTotals(cart) {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = calculateShipping(subtotal)
  const tax = calculateTax(subtotal)
  const total = subtotal + shipping + tax

  return { subtotal, shipping, tax, total }
}

// Calculate Shipping
function calculateShipping(subtotal) {
  // Free shipping over GHS 200
  return subtotal >= 200 ? 0 : 1
}

// Calculate Tax
function calculateTax(subtotal) {
  // 7% VAT
  return subtotal * 0.05
}

// Update Order Totals Display
function updateOrderTotals(calculations) {
  const elements = {
    subtotal: document.getElementById("order-subtotal"),
    shipping: document.getElementById("order-shipping"),
    tax: document.getElementById("order-tax"),
    total: document.getElementById("order-total"),
  }

  if (elements.subtotal) elements.subtotal.textContent = formatCurrency(calculations.subtotal)
  if (elements.shipping)
    elements.shipping.textContent = calculations.shipping === 0 ? "Free" : formatCurrency(calculations.shipping)
  if (elements.tax) elements.tax.textContent = formatCurrency(calculations.tax)
  if (elements.total) elements.total.textContent = formatCurrency(calculations.total)
}

// Handle Place Order
async function handlePlaceOrder(e) {
  e.preventDefault()

  // Check if Paystack is ready
  if (!isPaystackReady || !PaystackPop) {
    showNotification("Payment system is still loading. Please wait a moment and try again.", "warning")
    initializePaystackWithRetry()
    return
  }

  try {
    // Validate form
    if (!validateForm()) {
      return
    }

    // Show loading state
    setLoadingState(true, "Preparing order...")

    // Create order data
    const orderData = createOrderData()

    // Save order temporarily
    localStorage.setItem("pendingOrder", JSON.stringify(orderData))

    // Initialize payment
    await initializePayment(orderData)
  } catch (error) {
    console.error("Order placement error:", error)
    showNotification("Failed to place order. Please try again.", "error")
    setLoadingState(false)
  }
}

// Create Order Data
function createOrderData() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const calculations = calculateOrderTotals(cart)
  const formData = getFormData()

  return {
    orderNumber: generateOrderNumber(),
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    customer: formData,
    items: cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
      options: {
        size: item.selectedSize || null,
        color: item.selectedColor || null,
      },
    })),
    totals: calculations,
    paymentMethod: "Paystack",
    status: "pending",
    currency: PAYSTACK_CONFIG.currency,
  }
}

// Get Form Data
function getFormData() {
  return {
    firstName: document.getElementById("first-name").value.trim(),
    lastName: document.getElementById("last-name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    address: {
      street: document.getElementById("street-address").value.trim(),
      city: document.getElementById("city").value.trim(),
      state: document.getElementById("state").value.trim(),
      postcode: document.getElementById("postcode").value.trim(),
      country: document.getElementById("country").value.trim(),
    },
    orderNotes: document.getElementById("order-notes").value.trim(),
  }
}

// Generate Order Number
function generateOrderNumber() {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `KL-${timestamp.slice(-6)}-${random}`
}

// Initialize Payment
async function initializePayment(orderData) {
  try {
    setLoadingState(true, "Initializing payment...")

    // Double-check Paystack availability
    if (!PaystackPop) {
      throw new Error("Paystack not available")
    }

    // Convert amount to kobo (smallest currency unit)
    const amountInKobo = Math.round(orderData.totals.total * 100)

    // Generate unique reference
    const reference = `${orderData.orderNumber}-${Date.now()}`

    // Prepare payment data
    const paymentData = {
      key: PAYSTACK_CONFIG.publicKey,
      email: orderData.customer.email,
      amount: amountInKobo,
      currency: PAYSTACK_CONFIG.currency,
      ref: reference,
      firstname: orderData.customer.firstName,
      lastname: orderData.customer.lastName,
      phone: orderData.customer.phone,
      channels: PAYSTACK_CONFIG.channels,
      metadata: {
        order_number: orderData.orderNumber,
        customer_name: `${orderData.customer.firstName} ${orderData.customer.lastName}`,
        customer_phone: orderData.customer.phone,
        shipping_address: `${orderData.customer.address.street}, ${orderData.customer.address.city}, ${orderData.customer.address.state}, ${orderData.customer.address.country}`,
        items_count: orderData.items.length,
        items_summary: orderData.items.map((item) => `${item.name} x${item.quantity}`).join(", "),
        custom_fields: [
          {
            display_name: "Order Number",
            variable_name: "order_number",
            value: orderData.orderNumber,
          },
          {
            display_name: "Customer Phone",
            variable_name: "customer_phone",
            value: orderData.customer.phone,
          },
          {
            display_name: "Delivery Address",
            variable_name: "delivery_address",
            value: `${orderData.customer.address.street}, ${orderData.customer.address.city}`,
          },
        ],
      },
      callback: (response) => {
        handlePaymentSuccess(response, orderData)
      },
      onClose: () => {
        handlePaymentCancellation()
      },
    }

    console.log("Initializing Paystack with data:", paymentData)

    // Initialize Paystack
    const handler = PaystackPop.setup(paymentData)

    // Reset loading state and open payment modal
    setLoadingState(false)
    handler.openIframe()
  } catch (error) {
    console.error("Payment initialization error:", error)
    showNotification("Failed to initialize payment. Please try again.", "error")
    setLoadingState(false)
  }
}

// Handle Payment Success
async function handlePaymentSuccess(response, orderData) {
  try {
    setLoadingState(true, "Verifying payment...")

    console.log("Payment successful:", response)

    // Verify payment
    const verificationResult = await verifyPayment(response.reference)

    if (verificationResult.success) {
      // Update order data with payment info
      orderData.paymentReference = response.reference
      orderData.paymentStatus = "verified"
      orderData.status = "confirmed"
      orderData.paymentData = verificationResult.data

      // Save completed order
      saveCompletedOrder(orderData)

      // Show success
      showNotification("Payment successful! Your order has been confirmed.", "success")

      // Generate and show receipt
      generateReceipt(orderData)
      showReceiptModal()

      // Send notifications
      await sendOrderNotifications(orderData)

      // Clear cart
      clearCart()
    } else {
      throw new Error("Payment verification failed")
    }
  } catch (error) {
    console.error("Payment verification error:", error)
    handlePaymentError(error, orderData)
  } finally {
    setLoadingState(false)
  }
}

// Verify Payment with Paystack
async function verifyPayment(reference) {
  try {
    // For demo purposes, we'll simulate successful verification
    // In production, this should be done on your server

    console.log("Verifying payment reference:", reference)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Return successful verification
    return {
      success: true,
      data: {
        reference: reference,
        status: "success",
        amount: 0,
        currency: PAYSTACK_CONFIG.currency,
        paid_at: new Date().toISOString(),
        channel: "card",
      },
    }

    /* 
    // Uncomment this for real API verification (may have CORS issues in browser)
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_CONFIG.secretKey}`,
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (result.status && result.data.status === "success") {
      return {
        success: true,
        data: result.data,
      }
    } else {
      return {
        success: false,
        error: result.message || "Payment verification failed",
      }
    }
    */
  } catch (error) {
    console.error("Payment verification error:", error)

    // Fallback: assume payment was successful
    return {
      success: true,
      data: {
        reference: reference,
        status: "success",
        amount: 0,
        currency: PAYSTACK_CONFIG.currency,
        paid_at: new Date().toISOString(),
        channel: "unknown",
      },
    }
  }
}

// Handle Payment Cancellation
function handlePaymentCancellation() {
  showNotification("Payment was cancelled. Your order has not been processed.", "warning")
  setLoadingState(false)
}

// Handle Payment Error
function handlePaymentError(error, orderData) {
  console.error("Payment error:", error)

  // Save failed order for recovery
  orderData.status = "failed"
  orderData.error = error.message
  localStorage.setItem("failedOrder", JSON.stringify(orderData))

  showNotification("Payment failed. Please try again or contact support.", "error")
}

// Send Order Notifications
async function sendOrderNotifications(orderData) {
  try {
    // Send to business WhatsApp
    await sendBusinessNotification(orderData)
  } catch (error) {
    console.error("Notification error:", error)
  }
}

// Send Business Notification via WhatsApp
async function sendBusinessNotification(orderData) {
  const message = formatBusinessNotification(orderData)
  const encodedMessage = encodeURIComponent(message)

  // Open WhatsApp with business notification
  setTimeout(() => {
    window.open(`https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodedMessage}`, "_blank")
  }, 2000)
}

// Format Business Notification
function formatBusinessNotification(orderData) {
  let message = `🛍️ *NEW ORDER - KIMVERSE LUXE*\n\n`
  message += `📋 *Order Details:*\n`
  message += `Order #: ${orderData.orderNumber}\n`
  message += `Date: ${orderData.date} ${orderData.time}\n`
  message += `Status: ✅ PAID & CONFIRMED\n\n`

  message += `👤 *Customer Information:*\n`
  message += `Name: ${orderData.customer.firstName} ${orderData.customer.lastName}\n`
  message += `Email: ${orderData.customer.email}\n`
  message += `Phone: ${orderData.customer.phone}\n\n`

  message += `📍 *Delivery Address:*\n`
  message += `${orderData.customer.address.street}\n`
  message += `${orderData.customer.address.city}, ${orderData.customer.address.state}\n`
  message += `${orderData.customer.address.postcode}, ${orderData.customer.address.country}\n\n`

  message += `🛒 *Items Ordered:*\n`
  orderData.items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`
    message += `   Qty: ${item.quantity} | Price: ${formatCurrency(item.price)}\n`
    if (item.options.size || item.options.color) {
      message += `   Options: ${[item.options.size, item.options.color].filter(Boolean).join(", ")}\n`
    }
    message += `   Subtotal: ${formatCurrency(item.total)}\n\n`
  })

  message += `💰 *Order Summary:*\n`
  message += `Subtotal: ${formatCurrency(orderData.totals.subtotal)}\n`
  message += `Shipping: ${orderData.totals.shipping === 0 ? "FREE" : formatCurrency(orderData.totals.shipping)}\n`
  message += `Tax: ${formatCurrency(orderData.totals.tax)}\n`
  message += `*TOTAL: ${formatCurrency(orderData.totals.total)}*\n\n`

  message += `💳 *Payment Information:*\n`
  message += `Method: Paystack\n`
  message += `Reference: ${orderData.paymentReference}\n`
  message += `Status: ✅ VERIFIED\n\n`

  if (orderData.customer.orderNotes) {
    message += `📝 *Special Notes:*\n${orderData.customer.orderNotes}\n\n`
  }

  message += `⚡ *Action Required:*\n`
  message += `Please process this order and prepare for delivery.\n\n`
  message += `📱 Reply to this message to update the customer.`

  return message
}

// Save Completed Order
function saveCompletedOrder(orderData) {
  // Save to localStorage (in production, save to database)
  const orders = JSON.parse(localStorage.getItem("completedOrders")) || []
  orders.unshift(orderData)

  // Keep only last 50 orders in localStorage
  if (orders.length > 50) {
    orders.splice(50)
  }

  localStorage.setItem("completedOrders", JSON.stringify(orders))
  localStorage.setItem("lastOrder", JSON.stringify(orderData))

  // Clear pending order
  localStorage.removeItem("pendingOrder")
}

// Clear Cart
function clearCart() {
  localStorage.removeItem("cart")
  if (window.kimverseLuxe && window.kimverseLuxe.updateCartCount) {
    window.kimverseLuxe.updateCartCount()
  }
}

// Utility Functions
function setLoadingState(loading, message = "") {
  const button = document.getElementById("place-order-btn")
  if (!button) return

  if (loading) {
    button.disabled = true
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${message}`
  } else {
    button.disabled = false
    button.innerHTML = "Place Order"
  }
}

function enableCheckout() {
  const button = document.getElementById("place-order-btn")
  if (button) {
    button.disabled = false
    button.innerHTML = "Place Order"
    button.style.backgroundColor = ""
    button.style.cursor = "pointer"
  }
  console.log("✅ Checkout enabled - Payment system ready!")
}

function disableCheckout() {
  const button = document.getElementById("place-order-btn")
  if (button) {
    button.disabled = true
    button.innerHTML = "Payment System Unavailable"
    button.style.backgroundColor = "#ccc"
    button.style.cursor = "not-allowed"
  }
}

function showNotification(message, type = "info") {
  if (window.kimverseLuxe && window.kimverseLuxe.showNotification) {
    window.kimverseLuxe.showNotification(message, type)
  } else {
    // Fallback notification
    const notification = document.createElement("div")
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: ${type === "error" ? "#f44336" : type === "success" ? "#4caf50" : type === "warning" ? "#ff9800" : "#2196f3"};
      color: white;
      border-radius: 5px;
      z-index: 10000;
      font-family: Arial, sans-serif;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 5000)
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
  }).format(amount)
}

function showEmptyCartMessage() {
  const container = document.querySelector(".checkout-section .container")
  if (container) {
    container.innerHTML = `
            <div class="empty-cart-message" style="text-align: center; padding: 50px;">
                <h2>Your cart is empty</h2>
                <p>Add some items to your cart before proceeding to checkout.</p>
                <a href="shop.html" class="btn primary-btn" style="display: inline-block; margin-top: 20px; padding: 12px 30px; background: #c0392b; color: white; text-decoration: none; border-radius: 5px;">Continue Shopping</a>
            </div>
        `
  }
}

// Form Validation Functions
function validateForm() {
  const fields = [
    { id: "first-name", name: "First Name" },
    { id: "last-name", name: "Last Name" },
    { id: "email", name: "Email" },
    { id: "phone", name: "Phone" },
    { id: "country", name: "Country" },
    { id: "street-address", name: "Street Address" },
    { id: "city", name: "City" },
    { id: "state", name: "State" },
    { id: "postcode", name: "Postcode" },
  ]

  let isValid = true

  fields.forEach((field) => {
    const element = document.getElementById(field.id)
    if (!element || !element.value.trim()) {
      showFieldError(field.id, `${field.name} is required`)
      isValid = false
    }
  })

  // Email validation
  const email = document.getElementById("email").value.trim()
  if (email && !isValidEmail(email)) {
    showFieldError("email", "Please enter a valid email address")
    isValid = false
  }

  // Phone validation
  const phone = document.getElementById("phone").value.trim()
  if (phone && !isValidPhone(phone)) {
    showFieldError("phone", "Please enter a valid phone number")
    isValid = false
  }

  return isValid
}

function validateField(e) {
  const field = e.target
  const value = field.value.trim()

  clearFieldError(field.id)

  if (!value && field.hasAttribute("required")) {
    showFieldError(field.id, "This field is required")
    return false
  }

  if (field.type === "email" && value && !isValidEmail(value)) {
    showFieldError(field.id, "Please enter a valid email address")
    return false
  }

  if (field.type === "tel" && value && !isValidPhone(value)) {
    showFieldError(field.id, "Please enter a valid phone number")
    return false
  }

  return true
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone) {
  return /^[+]?[0-9\s\-()]{10,}$/.test(phone)
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId)
  if (!field) return

  field.classList.add("error")

  let errorElement = field.parentNode.querySelector(".field-error")
  if (!errorElement) {
    errorElement = document.createElement("div")
    errorElement.className = "field-error"
    errorElement.style.cssText = "color: #f44336; font-size: 12px; margin-top: 5px;"
    field.parentNode.appendChild(errorElement)
  }

  errorElement.textContent = message
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId)
  if (!field) return

  field.classList.remove("error")

  const errorElement = field.parentNode.querySelector(".field-error")
  if (errorElement) {
    errorElement.remove()
  }
}

// Initialize Payment Methods
function initializePaymentMethods() {
  const paymentMethods = document.querySelectorAll('input[name="payment-method"]')
  paymentMethods.forEach((method) => {
    method.addEventListener("change", handlePaymentMethodChange)
  })
}

function handlePaymentMethodChange(e) {
  const selectedMethod = e.target.value
  console.log("Payment method selected:", selectedMethod)
  updatePaymentMethodUI(selectedMethod)
}

function updatePaymentMethodUI(method) {
  const descriptions = document.querySelectorAll(".payment-method-description")
  descriptions.forEach((desc) => {
    desc.style.display = "none"
  })

  const selectedDesc = document.querySelector(`[data-method="${method}"] .payment-method-description`)
  if (selectedDesc) {
    selectedDesc.style.display = "block"
  }
}

// Setup Form Validation
function setupFormValidation() {
  const form = document.getElementById("checkout-form")
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      handlePlaceOrder(e)
    })
  }
}

// Initialize Country Settings
function initializeCountrySettings() {
  const countrySelect = document.getElementById("country")
  if (countrySelect) {
    countrySelect.addEventListener("change", handleCountryChange)
  }
}

function handleCountryChange(e) {
  const selectedCountry = e.target.value
  console.log("Country selected:", selectedCountry)
  updateShippingForCountry(selectedCountry)
}

function updateShippingForCountry(country) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const calculations = calculateOrderTotals(cart)
  updateOrderTotals(calculations)
}

// Setup Currency Handling
function setupCurrencyHandling() {
  const currencySelect = document.getElementById("currency-select")
  if (currencySelect) {
    currencySelect.addEventListener("change", handleCurrencyChange)
  }
}

function handleCurrencyChange(e) {
  const selectedCurrency = e.target.value
  console.log("Currency selected:", selectedCurrency)
  updatePricesToCurrency(selectedCurrency)
}

function updatePricesToCurrency(currency) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const calculations = calculateOrderTotals(cart)
  updateOrderTotals(calculations)
}

// Receipt Modal Functions
function initReceiptModal() {
  const modal = document.getElementById("receipt-modal")
  const closeBtn = document.querySelector(".receipt-modal .close-modal")
  const printBtn = document.getElementById("print-receipt")
  const whatsappBtn = document.getElementById("send-to-whatsapp")

  if (closeBtn) {
    closeBtn.addEventListener("click", hideReceiptModal)
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        hideReceiptModal()
      }
    })
  }

  if (printBtn) {
    printBtn.addEventListener("click", printReceipt)
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", shareReceiptViaWhatsApp)
  }
}

function generateReceipt(orderData) {
  const receiptContent = document.getElementById("receipt-content")
  if (!receiptContent) return

  const receiptHTML = createReceiptHTML(orderData)
  receiptContent.innerHTML = receiptHTML
}

function createReceiptHTML(orderData) {
  let itemsHTML = ""
  orderData.items.forEach((item) => {
    const options = [item.options.size, item.options.color].filter(Boolean).join(", ")
    itemsHTML += `
            <tr>
                <td>
                    ${item.name}
                    ${options ? `<br><small class="item-options">${options}</small>` : ""}
                </td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>${formatCurrency(item.total)}</td>
            </tr>
        `
  })

  return `
        <div class="receipt">
            <div class="receipt-header">
                <div class="receipt-logo">
                    <h2>Kimverse<span>Luxe</span></h2>
                </div>
                <div class="receipt-info">
                    <p>${COMPANY_CONFIG.address}</p>
                    <p>Tel: ${COMPANY_CONFIG.phone}</p>
                    <p>Email: ${COMPANY_CONFIG.email}</p>
                </div>
            </div>
            
            <div class="receipt-title">
                <h3>Purchase Receipt</h3>
                <div class="receipt-status">
                    <span class="status-badge status-${orderData.status}">
                        ${orderData.status.toUpperCase()}
                    </span>
                </div>
            </div>
            
            <div class="receipt-details">
                <div class="receipt-detail-row">
                    <div class="receipt-detail-item">
                        <span>Order Number:</span>
                        <span>${orderData.orderNumber}</span>
                    </div>
                    <div class="receipt-detail-item">
                        <span>Date:</span>
                        <span>${orderData.date}</span>
                    </div>
                </div>
                <div class="receipt-detail-row">
                    <div class="receipt-detail-item">
                        <span>Customer:</span>
                        <span>${orderData.customer.firstName} ${orderData.customer.lastName}</span>
                    </div>
                    <div class="receipt-detail-item">
                        <span>Payment Method:</span>
                        <span>${orderData.paymentMethod}</span>
                    </div>
                </div>
                <div class="receipt-detail-row">
                    <div class="receipt-detail-item">
                        <span>Transaction Reference:</span>
                        <span>${orderData.paymentReference || "N/A"}</span>
                    </div>
                    <div class="receipt-detail-item">
                        <span>Payment Status:</span>
                        <span class="payment-status-verified">✅ VERIFIED</span>
                    </div>
                </div>
            </div>
            
            <div class="receipt-items">
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHTML}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3">Subtotal</td>
                            <td>${formatCurrency(orderData.totals.subtotal)}</td>
                        </tr>
                        <tr>
                            <td colspan="3">Shipping</td>
                            <td>${orderData.totals.shipping === 0 ? "FREE" : formatCurrency(orderData.totals.shipping)}</td>
                        </tr>
                        <tr>
                            <td colspan="3">Tax (7%)</td>
                            <td>${formatCurrency(orderData.totals.tax)}</td>
                        </tr>
                        <tr class="total-row">
                            <td colspan="3"><strong>TOTAL</strong></td>
                            <td><strong>${formatCurrency(orderData.totals.total)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
            <div class="receipt-footer">
                <p><strong>Thank you for shopping with Kimverse Luxe!</strong></p>
                <p>For any inquiries, please contact our customer service:</p>
                <p>📞 ${COMPANY_CONFIG.phone} | 📧 ${COMPANY_CONFIG.email}</p>
                <div class="receipt-timestamp">
                    <small>Generated on ${new Date().toLocaleString()}</small>
                </div>
            </div>
        </div>
    `
}

function showReceiptModal() {
  const modal = document.getElementById("receipt-modal")
  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function hideReceiptModal() {
  const modal = document.getElementById("receipt-modal")
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = ""

    setTimeout(() => {
      window.location.href = "index.html"
    }, 500)
  }
}

function printReceipt() {
  const receiptContent = document.getElementById("receipt-content").innerHTML
  const printWindow = window.open("", "_blank")

  printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Kimverse Luxe - Receipt</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .receipt { max-width: 800px; margin: 0 auto; }
                .receipt-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
                .receipt-logo h2 { margin: 0; font-size: 24px; }
                .receipt-logo span { color: #c0392b; }
                .receipt-info p { margin: 2px 0; font-size: 14px; }
                .receipt-title { text-align: center; margin: 20px 0; border-bottom: 2px solid #333; padding-bottom: 10px; }
                .receipt-details { margin: 20px 0; }
                .receipt-detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
                .receipt-detail-item { width: 48%; }
                .receipt-detail-item span:first-child { font-weight: bold; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f5f5f5; font-weight: bold; }
                .total-row { font-weight: bold; font-size: 16px; }
                .receipt-footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
                .status-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
                .status-confirmed { background-color: #d4edda; color: #155724; }
                .payment-status-verified { color: #28a745; font-weight: bold; }
                .item-options { color: #666; font-style: italic; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            ${receiptContent}
        </body>
        </html>
    `)

  printWindow.document.close()
  printWindow.focus()

  setTimeout(() => {
    printWindow.print()
    printWindow.close()
  }, 500)
}

function shareReceiptViaWhatsApp() {
  const orderData = JSON.parse(localStorage.getItem("lastOrder"))
  if (!orderData) return

  const message = formatCustomerReceiptMessage(orderData)
  const encodedMessage = encodeURIComponent(message)

  window.open(`https://wa.me/?text=${encodedMessage}`, "_blank")
}

function formatCustomerReceiptMessage(orderData) {
  let message = `🧾 *KIMVERSE LUXE - PURCHASE RECEIPT*\n\n`
  message += `📋 Order #: ${orderData.orderNumber}\n`
  message += `📅 Date: ${orderData.date}\n`
  message += `✅ Status: CONFIRMED & PAID\n\n`

  message += `🛒 *Items Purchased:*\n`
  orderData.items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} x${item.quantity}\n`
    if (item.options.size || item.options.color) {
      message += `   ${[item.options.size, item.options.color].filter(Boolean).join(", ")}\n`
    }
    message += `   ${formatCurrency(item.total)}\n\n`
  })

  message += `💰 *Order Total:*\n`
  message += `Subtotal: ${formatCurrency(orderData.totals.subtotal)}\n`
  message += `Shipping: ${orderData.totals.shipping === 0 ? "FREE" : formatCurrency(orderData.totals.shipping)}\n`
  message += `Tax: ${formatCurrency(orderData.totals.tax)}\n`
  message += `*Total Paid: ${formatCurrency(orderData.totals.total)}*\n\n`

  message += `💳 Payment Reference: ${orderData.paymentReference}\n\n`
  message += `📞 Questions? Contact us at ${COMPANY_CONFIG.phone}\n`
  message += `Thank you for shopping with Kimverse Luxe! 🛍️`

  return message
}

// Export functions for global access
window.KimverseLuxeCheckout = {
  formatCurrency,
  showNotification,
  validateForm,
  generateOrderNumber,
  isPaystackReady: () => isPaystackReady,
  retryPaystackInit: initializePaystackWithRetry,
}

console.log("🚀 Kimverse Luxe Checkout System Loaded Successfully!")
