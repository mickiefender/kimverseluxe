// Product Detail Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  console.log("Product detail page loaded")

  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const productId = urlParams.get("id")

  if (!productId) {
    console.error("No product ID found in URL")
    showErrorMessage("Product not found")
    return
  }

  // Load product details
  loadProductDetails(productId)

  // Initialize tabs
  initTabs()

  // Initialize quantity selector
  initQuantitySelector()

  // Add to recently viewed
  addToRecentlyViewed(productId)
})

// Load product details
function loadProductDetails(productId) {
  console.log(`Loading details for product ID: ${productId}`)

  // Get product data
  let product

  // Try to get the product using the global getProductById function
  if (typeof window.getProductById === "function") {
    product = window.getProductById(productId)
  }
  // Fallback to using the global products array
  else if (window.products) {
    product = window.products.find((p) => p.id === productId)
  }

  if (!product) {
    console.error(`Product with ID ${productId} not found`)
    showErrorMessage("Product not found")
    return
  }

  // Update page title
  document.title = `${product.name} - Kimverse Luxe`

  // Update breadcrumb
  const breadcrumbName = document.getElementById("product-breadcrumb-name")
  if (breadcrumbName) {
    breadcrumbName.textContent = product.name
  }

  // Update product name
  const productName = document.getElementById("product-name")
  if (productName) {
    productName.textContent = product.name
  }

  // Update product image
  const productImage = document.getElementById("product-main-image")
  if (productImage) {
    // Use the first gallery image if available, otherwise use the main product image
    const mainImageSrc =
      product.gallery && product.gallery.length > 0
        ? product.gallery[0]
        : product.image || "/placeholder.svg?height=600&width=600"
    productImage.src = mainImageSrc
    productImage.alt = product.name
  }

  // Update gallery thumbnails
  updateGalleryThumbnails(product)

  // Update product rating
  const productRating = document.getElementById("product-rating")
  if (productRating) {
    productRating.innerHTML = generateStarRating(product.rating || 0)
  }

  // Update product reviews count
  const productReviews = document.getElementById("product-reviews")
  if (productReviews) {
    productReviews.textContent = `(${product.reviews || 0} reviews)`
  }

  // Update product SKU
  const productSku = document.getElementById("product-sku")
  if (productSku) {
    productSku.textContent = product.id
  }

  // Update product availability
  const productAvailability = document.getElementById("product-availability")
  if (productAvailability) {
    const inStock = product.stock > 0
    productAvailability.textContent = inStock ? "In Stock" : "Out of Stock"
    productAvailability.className = inStock ? "in-stock" : "out-of-stock"
  }

  // Update product price
  const productCurrentPrice = document.getElementById("product-current-price")
  if (productCurrentPrice) {
    productCurrentPrice.textContent = `₵${product.price.toFixed(2)}`
  }

  // Update old price if available
  const productOldPrice = document.getElementById("product-old-price")
  if (productOldPrice) {
    if (product.oldPrice) {
      productOldPrice.textContent = `₵${product.oldPrice.toFixed(2)}`
      productOldPrice.style.display = "inline-block"
    } else {
      productOldPrice.style.display = "none"
    }
  }

  // Update product description
  const productDescription = document.getElementById("product-description")
  if (productDescription) {
    productDescription.textContent = product.description || "No description available."
  }

  // Update detailed description tab
  const tabDescription = document.getElementById("tab-description")
  if (tabDescription) {
    tabDescription.innerHTML = `<p>${product.description || "No detailed description available."}</p>`
  }

  // Update color variations
  updateColorVariations(product)

  // Update size variations
  updateSizeVariations(product)

  // Update categories
  updateCategories(product)

  // Update tags
  updateTags(product)

  // Update additional information tab
  updateAdditionalInfo(product)

  // Update reviews tab
  updateReviews(product)

  // Load related products
  loadRelatedProducts(product)

  // Initialize add to cart button
  initAddToCartButton(product)

  // Initialize wishlist button
  initWishlistButton(product)

  console.log("Product details loaded successfully")
}

