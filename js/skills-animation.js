// Skills Animation Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize skill tag animations
    const skillTags = document.querySelectorAll('.skill-tag');
    
    // Add animation delays to skill tags for staggered effect
    skillTags.forEach((tag, index) => {
        tag.style.setProperty('--delay', index);
        tag.style.animationDelay = `${index * 0.1}s`;
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillTags = entry.target.querySelectorAll('.skill-tag');
                skillTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe skills container
    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) {
        // Initially hide skill tags
        skillTags.forEach(tag => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px) scale(0.9)';
            tag.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        skillsObserver.observe(skillsContainer);
    }

    // Add interactive hover effects
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });
});