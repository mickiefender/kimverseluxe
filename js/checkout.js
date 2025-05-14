// Checkout functionality

document.addEventListener("DOMContentLoaded", () => {
  console.log("Checkout script loaded")

  // Initialize checkout
  initCheckout()
})

// Initialize checkout
function initCheckout() {
  console.log("Initializing checkout")

  // Load cart items
  loadCheckoutItems()

  // Initialize shipping form
  initShippingForm()

  // Initialize payment form
  initPaymentForm()

  // Initialize coupon form
  initCouponForm()

  // Update order summary with initial values
  updateOrderSummary()

  // Add event listeners for real-time updates
  addDynamicUpdateListeners()
}

// Add this new function after initCheckout
function addDynamicUpdateListeners() {
  // Listen for shipping method changes
  const shippingMethods = document.querySelectorAll('input[name="shippingMethod"]')
  shippingMethods.forEach((method) => {
    method.addEventListener("change", () => {
      console.log(`Shipping method changed to: ${method.value}`)
      updateOrderSummary()
    })
  })

  // Listen for coupon code application
  const applyCouponBtn = document.getElementById("apply-coupon")
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener("click", () => {
      const couponCode = document.getElementById("coupon-code").value.trim()
      if (couponCode) {
        console.log(`Applying coupon: ${couponCode}`)
        applyCouponAndUpdateSummary(couponCode)
      }
    })
  }
}

// Add this new function for applying coupons and updating the summary
function applyCouponAndUpdateSummary(couponCode) {
  let discountApplied = false
  let discountMessage = ""

  // Simple coupon validation logic
  if (couponCode.toUpperCase() === "DISCOUNT10") {
    sessionStorage.setItem("appliedCoupon", "DISCOUNT10")
    sessionStorage.setItem("discountPercent", "10")
    discountApplied = true
    discountMessage = "10% discount applied!"
  } else if (couponCode.toUpperCase() === "DISCOUNT20") {
    sessionStorage.setItem("appliedCoupon", "DISCOUNT20")
    sessionStorage.setItem("discountPercent", "20")
    discountApplied = true
    discountMessage = "20% discount applied!"
  } else if (couponCode.toUpperCase() === "FREESHIP") {
    sessionStorage.setItem("appliedCoupon", "FREESHIP")
    sessionStorage.setItem("freeShipping", "true")
    discountApplied = true
    discountMessage = "Free shipping applied!"
  } else {
    showNotification("Invalid coupon code", "error")
    return
  }

  if (discountApplied) {
    showNotification(discountMessage, "success")
    updateOrderSummary()
  }
}

// Update the loadCheckoutItems function to properly display item prices
function loadCheckoutItems() {
  const summaryItems = document.getElementById("summary-items")
  if (!summaryItems) return

  // Get cart with product details
  const cartItems = window.getCartWithDetails ? window.getCartWithDetails() : []
  console.log("Cart items for checkout:", cartItems)

  // Clear container
  summaryItems.innerHTML = ""

  // Check if cart is empty
  if (cartItems.length === 0) {
    summaryItems.innerHTML = `<p class="empty-cart-message">Your cart is empty. <a href="shop.html">Continue shopping</a></p>`
    return
  }

  // Add cart items to summary with enhanced pricing details
  cartItems.forEach((item) => {
    const { product, quantity, total } = item
    const unitPrice = product?.price || 0

    const summaryItem = document.createElement("div")
    summaryItem.className = "summary-item"
    summaryItem.innerHTML = `
      <div class="item-image">
        <img src="${product?.image || "/placeholder.svg?height=60&width=60"}" alt="${product?.name || "Product"}">
      </div>
      <div class="item-details">
        <div class="item-name">${product?.name || "Unknown Product"}</div>
        <div class="item-meta">
          ${product?.color ? `<span>Color: ${product.color}</span>` : ""}
          ${product?.size ? `<span>Size: ${product.size}</span>` : ""}
        </div>
        <div class="item-pricing">
          <div class="item-price">₵${unitPrice.toFixed(2)}</div>
          <div class="item-quantity">× ${quantity}</div>
          <div class="item-total">₵${total.toFixed(2)}</div>
        </div>
      </div>
    `

    summaryItems.appendChild(summaryItem)
  })

  // Also load items in confirmation step if it exists
  const confirmationItems = document.getElementById("confirmation-items")
  if (confirmationItems) {
    confirmationItems.innerHTML = ""

    // Add cart items to confirmation with enhanced pricing details
    cartItems.forEach((item) => {
      const { product, quantity, total } = item
      const unitPrice = product?.price || 0

      const confirmationItem = document.createElement("div")
      confirmationItem.className = "summary-item"
      confirmationItem.innerHTML = `
        <div class="item-image">
          <img src="${product?.image || "/placeholder.svg?height=60&width=60"}" alt="${product?.name || "Product"}">
        </div>
        <div class="item-details">
          <div class="item-name">${product?.name || "Unknown Product"}</div>
          <div class="item-meta">
            ${product?.color ? `<span>Color: ${product.color}</span>` : ""}
            ${product?.size ? `<span>Size: ${product.size}</span>` : ""}
          </div>
          <div class="item-pricing">
            <div class="item-price">₵${unitPrice.toFixed(2)}</div>
            <div class="item-quantity">× ${quantity}</div>
            <div class="item-total">₵${total.toFixed(2)}</div>
          </div>
        </div>
      `

      confirmationItems.appendChild(confirmationItem)
    })

    // Update confirmation totals
    const confirmationSubtotal = document.getElementById("confirmation-subtotal")
    const confirmationShippingCost = document.getElementById("confirmation-shipping-cost")
    const confirmationDiscount = document.getElementById("confirmation-discount")
    const confirmationTotal = document.getElementById("confirmation-total")

    if (confirmationSubtotal && confirmationShippingCost && confirmationDiscount && confirmationTotal) {
      const subtotal = calculateSubtotal(cartItems)
      const shipping = getShippingCost(
        document.querySelector('input[name="shippingMethod"]:checked')?.value || "standard",
        subtotal,
      )
      const discount = calculateDiscountValue(subtotal)
      const total = subtotal + shipping - discount

      confirmationSubtotal.textContent = `₵${subtotal.toFixed(2)}`
      confirmationShippingCost.textContent = shipping === 0 ? "Free" : `₵${shipping.toFixed(2)}`
      confirmationDiscount.textContent = discount === 0 ? "-₵0.00" : `-₵${discount.toFixed(2)}`
      confirmationTotal.textContent = `₵${total.toFixed(2)}`
    }
  }
}