// Update gallery thumbnails
function updateGalleryThumbnails(product) {
  const thumbnailsContainer = document.getElementById("gallery-thumbnails")
  if (!thumbnailsContainer) return

  // Clear existing thumbnails
  thumbnailsContainer.innerHTML = ""

  // Add main image as first thumbnail if not in gallery
  const mainImage = product.image || "/placeholder.svg?height=600&width=600"

  // Check if product has gallery images
  if (product.gallery && Array.isArray(product.gallery) && product.gallery.length > 0) {
    // Add all gallery images as thumbnails
    product.gallery.forEach((image, index) => {
      const thumbnail = document.createElement("div")
      thumbnail.className = `gallery-thumbnail ${index === 0 ? "active" : ""}`
      thumbnail.innerHTML = `<img src="${image}" alt="${product.name} - Image ${index + 1}">`
      thumbnailsContainer.appendChild(thumbnail)
    })
  } else {
    // If no gallery, add main image as thumbnail
    const mainThumbnail = document.createElement("div")
    mainThumbnail.className = "gallery-thumbnail active"
    mainThumbnail.innerHTML = `<img src="${mainImage}" alt="${product.name}">`
    thumbnailsContainer.appendChild(mainThumbnail)

    // Add placeholder thumbnails if no gallery images
    for (let i = 0; i < 3; i++) {
      const thumbnail = document.createElement("div")
      thumbnail.className = "gallery-thumbnail"
      thumbnail.innerHTML = `<img src="/placeholder.svg?height=150&width=150&text=Image ${i + 2}" alt="${product.name}">`
      thumbnailsContainer.appendChild(thumbnail)
    }
  }

  // Add click event to thumbnails
  const thumbnails = thumbnailsContainer.querySelectorAll(".gallery-thumbnail")
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked thumbnail
      this.classList.add("active")

      // Update main image
      const mainImage = document.getElementById("product-main-image")
      if (mainImage) {
        const thumbnailImage = this.querySelector("img")
        mainImage.src = thumbnailImage.src
      }
    })
  })
}

// Update color variations
function updateColorVariations(product) {
  const colorsContainer = document.getElementById("variation-colors")
  if (!colorsContainer) return

  // Clear existing colors
  colorsContainer.innerHTML = ""

  // Check if product has colors
  if (product.colors && Array.isArray(product.colors) && product.colors.length > 0) {
    // Add heading
    const heading = document.createElement("h4")
    heading.textContent = "Color:"
    colorsContainer.appendChild(heading)

    // Add color options
    const colorOptions = document.createElement("div")
    colorOptions.className = "color-options"

    product.colors.forEach((color, index) => {
      const colorOption = document.createElement("div")
      colorOption.className = `color-option ${index === 0 ? "active" : ""}`
      colorOption.setAttribute("data-color", color)
      colorOption.style.backgroundColor = color
      colorOption.title = color.charAt(0).toUpperCase() + color.slice(1)
      colorOptions.appendChild(colorOption)
    })

    colorsContainer.appendChild(colorOptions)

    // Add click event to color options
    const colors = colorOptions.querySelectorAll(".color-option")
    colors.forEach((color) => {
      color.addEventListener("click", function () {
        // Remove active class from all colors
        colors.forEach((c) => c.classList.remove("active"))

        // Add active class to clicked color
        this.classList.add("active")
      })
    })
  } else {
    // Hide colors container if no colors available
    colorsContainer.style.display = "none"
  }
}

// Update size variations
function updateSizeVariations(product) {
  const sizesContainer = document.getElementById("variation-sizes")
  if (!sizesContainer) return

  // Clear existing sizes
  sizesContainer.innerHTML = ""

  // Check if product has sizes
  if (product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0) {
    // Add heading
    const heading = document.createElement("h4")
    heading.textContent = "Size:"
    sizesContainer.appendChild(heading)

    // Add size options
    const sizeOptions = document.createElement("div")
    sizeOptions.className = "size-options"

    product.sizes.forEach((size, index) => {
      const sizeOption = document.createElement("div")
      sizeOption.className = `size-option ${index === 0 ? "active" : ""}`
      sizeOption.setAttribute("data-size", size)
      sizeOption.textContent = size
      sizeOptions.appendChild(sizeOption)
    })

    sizesContainer.appendChild(sizeOptions)

    // Add click event to size options
    const sizes = sizeOptions.querySelectorAll(".size-option")
    sizes.forEach((size) => {
      size.addEventListener("click", function () {
        // Remove active class from all sizes
        sizes.forEach((s) => s.classList.remove("active"))

        // Add active class to clicked size
        this.classList.add("active")
      })
    })
  } else {
    // Hide sizes container if no sizes available
    sizesContainer.style.display = "none"
  }
}

