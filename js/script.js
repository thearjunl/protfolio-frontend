// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHeroAnimations();
    initMatrixRain();
    initNetworkNodes();
    init3DSkills();
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// Hero section animations
function initHeroAnimations() {
    // GSAP Timeline for hero content
    const heroTl = gsap.timeline();
    
    heroTl.from('.hero-name', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    })
    .from('.hero-subtitle', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-description', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-buttons .btn', {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.3');

    // Security lock animation
    const lockTl = gsap.timeline({ repeat: -1, yoyo: true });
    
    lockTl.to('.security-lock', {
        duration: 2,
        rotation: 5,
        scale: 1.1,
        ease: 'power2.inOut'
    })
    .to('.lock-shackle', {
        duration: 1,
        attr: { d: "M40 50 V35 Q40 20 60 20 Q80 20 80 25 V35" },
        ease: 'power2.inOut'
    }, '-=1')
    .to('.lock-keyhole', {
        duration: 0.5,
        fill: '#00f5ff',
        ease: 'power2.inOut'
    }, '-=0.5');

    // Cyber grid animation
    gsap.to('.cyber-grid', {
        duration: 20,
        backgroundPosition: '50px 50px',
        ease: 'none',
        repeat: -1
    });

    // Hero animation entrance
    gsap.from('.hero-animation', {
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });
}

// Matrix rain effect
function initMatrixRain() {
    const matrixContainer = document.getElementById('matrix-rain');
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function createMatrixColumn() {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.top = '-100px';
        column.style.left = Math.random() * 100 + '%';
        column.style.color = '#00f5ff';
        column.style.fontSize = '14px';
        column.style.fontFamily = 'monospace';
        column.style.opacity = '0.7';
        column.style.pointerEvents = 'none';
        column.style.whiteSpace = 'nowrap';
        
        let text = '';
        for (let i = 0; i < 20; i++) {
            text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
        }
        column.innerHTML = text;
        
        matrixContainer.appendChild(column);
        
        // Animate the column
        gsap.to(column, {
            duration: Math.random() * 3 + 2,
            y: window.innerHeight + 100,
            opacity: 0,
            ease: 'none',
            onComplete: () => {
                column.remove();
            }
        });
    }
    
    // Create matrix columns periodically
    setInterval(createMatrixColumn, 200);
}

// Network nodes animation
function initNetworkNodes() {
    const networkContainer = document.getElementById('network-nodes');
    const nodes = [];
    const nodeCount = 15;
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.style.position = 'absolute';
        node.style.width = '4px';
        node.style.height = '4px';
        node.style.background = '#00f5ff';
        node.style.borderRadius = '50%';
        node.style.boxShadow = '0 0 10px #00f5ff';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        node.style.left = x + '%';
        node.style.top = y + '%';
        
        networkContainer.appendChild(node);
        nodes.push({ element: node, x, y });
        
        // Animate node pulsing
        gsap.to(node, {
            duration: Math.random() * 2 + 1,
            scale: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }
    
    // Create connections between nodes
    function createConnections() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.pointerEvents = 'none';
        
        networkContainer.appendChild(svg);
        
        nodes.forEach((node1, i) => {
            nodes.forEach((node2, j) => {
                if (i < j) {
                    const distance = Math.sqrt(
                        Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)
                    );
                    
                    if (distance < 30) {
                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', node1.x + '%');
                        line.setAttribute('y1', node1.y + '%');
                        line.setAttribute('x2', node2.x + '%');
                        line.setAttribute('y2', node2.y + '%');
                        line.setAttribute('stroke', '#00f5ff');
                        line.setAttribute('stroke-width', '1');
                        line.setAttribute('opacity', '0.3');
                        
                        svg.appendChild(line);
                        
                        // Animate line opacity
                        gsap.to(line, {
                            duration: Math.random() * 3 + 2,
                            opacity: Math.random() * 0.6 + 0.2,
                            repeat: -1,
                            yoyo: true,
                            ease: 'power2.inOut'
                        });
                    }
                }
            });
        });
    }
    
    createConnections();
}

