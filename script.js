// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const adminModal = document.getElementById('adminModal');
const adminPassword = document.getElementById('adminPassword');
const loginForm = document.getElementById('loginForm');
const adminPanel = document.getElementById('adminPanel');

// Admin Panel Configuration
const ADMIN_PASSWORD = 'admin123'; // Güvenlik için production'da değiştirin
let isAdminLoggedIn = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeLoadingScreen();
    initializeNavigation();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeContactForm();
    initializeScrollToTop();
    initializeAdminPanel();
    initializeAnalytics();
});

// Analytics Initialization
function initializeAnalytics() {
    // Track page view
    const pageName = document.title;
    trackPageView(pageName);
    
    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackTimeOnPage(timeSpent);
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (scrollPercent % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                trackScroll(scrollPercent);
            }
        }
    });
}

// Loading Screen
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500); // Show loading for 1.5 seconds
    });
}

// Navigation Functions
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            // Force mobile menu colors
            navMenu.style.background = '#ffffff';
            const mobileLinks = navMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.style.color = '#1f2937';
            });
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Force navbar colors to stay consistent
    function forceNavbarColors() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const navLogo = document.querySelector('.nav-logo h2');
        const adminBtn = document.querySelector('.admin-btn');
        const bars = document.querySelectorAll('.bar');
        
        if (navbar) {
            navbar.style.background = '#ffffff';
            navbar.style.color = '#1f2937';
        }
        
        navLinks.forEach(link => {
            link.style.color = '#1f2937';
        });
        
        if (navLogo) {
            navLogo.style.color = '#6366f1';
        }
        
        if (adminBtn) {
            adminBtn.style.background = '#6366f1';
            adminBtn.style.color = 'white';
        }
        
        bars.forEach(bar => {
            bar.style.background = '#1f2937';
        });
    }
    
    // Apply colors immediately and on scroll
    forceNavbarColors();
    window.addEventListener('scroll', forceNavbarColors);
    window.addEventListener('resize', forceNavbarColors);
}

// Scroll Animations
function initializeScrollAnimations() {
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

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.service-card, .skill-item, .pricing-card, .contact-item, .stat');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // About section animations
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    if (aboutText) {
        aboutText.classList.add('slide-in-left');
        observer.observe(aboutText);
    }
    if (aboutImage) {
        aboutImage.classList.add('slide-in-right');
        observer.observe(aboutImage);
    }
}

// Skill Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width;
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Gönderiliyor...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Save message to localStorage
            const messageData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                subject: this.querySelectorAll('input[type="text"]')[1].value,
                message: this.querySelector('textarea').value,
                date: new Date().toLocaleString('tr-TR'),
                ip: '127.0.0.1', // Simulated IP
                userAgent: navigator.userAgent
            };
            
            // Get existing messages
            const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            existingMessages.push(messageData);
            localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
            
            // Show success message
            showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Update admin stats
            if (isAdminLoggedIn) {
                updateMessageCount();
            }
        }, 2000);
        });
    }
}

// Admin Panel Functions
function initializeAdminPanel() {
    // Check if admin is already logged in (session storage)
    const adminSession = sessionStorage.getItem('adminLoggedIn');
    if (adminSession === 'true') {
        isAdminLoggedIn = true;
        showAdminPanel();
    }
}

function openAdminPanel() {
    adminModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    if (!isAdminLoggedIn) {
        loginForm.style.display = 'block';
        adminPanel.style.display = 'none';
        adminPassword.focus();
    } else {
        showAdminPanel();
    }
}

function closeAdminPanel() {
    adminModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function loginAdmin() {
    const password = adminPassword.value;
    
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        sessionStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
        showNotification('Admin paneline başarıyla giriş yapıldı!', 'success');
    } else {
        showNotification('Hatalı şifre! Lütfen tekrar deneyin.', 'error');
        adminPassword.value = '';
        adminPassword.focus();
    }
}

function showAdminPanel() {
    loginForm.style.display = 'none';
    adminPanel.style.display = 'block';
    loadAdminStats();
}

function loadAdminStats() {
    // Load visitor stats from localStorage or set defaults
    const totalVisitors = localStorage.getItem('totalVisitors') || '1,234';
    const todayVisitors = localStorage.getItem('todayVisitors') || '45';
    const messageCount = localStorage.getItem('messageCount') || '12';
    
    document.getElementById('totalVisitors').textContent = totalVisitors;
    document.getElementById('todayVisitors').textContent = todayVisitors;
    document.getElementById('messageCount').textContent = messageCount;
}