// Initialize shipping form
function initShippingForm() {
  const shippingForm = document.getElementById("shipping-form")
  if (!shippingForm) {
    console.warn("Shipping form not found")
    return
  }

  console.log("Initializing shipping form")

  // Handle form submission
  shippingForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("Shipping form submitted")

    // Validate form
    if (!validateShippingForm()) {
      console.warn("Shipping form validation failed")
      return
    }

    // Save shipping data
    saveShippingData()

    // Go to payment step
    console.log("Transitioning to payment step")
    goToStep("payment")
  })
}

// Validate shipping form
function validateShippingForm() {
  const shippingForm = document.getElementById("shipping-form")
  if (!shippingForm) return false

  // Check if form is valid using browser's built-in validation
  if (!shippingForm.checkValidity()) {
    shippingForm.reportValidity()
    return false
  }

  return true
}

// Save shipping data
function saveShippingData() {
  const shippingForm = document.getElementById("shipping-form")
  if (!shippingForm) return

  // Get form data
  const formData = new FormData(shippingForm)
  const shippingData = {}

  // Convert FormData to object
  for (const [key, value] of formData.entries()) {
    shippingData[key] = value
  }

  // Save to sessionStorage
  sessionStorage.setItem("shippingData", JSON.stringify(shippingData))

  // Update shipping method in order summary
  const shippingMethod = formData.get("shippingMethod")
  updateShippingMethod(shippingMethod)
}

// Update shipping method in order summary
function updateShippingMethod(method) {
  const shippingCost = getShippingCost(method)
  const summaryShipping = document.getElementById("summary-shipping")

  if (summaryShipping) {
    summaryShipping.textContent = shippingCost === 0 ? "Free" : `₵${shippingCost.toFixed(2)}`
  }

  // Update total
  updateOrderSummary()
}

// Get shipping cost based on method
function getShippingCost(method, subtotal) {
  console.log(`Calculating shipping cost for method: ${method}, subtotal: ₵${subtotal}`)

  switch (method) {
    case "express":
      return 30
    case "pickup":
      return 0
    case "standard":
    default:
      // Free shipping over ₵200
      return subtotal >= 200 ? 0 : 15
  }
}

// Initialize payment form
function initPaymentForm() {
  const paymentForm = document.getElementById("payment-form")
  if (!paymentForm) return

  // Handle payment method change
  const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]')
  const mobileMoneyDetails = document.getElementById("mobile-money-details")
  const cardDetails = document.getElementById("card-details")
  const bankDetails = document.getElementById("bank-details")

  paymentMethods.forEach((method) => {
    method.addEventListener("change", function () {
      // Hide all payment details sections
      if (mobileMoneyDetails) mobileMoneyDetails.style.display = "none"
      if (cardDetails) cardDetails.style.display = "none"
      if (bankDetails) bankDetails.style.display = "none"

      // Show selected payment details section
      const selectedMethod = this.value
      if (selectedMethod === "mtn" || selectedMethod === "airtel" || selectedMethod === "vodafone") {
        if (mobileMoneyDetails) mobileMoneyDetails.style.display = "block"
      } else if (selectedMethod === "card") {
        if (cardDetails) cardDetails.style.display = "block"
      } else if (selectedMethod === "bank") {
        if (bankDetails) bankDetails.style.display = "block"
      }
    })
  })

  // Handle back button
  const backToShippingBtn = document.getElementById("back-to-shipping")
  if (backToShippingBtn) {
    backToShippingBtn.addEventListener("click", () => {
      goToStep("shipping")
    })
  }

  // Handle form submission
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Validate form
    if (!validatePaymentForm()) {
      return
    }

    // Process payment
    processPayment()
  })
}

