// Cart functionality

document.addEventListener("DOMContentLoaded", () => {
  console.log("Cart script loaded")

  // Initialize cart
  initCart()

  // Update cart count in header
  updateCartCount()
})

// Initialize cart
function initCart() {
  // Check if on cart page
  const cartContainer = document.getElementById("cart-items")
  if (cartContainer) {
    loadCartItems()
  }

  // Add event listeners for add to cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn")
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      e.stopPropagation()

      const productId = this.getAttribute("data-product-id")
      if (!productId) return

      // Get quantity if available
      const quantityInput = document.getElementById("product-quantity")
      const quantity = quantityInput ? Number.parseInt(quantityInput.value) : 1

      addToCart(productId, quantity)
    })
  })
}

// Add to cart
function addToCart(productId, quantity = 1) {
  // Get current cart
  const cart = getCart()

  // Check if product already in cart
  const existingItemIndex = cart.findIndex((item) => item.id === productId)

  if (existingItemIndex !== -1) {
    // Update quantity if product already in cart
    cart[existingItemIndex].quantity += quantity
  } else {
    // Add new product to cart
    cart.push({
      id: productId,
      quantity: quantity,
      addedAt: new Date().toISOString(),
    })
  }

  // Save updated cart
  saveCart(cart)

  // Update cart count
  updateCartCount()

  // Show notification
  showNotification(`${quantity} ${quantity > 1 ? "items" : "item"} added to cart!`, "success")

  // Reload cart items if on cart page
  const cartContainer = document.getElementById("cart-items")
  if (cartContainer) {
    loadCartItems()
  }
}

// Remove from cart
function removeFromCart(productId) {
  // Get current cart
  let cart = getCart()

  // Remove product from cart
  cart = cart.filter((item) => item.id !== productId)

  // Save updated cart
  saveCart(cart)

  // Update cart count
  updateCartCount()

  // Show notification
  showNotification("Product removed from cart!", "info")

  // Reload cart items if on cart page
  const cartContainer = document.getElementById("cart-items")
  if (cartContainer) {
    loadCartItems()
  }
}

// Update cart quantity
function updateCartQuantity(productId, quantity) {
  // Get current cart
  let cart = getCart()

  // Find product in cart
  const productIndex = cart.findIndex((item) => item.id === productId)

  if (productIndex !== -1) {
    // Update quantity
    if (quantity > 0) {
      cart[productIndex].quantity = quantity
    } else {
      // Remove product if quantity is 0 or less
      cart = cart.filter((item) => item.id !== productId)
    }

    // Save updated cart
    saveCart(cart)

    // Update cart count
    updateCartCount()

    // Update cart totals
    updateCartTotals()

    // Reload cart items if on cart page
    const cartContainer = document.getElementById("cart-items")
    if (cartContainer) {
      loadCartItems()
    }
  }
}

// Get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || []
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart))
}

// Update cart count in header
function updateCartCount() {
  const cart = getCart()
  const count = cart.reduce((total, item) => total + item.quantity, 0)

  // Update all cart count elements
  const cartCountElements = document.querySelectorAll(".cart-count")
  cartCountElements.forEach((element) => {
    element.textContent = count
  })

  return count
}

// Get cart with product details
window.getCartWithDetails = () => {
  try {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]")

    // If we already have product details in the cart items, return them
    if (cartItems.length > 0 && cartItems[0].product) {
      return cartItems
    }

    // Otherwise, fetch product details
    const products = getAllProducts()

    return cartItems.map((item) => {
      const product = products.find((p) => p.id === item.id) || {
        name: "Unknown Product",
        price: item.price || 0,
        image: "/placeholder.svg?height=100&width=100",
      }

      return {
        id: item.id,
        product: product,
        quantity: item.quantity,
        total: product.price * item.quantity,
      }
    })
  } catch (error) {
    console.error("Error getting cart with details:", error)
    return []
  }
}

// Calculate cart subtotal
window.calculateCartSubtotal = () => {
  try {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]")
    const products = getAllProducts()

    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id)
      const price = product ? product.price : item.price || 0
      return total + price * item.quantity
    }, 0)
  } catch (error) {
    console.error("Error calculating cart subtotal:", error)
    return 0
  }
}

// Calculate discount
window.calculateDiscount = () => {
  const subtotal = window.calculateCartSubtotal()
  const discountPercent = Number.parseInt(sessionStorage.getItem("discountPercent") || "0")

  if (discountPercent > 0) {
    return (subtotal * discountPercent) / 100
  }

  return 0
}

