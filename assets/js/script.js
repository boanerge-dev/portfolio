// Portfolio Website JavaScript - Enhanced with Advanced Features

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    console.log('🚀 Portfolio Initializing...');
    
    setCurrentYear();
    initializeThemeToggle();
    initializeNavigation();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeFormHandling();
    initializeServiceCalculator();
    initializeTemplateInteractions();
    initializeLoadingStates();
    initializePerformanceOptimizations();
    
    console.log('✅ Portfolio Initialized Successfully');
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Enhanced Theme Toggle with System Preference Detection
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) {
        // Create theme toggle if it doesn't exist
        createThemeToggle();
        return;
    }
    
    const themeIcon = themeToggle.querySelector('i');
    
    // Detect system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Load saved theme preference or use system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply initial theme
    applyTheme(currentTheme, themeIcon);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolio-theme')) {
            applyTheme(e.matches ? 'dark' : 'light', themeIcon);
        }
    });
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        currentTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
        applyTheme(currentTheme, themeIcon);
    });
    
    // Add keyboard accessibility
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            currentTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
            applyTheme(currentTheme, themeIcon);
        }
    });
}

function createThemeToggle() {
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;
    
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.id = 'themeToggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    navContainer.appendChild(themeToggle);
    initializeThemeToggle(); // Re-initialize with new toggle
}

function applyTheme(theme, themeIcon) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
        localStorage.setItem('portfolio-theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        if (themeIcon) {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
        localStorage.setItem('portfolio-theme', 'light');
    }
}

// Enhanced Navigation with Mobile Support
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    
    if (!navContainer) return;
    
    // Update active navigation link based on scroll position
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(currentSection)) {
                link.classList.add('active');
            }
        });
    }
    
    // Mobile menu functionality
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navContainer.classList.toggle('nav-open');
            
            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            if (!isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Update active link
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Close mobile menu if open
                    if (mobileToggle && navContainer.classList.contains('nav-open')) {
                        mobileToggle.click();
                    }
                    
                    // Smooth scroll to section
                    smoothScrollTo(targetSection.offsetTop - 80, 800);
                }
            }
        });
    });
    
    // Update navigation on scroll with debouncing
    const debouncedScroll = debounce(updateActiveNav, 25);
    window.addEventListener('scroll', debouncedScroll);
}

// Enhanced Smooth Scrolling
function initializeSmoothScrolling() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                smoothScrollTo(targetElement.offsetTop - 80, 800);
            }
        }
    });
}

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Advanced Animations with Intersection Observer
function initializeAnimations() {
    // Configure intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                // Add staggered animation for children
                if (entry.target.classList.contains('services-grid') || 
                    entry.target.classList.contains('projects-grid') ||
                    entry.target.classList.contains('benefits-grid')) {
                    animateStaggeredChildren(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.content-section, .project-card, .sidebar-section, .service-card, .featured-item, .template-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Enhanced hover effects
    initializeHoverEffects();
}

function animateStaggeredChildren(container) {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
        child.style.transitionDelay = `${index * 0.1}s`;
    });
}

function initializeHoverEffects() {
    // Skill tags enhanced hover
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Project cards parallax effect
    const projectCards = document.querySelectorAll('.project-card, .template-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Advanced Form Handling with Validation
function initializeFormHandling() {
    const contactForm = document.querySelector('form[action*="formspree"]');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            await submitForm(this);
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    // Show error if invalid
    if (!isValid) {
        showFieldError(field, message);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

async function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification('Sorry, there was an error sending your message. Please try again or email me directly.', 'error');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Service Calculator for Pricing Estimates
function initializeServiceCalculator() {
    const serviceSelect = document.querySelector('select[name="service"]');
    
    if (!serviceSelect) return;
    
    const budgetDisplay = document.createElement('div');
    budgetDisplay.className = 'budget-estimate';
    budgetDisplay.style.marginTop = '1rem';
    budgetDisplay.style.padding = '1rem';
    budgetDisplay.style.background = 'var(--border-light)';
    budgetDisplay.style.borderRadius = 'var(--radius)';
    budgetDisplay.style.display = 'none';
    
    serviceSelect.parentNode.appendChild(budgetDisplay);
    
    serviceSelect.addEventListener('change', function() {
        const priceRanges = {
            'landing-page': '$300 - $500',
            'portfolio-site': '$800 - $1200', 
            'educational-site': '$400 - $600',
            'website-fix': '$50 - $100 per hour',
            'template': '$19 per template',
            'consultation': 'Starting at $50 per hour'
        };
        
        const selectedPrice = priceRanges[this.value];
        
        if (selectedPrice) {
            budgetDisplay.innerHTML = `
                <strong>Estimated Budget:</strong> ${selectedPrice}
                <br><small>Final price may vary based on project requirements</small>
            `;
            budgetDisplay.style.display = 'block';
        } else {
            budgetDisplay.style.display = 'none';
        }
    });
}

// Template Interactions and Notifications
function initializeTemplateInteractions() {
    // Coming soon template notifications
    const notifyButtons = document.querySelectorAll('.cta-button.disabled');
    notifyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('This template is coming soon! I\'ll notify you when it\'s available.', 'info');
        });
    });
    
    // Template feature toggles
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a') && !e.target.closest('button')) {
                this.classList.toggle('expanded');
            }
        });
    });
}

// Loading States and Performance
function initializeLoadingStates() {
    // Show loading spinner for page transitions
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('target') === '_blank') return;
            showLoadingSpinner();
        });
    });
    
    // Handle page load completion
    window.addEventListener('load', function() {
        hideLoadingSpinner();
        document.body.classList.add('loaded');
    });
}

function showLoadingSpinner() {
    let spinner = document.getElementById('loadingSpinner');
    if (!spinner) {
        spinner = document.createElement('div');
        spinner.id = 'loadingSpinner';
        spinner.innerHTML = `
            <div class="spinner-content">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;
        document.body.appendChild(spinner);
        
        // Add spinner styles
        const styles = `
            #loadingSpinner {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                color: white;
            }
            .spinner {
                border: 3px solid #f3f3f3;
                border-top: 3px solid var(--primary-color);
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin-bottom: 1rem;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    spinner.style.display = 'flex';
}

function hideLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
}

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounced resize handler
    window.addEventListener('resize', debounce(() => {
        // Handle responsive adjustments
    }, 250));
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-left: 4px solid var(--primary-color);
                padding: 1rem;
                border-radius: var(--radius);
                box-shadow: var(--shadow-lg);
                z-index: 1000;
                max-width: 400px;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            .notification-success { border-color: #10b981; }
            .notification-error { border-color: #ef4444; }
            .notification-info { border-color: #3b82f6; }
            .notification.show { transform: translateX(0); }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-secondary);
            }
        `;
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
    
    // Click to dismiss
    notification.addEventListener('click', (e) => {
        if (e.target === notification) {
            clearTimeout(autoRemove);
            removeNotification(notification);
        }
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for global access
window.Portfolio = {
    initialize: initializePortfolio,
    setTheme: function(theme) {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle?.querySelector('i');
        if (themeToggle && themeIcon) {
            applyTheme(theme, themeIcon);
        }
    },
    showNotification: showNotification,
};

// Initialize when script loads
initializePortfolio();

// Error handling for production
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});