// Validate payment form
function validatePaymentForm() {
  const paymentForm = document.getElementById("payment-form")
  if (!paymentForm) return false

  // Get selected payment method
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')
  if (!paymentMethod) {
    showNotification("Please select a payment method.", "error")
    return false
  }

  // Validate mobile money details if selected
  if (paymentMethod.value === "mtn" || paymentMethod.value === "airtel" || paymentMethod.value === "vodafone") {
    const mobileNumber = document.getElementById("mobile-number")
    const accountName = document.getElementById("account-name")

    if (!mobileNumber || !mobileNumber.value.trim()) {
      showNotification("Please enter your mobile money number.", "error")
      return false
    }

    if (!accountName || !accountName.value.trim()) {
      showNotification("Please enter your account name.", "error")
      return false
    }
  }

  // Validate card details if selected
  if (paymentMethod.value === "card") {
    const cardNumber = document.getElementById("card-number")
    const cardExpiry = document.getElementById("card-expiry")
    const cardCvv = document.getElementById("card-cvv")
    const cardName = document.getElementById("card-name")

    if (!cardNumber || !cardNumber.value.trim()) {
      showNotification("Please enter your card number.", "error")
      return false
    }

    if (!cardExpiry || !cardExpiry.value.trim()) {
      showNotification("Please enter your card expiry date.", "error")
      return false
    }

    if (!cardCvv || !cardCvv.value.trim()) {
      showNotification("Please enter your card CVV.", "error")
      return false
    }

    if (!cardName || !cardName.value.trim()) {
      showNotification("Please enter the name on your card.", "error")
      return false
    }
  }

  return true
}

// Process payment
function processPayment() {
  // Get selected payment method
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value

  // Show loading state
  showNotification("Processing your payment...", "info")

  // Simulate payment processing
  setTimeout(() => {
    // For demo purposes, we'll simulate a successful payment
    // In a real application, you would integrate with a payment gateway

    // Generate order number
    const orderNumber = generateOrderNumber()

    // Save order data
    saveOrderData(orderNumber, paymentMethod)

    // Go to confirmation step
    goToStep("confirmation")

    // Update confirmation page
    updateConfirmationPage(orderNumber, paymentMethod)

    // Clear cart after successful order
    if (typeof window.clearCart === "function") {
      window.clearCart()
    }
  }, 2000)
}

// Generate order number
function generateOrderNumber() {
  const prefix = "KL"
  const timestamp = new Date().getTime().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `${prefix}${timestamp}${random}`
}

// Save order data
function saveOrderData(orderNumber, paymentMethod) {
  // Get shipping data
  const shippingData = JSON.parse(sessionStorage.getItem("shippingData") || "{}")

  // Get cart items
  const cartItems = window.getCartWithDetails ? window.getCartWithDetails() : []

  // Calculate totals
  const subtotal = calculateSubtotal(cartItems)
  const shipping = getShippingCost(shippingData.shippingMethod || "standard", subtotal)
  const discount = calculateDiscountValue(subtotal)
  const total = subtotal + shipping - discount

  // Create order data
  const orderData = {
    orderNumber,
    orderDate: new Date().toISOString(),
    customer: {
      firstName: shippingData.firstName || "",
      lastName: shippingData.lastName || "",
      email: shippingData.email || "",
      phone: shippingData.phone || "",
    },
    shipping: {
      address: shippingData.address || "",
      address2: shippingData.address2 || "",
      city: shippingData.city || "",
      region: shippingData.region || "",
      postalCode: shippingData.postalCode || "",
      country: shippingData.country || "Ghana",
      method: shippingData.shippingMethod || "standard",
    },
    payment: {
      method: paymentMethod,
      status: "pending",
    },
    items: cartItems.map((item) => ({
      id: item.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      total: item.total,
    })),
    totals: {
      subtotal,
      shipping,
      discount,
      total,
    },
    notes: shippingData.orderNotes || "",
  }

  // Save to localStorage (in a real application, you would send this to your server)
  localStorage.setItem(`order_${orderNumber}`, JSON.stringify(orderData))

  // Save to recent orders
  const recentOrders = JSON.parse(localStorage.getItem("recentOrders") || "[]")
  recentOrders.unshift(orderNumber)
  localStorage.setItem("recentOrders", JSON.stringify(recentOrders.slice(0, 5)))
}