// 3D Skills Section
function init3DSkills() {
    // Stagger animation for skill badges on scroll
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const badge = entry.target;
                const delay = parseFloat(badge.getAttribute('data-delay')) || 0;
                
                // Animate badge entrance
                setTimeout(() => {
                    badge.style.opacity = '1';
                    badge.style.transform = 'translateY(0)';
                }, delay * 100);
                
                skillObserver.unobserve(badge);
            }
        });
    }, { threshold: 0.3 });
    
    skillBadges.forEach(badge => {
        skillObserver.observe(badge);
    });
    
    // Enhanced hover effects with GSAP
    skillBadges.forEach(badge => {
        const badgeInner = badge.querySelector('.badge-inner');
        const icon = badge.querySelector('.skill-icon');
        const tooltip = badge.querySelector('.tooltip');
        
        badge.addEventListener('mouseenter', () => {
            // Pause floating animation
            badge.style.animationPlayState = 'paused';
            
            // Enhanced hover animation
            gsap.to(badge, {
                duration: 0.4,
                y: -15,
                rotationY: 15,
                scale: 1.05,
                ease: 'back.out(1.7)'
            });
            
            gsap.to(icon, {
                duration: 0.3,
                scale: 1.15,
                rotation: 5,
                ease: 'power2.out'
            });
            
            // Glow effect
            gsap.to(badgeInner, {
                duration: 0.3,
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(255, 255, 255, 0.2)',
                ease: 'power2.out'
            });
        });
        
        badge.addEventListener('mouseleave', () => {
            // Resume floating animation
            badge.style.animationPlayState = 'running';
            
            // Reset animations
            gsap.to(badge, {
                duration: 0.4,
                y: 0,
                rotationY: 0,
                scale: 1,
                ease: 'power2.out'
            });
            
            gsap.to(icon, {
                duration: 0.3,
                scale: 1,
                rotation: 0,
                ease: 'power2.out'
            });
            
            gsap.to(badgeInner, {
                duration: 0.3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                ease: 'power2.out'
            });
        });
    });
    
    // Add subtle parallax effect on mouse move
    const skillsSection = document.querySelector('.skills-3d');
    if (skillsSection && window.innerWidth > 768) {
        skillsSection.addEventListener('mousemove', (e) => {
            const rect = skillsSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            skillBadges.forEach((badge, index) => {
                const speed = (index % 3 + 1) * 0.5;
                const xMove = x * speed * 10;
                const yMove = y * speed * 10;
                
                gsap.to(badge, {
                    duration: 1,
                    x: xMove,
                    ease: 'power2.out'
                });
            });
        });
        
        skillsSection.addEventListener('mouseleave', () => {
            skillBadges.forEach(badge => {
                gsap.to(badge, {
                    duration: 1,
                    x: 0,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    // Add random floating variations
    skillBadges.forEach((badge, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        
        gsap.to(badge, {
            duration: randomDuration,
            y: -10 - Math.random() * 10,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: randomDelay
        });
    });
    
    // Category title animations
    const categoryTitles = document.querySelectorAll('.category-title');
    categoryTitles.forEach((title, index) => {
        gsap.from(title, {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: index * 0.3,
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Section title animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Skill categories animation
    gsap.utils.toArray('.skill-category').forEach((category, index) => {
        gsap.from(category, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: index * 0.2,
            scrollTrigger: {
                trigger: category,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Project cards animation
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Contact section animation
    gsap.from('.contact-info', {
        duration: 1,
        x: -50,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.from('.contact-form', {
        duration: 1,
        x: 50,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(`${window.APP_CONFIG.API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                showNotification('Message sent successfully!', 'success');
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '10px',
        color: '#fff',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #00f5ff, #0080ff)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #333, #555)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Particle cursor effect
function initParticleCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-particle';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #00f5ff, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '0.6';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// Initialize particle cursor on desktop
if (window.innerWidth > 768) {
    initParticleCursor();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card').forEach(el => {
    observer.observe(el);
});

// Add CSS for intersection observer animations
const style = document.createElement('style');
style.textContent = `
    .skill-category,
    .project-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .skill-category.animate-in,
    .project-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Update navbar background
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
}, 16)); // ~60fps