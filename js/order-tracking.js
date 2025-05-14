// Order Tracking System for Kimverse Luxe
// This file handles order creation, payment tracking, and order status management

// Initialize the order tracking system
document.addEventListener("DOMContentLoaded", () => {
  console.log("Order tracking system initialized")

  // Initialize order history if on the order history page
  if (document.querySelector(".order-history-section")) {
    loadOrderHistory()
  }

  // Initialize admin dashboard if on the admin page
  if (document.querySelector(".admin-dashboard")) {
    loadAdminDashboard()
  }
})

// Create a new order and return the order ID
function createOrder(cartItems, customerInfo, shippingInfo, paymentMethod) {
  // Generate a unique order ID
  const orderId = generateOrderId()

  // Create order object with all details
  const order = {
    id: orderId,
    createdAt: new Date().toISOString(),
    status: "pending", // Initial status is pending
    customer: customerInfo,
    shipping: shippingInfo,
    payment: {
      method: paymentMethod,
      status: "pending",
      transactionId: null, // Will be updated when payment is processed
      paidAt: null,
    },
    items: cartItems.map((item) => ({
      id: item.id,
      productId: item.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      total: item.total,
      image: item.product.image,
    })),
    totals: {
      subtotal: calculateSubtotal(cartItems),
      shipping: calculateShippingCost(shippingInfo.method, calculateSubtotal(cartItems)),
      discount: calculateDiscount(calculateSubtotal(cartItems)),
      tax: calculateTax(calculateSubtotal(cartItems)),
      total: calculateTotal(cartItems, shippingInfo.method),
    },
  }

  // Save order to localStorage (in a real app, this would go to a database)
  saveOrder(order)

  // Return the order ID for reference
  return orderId
}

// Generate a unique order ID
function generateOrderId() {
  const prefix = "KL"
  const timestamp = new Date().getTime().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `${prefix}${timestamp}${random}`
}

// Save order to localStorage
function saveOrder(order) {
  // Get existing orders
  const orders = JSON.parse(localStorage.getItem("orders") || "[]")

  // Add new order
  orders.push(order)

  // Save back to localStorage
  localStorage.setItem("orders", JSON.stringify(orders))

  // Also save to user's order history if logged in
  const currentUser = getCurrentUser()
  if (currentUser) {
    const userOrders = JSON.parse(localStorage.getItem(`orders_${currentUser.id}`) || "[]")
    userOrders.push(order.id)
    localStorage.setItem(`orders_${currentUser.id}`, JSON.stringify(userOrders))
  }

  console.log(`Order ${order.id} saved successfully`)
}

// Get order by ID
function getOrderById(orderId) {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]")
  return orders.find((order) => order.id === orderId) || null
}

// Update order status
function updateOrderStatus(orderId, status) {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]")
  const orderIndex = orders.findIndex((order) => order.id === orderId)

  if (orderIndex === -1) {
    console.error(`Order ${orderId} not found`)
    return false
  }

  orders[orderIndex].status = status
  localStorage.setItem("orders", JSON.stringify(orders))

  console.log(`Order ${orderId} status updated to ${status}`)
  return true
}

// Update payment status and record transaction details
function recordPayment(orderId, transactionId, paymentStatus = "completed") {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]")
  const orderIndex = orders.findIndex((order) => order.id === orderId)

  if (orderIndex === -1) {
    console.error(`Order ${orderId} not found`)
    return false
  }

  // Update payment information
  orders[orderIndex].payment.status = paymentStatus
  orders[orderIndex].payment.transactionId = transactionId
  orders[orderIndex].payment.paidAt = new Date().toISOString()

  // If payment is completed, update order status to processing
  if (paymentStatus === "completed") {
    orders[orderIndex].status = "processing"
  } else if (paymentStatus === "failed") {
    orders[orderIndex].status = "payment_failed"
  }

  // Save updated orders
  localStorage.setItem("orders", JSON.stringify(orders))

  console.log(`Payment recorded for order ${orderId}: ${transactionId} (${paymentStatus})`)
  return true
}