// Update confirmation page
function updateConfirmationPage(orderNumber, paymentMethod) {
  // Update order number
  const orderNumberElement = document.getElementById("order-number")
  if (orderNumberElement) {
    orderNumberElement.textContent = `#${orderNumber}`
  }

  // Update order date
  const orderDateElement = document.getElementById("order-date")
  if (orderDateElement) {
    orderDateElement.textContent = new Date().toLocaleDateString()
  }

  // Update payment status
  const paymentStatus = document.getElementById("payment-status")
  const paymentMessage = document.getElementById("payment-message")

  if (paymentStatus && paymentMessage) {
    if (paymentMethod === "mtn" || paymentMethod === "airtel" || paymentMethod === "vodafone") {
      paymentStatus.className = "status pending"
      paymentStatus.innerHTML = '<i class="fas fa-clock"></i><span>Pending</span>'
      paymentMessage.textContent =
        "We're waiting for your payment confirmation. You will receive a prompt on your mobile phone to complete the payment."
    } else if (paymentMethod === "bank") {
      paymentStatus.className = "status pending"
      paymentStatus.innerHTML = '<i class="fas fa-clock"></i><span>Pending</span>'
      paymentMessage.textContent =
        "Please complete the bank transfer using the details provided. Your order will be processed once we confirm your payment."
    } else {
      paymentStatus.className = "status success"
      paymentStatus.innerHTML = '<i class="fas fa-check-circle"></i><span>Paid</span>'
      paymentMessage.textContent =
        "Your payment has been successfully processed. We'll start preparing your order right away."
    }
  }

  // Update shipping address
  const confirmationAddress = document.getElementById("confirmation-address")
  if (confirmationAddress) {
    const shippingData = JSON.parse(sessionStorage.getItem("shippingData") || "{}")
    confirmationAddress.textContent = `${shippingData.firstName} ${shippingData.lastName}, ${shippingData.address}, ${shippingData.city}, ${shippingData.region}, ${shippingData.country}`
  }

  // Update shipping method
  const confirmationShipping = document.getElementById("confirmation-shipping")
  if (confirmationShipping) {
    const shippingData = JSON.parse(sessionStorage.getItem("shippingData") || "{}")
    const method = shippingData.shippingMethod || "standard"

    if (method === "express") {
      confirmationShipping.textContent = "Express Shipping (1-2 business days)"
    } else if (method === "pickup") {
      confirmationShipping.textContent = "Store Pickup"
    } else {
      confirmationShipping.textContent = "Standard Shipping (3-5 business days)"
    }
  }
}

// Initialize coupon form
function initCouponForm() {
  const applyCouponBtn = document.getElementById("apply-coupon")
  const couponCodeInput = document.getElementById("coupon-code")

  if (!applyCouponBtn || !couponCodeInput) return

  // Check if there's a saved coupon
  const savedCoupon = sessionStorage.getItem("appliedCoupon")
  if (savedCoupon) {
    couponCodeInput.value = savedCoupon
    updateOrderSummary()
  }

  // Handle apply coupon button
  applyCouponBtn.addEventListener("click", () => {
    const couponCode = couponCodeInput.value.trim()

    if (!couponCode) {
      showNotification("Please enter a coupon code.", "error")
      return
    }

    // Apply coupon
    applyCouponAndUpdateSummary(couponCode)
  })
}

// Update order summary
function updateOrderSummary() {
  // Get elements
  const summarySubtotal = document.getElementById("summary-subtotal")
  const summaryShipping = document.getElementById("summary-shipping")
  const summaryDiscount = document.getElementById("summary-discount")
  const summaryTotal = document.getElementById("summary-total")

  if (!summarySubtotal || !summaryShipping || !summaryDiscount || !summaryTotal) {
    console.warn("Order summary elements not found")
    return
  }

  // Get cart items and calculate subtotal
  const cartItems = getCartItems()
  const subtotal = calculateSubtotal(cartItems)
  console.log(`Calculated subtotal: ₵${subtotal.toFixed(2)}`)

  // Get shipping cost based on selected method
  const shippingMethod = document.querySelector('input[name="shippingMethod"]:checked')?.value || "standard"
  let shipping = getShippingCost(shippingMethod, subtotal)

  // Check if free shipping coupon is applied
  if (sessionStorage.getItem("freeShipping") === "true") {
    shipping = 0
  }

  console.log(`Selected shipping method: ${shippingMethod}, cost: ₵${shipping.toFixed(2)}`)

  // Calculate discount
  const discount = calculateDiscountValue(subtotal)
  console.log(`Applied discount: ₵${discount.toFixed(2)}`)

  // Calculate total
  const total = subtotal + shipping - discount
  console.log(`Calculated total: ₵${total.toFixed(2)}`)

  // Update summary
  summarySubtotal.textContent = `₵${subtotal.toFixed(2)}`
  summaryShipping.textContent = shipping === 0 ? "Free" : `₵${shipping.toFixed(2)}`
  summaryDiscount.textContent = discount === 0 ? "-₵0.00" : `-₵${discount.toFixed(2)}`
  summaryTotal.textContent = `₵${total.toFixed(2)}`
}

// Add these helper functions for the order summary calculations
function getCartItems() {
  // Try to get cart items from window.getCartWithDetails first
  if (typeof window.getCartWithDetails === "function") {
    return window.getCartWithDetails()
  }

  // Fallback to localStorage
  try {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]")
    return cartItems
  } catch (error) {
    console.error("Error getting cart items:", error)
    return []
  }
}