// Update categories
function updateCategories(product) {
  const categoriesContainer = document.getElementById("product-categories")
  if (!categoriesContainer) return

  // Clear existing categories
  categoriesContainer.innerHTML = ""

  // Check if product has category
  if (product.category) {
    categoriesContainer.innerHTML = `
      <span>Category: </span>
      <a href="shop.html?category=${product.category}">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</a>
    `
  } else {
    // Hide categories container if no category available
    categoriesContainer.style.display = "none"
  }
}

// Update tags
function updateTags(product) {
  const tagsContainer = document.getElementById("product-tags")
  if (!tagsContainer) return

  // Clear existing tags
  tagsContainer.innerHTML = ""

  // Check if product has tags
  if (product.tags && Array.isArray(product.tags) && product.tags.length > 0) {
    let tagsHTML = "<span>Tags: </span>"

    product.tags.forEach((tag, index) => {
      tagsHTML += `<a href="shop.html?tag=${tag}">${tag.charAt(0).toUpperCase() + tag.slice(1)}</a>${
        index < product.tags.length - 1 ? ", " : ""
      }`
    })

    tagsContainer.innerHTML = tagsHTML
  } else {
    // Hide tags container if no tags available
    tagsContainer.style.display = "none"
  }
}

// Update additional information tab
function updateAdditionalInfo(product) {
  const additionalInfoContainer = document.getElementById("tab-additional-info")
  if (!additionalInfoContainer) return

  // Clear existing info
  const infoTable = additionalInfoContainer.querySelector("table tbody")
  if (!infoTable) return

  infoTable.innerHTML = ""

  // Add weight if available
  if (product.weight) {
    infoTable.innerHTML += `
      <tr>
        <th>Weight</th>
        <td>${product.weight}</td>
      </tr>
    `
  }

  // Add dimensions if available
  if (product.dimensions) {
    infoTable.innerHTML += `
      <tr>
        <th>Dimensions</th>
        <td>${product.dimensions}</td>
      </tr>
    `
  }

  // Add color if available
  if (product.colors && Array.isArray(product.colors) && product.colors.length > 0) {
    infoTable.innerHTML += `
      <tr>
        <th>Color</th>
        <td>${product.colors.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(", ")}</td>
      </tr>
    `
  }

  // Add size if available
  if (product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0) {
    infoTable.innerHTML += `
      <tr>
        <th>Size</th>
        <td>${product.sizes.join(", ")}</td>
      </tr>
    `
  }

  // Add material if available
  if (product.material) {
    infoTable.innerHTML += `
      <tr>
        <th>Material</th>
        <td>${product.material}</td>
      </tr>
    `
  }

  // Add category if available
  if (product.category) {
    infoTable.innerHTML += `
      <tr>
        <th>Category</th>
        <td>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>
      </tr>
    `
  }

  // Add default rows if no additional info available
  if (infoTable.innerHTML === "") {
    infoTable.innerHTML = `
      <tr>
        <th>Weight</th>
        <td>N/A</td>
      </tr>
      <tr>
        <th>Dimensions</th>
        <td>N/A</td>
      </tr>
      <tr>
        <th>Material</th>
        <td>N/A</td>
      </tr>
    `
  }
}

