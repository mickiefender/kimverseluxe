// Wishlist functionality

document.addEventListener("DOMContentLoaded", () => {
  console.log("Wishlist script loaded")

  // Initialize wishlist
  initWishlist()

  // Update wishlist count in header
  updateWishlistCount()
})

// Initialize wishlist
function initWishlist() {
  // Check if on wishlist page
  const wishlistContainer = document.getElementById("wishlist-items")
  if (wishlistContainer) {
    loadWishlistItems()
  }

  // Add event listeners for wishlist buttons
  const wishlistButtons = document.querySelectorAll(".wishlist-btn")
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      e.stopPropagation()

      const productId = this.getAttribute("data-product-id")
      if (!productId) return

      toggleWishlistItem(productId, this)
    })
  })

  // Update wishlist button states
  updateWishlistButtonStates()
}

// Toggle wishlist item
function toggleWishlistItem(productId, button) {
  // Get current wishlist
  const wishlist = getWishlist()

  // Check if product is already in wishlist
  const existingIndex = wishlist.findIndex((item) => item.id === productId)

  if (existingIndex !== -1) {
    // Remove from wishlist
    wishlist.splice(existingIndex, 1)
    showNotification("Product removed from wishlist!", "info")

    // Update button state
    if (button) {
      if (button.querySelector("i")) {
        button.querySelector("i").className = "far fa-heart"
      }
      if (button.textContent.includes("Remove")) {
        button.innerHTML = `<i class="far fa-heart"></i> Add to Wishlist`
      }
      button.classList.remove("active")
    }
  } else {
    // Add to wishlist
    wishlist.push({
      id: productId,
      addedAt: new Date().toISOString(),
    })
    showNotification("Product added to wishlist!", "success")

    // Update button state
    if (button) {
      if (button.querySelector("i")) {
        button.querySelector("i").className = "fas fa-heart"
      }
      if (button.textContent.includes("Add")) {
        button.innerHTML = `<i class="fas fa-heart"></i> Remove from Wishlist`
      }
      button.classList.add("active")
    }
  }

  // Save updated wishlist
  saveWishlist(wishlist)

  // Update wishlist count
  updateWishlistCount()

  // Update all wishlist button states
  updateWishlistButtonStates()

  // Reload wishlist items if on wishlist page
  const wishlistContainer = document.getElementById("wishlist-items")
  if (wishlistContainer) {
    loadWishlistItems()
  }
}

// Update wishlist button states
function updateWishlistButtonStates() {
  const wishlist = getWishlist()
  const wishlistButtons = document.querySelectorAll(".wishlist-btn")

  wishlistButtons.forEach((button) => {
    const productId = button.getAttribute("data-product-id")
    if (!productId) return

    const isInWishlist = wishlist.some((item) => item.id === productId)

    if (isInWishlist) {
      button.classList.add("active")
      if (button.querySelector("i")) {
        button.querySelector("i").className = "fas fa-heart"
      }
      if (button.textContent.includes("Add")) {
        button.innerHTML = `<i class="fas fa-heart"></i> Remove from Wishlist`
      }
    } else {
      button.classList.remove("active")
      if (button.querySelector("i")) {
        button.querySelector("i").className = "far fa-heart"
      }
      if (button.textContent.includes("Remove")) {
        button.innerHTML = `<i class="far fa-heart"></i> Add to Wishlist`
      }
    }
  })
}

// Get wishlist from localStorage
function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || []
}

// Save wishlist to localStorage
function saveWishlist(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist))
}

// Update wishlist count in header
function updateWishlistCount() {
  const wishlist = getWishlist()
  const count = wishlist.length

  // Update all wishlist count elements
  const wishlistCountElements = document.querySelectorAll(".wishlist-count")
  wishlistCountElements.forEach((element) => {
    element.textContent = count
  })

  return count
}

// Check if product is in wishlist
function isInWishlist(productId) {
  const wishlist = getWishlist()
  return wishlist.some((item) => item.id === productId)
}