// Handle payment webhook from payment processor
function handlePaymentWebhook(webhookData) {
  // Extract relevant information from webhook data
  const { orderId, transactionId, status, amount } = webhookData

  // Verify the payment amount matches the order total
  const order = getOrderById(orderId)
  if (!order) {
    console.error(`Order ${orderId} not found when processing webhook`)
    return {
      success: false,
      message: "Order not found",
    }
  }

  // Verify payment amount (with some tolerance for currency conversion)
  const orderTotal = order.totals.total
  const amountDifference = Math.abs(orderTotal - amount)
  const isAmountValid = amountDifference < 0.01 // 1 cent tolerance

  if (!isAmountValid) {
    console.error(`Payment amount mismatch for order ${orderId}: expected ${orderTotal}, got ${amount}`)
    return {
      success: false,
      message: "Payment amount mismatch",
    }
  }

  // Record the payment
  const paymentStatus = status === "success" ? "completed" : "failed"
  const success = recordPayment(orderId, transactionId, paymentStatus)

  // If payment was successful, trigger post-payment actions
  if (success && paymentStatus === "completed") {
    sendOrderConfirmationEmail(orderId)
    updateInventory(order.items)
  }

  return {
    success,
    message: success ? "Payment processed successfully" : "Failed to process payment",
  }
}

// Get all orders (for admin)
function getAllOrders() {
  return JSON.parse(localStorage.getItem("orders") || "[]")
}

// Get orders for current user
function getUserOrders() {
  const currentUser = getCurrentUser()
  if (!currentUser) return []

  const userOrderIds = JSON.parse(localStorage.getItem(`orders_${currentUser.id}`) || "[]")
  const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")

  return allOrders.filter((order) => userOrderIds.includes(order.id))
}

// Load order history for current user
function loadOrderHistory() {
  const orderHistoryContainer = document.querySelector(".order-history-container")
  if (!orderHistoryContainer) return

  const orders = getUserOrders()

  // Clear container
  orderHistoryContainer.innerHTML = ""

  // Check if user has orders
  if (orders.length === 0) {
    orderHistoryContainer.innerHTML = `
      <div class="empty-orders">
        <div class="empty-orders-icon">
          <i class="fas fa-shopping-bag"></i>
        </div>
        <h3>No orders yet</h3>
        <p>You haven't placed any orders yet.</p>
        <a href="shop.html" class="btn btn-primary">Start Shopping</a>
      </div>
    `
    return
  }

  // Sort orders by date (newest first)
  orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  // Add orders to container
  orders.forEach((order) => {
    const orderElement = createOrderElement(order)
    orderHistoryContainer.appendChild(orderElement)
  })
}