function updateStats() {
    // Simulate updating stats
    const totalVisitors = document.getElementById('totalVisitors');
    const todayVisitors = document.getElementById('todayVisitors');
    
    // Add some random visitors
    const currentTotal = parseInt(totalVisitors.textContent.replace(',', ''));
    const currentToday = parseInt(todayVisitors.textContent);
    
    const newTotal = currentTotal + Math.floor(Math.random() * 10) + 1;
    const newToday = currentToday + Math.floor(Math.random() * 5) + 1;
    
    totalVisitors.textContent = newTotal.toLocaleString();
    todayVisitors.textContent = newToday;
    
    // Save to localStorage
    localStorage.setItem('totalVisitors', newTotal.toLocaleString());
    localStorage.setItem('todayVisitors', newToday);
    
    showNotification('İstatistikler güncellendi!', 'success');
}

function updateMessageCount() {
    const messageCount = document.getElementById('messageCount');
    const currentCount = parseInt(messageCount.textContent);
    const newCount = currentCount + 1;
    
    messageCount.textContent = newCount;
    localStorage.setItem('messageCount', newCount);
}

function exportData() {
    const stats = {
        totalVisitors: document.getElementById('totalVisitors').textContent,
        todayVisitors: document.getElementById('todayVisitors').textContent,
        messageCount: document.getElementById('messageCount').textContent,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(stats, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'website-stats.json';
    link.click();
    
    showNotification('Veriler başarıyla dışa aktarıldı!', 'success');
}

// Scroll to Top Button
function initializeScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    if (scrollBtn) {
        scrollBtn.onclick = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Add animation styles
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
            gap: 0.5rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            margin-left: auto;
            padding: 0.25rem;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Pricing Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        const selectBtn = card.querySelector('.btn');
        
        selectBtn.addEventListener('click', function() {
            const planName = card.querySelector('h3').textContent;
            showNotification(`${planName} paketi seçildi! Size en kısa sürede dönüş yapacağım.`, 'success');
            
            // Add selection animation
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 200);
        });
    });
});

// Mobile Touch Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add touch feedback for mobile
    const interactiveElements = document.querySelectorAll('.btn, .service-card, .pricing-card, .skill-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
});

// Performance Optimization
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed:', err);
            });
    });
}

// Analytics Functions
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: eventData.category || 'engagement',
            event_label: eventData.label || '',
            value: eventData.value || 0
        });
    }
    
    // Local storage backup
    const totalEvents = parseInt(localStorage.getItem('totalEvents') || '0') + 1;
    localStorage.setItem('totalEvents', totalEvents);
    
    console.log('Event tracked:', eventName, eventData);
}

function trackPageView(pageName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: pageName,
            page_location: window.location.href
        });
    }
}

function trackButtonClick(buttonName, location = 'unknown') {
    trackEvent('button_click', {
        category: 'engagement',
        label: `${buttonName}_${location}`,
        value: 1
    });
}

function trackFormSubmission(formName) {
    trackEvent('form_submit', {
        category: 'engagement',
        label: formName,
        value: 1
    });
}

function trackScroll(depth) {
    trackEvent('scroll', {
        category: 'engagement',
        label: `scroll_${depth}%`,
        value: depth
    });
}

function trackTimeOnPage(timeSpent) {
    trackEvent('time_on_page', {
        category: 'engagement',
        label: 'seconds',
        value: timeSpent
    });
}

// Add click tracking to important buttons
document.addEventListener('DOMContentLoaded', function() {
    const trackableButtons = document.querySelectorAll('.btn-primary, .admin-btn, .nav-link');
    
    trackableButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonLocation = this.closest('section')?.id || 'navigation';
            trackButtonClick(buttonText, buttonLocation);
        });
    });
    
    // Track contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            trackFormSubmission('contact_form');
        });
    }
    
    // Track admin panel access
    const adminBtn = document.querySelector('.admin-btn');
    if (adminBtn) {
        adminBtn.addEventListener('click', function() {
            trackEvent('admin_access', {
                category: 'admin',
                label: 'admin_panel_opened'
            });
        });
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && adminModal.style.display === 'block') {
        closeAdminPanel();
    }
    
    // Admin login with Enter key
    if (e.key === 'Enter' && document.activeElement === adminPassword) {
        loginAdmin();
    }
});