// Load wishlist items on wishlist page
function loadWishlistItems() {
  const wishlistContainer = document.getElementById("wishlist-items")
  if (!wishlistContainer) return

  // Get wishlist
  const wishlist = getWishlist()

  // Clear container
  wishlistContainer.innerHTML = ""

  // Check if wishlist is empty
  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = `
      <div class="wishlist-empty">
        <i class="far fa-heart"></i>
        <h2>Your wishlist is empty</h2>
        <p>Add items to your wishlist to save them for later.</p>
        <a href="shop.html" class="btn primary-btn">Continue Shopping</a>
      </div>
    `
    return
  }

  // Create wishlist table
  const wishlistTable = document.createElement("table")
  wishlistTable.className = "wishlist-table"
  wishlistTable.innerHTML = `
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Stock Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody></tbody>
  `

  const tableBody = wishlistTable.querySelector("tbody")

  // Get products data
  let products = []
  if (typeof window.getProducts === "function") {
    products = window.getProducts()
  } else if (window.products) {
    products = window.products
  }

  // Add wishlist items to table
  wishlist.forEach((item) => {
    const product = products.find((p) => p.id === item.id)
    if (!product) return

    const inStock = product.stock > 0

    const row = document.createElement("tr")
    row.innerHTML = `
      <td>
        <div class="wishlist-product">
          <img src="${product.image || "/placeholder.svg?height=80&width=80"}" alt="${product.name}">
          <div class="wishlist-product-info">
            <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
            <p>${product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : "Uncategorized"}</p>
          </div>
        </div>
      </td>
      <td class="wishlist-price">₵${product.price.toFixed(2)}</td>
      <td class="${inStock ? "in-stock" : "out-of-stock"}">${inStock ? "In Stock" : "Out of Stock"}</td>
      <td>
        <div class="wishlist-actions-cell">
          <button class="btn primary-btn add-to-cart-btn" data-product-id="${product.id}" ${!inStock ? "disabled" : ""}>
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
          <button class="wishlist-action-btn remove-wishlist-btn" data-product-id="${product.id}" title="Remove">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </td>
    `

    tableBody.appendChild(row)
  })

  // Add table to container
  wishlistContainer.appendChild(wishlistTable)

  // Add clear wishlist button
  const clearButton = document.createElement("div")
  clearButton.className = "wishlist-clear"
  clearButton.innerHTML = `
    <button class="btn outline-btn clear-wishlist-btn">
      <i class="fas fa-trash-alt"></i> Clear Wishlist
    </button>
  `
  wishlistContainer.appendChild(clearButton)

  // Add event listeners for wishlist actions
  initWishlistActions()
}

// Initialize wishlist actions
function initWishlistActions() {
  // Remove item buttons
  const removeButtons = document.querySelectorAll(".remove-wishlist-btn")
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-product-id")
      if (!productId) return

      toggleWishlistItem(productId)
    })
  })

  // Clear wishlist button
  const clearButton = document.querySelector(".clear-wishlist-btn")
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your wishlist?")) {
        clearWishlist()
      }
    })
  }

  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll(".wishlist-table .add-to-cart-btn")
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-product-id")
      if (!productId) return

      // Add to cart
      if (typeof window.addToCart === "function") {
        window.addToCart(productId, 1)
        showNotification("Product added to cart!", "success")

        // Optionally remove from wishlist after adding to cart
        // toggleWishlistItem(productId);
      } else {
        console.error("addToCart function not found")
        showNotification("Failed to add product to cart. Please try again.", "error")
      }
    })
  })
}

// Clear wishlist
function clearWishlist() {
  // Clear wishlist in localStorage
  saveWishlist([])

  // Update wishlist count
  updateWishlistCount()

  // Update all wishlist button states
  updateWishlistButtonStates()

  // Reload wishlist items
  loadWishlistItems()

  // Show notification
  showNotification("Wishlist cleared!", "info")
}

// Move all items from wishlist to cart
function moveAllToCart() {
  const wishlist = getWishlist()

  if (wishlist.length === 0) {
    showNotification("Your wishlist is empty.", "info")
    return
  }

  // Add each item to cart
  wishlist.forEach((item) => {
    if (typeof window.addToCart === "function") {
      window.addToCart(item.id, 1)
    }
  })

  // Show notification
  showNotification("All items added to cart!", "success")
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
window.getWishlist = getWishlist
window.saveWishlist = saveWishlist
window.toggleWishlistItem = toggleWishlistItem
window.updateWishlistCount = updateWishlistCount
window.isInWishlist = isInWishlist
window.loadWishlistItems = loadWishlistItems
window.clearWishlist = clearWishlist
window.moveAllToCart = moveAllToCart
window.updateWishlistButtonStates = updateWishlistButtonStates