function calculateSubtotal(cartItems) {
  // Try to use window.calculateCartSubtotal first
  if (typeof window.calculateCartSubtotal === "function") {
    return window.calculateCartSubtotal()
  }

  // Fallback calculation
  try {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.product?.price || item.price || 0
      const quantity = item.quantity || 1
      return total + itemPrice * quantity
    }, 0)
  } catch (error) {
    console.error("Error calculating subtotal:", error)
    return 0
  }
}

function calculateDiscountValue(subtotal) {
  // Try to use window.calculateDiscount first
  if (typeof window.calculateDiscount === "function") {
    return window.calculateDiscount()
  }

  // Fallback calculation based on applied coupon
  const discountPercent = Number.parseInt(sessionStorage.getItem("discountPercent") || "0")
  if (discountPercent > 0) {
    return (subtotal * discountPercent) / 100
  }
  return 0
}

// Go to step
function goToStep(step) {
  console.log(`Going to step: ${step}`)

  // Update progress steps
  const progressSteps = document.querySelectorAll(".progress-step")
  progressSteps.forEach((progressStep) => {
    const stepValue = progressStep.getAttribute("data-step")
    progressStep.classList.remove("active", "completed")

    if (stepValue === step) {
      progressStep.classList.add("active")
    } else if (
      (step === "payment" && stepValue === "shipping") ||
      (step === "confirmation" && (stepValue === "shipping" || stepValue === "payment"))
    ) {
      progressStep.classList.add("completed")
    }
  })

  // Update checkout steps
  const checkoutSteps = document.querySelectorAll(".checkout-step")
  checkoutSteps.forEach((checkoutStep) => {
    checkoutStep.classList.remove("active")

    if (checkoutStep.id === `${step}-step`) {
      checkoutStep.classList.add("active")
      console.log(`Activated step: ${checkoutStep.id}`)
    }
  })

  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
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

// Update progress based on URL parameters
function initCheckoutOld() {
  // Check if we're on the checkout page
  if (!document.querySelector(".checkout-section")) return

  // Update progress based on URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const step = urlParams.get("step")

  if (step) {
    goToStep(Number.parseInt(step))
  }
}

// Load order summary
let loadOrderSummary
loadOrderSummary = () => {
  const summaryProductsContainer = document.getElementById("summary-products")
  if (!summaryProductsContainer) return

  // Get cart with product details
  const cartItems = getCartWithDetails()

  // Clear container
  summaryProductsContainer.innerHTML = ""

  // Add cart items to summary
  cartItems.forEach((item) => {
    const { product, quantity, total } = item

    const productElement = document.createElement("div")
    productElement.className = "summary-product"
    productElement.innerHTML = `
      <div class="summary-product-img">
        <img src="${product.image || "/placeholder.svg?height=60&width=60"}" alt="${product.name}">
      </div>
      <div class="summary-product-info">
        <div class="summary-product-name">${product.name}</div>
        <div class="summary-product-variant">${product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : "Uncategorized"}</div>
        <div class="summary-product-price">
          <span class="summary-product-quantity">${quantity} × ₵${product.price.toFixed(2)}</span>
          <span>₵${total.toFixed(2)}</span>
        </div>
      </div>
    `

    summaryProductsContainer.appendChild(productElement)
  })

  // Update summary totals
  updateSummaryTotalsOld()
}

// Update summary totals
function updateSummaryTotalsOld() {
  const subtotalElement = document.getElementById("summary-subtotal")
  const shippingElement = document.getElementById("summary-shipping")
  const discountElement = document.getElementById("summary-discount")
  const totalElement = document.getElementById("summary-total")

  if (!subtotalElement || !shippingElement || !discountElement || !totalElement) return

  const subtotal = calculateCartSubtotal()
  const shipping = calculateShippingCostOld()
  const discount = calculateDiscount()
  const total = calculateCartTotal()

  subtotalElement.textContent = `₵${subtotal.toFixed(2)}`
  shippingElement.textContent = shipping === 0 ? "Free" : `₵${shipping.toFixed(2)}`
  discountElement.textContent = discount === 0 ? "-₵0.00" : `-₵${discount.toFixed(2)}`
  totalElement.textContent = `₵${total.toFixed(2)}`
}

// Initialize event listeners
function initEventListeners() {
  // Shipping form submission
  const shippingForm = document.getElementById("shipping-form")
  if (shippingForm) {
    shippingForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Validate form
      if (validateShippingForm()) {
        // Save shipping information
        saveShippingInfoOld()

        // Go to payment step
        goToStep(2)
      }
    })
  }

  // Payment form submission
  const paymentForm = document.getElementById("payment-form")
  if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Validate form
      if (validatePaymentForm()) {
        // Process payment
        processPayment()
      }
    })
  }

  // Back to shipping button
  const backToShippingBtn = document.querySelector(".back-to-shipping")
  if (backToShippingBtn) {
    backToShippingBtn.addEventListener("click", () => {
      goToStep(1)
    })
  }

  // Payment method tabs
  const paymentTabs = document.querySelectorAll(".payment-tab")
  paymentTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const paymentMethod = this.getAttribute("data-payment")

      // Remove active class from all tabs
      paymentTabs.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tab
      this.classList.add("active")

      // Hide all tab content
      const tabContents = document.querySelectorAll(".payment-tab-content")
      tabContents.forEach((content) => content.classList.remove("active"))

      // Show selected tab content
      const selectedContent = document.getElementById(`${paymentMethod}-content`)
      if (selectedContent) {
        selectedContent.classList.add("active")
      }
    })
  })

  // Toggle order summary on mobile
  const toggleSummaryBtn = document.getElementById("toggle-summary")
  if (toggleSummaryBtn) {
    toggleSummaryBtn.addEventListener("click", function () {
      const summaryContent = document.querySelector(".summary-content")
      summaryContent.classList.toggle("hidden")

      const toggleText = this.querySelector(".toggle-text")
      const toggleIcon = this.querySelector("i")

      if (summaryContent.classList.contains("hidden")) {
        toggleText.textContent = "Show"
        toggleIcon.className = "fas fa-chevron-down"
      } else {
        toggleText.textContent = "Hide"
        toggleIcon.className = "fas fa-chevron-up"
      }
    })
  }

  // Toggle promo code form
  const promoToggle = document.getElementById("promo-toggle")
  if (promoToggle) {
    promoToggle.addEventListener("click", () => {
      const promoForm = document.getElementById("promo-form")
      promoForm.classList.toggle("active")
    })
  }

  // Apply promo code
  const applyPromoBtn = document.getElementById("apply-promo")
  if (applyPromoBtn) {
    applyPromoBtn.addEventListener("click", () => {
      const promoCode = document.getElementById("promo-code").value.trim()

      if (applyCoupon(promoCode)) {
        // Update summary totals
        updateSummaryTotalsOld()
      }
    })
  }

  // Track order button
  const trackOrderBtn = document.getElementById("track-order-btn")
  if (trackOrderBtn) {
    trackOrderBtn.addEventListener("click", (e) => {
      e.preventDefault()
      alert("Order tracking functionality will be implemented in the future.")
    })
  }

  // Shipping method selection
  const shippingMethods = document.querySelectorAll('input[name="shipping-method"]')
  shippingMethods.forEach((method) => {
    method.addEventListener("change", function () {
      updateShippingCostOld(this.value)
    })
  })
}

