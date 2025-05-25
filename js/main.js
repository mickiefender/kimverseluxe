/**
 * Kimverse Luxe E-commerce Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize header functionality
    initHeader();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize hero slider
    initHeroSlider();
    
    // Initialize product tabs
    initProductTabs();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize quick view modal
    initQuickViewModal();
    
    // Load products on homepage
    loadHomepageProducts();
    
    // Update cart and wishlist counts
    updateCartAndWishlistCounts();
    
    // Initialize animations
    initAnimations();
});

// Header Functionality
function initHeader() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    if (mobileMenuToggle && mobileMenu && closeMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

// Search Functionality
function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeSearch = document.querySelector('.close-search');
    const searchForm = document.getElementById('search-form');
    
    if (searchToggle && searchOverlay && closeSearch && searchForm) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchOverlay.classList.add('active');
            document.getElementById('search-input').focus();
            document.body.style.overflow = 'hidden';
        });
        
        closeSearch.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = document.getElementById('search-input').value.trim();
            
            if (searchTerm) {
                window.location.href = `shop.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });
    }
}

// Hero Slider
function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    
    let currentSlide = 0;
    let slideInterval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Function to show the next slide
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0;
        }
        showSlide(next);
    }
    
    // Function to show the previous slide
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = slides.length - 1;
        }
        showSlide(prev);
    }
    
    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });
    
    // Add event listeners to prev/next buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }
    
    // Start automatic slideshow
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Reset interval after user interaction
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Initialize slider
    startInterval();
}

// Product Tabs
function initProductTabs() {
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            const tabsContainer = this.closest('.products-tabs');
            
            // Update active tab trigger
            tabsContainer.querySelector('.tab-trigger.active').classList.remove('active');
            this.classList.add('active');
            
            // Update active tab content
            tabsContainer.querySelector('.tab-content.active').classList.remove('active');
            tabsContainer.querySelector(`.tab-content[data-tab="${tab}"]`).classList.add('active');
            
            // If this is the new arrivals section, load products for the selected category
            if (tabsContainer.closest('.products-section') && tab !== 'all') {
                window.kimverseLuxe.loadNewArrivals(`new-arrivals-${tab}`, tab);
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Quick View Modal
function initQuickViewModal() {
    const quickViewModal = document.querySelector('.quick-view-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (quickViewModal && closeModal) {
        closeModal.addEventListener('click', function() {
            quickViewModal.classList.remove('active');
        });
        
        // Close modal when clicking outside content
        quickViewModal.addEventListener('click', function(e) {
            if (e.target === quickViewModal) {
                quickViewModal.classList.remove('active');
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && quickViewModal.classList.contains('active')) {
                quickViewModal.classList.remove('active');
            }
        });
    }
}

// Load Homepage Products
function loadHomepageProducts() {
    // Load featured products
    if (document.getElementById('featured-products')) {
        window.kimverseLuxe.loadFeaturedProducts('featured-products', 8);
    }
    
    // Load new arrivals - all categories
    if (document.getElementById('new-arrivals-all')) {
        window.kimverseLuxe.loadNewArrivals('new-arrivals-all', null, 8);
    }
    
    // Load new arrivals by category
    const categories = ['clothing', 'accessories', 'jewelry', 'footwear', 'perfumes'];
    categories.forEach(category => {
        const containerId = `new-arrivals-${category}`;
        if (document.getElementById(containerId)) {
            window.kimverseLuxe.loadNewArrivals(containerId, category, 8);
        }
    });
}

// Update Cart and Wishlist Counts
function updateCartAndWishlistCounts() {
    window.kimverseLuxe.updateCartCount();
    window.kimverseLuxe.updateWishlistCount();
}

// Animations
function initAnimations() {
    // Animate sections on scroll
    const animateSections = document.querySelectorAll('.animate-section');
    
    if (animateSections.length > 0) {
        // Add hidden class to all sections initially
        animateSections.forEach(section => {
            section.classList.add('hidden');
        });
        
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
            );
        }
        
        // Function to handle scroll animation
        function handleScrollAnimation() {
            animateSections.forEach(section => {
                if (isInViewport(section) && section.classList.contains('hidden')) {
                    section.classList.remove('hidden');
                }
            });
        }
        
        // Initial check
        handleScrollAnimation();
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScrollAnimation);
    }
}