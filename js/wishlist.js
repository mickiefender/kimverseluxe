/**
 * Kimverse Luxe E-commerce Website
 * Wishlist Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load wishlist content
    loadWishlistContent();
});

// Load Wishlist Content
function loadWishlistContent() {
    const wishlistContentElement = document.getElementById('wishlist-content');
    if (!wishlistContentElement) return;
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (wishlist.length === 0) {
        // Empty wishlist
        wishlistContentElement.innerHTML = `
            <div class="wishlist-empty">
                <i class="far fa-heart"></i>
                <h2>Your Wishlist is Empty</h2>
                <p>Looks like you haven't added any products to your wishlist yet.</p>
                <a href="shop.html" class="btn primary-btn">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    // Generate wishlist items HTML
    let wishlistItemsHtml = '';
    wishlist.forEach((item, index) => {
        const product = window.kimverseLuxe.getProductById(item.id);
        const stockStatus = product && product.stock > 0 ? 
            '<span class="in-stock">In Stock</span>' : 
            '<span class="out-of-stock">Out of Stock</span>';
        
        wishlistItemsHtml += `
            <tr>
                <td>
                    <div class="wishlist-product">
                        <div class="wishlist-product-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="wishlist-product-info">
                            <h3><a href="product.html?id=${item.id}">${item.name}</a></h3>
                        </div>
                    </div>
                </td>
                <td class="wishlist-price">${window.kimverseLuxe.formatCurrency(item.price)}</td>
                <td class="wishlist-stock">${stockStatus}</td>
                <td>
                    <button class="btn primary-btn add-to-cart-btn" data-product-id="${item.id}" ${product && product.stock > 0 ? '' : 'disabled'}>
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </td>
                <td>
                    <button class="remove-item-btn" data-index="${index}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    // Generate wishlist content HTML
    const wishlistHtml = `
        <div class="wishlist-header">
            <h2>My Wishlist</h2>
            <span>${wishlist.length} item${wishlist.length > 1 ? 's' : ''}</span>
        </div>
        
        <div class="wishlist-table-container">
            <table class="wishlist-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Stock Status</th>
                        <th>Action</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${wishlistItemsHtml}
                </tbody>
            </table>
        </div>
    `;
    
    wishlistContentElement.innerHTML = wishlistHtml;
    
    // Add event listeners
    addWishlistEventListeners();
}

// Add Wishlist Event Listeners
function addWishlistEventListeners() {
    // Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            
            window.kimverseLuxe.addToCart(productId, 1);
            window.kimverseLuxe.showNotification('Product added to cart!', 'success');
            window.kimverseLuxe.updateCartCount();
        });
    });
    
    // Remove item buttons
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeWishlistItem(index);
        });
    });
}

// Remove Wishlist Item
function removeWishlistItem(index) {
    const success = window.kimverseLuxe.removeFromWishlist(index);
    
    if (success) {
        // Show notification
        window.kimverseLuxe.showNotification('Item removed from wishlist.', 'success');
        
        // Reload wishlist content
        loadWishlistContent();
        
        // Update wishlist count
        window.kimverseLuxe.updateWishlistCount();
    }
}