// Validate shipping form
function validateShippingFormOld() {
  const form = document.getElementById("shipping-form")
  if (!form) return false

  // Check if form is valid
  if (!form.checkValidity()) {
    // Trigger browser's native validation
    form.reportValidity()
    return false
  }

  return true
}

// Validate payment form
function validatePaymentFormOld() {
  const form = document.getElementById("payment-form")
  if (!form) return false

  // Check if form is valid
  if (!form.checkValidity()) {
    // Trigger browser's native validation
    form.reportValidity()
    return false
  }

  // Get active payment method
  const activeTab = document.querySelector(".payment-tab.active")
  if (!activeTab) return false

  const paymentMethod = activeTab.getAttribute("data-payment")

  // Additional validation based on payment method
  switch (paymentMethod) {
    case "mobile-money":
      return validateMobileMoneyPayment()
    case "card":
      return validateCardPayment()
    case "bank":
      return validateBankTransfer()
    default:
      return false
  }
}

// Validate mobile money payment
function validateMobileMoneyPayment() {
  const mobileNumber = document.getElementById("mobile-number").value.trim()
  const accountName = document.getElementById("account-name").value.trim()

  // Check if mobile number is valid
  if (!mobileNumber.match(/^0[2-9][0-9]{8}$/)) {
    alert("Please enter a valid mobile number (e.g., 024XXXXXXX).")
    return false
  }

  // Check if account name is provided
  if (accountName.length < 3) {
    alert("Please enter a valid account name.")
    return false
  }

  return true
}

// Validate card payment
function validateCardPayment() {
  const cardNumber = document.getElementById("card-number").value.replace(/\s/g, "")
  const cardName = document.getElementById("card-name").value.trim()
  const expiryDate = document.getElementById("expiry-date").value.trim()
  const cvv = document.getElementById("cvv").value.trim()

  // Check if card number is valid (simple validation)
  if (!cardNumber.match(/^\d{16}$/)) {
    alert("Please enter a valid 16-digit card number.")
    return false
  }

  // Check if cardholder name is provided
  if (cardName.length < 3) {
    alert("Please enter a valid cardholder name.")
    return false
  }

  // Check if expiry date is valid (MM/YY format)
  if (!expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
    alert("Please enter a valid expiry date (MM/YY).")
    return false
  }

  // Check if CVV is valid (3 or 4 digits)
  if (!cvv.match(/^\d{3,4}$/)) {
    alert("Please enter a valid CVV (3 or 4 digits). CVV (3 or 4 digits).")
    return false
  }

  return true
}

