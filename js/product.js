/**
 * Kimverse Luxe E-commerce Website
 * Product Detail Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load product detail
    loadProductDetail();
});

// Load Product Detail
function loadProductDetail() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        // Redirect to shop if no product ID
        window.location.href = 'shop.html';
        return;
    }
    
    // Load product detail
    const success = window.kimverseLuxe.loadProductDetail(parseInt(productId));
    
    if (!success) {
        // Product not found, redirect to shop
        window.location.href = 'shop.html';
    }
}