// Update reviews tab
function updateReviews(product) {
  // Update reviews count in tab
  const reviewsCount = document.getElementById("reviews-count")
  if (reviewsCount) {
    reviewsCount.textContent = `(${product.reviews || 0})`
  }

  // Update average rating
  const averageRating = document.getElementById("average-rating")
  if (averageRating) {
    averageRating.textContent = product.rating ? product.rating.toFixed(1) : "0.0"
  }

  // Update average stars
  const averageStars = document.getElementById("average-stars")
  if (averageStars) {
    averageStars.innerHTML = generateStarRating(product.rating || 0)
  }

  // Update total reviews
  const totalReviews = document.getElementById("total-reviews")
  if (totalReviews) {
    totalReviews.textContent = `${product.reviews || 0} reviews`
  }

  // Update reviews breakdown
  const reviewsBreakdown = document.getElementById("reviews-breakdown")
  if (reviewsBreakdown) {
    reviewsBreakdown.innerHTML = ""

    // Generate mock review breakdown
    for (let i = 5; i >= 1; i--) {
      const percentage = product.reviews ? Math.floor(Math.random() * 100) : 0
      reviewsBreakdown.innerHTML += `
        <div class="review-bar">
          <div class="review-bar-label">
            <span>${i}</span>
            <i class="fas fa-star"></i>
          </div>
          <div class="review-bar-track">
            <div class="review-bar-fill" style="width: ${percentage}%"></div>
          </div>
          <div class="review-bar-count">${Math.floor((percentage / 100) * (product.reviews || 0))}</div>
        </div>
      `
    }
  }

  // Update reviews list
  const reviewsList = document.getElementById("reviews-list")
  if (reviewsList) {
    reviewsList.innerHTML = ""

    // Check if product has reviews
    if (product.reviews && product.reviews > 0) {
      // Generate mock reviews
      for (let i = 0; i < Math.min(product.reviews, 3); i++) {
        const reviewRating = Math.floor(Math.random() * 2) + 4 // Random rating between 4-5
        const reviewDate = new Date()
        reviewDate.setDate(reviewDate.getDate() - Math.floor(Math.random() * 30)) // Random date within last 30 days

        reviewsList.innerHTML += `
          <div class="review-item">
            <div class="review-header">
              <div class="review-author">
                <img src="/placeholder.svg?height=50&width=50&text=User" alt="User">
                <div class="review-author-info">
                  <h4>Customer ${i + 1}</h4>
                  <div class="review-date">${reviewDate.toLocaleDateString()}</div>
                </div>
              </div>
              <div class="review-rating">
                ${generateStarRating(reviewRating)}
              </div>
            </div>
            <h3 class="review-title">Great product!</h3>
            <div class="review-content">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div class="review-actions">
              <div class="review-action">
                <i class="far fa-thumbs-up"></i>
                <span>Helpful (${Math.floor(Math.random() * 10)})</span>
              </div>
              <div class="review-action">
                <i class="far fa-flag"></i>
                <span>Report</span>
              </div>
            </div>
          </div>
        `
      }
    } else {
      // Show no reviews message
      reviewsList.innerHTML = `
        <div class="no-reviews">
          <p>There are no reviews yet.</p>
          <p>Be the first to review this product!</p>
        </div>
      `
    }
  }

  // Initialize review form
  initReviewForm(product)
}

// Initialize review form
function initReviewForm(product) {
  const reviewForm = document.querySelector(".review-form")
  if (!reviewForm) return

  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("review-name").value
    const email = document.getElementById("review-email").value
    const rating = document.querySelector('input[name="rating"]:checked')?.value || 5
    const title = document.getElementById("review-title").value
    const content = document.getElementById("review-content").value

    // Show success message
    showNotification("Your review has been submitted successfully!", "success")

    // Reset form
    this.reset()
  })

  // Initialize photo upload preview
  const photoInput = document.getElementById("review-photos")
  const photosPreview = document.getElementById("photos-preview")

  if (photoInput && photosPreview) {
    photoInput.addEventListener("change", function () {
      // Clear existing previews
      photosPreview.innerHTML = ""

      // Add new previews
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i]
        const reader = new FileReader()

        reader.onload = (e) => {
          const preview = document.createElement("div")
          preview.className = "photo-preview"
          preview.innerHTML = `
            <img src="${e.target.result}" alt="Review Photo">
            <button type="button" class="remove-photo">&times;</button>
          `
          photosPreview.appendChild(preview)

          // Add remove button functionality
          const removeButton = preview.querySelector(".remove-photo")
          removeButton.addEventListener("click", () => {
            preview.remove()
          })
        }

        reader.readAsDataURL(file)
      }
    })
  }
}