// Validate bank transfer
function validateBankTransfer() {
  const transferReference = document.getElementById("transfer-reference").value.trim()

  // Check if transfer reference is provided
  if (transferReference.length < 5) {
    alert("Please enter a valid transfer reference number.")
    return false
  }

  return true
}

// Save shipping information
function saveShippingInfoOld() {
  const form = document.getElementById("shipping-form")
  if (!form) return

  // Create shipping info object
  const shippingInfo = {
    firstName: form.querySelector("#first-name").value,
    lastName: form.querySelector("#last-name").value,
    email: form.querySelector("#email").value,
    phone: form.querySelector("#phone").value,
    address: form.querySelector("#address").value,
    city: form.querySelector("#city").value,
    region: form.querySelector("#region").value,
    postalCode: form.querySelector("#postal-code").value,
    deliveryNotes: form.querySelector("#delivery-notes").value,
    shippingMethod: form.querySelector('input[name="shipping-method"]:checked').value,
  }

  // Save to sessionStorage
  sessionStorage.setItem("shippingInfo", JSON.stringify(shippingInfo))

  // Update confirmation email
  const confirmationEmail = document.getElementById("confirmation-email")
  if (confirmationEmail) {
    confirmationEmail.textContent = shippingInfo.email
  }
}

// Process payment
function processPaymentOld() {
  // Get active payment method
  const activeTab = document.querySelector(".payment-tab.active")
  if (!activeTab) return

  const paymentMethod = activeTab.getAttribute("data-payment")

  // Show loading state
  showPaymentProcessing()

  // Simulate payment processing
  setTimeout(() => {
    // In a real application, you would make an API call to process the payment
    const success = Math.random() > 0.2 // 80% success rate for demo

    if (success) {
      // Payment successful
      completeOrder(paymentMethod)
    } else {
      // Payment failed
      showPaymentError()
    }
  }, 2000)
}

// Show payment processing
function showPaymentProcessing() {
  const paymentForm = document.getElementById("payment-form")
  if (!paymentForm) return

  // Disable form
  const inputs = paymentForm.querySelectorAll("input, button, select, textarea")
  inputs.forEach((input) => {
    input.disabled = true
  })

  // Change button text
  const submitButton = paymentForm.querySelector('button[type="submit"]')
  if (submitButton) {
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'
  }
}

// Show payment error
function showPaymentError() {
  const paymentForm = document.getElementById("payment-form")
  if (!paymentForm) return

  // Enable form
  const inputs = paymentForm.querySelectorAll("input, button, select, textarea")
  inputs.forEach((input) => {
    input.disabled = false
  })

  // Change button text back
  const submitButton = paymentForm.querySelector('button[type="submit"]')
  if (submitButton) {
    submitButton.innerHTML = "Place Order"
  }

  // Show error message
  alert("Payment processing failed. Please try again or use a different payment method.")
}

// Complete order
function completeOrder(paymentMethod) {
  // Generate order number
  const orderNumber = generateOrderNumber()

  // Get current date
  const orderDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  // Get payment method display name
  let paymentMethodDisplay = "Unknown"
  switch (paymentMethod) {
    case "mobile-money":
      const provider = document.querySelector('input[name="mobile-provider"]:checked')
      if (provider) {
        switch (provider.value) {
          case "mtn":
            paymentMethodDisplay = "Mobile Money (MTN)"
            break
          case "airtel-tigo":
            paymentMethodDisplay = "Mobile Money (AirtelTigo)"
            break
          case "vodafone":
            paymentMethodDisplay = "Mobile Money (Vodafone)"
            break
          default:
            paymentMethodDisplay = "Mobile Money"
        }
      }
      break
    case "card":
      paymentMethodDisplay = "Credit/Debit Card"
      break
    case "bank":
      paymentMethodDisplay = "Bank Transfer"
      break
  }

  // Get shipping method display name
  let shippingMethodDisplay = "Standard Shipping"
  const shippingInfo = JSON.parse(sessionStorage.getItem("shippingInfo") || "{}")
  if (shippingInfo.shippingMethod) {
    switch (shippingInfo.shippingMethod) {
      case "express":
        shippingMethodDisplay = "Express Shipping"
        break
      case "same-day":
        shippingMethodDisplay = "Same Day Delivery"
        break
    }
  }

  // Update confirmation details
  document.getElementById("order-number").textContent = orderNumber
  document.getElementById("order-date").textContent = orderDate
  document.getElementById("payment-method").textContent = paymentMethodDisplay
  document.getElementById("shipping-method").textContent = shippingMethodDisplay

  // Clear cart
  clearCart()

  // Go to confirmation step
  goToStep(3)

  // Save order to localStorage for future reference
  saveOrderOld(orderNumber, paymentMethod, shippingMethodDisplay)
}

// Generate order number
function generateOrderNumberOld() {
  const prefix = "KL"
  const timestamp = new Date().getTime().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `${prefix}${timestamp}${random}`
}

