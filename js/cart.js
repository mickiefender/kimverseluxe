/**
 * Kimverse Luxe E-commerce Website
 * Cart Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load cart content
    loadCartContent();
    
    // Load recommended products
    loadRecommendedProducts();
});

// Load Cart Content
function loadCartContent() {
    const cartContentElement = document.getElementById('cart-content');
    if (!cartContentElement) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        // Empty cart
        cartContentElement.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added any products to your cart yet.</p>
                <a href="shop.html" class="btn primary-btn">Continue Shopping</a>
            </div>
        `;
        
        // Hide recommended products section
        const recommendedSection = document.querySelector('.recommended-products-section');
        if (recommendedSection) {
            recommendedSection.style.display = 'none';
        }
        
        return;
    }
    
    // Calculate totals
    const subtotal = window.kimverseLuxe.calculateCartTotal(cart);
    const shipping = subtotal > 10 ? 0 : 1;
    const tax = subtotal * 0.07; // 7% tax
    const total = subtotal + shipping + tax;
    
    // Generate cart items HTML
    let cartItemsHtml = '';
    cart.forEach((item, index) => {
        const product = window.kimverseLuxe.getProductById(item.id);
        
        cartItemsHtml += `
            <tr>
                <td>
                    <div class="cart-product">
                        <div class="cart-product-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-product-info">
                            <h3><a href="product.html?id=${item.id}">${item.name}</a></h3>
                            <p>
                                ${item.selectedSize ? `Size: ${item.selectedSize}` : ''}
                                ${item.selectedColor ? `Color: <span class="color-dot" style="background-color: ${item.selectedColor};"></span>` : ''}
                            </p>
                        </div>
                    </div>
                </td>
                <td class="cart-price">${window.kimverseLuxe.formatCurrency(item.price)}</td>
                <td>
                    <div class="quantity-selector">
                        <button class="quantity-btn decrease" data-index="${index}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="${product ? product.stock : 10}" data-index="${index}">
                        <button class="quantity-btn increase" data-index="${index}">+</button>
                    </div>
                </td>
                <td class="cart-item-total">${window.kimverseLuxe.formatCurrency(item.price * item.quantity)}</td>
                <td>
                    <button class="remove-item-btn" data-index="${index}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    // Generate cart content HTML
    const cartHtml = `
        <div class="cart-header">
            <h2>Shopping Cart</h2>
            <span>${cart.length} item${cart.length > 1 ? 's' : ''}</span>
        </div>
        
        <div class="cart-table-container">
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${cartItemsHtml}
                </tbody>
            </table>
        </div>
        
        <div class="cart-summary-section">
            <div class="cart-coupon">
                <input type="text" placeholder="Coupon code">
                <button class="btn primary-btn">Apply Coupon</button>
            </div>
            
            <div class="cart-totals">
                <h3>Cart Totals</h3>
                <div class="cart-total-row">
                    <span>Subtotal</span>
                    <span>${window.kimverseLuxe.formatCurrency(subtotal)}</span>
                </div>
                <div class="cart-total-row">
                    <span>Shipping</span>
                    <span>${shipping === 0 ? 'Free' : window.kimverseLuxe.formatCurrency(shipping)}</span>
                </div>
                <div class="cart-total-row">
                    <span>Tax (7%)</span>
                    <span>${window.kimverseLuxe.formatCurrency(tax)}</span>
                </div>
                <div class="cart-total-row final">
                    <span>Total</span>
                    <span>${window.kimverseLuxe.formatCurrency(total)}</span>
                </div>
                <a href="checkout.html" class="btn primary-btn cart-checkout-btn">Proceed to Checkout</a>
                <a href="shop.html" class="cart-continue-shopping">Continue Shopping</a>
            </div>
        </div>
    `;
    
    cartContentElement.innerHTML = cartHtml;
    
    // Add event listeners
    addCartEventListeners();
}

// Add Cart Event Listeners
function addCartEventListeners() {
    // Quantity decrease buttons
    const decreaseButtons = document.querySelectorAll('.quantity-btn.decrease');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
            let value = parseInt(input.value);
            
            if (value > 1) {
                value--;
                input.value = value;
                updateCartItemQuantity(index, value);
            }
        });
    });
    
    // Quantity increase buttons
    const increaseButtons = document.querySelectorAll('.quantity-btn.increase');
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
            let value = parseInt(input.value);
            const max = parseInt(input.getAttribute('max'));
            
            if (value < max) {
                value++;
                input.value = value;
                updateCartItemQuantity(index, value);
            }
        });
    });
    
    // Quantity inputs
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const index = parseInt(this.getAttribute('data-index'));
            let value = parseInt(this.value);
            const max = parseInt(this.getAttribute('max'));
            
            if (isNaN(value) || value < 1) {
                value = 1;
                this.value = 1;
            } else if (value > max) {
                value = max;
                this.value = max;
            }
            
            updateCartItemQuantity(index, value);
        });
    });
    
    // Remove item buttons
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeCartItem(index);
        });
    });
    
    // Apply coupon button
    const applyCouponBtn = document.querySelector('.cart-coupon button');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', function() {
            const couponInput = document.querySelector('.cart-coupon input');
            const couponCode = couponInput.value.trim();
            
            if (couponCode) {
                // For demo purposes, just show a notification
                window.kimverseLuxe.showNotification('Coupon code applied successfully!', 'success');
                couponInput.value = '';
            } else {
                window.kimverseLuxe.showNotification('Please enter a coupon code.', 'error');
            }
        });
    }
}

// Update Cart Item Quantity
function updateCartItemQuantity(index, quantity) {
    const success = window.kimverseLuxe.updateCartItemQuantity(index, quantity);
    
    if (success) {
        // Reload cart content
        loadCartContent();
        
        // Update cart count
        window.kimverseLuxe.updateCartCount();
    }
}

// Remove Cart Item
function removeCartItem(index) {
    const success = window.kimverseLuxe.removeFromCart(index);
    
    if (success) {
        // Show notification
        window.kimverseLuxe.showNotification('Item removed from cart.', 'success');
        
        // Reload cart content
        loadCartContent();
        
        // Update cart count
        window.kimverseLuxe.updateCartCount();
    }
}

// Load Recommended Products
function loadRecommendedProducts() {
    const recommendedProductsElement = document.getElementById('recommended-products');
    if (!recommendedProductsElement) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        // Hide recommended products section
        const recommendedSection = document.querySelector('.recommended-products-section');
        if (recommendedSection) {
            recommendedSection.style.display = 'none';
        }
        return;
    }
    
    // Get categories from cart items
    const cartCategories = [];
    cart.forEach(item => {
        const product = window.kimverseLuxe.getProductById(item.id);
        if (product && !cartCategories.includes(product.category)) {
            cartCategories.push(product.category);
        }
    });
    
    // Get products from the same categories, excluding cart items
    const cartProductIds = cart.map(item => item.id);
    let recommendedProducts = window.kimverseLuxe.products.filter(product => 
        cartCategories.includes(product.category) && 
        !cartProductIds.includes(product.id)
    );
    
    // If not enough products, add some bestsellers
    if (recommendedProducts.length < 4) {
        const bestsellers = window.kimverseLuxe.products.filter(product => 
            product.isBestseller && 
            !cartProductIds.includes(product.id) && 
            !recommendedProducts.includes(product)
        );
        recommendedProducts = [...recommendedProducts, ...bestsellers];
    }
    
    // Shuffle and limit to 4 products
    recommendedProducts = shuffleArray(recommendedProducts).slice(0, 4);
    
    // Generate HTML
    let html = '';
    recommendedProducts.forEach(product => {
        html += generateProductCard(product);
    });
    
    recommendedProductsElement.innerHTML = html;
    
    // Add event listeners
    addProductCardEventListeners();
}

// Helper function to shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Helper function to generate product card
function generateProductCard(product) {
    const discountBadge = product.discount > 0 ? 
        `<div class="discount-badge">-${product.discount}%</div>` : '';
    
    const newBadge = product.isNew ? 
        `<div class="badge new-badge">New</div>` : '';
    
    const bestsellerBadge = product.isBestseller && !product.isNew ? 
        `<div class="badge bestseller-badge">Bestseller</div>` : '';
    
    const oldPriceHtml = product.oldPrice ? 
        `<div class="old-price">${window.kimverseLuxe.formatCurrency(product.oldPrice)}</div>` : '';
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                ${discountBadge}
                ${newBadge}
                ${bestsellerBadge}
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="product-actions">
                    <button class="action-btn quick-view-btn" data-product-id="${product.id}" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn add-to-cart-btn" data-product-id="${product.id}" title="Add to Cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="action-btn add-to-wishlist-btn" data-product-id="${product.id}" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">
                    <a href="product.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-price">
                    ${oldPriceHtml}
                    <div class="current-price">${window.kimverseLuxe.formatCurrency(product.price)}</div>
                </div>
                <div class="product-rating">
                    ${generateRatingStars(product.rating)}
                    <span class="rating-count">(${product.reviewCount})</span>
                </div>
            </div>
        </div>
    `;
}

// Helper function to generate rating stars
function generateRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Add Product Card Event Listeners
function addProductCardEventListeners() {
    // Quick View buttons
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-product-id'));
            window.kimverseLuxe.loadQuickView(productId);
            document.querySelector('.quick-view-modal').classList.add('active');
        });
    });
    
    // Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-product-id'));
            const quantity = 1;
            
            window.kimverseLuxe.addToCart(productId, quantity);
            window.kimverseLuxe.showNotification('Product added to cart!', 'success');
            window.kimverseLuxe.updateCartCount();
        });
    });
    
    // Add to Wishlist buttons
    const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist-btn');
    addToWishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-product-id'));
            
            window.kimverseLuxe.addToWishlist(productId);
            window.kimverseLuxe.showNotification('Product added to wishlist!', 'success');
            window.kimverseLuxe.updateWishlistCount();
        });
    });
}