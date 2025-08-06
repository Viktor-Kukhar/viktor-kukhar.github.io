/**
 * Main JavaScript functionality for the portfolio website
 * Handles animations, interactions, and general UI behavior
 */

class PortfolioApp {
    constructor() {
        this.isMobile = this.detectMobile();
        this.init();
    }
    
    init() {
        // Add mobile class to body for CSS targeting
        if (this.isMobile) {
            document.body.classList.add('mobile-device');
        }
        
        this.initializeParticles();
        this.setupSmoothScrolling();
        this.setupAnimationObserver();
        this.setupButtonInteractions();
    }
    
    /**
     * Detect if device is mobile
     */
    detectMobile() {
        // Check for touch capability and screen size
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        return isTouchDevice && (isSmallScreen || isMobileUserAgent);
    }
    
    /**
     * Check device performance capabilities
     */
    isLowEndDevice() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return true;
        }
        
        // Check device memory (if available)
        if (navigator.deviceMemory && navigator.deviceMemory < 4) {
            return true;
        }
        
        // Check hardware concurrency (CPU cores)
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            return true;
        }
        
        return false;
    }

    /**
     * Initialize particles.js background with custom configuration
     */
    initializeParticles() {
        // Skip particles on low-end devices only (keep on mobile)
        if (this.isLowEndDevice()) {
            console.log('Skipping particles.js initialization for low-end device');
            // Add a simple gradient background instead
            const particlesEl = document.getElementById('particles-js');
            if (particlesEl) {
                particlesEl.style.background = 'linear-gradient(135deg, #111827 0%, #1f2937 100%)';
            }
            return;
        }
        
        // Add a small delay to ensure particles.js is fully loaded
        setTimeout(() => {
            if (typeof particlesJS !== 'undefined') {
                console.log('Initializing particles.js...');
                particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 35,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#00ff96"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#00e1ff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 1.5,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": false,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": false,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            }, function() {
                console.log('Particles.js loaded successfully and is interactive');
            });
            } else {
                console.warn('particles.js library not loaded');
            }
        }, 100);
    }
    
    /**
     * Setup smooth scrolling for navigation links
     */
    setupSmoothScrolling() {
        // Add smooth scrolling to any future navigation links (enabled on all devices)
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
    
    /**
     * Setup simple scroll-based visibility for projects section
     */
    setupAnimationObserver() {
        // Skip animation observer on mobile
        if (this.isMobile) {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                // Immediately add the visible class without animation
                projectsSection.classList.add('projects-visible');
            }
            return;
        }
        
        // Simple check to trigger animations when projects section is in view
        const projectsSection = document.getElementById('projects');
        if (!projectsSection) return;
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a class to trigger the CSS animations
                    entry.target.classList.add('projects-visible');
                    // Disconnect observer after first trigger to prevent re-triggering
                    observer.disconnect();
                }
            });
        }, observerOptions);
        
        observer.observe(projectsSection);
    }
    
    /**
     * Setup button interactions and effects
     */
    setupButtonInteractions() {
        // Add ripple effect to buttons (enabled on all devices)
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .btn')) {
                this.createRippleEffect(e);
            }
        });
        
        // Handle CTA button clicks
        this.setupCTAButtons();
    }
    
    /**
     * Create ripple effect on button click
     */
    createRippleEffect(event) {
        const button = event.target;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        // Add ripple animation CSS if not already added
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    /**
     * Setup CTA button functionality
     */
    setupCTAButtons() {
        // Future: Add CTA button functionality when needed
        // Currently no CTA buttons in the HTML
    }
}



// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});