// Calculate shipping cost
window.calculateShippingCost = () => {
  const subtotal = window.calculateCartSubtotal()
  const shippingMethod = sessionStorage.getItem("shippingMethod") || "standard"

  // Check if free shipping coupon is applied
  if (sessionStorage.getItem("freeShipping") === "true") {
    return 0
  }

  switch (shippingMethod) {
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

// Calculate cart total
window.calculateCartTotal = () => {
  const subtotal = window.calculateCartSubtotal()
  const shipping = window.calculateShippingCost()
  const discount = window.calculateDiscount()

  return subtotal + shipping - discount
}

// Apply coupon
window.applyCoupon = (code) => {
  code = code.toUpperCase()

  // Reset previous coupons
  sessionStorage.removeItem("appliedCoupon")
  sessionStorage.removeItem("discountPercent")
  sessionStorage.removeItem("freeShipping")

  if (code === "DISCOUNT10") {
    sessionStorage.setItem("appliedCoupon", code)
    sessionStorage.setItem("discountPercent", "10")
    return true
  } else if (code === "DISCOUNT20") {
    sessionStorage.setItem("appliedCoupon", code)
    sessionStorage.setItem("discountPercent", "20")
    return true
  } else if (code === "FREESHIP") {
    sessionStorage.setItem("appliedCoupon", code)
    sessionStorage.setItem("freeShipping", "true")
    return true
  }

  return false
}

// Clear cart
window.clearCart = () => {
  localStorage.removeItem("cart")
  updateCartCount()
}

// Helper function to get all products
function getAllProducts() {
  try {
    return window.products || []
  } catch (error) {
    console.error("Error getting products:", error)
    return []
  }
}

// Load cart items on cart page
function loadCartItems() {
  const cartContainer = document.getElementById("cart-items")
  if (!cartContainer) return

  // Get cart with product details
  const cartItems = window.getCartWithDetails()

  // Clear container
  cartContainer.innerHTML = ""

  // Check if cart is empty
  if (cartItems.length === 0) {
    cartContainer.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-cart"></i>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <a href="shop.html" class="btn primary-btn">Continue Shopping</a>
      </div>
    `

    // Hide cart totals
    const cartTotals = document.querySelector(".cart-totals")
    if (cartTotals) {
      cartTotals.style.display = "none"
    }

    return
  }

  // Show cart totals
  const cartTotals = document.querySelector(".cart-totals")
  if (cartTotals) {
    cartTotals.style.display = "block"
  }

  // Create cart table
  const cartTable = document.createElement("table")
  cartTable.className = "cart-table"
  cartTable.innerHTML = `
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
        <th></th>
      </tr>
    </thead>
    <tbody></tbody>
  `

  const tableBody = cartTable.querySelector("tbody")

  // Add cart items to table
  cartItems.forEach((item) => {
    const { product, quantity, total } = item

    const row = document.createElement("tr")
    row.innerHTML = `
      <td>
        <div class="cart-product">
          <img src="${product.image || "/placeholder.svg?height=80&width=80"}" alt="${product.name}">
          <div class="cart-product-info">
            <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
            <p>${product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : "Uncategorized"}</p>
          </div>
        </div>
      </td>
      <td class="cart-price">₵${product.price.toFixed(2)}</td>
      <td>
        <div class="quantity-selector">
          <button class="quantity-btn minus" data-product-id="${product.id}">-</button>
          <input type="number" value="${quantity}" min="1" class="quantity-input" data-product-id="${product.id}">
          <button class="quantity-btn plus" data-product-id="${product.id}">+</button>
        </div>
      </td>
      <td class="cart-total">₵${total.toFixed(2)}</td>
      <td>
        <button class="cart-remove-btn" data-product-id="${product.id}">
          <i class="fas fa-times"></i>
        </button>
      </td>
    `

    tableBody.appendChild(row)
  })

  // Add table to container
  cartContainer.appendChild(cartTable)

  // Add cart actions
  const cartActions = document.createElement("div")
  cartActions.className = "cart-actions"
  cartActions.innerHTML = `
    <div class="coupon-form">
      <input type="text" placeholder="Coupon code" id="coupon-code" value="${localStorage.getItem("couponCode") || ""}">
      <button class="btn outline-btn apply-coupon-btn">Apply Coupon</button>
    </div>
    <div class="cart-buttons">
      <button class="btn outline-btn update-cart-btn">Update Cart</button>
      <button class="btn outline-btn clear-cart-btn">Clear Cart</button>
    </div>
  `
  cartContainer.appendChild(cartActions)

  // Update cart totals
  updateCartTotals()

  // Add event listeners for cart actions
  initCartActions()
}

// Update cart totals
function updateCartTotals() {
  const subtotalElement = document.getElementById("cart-subtotal")
  const shippingElement = document.getElementById("cart-shipping")
  const discountElement = document.getElementById("cart-discount")
  const totalElement = document.getElementById("cart-total")

  if (!subtotalElement || !shippingElement || !discountElement || !totalElement) return

  const subtotal = window.calculateCartSubtotal()
  const shipping = window.calculateShippingCost()
  const discount = window.calculateDiscount()
  const total = calculateCartTotal()

  subtotalElement.textContent = `₵${subtotal.toFixed(2)}`
  shippingElement.textContent = shipping === 0 ? "Free" : `₵${shipping.toFixed(2)}`
  discountElement.textContent = discount === 0 ? "₵0.00" : `₵${discount.toFixed(2)}`
  totalElement.textContent = `₵${total.toFixed(2)}`
}

// Initialize cart actions
function initCartActions() {
  // Quantity buttons
  const minusButtons = document.querySelectorAll(".quantity-btn.minus")
  const plusButtons = document.querySelectorAll(".quantity-btn.plus")
  const quantityInputs = document.querySelectorAll(".quantity-input")

  minusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-product-id")
      if (!productId) return

      const input = document.querySelector(`.quantity-input[data-product-id="${productId}"]`)
      if (!input) return

      let quantity = Number.parseInt(input.value)
      if (quantity > 1) {
        quantity--
        input.value = quantity
        updateCartQuantity(productId, quantity)
      }
    })
  })

  plusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-product-id")
      if (!productId) return

      const input = document.querySelector(`.quantity-input[data-product-id="${productId}"]`)
      if (!input) return

      let quantity = Number.parseInt(input.value)
      quantity++
      input.value = quantity
      updateCartQuantity(productId, quantity)
    })
  })

  quantityInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const productId = this.getAttribute("data-product-id")
      if (!productId) return

      let quantity = Number.parseInt(this.value)
      if (isNaN(quantity) || quantity < 1) {
        quantity = 1
        this.value = quantity
      }

      updateCartQuantity(productId, quantity)
    })
  })

  // Remove buttons
  const removeButtons = document.querySelectorAll(".cart-remove-btn")
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-product-id")
      if (!productId) return

      removeFromCart(productId)
    })
  })

  // Update cart button
  const updateCartButton = document.querySelector(".update-cart-btn")
  if (updateCartButton) {
    updateCartButton.addEventListener("click", () => {
      // Get all quantity inputs
      const quantityInputs = document.querySelectorAll(".quantity-input")

      // Update quantities
      quantityInputs.forEach((input) => {
        const productId = input.getAttribute("data-product-id")
        if (!productId) return

        const quantity = Number.parseInt(input.value)
        if (isNaN(quantity) || quantity < 1) return

        updateCartQuantity(productId, quantity)
      })

      showNotification("Cart updated!", "success")
    })
  }

  // Clear cart button
  const clearCartButton = document.querySelector(".clear-cart-btn")
  if (clearCartButton) {
    clearCartButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your cart?")) {
        clearCart()
      }
    })
  }

  // Apply coupon button
  const applyCouponButton = document.querySelector(".apply-coupon-btn")
  if (applyCouponButton) {
    applyCouponButton.addEventListener("click", () => {
      const couponCode = document.getElementById("coupon-code").value.trim()

      if (window.applyCoupon(couponCode)) {
        // Update cart totals
        updateCartTotals()
      }
    })
  }

  // Checkout button
  const checkoutButton = document.getElementById("checkout-btn")
  if (checkoutButton) {
    checkoutButton.addEventListener("click", (e) => {
      e.preventDefault()

      // Check if cart is empty
      const cart = getCart()
      if (cart.length === 0) {
        showNotification("Your cart is empty.", "error")
        return
      }

      // Open WhatsApp with cart details
      if (typeof window.openWhatsAppWithCart === "function") {
        window.openWhatsAppWithCart()
      } else {
        console.error("openWhatsAppWithCart function not found")
        showNotification("WhatsApp integration not available. Please try again later.", "error")

        // Fallback to original behavior
        window.location.href = "checkout.html"
      }
    })
  }
}

// Clear cart
function clearCart() {
  // Clear cart in localStorage
  saveCart([])

  // Remove coupon code
  localStorage.removeItem("couponCode")

  // Update cart count
  updateCartCount()

  // Reload cart items
  loadCartItems()

  // Show notification
  showNotification("Cart cleared!", "info")
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

// Make functions available globally
window.addToCart = addToCart
window.removeFromCart = removeFromCart
window.updateCartQuantity = updateCartQuantity
window.getCart = getCart
window.saveCart = saveCart
window.updateCartCount = updateCartCount
window.loadCartItems = loadCartItems