// Create an order element for the order history page
function createOrderElement(order) {
  const orderElement = document.createElement("div")
  orderElement.className = "order-card"

  // Format date
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Get status class
  const statusClass = getStatusClass(order.status)

  // Create HTML
  orderElement.innerHTML = `
    <div class="order-header">
      <div class="order-id">
        <h3>Order #${order.id}</h3>
        <span class="order-date">${orderDate}</span>
      </div>
      <div class="order-status ${statusClass}">
        ${formatStatus(order.status)}
      </div>
    </div>
    <div class="order-items">
      ${order.items
        .map(
          (item) => `
        <div class="order-item">
          <div class="item-image">
            <img src="${item.image || "/placeholder.svg?height=60&width=60"}" alt="${item.name}">
          </div>
          <div class="item-details">
            <div class="item-name">${item.name}</div>
            <div class="item-meta">
              <span class="item-price">₵${item.price.toFixed(2)}</span>
              <span class="item-quantity">× ${item.quantity}</span>
            </div>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
    <div class="order-footer">
      <div class="order-total">
        <span>Total:</span>
        <span class="total-amount">₵${order.totals.total.toFixed(2)}</span>
      </div>
      <div class="order-actions">
        <button class="btn btn-outline view-details-btn" data-order-id="${order.id}">View Details</button>
        ${order.status === "delivered" ? `<button class="btn btn-primary write-review-btn" data-order-id="${order.id}">Write Review</button>` : ""}
      </div>
    </div>
  `

  // Add event listeners
  const viewDetailsBtn = orderElement.querySelector(".view-details-btn")
  viewDetailsBtn.addEventListener("click", () => {
    window.location.href = `order-details.html?id=${order.id}`
  })

  const writeReviewBtn = orderElement.querySelector(".write-review-btn")
  if (writeReviewBtn) {
    writeReviewBtn.addEventListener("click", () => {
      // Open review modal
      openReviewModal(order.id)
    })
  }

  return orderElement
}

// Get status class for styling
function getStatusClass(status) {
  switch (status) {
    case "pending":
      return "status-pending"
    case "processing":
      return "status-processing"
    case "shipped":
      return "status-shipped"
    case "delivered":
      return "status-delivered"
    case "cancelled":
      return "status-cancelled"
    case "payment_failed":
      return "status-failed"
    default:
      return ""
  }
}

// Format status for display
function formatStatus(status) {
  switch (status) {
    case "pending":
      return "Pending"
    case "processing":
      return "Processing"
    case "shipped":
      return "Shipped"
    case "delivered":
      return "Delivered"
    case "cancelled":
      return "Cancelled"
    case "payment_failed":
      return "Payment Failed"
    default:
      return status.charAt(0).toUpperCase() + status.slice(1)
  }
}

// Load admin dashboard
function loadAdminDashboard() {
  const ordersTableBody = document.querySelector(".admin-orders-table tbody")
  if (!ordersTableBody) return

  const orders = getAllOrders()

  // Clear table
  ordersTableBody.innerHTML = ""

  // Sort orders by date (newest first)
  orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  // Add orders to table
  orders.forEach((order) => {
    const row = document.createElement("tr")

    // Format date
    const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Get status class
    const statusClass = getStatusClass(order.status)

    row.innerHTML = `
      <td>${order.id}</td>
      <td>${orderDate}</td>
      <td>${order.customer.firstName} ${order.customer.lastName}</td>
      <td>₵${order.totals.total.toFixed(2)}</td>
      <td><span class="status-badge ${statusClass}">${formatStatus(order.status)}</span></td>
      <td>
        <button class="btn btn-sm btn-outline view-order-btn" data-order-id="${order.id}">View</button>
        <button class="btn btn-sm btn-primary update-status-btn" data-order-id="${order.id}">Update</button>
      </td>
    `

    // Add event listeners
    const viewOrderBtn = row.querySelector(".view-order-btn")
    viewOrderBtn.addEventListener("click", () => {
      window.location.href = `admin-order-details.html?id=${order.id}`
    })

    const updateStatusBtn = row.querySelector(".update-status-btn")
    updateStatusBtn.addEventListener("click", () => {
      openUpdateStatusModal(order.id)
    })

    ordersTableBody.appendChild(row)
  })

  // Update dashboard stats
  updateDashboardStats(orders)
}

// Update dashboard statistics
function updateDashboardStats(orders) {
  const totalOrdersElement = document.getElementById("total-orders")
  const pendingOrdersElement = document.getElementById("pending-orders")
  const completedOrdersElement = document.getElementById("completed-orders")
  const totalRevenueElement = document.getElementById("total-revenue")

  if (!totalOrdersElement || !pendingOrdersElement || !completedOrdersElement || !totalRevenueElement) return

  const totalOrders = orders.length
  const pendingOrders = orders.filter((order) => ["pending", "processing", "shipped"].includes(order.status)).length
  const completedOrders = orders.filter((order) => order.status === "delivered").length
  const totalRevenue = orders
    .filter((order) => order.payment.status === "completed")
    .reduce((total, order) => total + order.totals.total, 0)

  totalOrdersElement.textContent = totalOrders
  pendingOrdersElement.textContent = pendingOrders
  completedOrdersElement.textContent = completedOrders
  totalRevenueElement.textContent = `₵${totalRevenue.toFixed(2)}`
}

// Open update status modal
function openUpdateStatusModal(orderId) {
  const order = getOrderById(orderId)
  if (!order) return

  // Create modal
  const modal = document.createElement("div")
  modal.className = "modal update-status-modal"
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Update Order Status</h3>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <p>Order #${order.id}</p>
        <div class="form-group">
          <label for="order-status">Status</label>
          <select id="order-status" class="form-control">
            <option value="pending" ${order.status === "pending" ? "selected" : ""}>Pending</option>
            <option value="processing" ${order.status === "processing" ? "selected" : ""}>Processing</option>
            <option value="shipped" ${order.status === "shipped" ? "selected" : ""}>Shipped</option>
            <option value="delivered" ${order.status === "delivered" ? "selected" : ""}>Delivered</option>
            <option value="cancelled" ${order.status === "cancelled" ? "selected" : ""}>Cancelled</option>
          </select>
        </div>
        <div class="form-group">
          <label for="status-notes">Notes (optional)</label>
          <textarea id="status-notes" class="form-control" rows="3"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline cancel-btn">Cancel</button>
        <button class="btn btn-primary save-status-btn">Save Changes</button>
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

  const saveBtn = modal.querySelector(".save-status-btn")
  saveBtn.addEventListener("click", () => {
    const statusSelect = modal.querySelector("#order-status")
    const notesTextarea = modal.querySelector("#status-notes")

    const newStatus = statusSelect.value
    const notes = notesTextarea.value.trim()

    // Update order status
    const success = updateOrderStatus(orderId, newStatus)

    if (success) {
      // If status changed to shipped, send shipping notification
      if (newStatus === "shipped" && order.status !== "shipped") {
        sendShippingNotification(orderId, notes)
      }

      // Reload admin dashboard
      loadAdminDashboard()

      // Show success notification
      showNotification("Order status updated successfully", "success")
    } else {
      showNotification("Failed to update order status", "error")
    }

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

// Send order confirmation email
function sendOrderConfirmationEmail(orderId) {
  const order = getOrderById(orderId)
  if (!order) return false

  // In a real application, you would call your email service here
  console.log(`Sending order confirmation email for order ${orderId} to ${order.customer.email}`)

  // For demo purposes, we'll just log the email content
  const emailContent = `
    Dear ${order.customer.firstName},
    
    Thank you for your order! We're pleased to confirm that we've received your order #${order.id}.
    
    Order Details:
    ${order.items.map((item) => `- ${item.quantity}x ${item.name}: ₵${item.total.toFixed(2)}`).join("\n")}
    
    Subtotal: ₵${order.totals.subtotal.toFixed(2)}
    Shipping: ₵${order.totals.shipping.toFixed(2)}
    Discount: -₵${order.totals.discount.toFixed(2)}
    Total: ₵${order.totals.total.toFixed(2)}
    
    We'll notify you when your order has been shipped.
    
    Thank you for shopping with Kimverse Luxe!
  `

  console.log("Email content:", emailContent)
  return true
}

// Send shipping notification
function sendShippingNotification(orderId, trackingInfo = "") {
  const order = getOrderById(orderId)
  if (!order) return false

  // In a real application, you would call your email service here
  console.log(`Sending shipping notification for order ${orderId} to ${order.customer.email}`)

  // For demo purposes, we'll just log the email content
  const emailContent = `
    Dear ${order.customer.firstName},
    
    Great news! Your order #${order.id} has been shipped.
    
    ${trackingInfo ? `Tracking Information: ${trackingInfo}` : ""}
    
    Order Details:
    ${order.items.map((item) => `- ${item.quantity}x ${item.name}`).join("\n")}
    
    Estimated delivery: 3-5 business days
    
    Thank you for shopping with Kimverse Luxe!
  `

  console.log("Email content:", emailContent)
  return true
}

// Update inventory after successful order
function updateInventory(orderItems) {
  // In a real application, you would update your inventory database
  console.log("Updating inventory for items:", orderItems)

  // For demo purposes, we'll just log the inventory updates
  orderItems.forEach((item) => {
    console.log(`Reducing inventory for product ${item.productId} by ${item.quantity}`)
  })
}

// Calculate subtotal
function calculateSubtotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.total, 0)
}

// Calculate shipping cost
function calculateShippingCost(method, subtotal) {
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

// Calculate discount
function calculateDiscount(subtotal) {
  // Check if there's a discount percentage in session storage
  const discountPercent = Number.parseInt(sessionStorage.getItem("discountPercent") || "0")
  if (discountPercent > 0) {
    return (subtotal * discountPercent) / 100
  }
  return 0
}

// Calculate tax
function calculateTax(subtotal) {
  // For demo purposes, we'll use a fixed tax rate of 0%
  return 0
}

// Calculate total
function calculateTotal(cartItems, shippingMethod) {
  const subtotal = calculateSubtotal(cartItems)
  const shipping = calculateShippingCost(shippingMethod, subtotal)
  const discount = calculateDiscount(subtotal)
  const tax = calculateTax(subtotal)

  return subtotal + shipping + tax - discount
}

// Get current user (mock function)
function getCurrentUser() {
  // In a real application, you would get this from your authentication system
  const user = JSON.parse(localStorage.getItem("currentUser"))
  return user
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
window.createOrder = createOrder
window.getOrderById = getOrderById
window.updateOrderStatus = updateOrderStatus
window.recordPayment = recordPayment
window.handlePaymentWebhook = handlePaymentWebhook
window.getUserOrders = getUserOrders
window.loadOrderHistory = loadOrderHistory

// Dummy function for openReviewModal
function openReviewModal(orderId) {
  console.log(`Opening review modal for order ${orderId}`)
  // Add your review modal logic here
}