// Load related products
function loadRelatedProducts(product) {
  const relatedProductsContainer = document.getElementById("related-products")
  if (!relatedProductsContainer) return

  // Clear existing products
  relatedProductsContainer.innerHTML = ""

  // Get related products
  let relatedProducts = []

  // Try to use the getRelatedProducts function if available
  if (typeof window.getRelatedProducts === "function") {
    relatedProducts = window.getRelatedProducts(product.id, 4)
  }
  // Fallback to filtering products manually
  else if (window.products) {
    // Get products in same category
    relatedProducts = window.products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)

    // If not enough products in same category, add some random products
    if (relatedProducts.length < 4) {
      const otherProducts = window.products
        .filter((p) => p.id !== product.id && !relatedProducts.some((rp) => rp.id === p.id))
        .slice(0, 4 - relatedProducts.length)

      relatedProducts = [...relatedProducts, ...otherProducts]
    }
  }

  // Render related products
  relatedProducts.forEach((relatedProduct, index) => {
    const productCard = createProductCard(relatedProduct, index)
    relatedProductsContainer.appendChild(productCard)
  })

  // Initialize product actions
  initProductActions()
}

// Load recently viewed products
function loadRecentlyViewedProducts() {
  const recentlyViewedContainer = document.getElementById("recently-viewed-products")
  if (!recentlyViewedContainer) return

  // Get recently viewed products from localStorage
  const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || []

  // Clear existing products
  recentlyViewedContainer.innerHTML = ""

  // Get product details for recently viewed products
  const recentlyViewedProducts = []

  if (window.products) {
    recentlyViewed.forEach((id) => {
      const product = window.products.find((p) => p.id === id)
      if (product) {
        recentlyViewedProducts.push(product)
      }
    })
  }

  // Render recently viewed products
  recentlyViewedProducts.forEach((product, index) => {
    const productCard = createProductCard(product, index)
    recentlyViewedContainer.appendChild(productCard)
  })

  // Initialize product actions
  initProductActions()
}

// Add product to recently viewed
function addToRecentlyViewed(productId) {
  // Get existing recently viewed products
  let recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || []

  // Remove product if already in list
  recentlyViewed = recentlyViewed.filter((id) => id !== productId)

  // Add product to beginning of list
  recentlyViewed.unshift(productId)

  // Limit to 4 products
  recentlyViewed = recentlyViewed.slice(0, 4)

  // Save to localStorage
  localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed))

  // Load recently viewed products
  loadRecentlyViewedProducts()
}

// Initialize tabs
function initTabs() {
  const tabTriggers = document.querySelectorAll(".tab-trigger")
  const tabContents = document.querySelectorAll(".tab-content")

  if (!tabTriggers.length || !tabContents.length) return

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab")

      // Remove active class from all triggers and contents
      tabTriggers.forEach((t) => t.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked trigger and corresponding content
      this.classList.add("active")
      document.querySelector(`.tab-content[data-tab="${tabName}"]`)?.classList.add("active")
    })
  })
}

// Initialize quantity selector
function initQuantitySelector() {
  const quantityInput = document.getElementById("product-quantity")
  const minusBtn = document.querySelector(".quantity-btn.minus")
  const plusBtn = document.querySelector(".quantity-btn.plus")

  if (!quantityInput || !minusBtn || !plusBtn) return

  minusBtn.addEventListener("click", () => {
    const currentValue = Number.parseInt(quantityInput.value)
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1
    }
  })

  plusBtn.addEventListener("click", () => {
    const currentValue = Number.parseInt(quantityInput.value)
    quantityInput.value = currentValue + 1
  })
}

// Initialize add to cart button
function initAddToCartButton(product) {
  const addToCartBtn = document.getElementById("add-to-cart-btn")
  if (!addToCartBtn) return

  addToCartBtn.addEventListener("click", () => {
    // Get selected options
    const selectedColor = document.querySelector(".color-option.active")?.getAttribute("data-color")
    const selectedSize = document.querySelector(".size-option.active")?.getAttribute("data-size")
    const quantity = Number.parseInt(document.getElementById("product-quantity")?.value || 1)

    // Add to cart
    if (typeof window.addToCart === "function") {
      window.addToCart(product.id, quantity)
      showNotification(`${quantity} ${quantity > 1 ? "items" : "item"} added to cart!`, "success")
    } else {
      console.error("addToCart function not found")
      showNotification("Failed to add product to cart. Please try again.", "error")
    }
  })

  // Add Buy Now button if it exists
  const buyNowBtn = document.getElementById("buy-now-btn")
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", (e) => {
      e.preventDefault()

      // Get selected options
      const selectedColor = document.querySelector(".color-option.active")?.getAttribute("data-color")
      const selectedSize = document.querySelector(".size-option.active")?.getAttribute("data-size")
      const quantity = Number.parseInt(document.getElementById("product-quantity")?.value || 1)

      // Open WhatsApp with product details
      if (typeof window.openWhatsAppWithProduct === "function") {
        window.openWhatsAppWithProduct(product.id, quantity)
      } else {
        console.error("openWhatsAppWithProduct function not found")
        showNotification("WhatsApp integration not available. Please try again later.", "error")
      }
    })
  }
}

