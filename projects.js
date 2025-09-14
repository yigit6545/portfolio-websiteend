// Projects Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeProjectsFilter();
    initializeProjectAnimations();
    initializeProjectLinks();
    initializeProjectsAnalytics();
});

// Projects Analytics
function initializeProjectsAnalytics() {
    // Track projects page view
    if (typeof trackPageView !== 'undefined') {
        trackPageView('Projects Page');
    }
    
    // Track filter usage
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (typeof trackEvent !== 'undefined') {
                trackEvent('project_filter', {
                    category: 'engagement',
                    label: this.textContent,
                    value: 1
                });
            }
        });
    });
    
    // Track project card clicks
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('.project-title').textContent;
            if (typeof trackEvent !== 'undefined') {
                trackEvent('project_view', {
                    category: 'engagement',
                    label: projectTitle,
                    value: 1
                });
            }
        });
    });
}

// Projects Filter Functionality
function initializeProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('filtered-out');
                    card.classList.add('filtered-in');
                } else {
                    card.classList.add('filtered-out');
                    card.classList.remove('filtered-in');
                }
            });

            // Show notification
            showNotification(`"${button.textContent}" filtresi uygulandı`, 'success');
        });
    });
}

// Project Animations
function initializeProjectAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Project Links (Demo and GitHub)
function initializeProjectLinks() {
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const isDemo = link.querySelector('.fa-external-link-alt');
            const isGitHub = link.querySelector('.fa-github');
            
            if (isDemo) {
                showNotification('Demo linki yakında aktif olacak!', 'info');
            } else if (isGitHub) {
                showNotification('GitHub reposu yakında paylaşılacak!', 'info');
            }
        });
    });
}

// Project Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Tech Tags Animation
document.addEventListener('DOMContentLoaded', function() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.background = '#6366f1';
            this.style.color = 'white';
            this.style.transform = 'scale(1.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.background = '#f1f5f9';
            this.style.color = '#6366f1';
            this.style.transform = 'scale(1)';
        });
    });
});

// Filter Button Ripple Effect
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect CSS
const rippleCSS = `
.filter-btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Project Statistics (for admin panel)
function getProjectStats() {
    const projectCards = document.querySelectorAll('.project-card');
    const categories = {};
    
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        categories[category] = (categories[category] || 0) + 1;
    });
    
    return {
        total: projectCards.length,
        categories: categories
    };
}

// Export project data
function exportProjectData() {
    const stats = getProjectStats();
    const data = {
        ...stats,
        exportDate: new Date().toISOString(),
        page: 'projects'
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'projects-data.json';
    link.click();
    
    showNotification('Proje verileri başarıyla dışa aktarıldı!', 'success');
}

// Make functions globally available
window.exportProjectData = exportProjectData;
window.getProjectStats = getProjectStats;