// Save order
function saveOrderOld(orderNumber, paymentMethod, shippingMethod) {
  // Get shipping info
  const shippingInfo = JSON.parse(sessionStorage.getItem("shippingInfo") || "{}")

  // Create order object
  const order = {
    orderNumber,
    orderDate: new Date().toISOString(),
    paymentMethod,
    shippingMethod,
    shippingInfo,
    items: getCartWithDetails(),
    subtotal: calculateCartSubtotal(),
    shipping: calculateShippingCostOld(),
    discount: calculateDiscount(),
    total: calculateCartTotal(),
    status: "confirmed",
  }

  // Get existing orders
  const orders = JSON.parse(localStorage.getItem("orders") || "[]")

  // Add new order
  orders.push(order)

  // Save to localStorage
  localStorage.setItem("orders", JSON.stringify(orders))
}

// Go to step
function goToStepOld(step) {
  // Update progress steps
  const progressSteps = document.querySelectorAll(".progress-step")
  progressSteps.forEach((stepEl) => {
    const stepNumber = Number.parseInt(stepEl.getAttribute("data-step"))

    stepEl.classList.remove("active", "completed")

    if (stepNumber === step) {
      stepEl.classList.add("active")
    } else if (stepNumber < step) {
      stepEl.classList.add("completed")
    }
  })

  // Update progress lines
  const progressLines = document.querySelectorAll(".progress-line")
  progressLines.forEach((line, index) => {
    line.classList.remove("active")

    if (index < step - 1) {
      line.classList.add("active")
    }
  })

  // Show/hide steps
  const checkoutSteps = document.querySelectorAll(".checkout-step")
  checkoutSteps.forEach((stepEl, index) => {
    stepEl.classList.remove("active")

    if (index === step - 1) {
      stepEl.classList.add("active")
    }
  })

  // Update URL
  history.pushState(null, "", `?step=${step}`)
}

// Update shipping cost based on selected method
function updateShippingCostOld(method) {
  let shippingCost = 15 // Default (standard)

  switch (method) {
    case "express":
      shippingCost = 30
      break
    case "same-day":
      shippingCost = 50
      break
  }

  // Update shipping cost in cart.js
  if (typeof window.setShippingCost === "function") {
    window.setShippingCost(shippingCost)
  } else {
    // Fallback if setShippingCost is not available
    sessionStorage.setItem("shippingCost", shippingCost.toString())
  }

  // Update summary totals
  updateSummaryTotalsOld()
}

// Calculate shipping cost (override the one in cart.js)
function calculateShippingCostOld() {
  // Check if there's a shipping method selected
  const shippingMethod = document.querySelector('input[name="shipping-method"]:checked')
  if (shippingMethod) {
    switch (shippingMethod.value) {
      case "express":
        return 30
      case "same-day":
        return 50
      default:
        // Standard shipping
        const subtotal = calculateCartSubtotal()
        // Free shipping over ₵200
        return subtotal >= 200 ? 0 : 15
    }
  }

  // Fallback to the original function in cart.js
  if (typeof window.calculateShippingCost === "function") {
    return window.calculateShippingCost()
  }

  // Default shipping cost
  const subtotal = calculateCartSubtotal()
  return subtotal >= 200 ? 0 : 15
}

// Make functions available globally
window.updateSummaryTotals = updateOrderSummary
window.validateShippingForm = validateShippingForm
window.validatePaymentForm = validatePaymentForm
window.processPayment = processPayment
window.goToStep = goToStep

// Add setShippingCost function to cart
window.setShippingCost = (cost) => {
  sessionStorage.setItem("shippingCost", cost.toString())
}

// Mock functions - replace with your actual implementations or imports
function getCartWithDetails() {
  // Replace with your actual implementation to fetch cart items with details
  console.warn("getCartWithDetails() is a mock function. Implement the actual logic.")
  return [] // Return an empty array or your default cart data
}

function calculateCartSubtotal() {
  // Replace with your actual implementation to calculate the cart subtotal
  console.warn("calculateCartSubtotal() is a mock function. Implement the actual logic.")
  return 0 // Return 0 or your default subtotal value
}

function calculateDiscount() {
  // Replace with your actual implementation to calculate the discount
  console.warn("calculateDiscount() is a mock function. Implement the actual logic.")
  return 0 // Return 0 or your default discount value
}

function calculateCartTotal() {
  // Replace with your actual implementation to calculate the cart total
  console.warn("calculateCartTotal() is a mock function. Implement the actual logic.")
  return 0 // Return 0 or your default total value
}

function applyCoupon(promoCode) {
  // Replace with your actual implementation to apply a coupon
  console.warn("applyCoupon() is a mock function. Implement the actual logic.")
  return false // Return false or your default coupon application status
}

function clearCart() {
  // Replace with your actual implementation to clear the cart
  console.warn("clearCart() is a mock function. Implement the actual logic.")
}

// Make functions available globally
window.updateOrderSummary = updateOrderSummary
window.validateShippingForm = validateShippingForm
window.validatePaymentForm = validatePaymentForm
window.processPayment = processPayment
window.goToStep = goToStep
window.showNotification = showNotification
window.loadCheckoutItems = loadCheckoutItems
