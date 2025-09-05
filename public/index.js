// Main JavaScript file for the index page

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('IQnition app loaded successfully!');
    
    // Initialize any necessary components
    initializeApp();
});

// Initialize the application
function initializeApp() {
    // Check if user is logged in and update UI accordingly
    updateUserInterface();
    
    // Initialize tooltips if needed
    initializeTooltips();
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Initialize card animations
    initializeCardAnimations();
}

// Update user interface based on login status
function updateUserInterface() {
    const userSection = document.querySelector('.user-section');
    if (userSection) {
        // Add any additional UI updates here
        console.log('User interface updated');
    }
}

// Initialize Bootstrap tooltips if any exist
function initializeTooltips() {
    // Check if Bootstrap is loaded
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

// Add smooth scrolling for anchor links
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize card animations and interactions
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });
}

// Enhanced PDF download function with error handling
function downloadPDF(pdfPath, fileName) {
    // Show loading state
    showLoadingState();
    
    fetch(pdfPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName || pdfPath.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            // Show success message
            showNotification('Download started successfully!', 'success');
        })
        .catch(error => {
            console.error('Download failed:', error);
            showNotification('Download failed. Please try again.', 'error');
        })
        .finally(() => {
            hideLoadingState();
        });
}

// Show loading state
function showLoadingState() {
    // You can add a loading spinner or disable buttons here
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.pointerEvents = 'none';
        card.style.opacity = '0.7';
    });
}

// Hide loading state
function hideLoadingState() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.pointerEvents = 'auto';
        card.style.opacity = '1';
    });
}

// Show notification messages
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        background-color: rgba(255,255,255,0.2);
        border-radius: 50%;
    }
`;
document.head.appendChild(style);

// Handle carousel events
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#carouselExampleRide');
    if (carousel) {
        carousel.addEventListener('slide.bs.carousel', function (event) {
            console.log('Carousel sliding to:', event.to);
        });
        
        carousel.addEventListener('slid.bs.carousel', function (event) {
            console.log('Carousel slid to:', event.to);
        });
    }
});

// Handle navigation menu for mobile (if needed)
function initializeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('nav-active');
            navToggle.classList.toggle('toggle-active');
        });
    }
}

// Initialize mobile menu
initializeMobileMenu();

// Handle window resize events
window.addEventListener('resize', function() {
    // Handle any responsive changes here
    console.log('Window resized');
});

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// Export functions for global access (if needed)
window.IQnition = {
    downloadPDF: downloadPDF,
    showNotification: showNotification,
    initializeApp: initializeApp
};

// Console message
console.log('🚀 IQnition Quiz App JavaScript loaded successfully!');

// Performance monitoring (optional)
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
});