// Initialize wishlist button
function initWishlistButton(product) {
  const wishlistBtn = document.getElementById("wishlist-btn")
  if (!wishlistBtn) return

  // Check if product is in wishlist
  const isInWishlist = typeof window.isInWishlist === "function" ? window.isInWishlist(product.id) : false

  // Update button state
  const icon = wishlistBtn.querySelector("i")
  if (icon) {
    icon.className = isInWishlist ? "fas fa-heart" : "far fa-heart"
    wishlistBtn.innerHTML = `${icon.outerHTML} ${isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}`
  }

  wishlistBtn.addEventListener("click", function () {
    // Toggle wishlist
    if (typeof window.toggleWishlistItem === "function") {
      window.toggleWishlistItem(product.id, this)
    } else {
      // Fallback if toggleWishlistItem is not available
      const isActive = icon.classList.contains("fas")
      icon.className = isActive ? "far fa-heart" : "fas fa-heart"
      this.innerHTML = `${icon.outerHTML} ${isActive ? "Add to Wishlist" : "Remove from Wishlist"}`
      showNotification(
        isActive ? "Product removed from wishlist!" : "Product added to wishlist!",
        isActive ? "info" : "success",
      )
    }
  })
}

// Initialize product actions
function initProductActions() {
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll(".products-grid .add-to-cart-btn")
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      e.stopPropagation()

      const productId = this.getAttribute("data-product-id")
      if (!productId) return

      if (typeof window.addToCart === "function") {
        window.addToCart(productId, 1)
        showNotification("Product added to cart!", "success")
      } else {
        console.error("addToCart function not found")
      }
    })
  })

  // Wishlist buttons
  const wishlistButtons = document.querySelectorAll(".products-grid .wishlist-btn")
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      e.stopPropagation()

      const productId = this.getAttribute("data-product-id")
      if (!productId) return

      if (typeof window.toggleWishlistItem === "function") {
        window.toggleWishlistItem(productId, this)
      } else {
        this.classList.toggle("active")
        const isActive = this.classList.contains("active")

        if (this.querySelector("i")) {
          this.querySelector("i").className = isActive ? "fas fa-heart" : "far fa-heart"
        }

        showNotification(
          isActive ? "Product added to wishlist!" : "Product removed from wishlist!",
          isActive ? "success" : "info",
        )
      }
    })
  })

  // Quick view buttons
  const quickViewButtons = document.querySelectorAll(".products-grid .quick-view-btn")
  quickViewButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      e.stopPropagation()

      const productId = this.getAttribute("data-product-id")
      if (!productId) return

      if (typeof window.showQuickView === "function") {
        window.showQuickView(productId)
      } else {
        console.error("showQuickView function not found")
      }
    })
  })
}

// Create product card
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
        <button class="action-btn wishlist-btn ${typeof window.isInWishlist === "function" && window.isInWishlist(product.id) ? "active" : ""}" data-product-id="${product.id}" title="Add to Wishlist">
          <i class="${typeof window.isInWishlist === "function" && window.isInWishlist(product.id) ? "fas" : "far"} fa-heart"></i>
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
        ${generateStarRating(product.rating || 0)}
        <span class="rating-count">(${product.reviews || 0})</span>
      </div>
    </div>
  `

  return productCard
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

// Show error message
function showErrorMessage(message) {
  const productDetailSection = document.querySelector(".product-detail-section")
  if (!productDetailSection) return

  productDetailSection.innerHTML = `
    <div class="container">
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        <h2>${message}</h2>
        <p>The product you are looking for might have been removed or is temporarily unavailable.</p>
        <a href="shop.html" class="btn primary-btn">Continue Shopping</a>
      </div>
    </div>
  `
}

// Make functions available globally
window.generateStarRating = generateStarRating
window.showNotification = showNotification
window.createProductCard = createProductCard
window.loadRecentlyViewedProducts = loadRecentlyViewedProducts
window.addToRecentlyViewed = addToRecentlyViewed
