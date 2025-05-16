// Shop page functionality

document.addEventListener("DOMContentLoaded", () => {
  console.log("Shop page loaded")

  // DOM Elements
  const productsGrid = document.querySelector(".products-grid")
  const productsList = document.querySelector(".products-list")
  const productCount = document.querySelector(".product-count")
  const sortBySelect = document.getElementById("sort-by")
  const viewButtons = document.querySelectorAll(".view-button")
  const priceRange = document.getElementById("price-range")
  const priceOutput = document.getElementById("price-output")
  const filterForm = document.querySelector(".shop-filters form")
  const resetFiltersButton = document.querySelector(".reset-filters")
  const filterToggle = document.querySelector(".filter-toggle")
  const shopSidebar = document.querySelector(".shop-sidebar")
  const searchInput = document.getElementById("search-products")
  const loadMoreButton = document.querySelector(".load-more-btn")
  const categoryCheckboxes = document.querySelectorAll('input[name="category"]')

  // Variables
  let currentProducts = []
  let filteredProducts = []
  let currentPage = 1
  const productsPerPage = 8
  let currentView = 4 // Default grid view with 4 columns
  let currentFilters = {
    categories: [],
    tags: [],
    maxPrice: 3000,
    search: "",
    filter: "", // For special filters like 'new', 'sale', etc.
  }

  // Initialize
  initShop()

  // Initialize shop
  function initShop() {
    // Load products
    loadProducts()

    // Initialize event listeners
    initEventListeners()

    console.log("Shop initialized")
  }

  // Load products
  function loadProducts() {
    console.log("Loading products")

    try {
      // Access the products array directly from the global scope
      // This is defined in products.js
      currentProducts = window.products || []

      if (currentProducts.length === 0) {
        console.error("No products found in the global products array")
        renderNoProducts()
        return
      }

      console.log(`Found ${currentProducts.length} products`)
      filteredProducts = [...currentProducts]

      // Apply URL parameters if any
      applyUrlParams()

      // Update product count
      updateProductCount()

      // Render products
      renderProducts()

      console.log(`Loaded ${currentProducts.length} products`)
    } catch (error) {
      console.error("Error loading products:", error)
      renderNoProducts()
    }
  }

  // Apply URL parameters
  function applyUrlParams() {
    const urlParams = new URLSearchParams(window.location.search)

    // Category filter
    const category = urlParams.get("category")
    if (category) {
      console.log(`Filtering by category: ${category}`)
      currentFilters.categories = [category]

      // Check category checkbox
      const categoryCheckbox = document.querySelector(`input[name="category"][value="${category}"]`)
      if (categoryCheckbox) {
        categoryCheckbox.checked = true
      }
    }

    // Tag filter
    const tag = urlParams.get("tag")
    if (tag) {
      console.log(`Filtering by tag: ${tag}`)
      currentFilters.tags = [tag]
    }

    // Special filters
    const filter = urlParams.get("filter")
    if (filter) {
      console.log(`Applying special filter: ${filter}`)
      currentFilters.filter = filter
    }

    // Sort parameter
    const sort = urlParams.get("sort")
    if (sort && sortBySelect) {
      console.log(`Sorting by: ${sort}`)
      sortBySelect.value = sort
    }

    // Apply all filters
    applyFilters()
  }

  // Initialize event listeners
  function initEventListeners() {
    // Sort by select
    if (sortBySelect) {
      sortBySelect.addEventListener("change", function () {
        sortProducts(this.value)
        renderProducts()
      })
    }

    // View buttons
    if (viewButtons.length) {
      viewButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const view = Number.parseInt(this.getAttribute("data-view"))
          changeView(view)
        })
      })
    }

    // Price range
    if (priceRange && priceOutput) {
      priceRange.addEventListener("input", function () {
        const value = this.value
        priceOutput.textContent = `₵0 - ₵${value}`
        currentFilters.maxPrice = Number.parseInt(value)
      })
    }

    // Category checkboxes
    if (categoryCheckboxes.length) {
      categoryCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          // Update categories filter
          currentFilters.categories = Array.from(categoryCheckboxes)
            .filter((cb) => cb.checked)
            .map((cb) => cb.value)
        })
      })
    }

    // Filter form
    if (filterForm) {
      filterForm.addEventListener("submit", (e) => {
        e.preventDefault()
        applyFilters()
      })
    }

    // Reset filters
    if (resetFiltersButton) {
      resetFiltersButton.addEventListener("click", () => {
        resetFilters()
      })
    }

    // Filter toggle (mobile)
    if (filterToggle && shopSidebar) {
      filterToggle.addEventListener("click", () => {
        shopSidebar.classList.toggle("active")
        document.body.style.overflow = shopSidebar.classList.contains("active") ? "hidden" : ""
      })

      // Close sidebar when clicking outside
      document.addEventListener("click", (e) => {
        if (
          shopSidebar.classList.contains("active") &&
          !shopSidebar.contains(e.target) &&
          !filterToggle.contains(e.target)
        ) {
          shopSidebar.classList.remove("active")
          document.body.style.overflow = ""
        }
      })

      // Add close button to sidebar
      const closeButton = document.createElement("button")
      closeButton.className = "close-sidebar"
      closeButton.innerHTML = "&times;"
      closeButton.style.position = "absolute"
      closeButton.style.top = "10px"
      closeButton.style.right = "10px"
      closeButton.style.background = "none"
      closeButton.style.border = "none"
      closeButton.style.fontSize = "24px"
      closeButton.style.cursor = "pointer"
      closeButton.style.zIndex = "10"

      closeButton.addEventListener("click", () => {
        shopSidebar.classList.remove("active")
        document.body.style.overflow = ""
      })

      shopSidebar.style.position = "relative"
      shopSidebar.appendChild(closeButton)
    }

    // Search input
    if (searchInput) {
      searchInput.addEventListener(
        "input",
        debounce(function () {
          searchProducts(this.value)
        }, 300),
      )
    }

    // Load more button
    if (loadMoreButton) {
      loadMoreButton.addEventListener("click", () => {
        loadMoreProducts()
      })
    }
  }

  // Render products
  function renderProducts() {
    console.log("Rendering products")

    // Calculate products for current page
    const startIndex = 0
    const endIndex = currentPage * productsPerPage
    const productsToShow = filteredProducts.slice(startIndex, endIndex)

    // Clear existing products
    if (productsGrid) {
      productsGrid.innerHTML = ""
    }

    if (productsList) {
      productsList.innerHTML = ""
    }

    // Check if no products
    if (productsToShow.length === 0) {
      renderNoProducts()
      return
    }

    // Render products in grid view
    if (productsGrid) {
      productsToShow.forEach((product, index) => {
        const productCard = createProductCard(product, index)
        productsGrid.appendChild(productCard)
      })
    }

    // Render products in list view
    if (productsList) {
      productsToShow.forEach((product, index) => {
        const productItem = createProductListItem(product, index)
        productsList.appendChild(productItem)
      })
    }

    // Update load more button visibility
    updateLoadMoreButton()

    // Initialize product actions
    initProductActions()

    console.log(`Rendered ${productsToShow.length} products`)
  }

  // Create product card (grid view)
  function createProductCard(product, index) {
    const productCard = document.createElement("div")
    productCard.className = "product-card animate-item"
    productCard.style.animationDelay = `${index * 0.1}s`

    const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0

    productCard.innerHTML = `
  <div class="product-image">
    <a href="product.html?id=${product.id}">
      <img src="${product.image || "/placeholder.svg?height=300&width=300"}" alt="${product.name}">
    </a>
    ${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ""}
    ${product.new ? '<span class="badge new-badge">New</span>' : ""}
    ${product.sale ? '<span class="badge sale-badge">Sale</span>' : ""}
    ${product.bestseller ? '<span class="badge bestseller-badge">Best Seller</span>' : ""}
    <div class="product-actions">
      <button class="action-btn add-to-cart-btn" data-product-id="${product.id}" title="Add to Cart">
        <i class="fas fa-shopping-cart"></i>
      </button>
      <button class="action-btn wishlist-btn" data-product-id="${product.id}" title="Add to Wishlist">
        <i class="far fa-heart"></i>
      </button>
      <button class="action-btn quick-view-btn" data-product-id="${product.id}" title="Quick View">
        <i class="fas fa-eye"></i>
      </button>
    </div>
  </div>
  <div class="product-info">
    <h3 class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
    <div class="product-price">
      ${product.oldPrice ? `<span class="old-price">₵${product.oldPrice.toFixed(2)}</span>` : ""}
      <span class="current-price">₵${product.price.toFixed(2)}</span>
    </div>
    <div class="product-rating">
      ${generateStarRating(product.rating)}
      <span class="rating-count">(${product.reviews || 0})</span>
    </div>
  </div>
`

    return productCard
  }

  // Create product list item (list view)
  function createProductListItem(product, index) {
    const productItem = document.createElement("div")
    productItem.className = "product-list-item animate-item"
    productItem.style.animationDelay = `${index * 0.1}s`

    const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0

    productItem.innerHTML = `
          <div class="product-list-image">
              <a href="product.html?id=${product.id}">
                  <img src="${product.image || "/placeholder.svg?height=300&width=300"}" alt="${product.name}">
              </a>
              ${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ""}
              ${product.new ? '<span class="badge new-badge">New</span>' : ""}
              ${product.sale ? '<span class="badge sale-badge">Sale</span>' : ""}
              ${product.bestseller ? '<span class="badge bestseller-badge">Best Seller</span>' : ""}
          </div>
          <div class="product-list-info">
              <h3 class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
              <div class="product-rating">
                  ${generateStarRating(product.rating)}
                  <span class="rating-count">(${product.reviews || 0} reviews)</span>
              </div>
              <div class="product-price">
                  ${product.oldPrice ? `<span class="old-price">₵${product.oldPrice.toFixed(2)}</span>` : ""}
                  <span class="current-price">₵${product.price.toFixed(2)}</span>
              </div>
              <p class="product-description">${product.description || "No description available."}</p>
              <div class="product-meta">
                  <p><strong>Category:</strong> ${product.category || "Uncategorized"}</p>
                  <p><strong>Tags:</strong> ${product.tags ? product.tags.join(", ") : "None"}</p>
              </div>
              <div class="product-list-actions">
                  <a href="product.html?id=${product.id}" class="btn primary-btn">View Details</a>
                  <button class="btn outline-btn add-to-cart-btn" data-product-id="${product.id}">
                      <i class="fas fa-shopping-cart"></i> Add to Cart
                  </button>
                  <button class="action-btn wishlist-btn" data-product-id="${product.id}" title="Add to Wishlist">
                      <i class="far fa-heart"></i>
                  </button>
              </div>
          </div>
      `

    return productItem
  }

  // Render no products message
  function renderNoProducts() {
    const noProductsMessage = document.createElement("div")
    noProductsMessage.className = "no-products-message"
    noProductsMessage.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
            <button class="btn outline-btn reset-filters">Reset Filters</button>
        `

    if (productsGrid) {
      productsGrid.innerHTML = ""
      productsGrid.appendChild(noProductsMessage)
    }

    if (productsList) {
      productsList.innerHTML = ""
    }

    // Hide load more button
    if (loadMoreButton) {
      loadMoreButton.style.display = "none"
    }

    // Add event listener to reset filters button
    const resetButton = noProductsMessage.querySelector(".reset-filters")
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        resetFilters()
      })
    }
  }

  // Sort products
  function sortProducts(sortBy) {
    console.log(`Sorting products by: ${sortBy}`)

    switch (sortBy) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "newest":
        filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "popularity":
        filteredProducts.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        // Default sorting (featured)
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    // Reset pagination
    currentPage = 1
  }

  // Apply filters
  function applyFilters() {
    console.log("Applying filters", currentFilters)

    // Start with all products
    filteredProducts = [...currentProducts]

    // Apply category filter
    if (currentFilters.categories && currentFilters.categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) => currentFilters.categories.includes(product.category))
    }

    // Apply tag filter
    if (currentFilters.tags && currentFilters.tags.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.tags && product.tags.some((tag) => currentFilters.tags.includes(tag)),
      )
    }

    // Apply special filter
    if (currentFilters.filter) {
      switch (currentFilters.filter) {
        case "new":
          filteredProducts = filteredProducts.filter((product) => product.new)
          break
        case "sale":
          filteredProducts = filteredProducts.filter((product) => product.sale)
          break
        case "bestselling":
        case "bestseller":
          filteredProducts = filteredProducts.filter((product) => product.bestseller)
          break
        case "featured":
          filteredProducts = filteredProducts.filter((product) => product.featured)
          break
      }
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter((product) => product.price <= currentFilters.maxPrice)

    // Apply search filter
    if (currentFilters.search) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(currentFilters.search.toLowerCase())) ||
          (product.category && product.category.toLowerCase().includes(currentFilters.search.toLowerCase())) ||
          (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(currentFilters.search.toLowerCase()))),
      )
    }

    // Apply current sort
    if (sortBySelect) {
      sortProducts(sortBySelect.value)
    }

    // Reset pagination
    currentPage = 1

    // Update product count
    updateProductCount()

    // Render products
    renderProducts()
  }

  // Reset filters
  function resetFilters() {
    console.log("Resetting filters")

    // Reset filter form
    if (filterForm) {
      filterForm.reset()
    }

    // Reset price range
    if (priceRange && priceOutput) {
      priceRange.value = priceRange.max
      priceOutput.textContent = `₵0 - ₵${priceRange.max}`
    }

    // Reset search input
    if (searchInput) {
      searchInput.value = ""
    }

    // Reset sort select
    if (sortBySelect) {
      sortBySelect.value = "default"
    }

    // Reset current filters
    currentFilters = {
      categories: [],
      tags: [],
      maxPrice: priceRange ? Number.parseInt(priceRange.max) : 3000,
      search: "",
      filter: "",
    }

    // Reset filtered products
    filteredProducts = [...currentProducts]

    // Reset pagination
    currentPage = 1

    // Update product count
    updateProductCount()

    // Render products
    renderProducts()

    // Clear URL parameters
    window.history.replaceState({}, document.title, window.location.pathname)
  }

  // Search products
  function searchProducts(query) {
    console.log(`Searching for: ${query}`)

    // Update search filter
    currentFilters.search = query

    // Apply filters
    applyFilters()
  }

  // Load more products
  function loadMoreProducts() {
    console.log("Loading more products")

    // Increment current page
    currentPage++

    // Calculate new products to show
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = currentPage * productsPerPage
    const newProducts = filteredProducts.slice(startIndex, endIndex)

    // Append new products to grid
    if (productsGrid && newProducts.length > 0) {
      newProducts.forEach((product, index) => {
        const productCard = createProductCard(product, index)
        productsGrid.appendChild(productCard)
      })
    }

    // Append new products to list
    if (productsList && newProducts.length > 0) {
      newProducts.forEach((product, index) => {
        const productItem = createProductListItem(product, index)
        productsList.appendChild(productItem)
      })
    }

    // Initialize product actions for new products
    initProductActions()

    // Update load more button visibility
    updateLoadMoreButton()

    console.log(`Loaded ${newProducts.length} more products`)
  }

  // Change view
  function changeView(view) {
    console.log(`Changing view to: ${view} columns`)

    // Update current view
    currentView = view

    // Update view buttons
    viewButtons.forEach((button) => {
      button.classList.remove("active")
      if (Number.parseInt(button.getAttribute("data-view")) === view) {
        button.classList.add("active")
      }
    })

    // Update grid class
    if (productsGrid) {
      productsGrid.className = productsGrid.className.replace(/grid-\d+/, "")
      productsGrid.classList.add(`grid-${view}`)
    }
  }

  // Update product count
  function updateProductCount() {
    if (productCount) {
      productCount.textContent = `${filteredProducts.length} products found`
    }
  }

  // Update load more button
  function updateLoadMoreButton() {
    if (loadMoreButton) {
      const totalShown = currentPage * productsPerPage

      if (totalShown >= filteredProducts.length) {
        loadMoreButton.style.display = "none"
      } else {
        loadMoreButton.style.display = "inline-block"
      }
    }
  }

  // Initialize product actions
  function initProductActions() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn")
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault()
        e.stopPropagation()

        const productId = this.getAttribute("data-product-id")
        if (!productId) return

        // Use the addToCart function from products.js if available
        if (typeof window.addToCart === "function") {
          window.addToCart(productId, 1)
          showNotification("Product added to cart!")
        } else {
          console.log(`Added product ${productId} to cart (quantity: 1)`)
          showNotification("Product added to cart!")
        }
      })
    })

    // Wishlist buttons
    const wishlistButtons = document.querySelectorAll(".wishlist-btn")
    wishlistButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault()
        e.stopPropagation()

        this.classList.toggle("active")
        const isActive = this.classList.contains("active")

        if (this.querySelector("i")) {
          this.querySelector("i").className = isActive ? "fas fa-heart" : "far fa-heart"
        }

        showNotification(isActive ? "Product added to wishlist!" : "Product removed from wishlist!")
      })
    })

    // Quick view buttons
    const quickViewButtons = document.querySelectorAll(".quick-view-btn")
    quickViewButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault()
        e.stopPropagation()

        const productId = this.getAttribute("data-product-id")
        if (!productId) return

        // Use the showQuickView function from products.js if available
        if (typeof window.showQuickView === "function") {
          window.showQuickView(productId)
        } else {
          console.log(`Showing quick view for product ${productId}`)
          showNotification("Quick view not available")
        }
      })
    })
  }

  // Generate star rating HTML
  function generateStarRating(rating) {
    let stars = ""
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<i class="fas fa-star"></i>'
      } else if (i - 0.5 <= rating) {
        stars += '<i class="fas fa-star-half-alt"></i>'
      } else {
        stars += '<i class="far fa-star"></i>'
      }
    }
    return stars
  }

  // Show notification
  function showNotification(message, type = "success") {
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

  // Debounce function
  function debounce(func, delay) {
    let timeout
    return function () {
      const args = arguments
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), delay)
    }
  }

  // Also update the initial price output text
  if (priceOutput) {
    priceOutput.textContent = `₵0 - ₵${priceRange ? priceRange.value : "3000"}`
  }
})
