/**
 * Kimverse Luxe E-commerce Website
 * Shop Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize shop filters
    initShopFilters();
    
    // Initialize shop controls
    initShopControls();
    
    // Load shop products
    loadShopProducts();
    
    // Load recently viewed products
    window.kimverseLuxe.loadRecentlyViewed('recently-viewed-products', 4);
});

// Shop Filters
function initShopFilters() {
    // Filter toggle for mobile
    const filterToggle = document.querySelector('.filter-toggle');
    const shopSidebar = document.querySelector('.shop-sidebar');
    
    if (filterToggle && shopSidebar) {
        filterToggle.addEventListener('click', function() {
            shopSidebar.classList.add('active');
            document.body.classList.add('sidebar-open');
        });
        
        // Add close button to sidebar
        const closeButton = document.createElement('button');
        closeButton.className = 'close-sidebar';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        shopSidebar.appendChild(closeButton);
        
        closeButton.addEventListener('click', function() {
            shopSidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (shopSidebar.classList.contains('active') && 
                !shopSidebar.contains(e.target) && 
                e.target !== filterToggle) {
                shopSidebar.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            }
        });
    }
    
    // Price range slider
    const priceRange = document.getElementById('price-range');
    const priceOutput = document.getElementById('price-output');
    
    if (priceRange && priceOutput) {
        priceRange.addEventListener('input', function() {
            const value = this.value;
            priceOutput.textContent = `$0 - $${value}`;
        });
    }
    
    // Apply filters button
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            loadShopProducts();
            
            // Close sidebar on mobile
            if (window.innerWidth < 992) {
                shopSidebar.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            }
        });
    }
    
    // Reset filters button
    const resetFiltersBtn = document.getElementById('reset-filters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            // Reset category checkboxes
            document.querySelectorAll('input[name="category"]').forEach(checkbox => {
                checkbox.checked = checkbox.value === 'all';
            });
            
            // Reset gender checkboxes
            document.querySelectorAll('input[name="gender"]').forEach(checkbox => {
                checkbox.checked = checkbox.value === 'all';
            });
            
            // Reset price range
            if (priceRange) {
                priceRange.value = priceRange.max;
                priceOutput.textContent = `$0 - $${priceRange.max}`;
            }
            
            // Reset search input
            const shopSearchInput = document.getElementById('shop-search-input');
            if (shopSearchInput) {
                shopSearchInput.value = '';
            }
            
            // Load products with reset filters
            loadShopProducts();
        });
    }
    
    // Handle "Reset All Filters" button that appears when no products are found
    document.addEventListener('click', function(e) {
        if (e.target.id === 'reset-all-filters') {
            if (resetFiltersBtn) {
                resetFiltersBtn.click();
            }
        }
    });
}

// Shop Controls
function initShopControls() {
    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            loadShopProducts();
        });
    }
    
    // View switcher
    const viewButtons = document.querySelectorAll('.view-button');
    const productsGrid = document.getElementById('shop-products');
    
    if (viewButtons.length > 0 && productsGrid) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                viewButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update grid class
                productsGrid.className = 'products-grid ' + this.getAttribute('data-view');
            });
        });
    }
    
    // Shop search
    const shopSearchBtn = document.getElementById('shop-search-btn');
    const shopSearchInput = document.getElementById('shop-search-input');
    
    if (shopSearchBtn && shopSearchInput) {
        shopSearchBtn.addEventListener('click', function() {
            loadShopProducts();
        });
        
        shopSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                loadShopProducts();
            }
        });
    }
    
    // Load more button
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const currentPage = parseInt(this.getAttribute('data-page')) || 1;
            const nextPage = currentPage + 1;
            
            loadShopProducts(nextPage, true);
            this.setAttribute('data-page', nextPage);
        });
    }
}

// Load Shop Products
function loadShopProducts(page = 1, append = false) {
    const shopProductsContainer = document.getElementById('shop-products');
    const loadMoreBtn = document.getElementById('load-more');
    
    if (!shopProductsContainer) return;
    
    // Get filters
    const filters = getFilters();
    
    // Get sort option
    const sortSelect = document.getElementById('sort-select');
    const sort = sortSelect ? sortSelect.value : 'default';
    
    // Load products
    const result = window.kimverseLuxe.loadShopProducts('shop-products', filters, sort, page, 12);
    
    // Update load more button
    if (loadMoreBtn) {
        if (result.hasMore) {
            loadMoreBtn.style.display = 'inline-block';
            loadMoreBtn.setAttribute('data-page', page);
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    // Apply URL parameters for filters
    if (page === 1 && !append) {
        applyUrlParameters(filters);
    }
}

// Get Filters from Form
function getFilters() {
    const filters = {};
    
    // Category filter
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]:checked');
    if (categoryCheckboxes.length === 1 && categoryCheckboxes[0].value !== 'all') {
        filters.category = categoryCheckboxes[0].value;
    }
    
    // Gender filter
    const genderCheckboxes = document.querySelectorAll('input[name="gender"]:checked');
    if (genderCheckboxes.length === 1 && genderCheckboxes[0].value !== 'all') {
        filters.gender = genderCheckboxes[0].value;
    }
    
    // Price range filter
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        filters.priceRange = {
            min: 0,
            max: parseInt(priceRange.value)
        };
    }
    
    // Search filter
    const shopSearchInput = document.getElementById('shop-search-input');
    if (shopSearchInput && shopSearchInput.value.trim()) {
        filters.search = shopSearchInput.value.trim();
    }
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Category from URL
    if (urlParams.has('category') && !filters.category) {
        filters.category = urlParams.get('category');
        
        // Update checkbox
        const categoryCheckbox = document.querySelector(`input[name="category"][value="${filters.category}"]`);
        if (categoryCheckbox) {
            document.querySelectorAll('input[name="category"]').forEach(checkbox => {
                checkbox.checked = checkbox.value === filters.category;
            });
        }
    }
    
    // Gender from URL
    if (urlParams.has('gender') && !filters.gender) {
        filters.gender = urlParams.get('gender');
        
        // Update checkbox
        const genderCheckbox = document.querySelector(`input[name="gender"][value="${filters.gender}"]`);
        if (genderCheckbox) {
            document.querySelectorAll('input[name="gender"]').forEach(checkbox => {
                checkbox.checked = checkbox.value === filters.gender;
            });
        }
    }
    
    // Tag from URL
    if (urlParams.has('tag')) {
        filters.tag = urlParams.get('tag');
    }
    
    // Search from URL
    if (urlParams.has('search') && !filters.search) {
        filters.search = urlParams.get('search');
        
        // Update search input
        if (shopSearchInput) {
            shopSearchInput.value = filters.search;
        }
    }
    
    return filters;
}

// Apply URL Parameters
function applyUrlParameters(filters) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    
    // Clear existing parameters
    params.delete('category');
    params.delete('gender');
    params.delete('tag');
    params.delete('search');
    
    // Add new parameters
    if (filters.category) {
        params.set('category', filters.category);
    }
    
    if (filters.gender) {
        params.set('gender', filters.gender);
    }
    
    if (filters.tag) {
        params.set('tag', filters.tag);
    }
    
    if (filters.search) {
        params.set('search', filters.search);
    }
    
    // Update URL without reloading the page
    const newUrl = url.origin + url.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.pushState({ path: newUrl }, '', newUrl);
}