// Analytics Dashboard
function showAnalytics() {
    const totalEvents = localStorage.getItem('totalEvents') || '0';
    const totalClicks = localStorage.getItem('totalClicks') || '0';
    const totalVisitors = localStorage.getItem('totalVisitors') || '1,234';
    
    const analyticsData = {
        totalEvents: totalEvents,
        totalClicks: totalClicks,
        totalVisitors: totalVisitors,
        pageViews: document.title,
        currentTime: new Date().toLocaleString('tr-TR'),
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        language: navigator.language
    };
    
    const analyticsText = `
📊 ANALYTICS RAPORU
==================
📅 Tarih: ${analyticsData.currentTime}
👥 Toplam Ziyaretçi: ${analyticsData.totalVisitors}
🖱️ Toplam Tıklama: ${analyticsData.totalClicks}
📈 Toplam Event: ${analyticsData.totalEvents}
📄 Sayfa: ${analyticsData.pageViews}
🌐 Dil: ${analyticsData.language}
📱 Çözünürlük: ${analyticsData.screenResolution}
    `;
    
    showNotification('Analytics verileri konsola yazdırıldı!', 'success');
    console.log(analyticsText);
    
    // Copy to clipboard
    navigator.clipboard.writeText(analyticsText).then(() => {
        showNotification('Analytics verileri panoya kopyalandı!', 'success');
    });
}

// Message Management
function showMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    
    if (messages.length === 0) {
        showNotification('Henüz mesaj bulunmuyor.', 'info');
        return;
    }
    
    let messagesText = '📧 GELEN MESAJLAR\n==================\n\n';
    
    messages.forEach((message, index) => {
        messagesText += `📨 Mesaj #${index + 1}\n`;
        messagesText += `👤 Ad: ${message.name}\n`;
        messagesText += `📧 Email: ${message.email}\n`;
        messagesText += `📝 Konu: ${message.subject}\n`;
        messagesText += `💬 Mesaj: ${message.message}\n`;
        messagesText += `📅 Tarih: ${message.date}\n`;
        messagesText += `🌐 IP: ${message.ip}\n`;
        messagesText += `📱 Cihaz: ${message.userAgent}\n`;
        messagesText += '─'.repeat(30) + '\n\n';
    });
    
    showNotification(`${messages.length} mesaj konsola yazdırıldı!`, 'success');
    console.log(messagesText);
    
    // Copy to clipboard
    navigator.clipboard.writeText(messagesText).then(() => {
        showNotification('Mesajlar panoya kopyalandı!', 'success');
    });
}

// Site Settings
function showSettings() {
    const settings = {
        siteTitle: document.title,
        siteDescription: document.querySelector('meta[name="description"]')?.content || 'Açıklama bulunamadı',
        siteKeywords: document.querySelector('meta[name="keywords"]')?.content || 'Anahtar kelimeler bulunamadı',
        adminPassword: 'admin123',
        lastBackup: localStorage.getItem('lastBackup') || 'Henüz yedek alınmamış',
        totalMessages: JSON.parse(localStorage.getItem('contactMessages') || '[]').length,
        totalVisitors: localStorage.getItem('totalVisitors') || '1,234',
        siteVersion: '1.0.0',
        lastUpdate: new Date().toLocaleString('tr-TR')
    };
    
    const settingsText = `
⚙️ SİTE AYARLARI
================
📄 Site Başlığı: ${settings.siteTitle}
📝 Açıklama: ${settings.siteDescription}
🏷️ Anahtar Kelimeler: ${settings.siteKeywords}
🔐 Admin Şifresi: ${settings.adminPassword}
💾 Son Yedek: ${settings.lastBackup}
📧 Toplam Mesaj: ${settings.totalMessages}
👥 Toplam Ziyaretçi: ${settings.totalVisitors}
🔢 Site Versiyonu: ${settings.siteVersion}
📅 Son Güncelleme: ${settings.lastUpdate}
    `;
    
    showNotification('Site ayarları konsola yazdırıldı!', 'success');
    console.log(settingsText);
    
    // Copy to clipboard
    navigator.clipboard.writeText(settingsText).then(() => {
        showNotification('Site ayarları panoya kopyalandı!', 'success');
    });
}

// Export functions for global access
window.openAdminPanel = openAdminPanel;
window.closeAdminPanel = closeAdminPanel;
window.loginAdmin = loginAdmin;
window.updateStats = updateStats;
window.exportData = exportData;
window.showAnalytics = showAnalytics;
window.showMessages = showMessages;
window.showSettings = showSettings;
