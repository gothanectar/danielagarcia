// Main JavaScript file for Daniela Garcia Advocacia website

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Daniela Garcia Advocacia website loaded');
    
    // Test mobile menu elements
    const testBtn = document.querySelector('.mobile-menu-btn');
    const testMenu = document.querySelector('.mobile-menu');
    console.log('Initial test - Mobile elements:', {
        btn: !!testBtn,
        menu: !!testMenu,
        btnVisible: testBtn ? window.getComputedStyle(testBtn).display : 'not found',
        menuVisible: testMenu ? window.getComputedStyle(testMenu).display : 'not found'
    });
    
    // Initialize all components
    initializeNavigation();
    initializeWhatsApp();
    initializeContactForm();
    initializeScrollAnimations();
    // initializeServicesCarousel(); // Removido - usando carousel-simple.js
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        console.log('Mobile menu elements found, adding event listener');
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = mobileMenu.classList.contains('active');
            console.log('Menu button clicked, current state:', isActive);
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    } else {
        console.log('Mobile menu elements not found:', {
            btn: !!mobileMenuBtn,
            menu: !!mobileMenu
        });
    }
    
    // Close mobile menu when clicking on links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    updateActiveNavLink(href);
                }
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', throttle(updateActiveNavOnScroll, 100));
    
    console.log('Navigation initialized');
}

function openMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Mobile menu opened');
    }
}

function closeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        console.log('Mobile menu closed');
    }
}

function updateActiveNavLink(activeHref) {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeHref) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 50;
    
    let activeSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            activeSection = '#' + section.id;
        }
    });
    
    if (activeSection) {
        updateActiveNavLink(activeSection);
    }
}

// WhatsApp integration
function initializeWhatsApp() {
    const whatsappConfig = {
        phoneNumber: "5543998653956",
        defaultMessage: "Olá! Gostaria de agendar uma consulta jurídica com a Dra. Daniela Garcia.",
        businessHours: {
            start: "08:00",
            end: "18:00",
            days: ["monday", "tuesday", "wednesday", "thursday", "friday"]
        }
    };
    
    // Update all WhatsApp links with proper formatting
    updateWhatsAppLinks(whatsappConfig);
    
    // Add click tracking for WhatsApp buttons
    trackWhatsAppClicks();
    
    // Show business hours indicator
    updateBusinessHoursIndicator(whatsappConfig.businessHours);
    
    console.log('WhatsApp integration initialized');
}

function updateWhatsAppLinks(config) {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        const currentHref = link.getAttribute('href');
        const urlParams = new URLSearchParams(currentHref.split('?')[1] || '');
        let message = urlParams.get('text') || config.defaultMessage;
        
        // Detect device type and update link accordingly
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Mobile: Use WhatsApp app
            link.setAttribute('href', `whatsapp://send?phone=${config.phoneNumber}&text=${encodeURIComponent(message)}`);
        } else {
            // Desktop: Use WhatsApp Web
            link.setAttribute('href', `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`);
        }
        
        // Add click handler for analytics
        link.addEventListener('click', function(e) {
            // Track WhatsApp click event
            console.log('WhatsApp link clicked:', {
                message: message,
                device: isMobile ? 'mobile' : 'desktop',
                timestamp: new Date().toISOString()
            });
        });
    });
}

function trackWhatsAppClicks() {
    const whatsappButtons = document.querySelectorAll('.whatsapp-cta, .whatsapp-btn');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonType = this.classList.contains('whatsapp-btn') ? 'float-button' : 'cta-button';
            const section = this.closest('section')?.id || 'unknown';
            
            console.log('WhatsApp button clicked:', {
                type: buttonType,
                section: section,
                timestamp: new Date().toISOString()
            });
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

function updateBusinessHoursIndicator(businessHours) {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
    
    const isBusinessDay = businessHours.days.includes(currentDay);
    const isBusinessHours = currentTime >= businessHours.start && currentTime <= businessHours.end;
    const isOnline = isBusinessDay && isBusinessHours;
    
    // Add status indicator to float button
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        const existingIndicator = whatsappFloat.querySelector('.status-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        const statusIndicator = document.createElement('div');
        statusIndicator.className = `status-indicator ${isOnline ? 'online' : 'offline'}`;
        statusIndicator.innerHTML = `
            <div class="status-dot"></div>
            <span class="status-text">${isOnline ? 'Online' : 'Offline'}</span>
        `;
        
        whatsappFloat.appendChild(statusIndicator);
    }
    
    // Update tooltip with business hours info
    const tooltip = document.querySelector('.whatsapp-tooltip');
    if (tooltip && !isOnline) {
        const originalText = tooltip.textContent;
        tooltip.innerHTML = `
            ${originalText}<br>
            <small>Horário: ${businessHours.start} às ${businessHours.end}</small>
        `;
    }
}

// Utility function to format phone number
function formatPhoneNumber(phone) {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Add country code if not present
    if (!cleaned.startsWith('55')) {
        return '55' + cleaned;
    }
    
    return cleaned;
}

// Utility function to create WhatsApp link
function createWhatsAppLink(phone, message, isMobile = false) {
    const formattedPhone = formatPhoneNumber(phone);
    const encodedMessage = encodeURIComponent(message);
    
    if (isMobile) {
        return `whatsapp://send?phone=${formattedPhone}&text=${encodedMessage}`;
    } else {
        return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    }
}

// Contact form functionality
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    if (!form) return;
    
    // Form validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 100,
            pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
            message: 'Nome deve conter apenas letras e ter entre 2 e 100 caracteres'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Digite um e-mail válido'
        },
        phone: {
            required: false,
            pattern: /^[\(\)\d\s\-\+]+$/,
            message: 'Digite um telefone válido'
        },
        subject: {
            required: true,
            message: 'Selecione um assunto'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: 'Mensagem deve ter entre 10 e 1000 caracteres'
        },
        privacy: {
            required: true,
            message: 'Você deve concordar com a política de privacidade'
        }
    };
    
    // Add real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldName, field, validationRules[fieldName]));
            field.addEventListener('input', () => clearFieldError(fieldName));
        }
    });
    
    // Phone number formatting
    const phoneField = form.querySelector('[name="phone"]');
    if (phoneField) {
        phoneField.addEventListener('input', formatPhoneNumber);
    }
    
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
    
    console.log('Contact form initialized');
}

function validateField(fieldName, field, rules) {
    const value = field.type === 'checkbox' ? field.checked : field.value.trim();
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    // Required validation
    if (rules.required && (!value || (field.type === 'checkbox' && !field.checked))) {
        showFieldError(fieldName, rules.message || 'Este campo é obrigatório');
        return false;
    }
    
    // Skip other validations if field is empty and not required
    if (!rules.required && !value) {
        clearFieldError(fieldName);
        return true;
    }
    
    // Length validation
    if (rules.minLength && value.length < rules.minLength) {
        showFieldError(fieldName, rules.message);
        return false;
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
        showFieldError(fieldName, rules.message);
        return false;
    }
    
    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
        showFieldError(fieldName, rules.message);
        return false;
    }
    
    // Field is valid
    clearFieldError(fieldName);
    field.classList.add('success');
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (field) {
        field.classList.add('error');
        field.classList.remove('success');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearFieldError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (field) {
        field.classList.remove('error');
    }
    
    if (errorElement) {
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }
}

function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 11) {
        // Format: (XX) XXXXX-XXXX
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length >= 7) {
        // Format: (XX) XXXX-XXXX
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length >= 3) {
        // Format: (XX) XXX
        value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else if (value.length >= 1) {
        // Format: (X
        value = value.replace(/^(\d{0,2})/, '($1');
    }
    
    e.target.value = value;
}

function validateForm(form) {
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 100,
            pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
            message: 'Nome deve conter apenas letras e ter entre 2 e 100 caracteres'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Digite um e-mail válido'
        },
        phone: {
            required: false,
            pattern: /^[\(\)\d\s\-\+]+$/,
            message: 'Digite um telefone válido'
        },
        subject: {
            required: true,
            message: 'Selecione um assunto'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: 'Mensagem deve ter entre 10 e 1000 caracteres'
        },
        privacy: {
            required: true,
            message: 'Você deve concordar com a política de privacidade'
        }
    };
    
    let isValid = true;
    
    Object.keys(validationRules).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            const fieldValid = validateField(fieldName, field, validationRules[fieldName]);
            if (!fieldValid) {
                isValid = false;
            }
        }
    });
    
    return isValid;
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    
    // Hide previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // Validate form
    if (!validateForm(form)) {
        // Scroll to first error
        const firstError = form.querySelector('.form-input.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    
    try {
        // Collect form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        // Simulate form submission (replace with actual endpoint)
        const success = await submitContactForm(data);
        
        if (success) {
            // Show success message
            successMessage.style.display = 'flex';
            form.reset();
            
            // Clear all field states
            form.querySelectorAll('.form-input').forEach(input => {
                input.classList.remove('success', 'error');
            });
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Track successful submission
            console.log('Form submitted successfully:', data);
            
        } else {
            throw new Error('Submission failed');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        errorMessage.style.display = 'flex';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

async function submitContactForm(data) {
    // Simulate API call with delay
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate 90% success rate
            const success = Math.random() > 0.1;
            resolve(success);
        }, 2000);
    });
    
    // In a real implementation, you would make an actual API call:
    /*
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        return response.ok;
    } catch (error) {
        console.error('API Error:', error);
        return false;
    }
    */
}

// Scroll animations (to be implemented)
function initializeScrollAnimations() {
    // Smooth scroll and fade-in animations will be added in task 11
    console.log('Scroll animations initialized');
}

// Utility functions
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
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}//
 Performance Optimizations

// Lazy loading implementation
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-image');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('.lazy-image').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        'css/variables.css',
        'css/reset.css',
        'css/main.css'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Optimize images
function optimizeImages() {
    // Add WebP support detection
    function supportsWebP() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    supportsWebP().then(supported => {
        if (supported) {
            document.documentElement.classList.add('webp-support');
        }
    });
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Core Web Vitals monitoring
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                console.log('LCP:', entry.startTime);
            }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                console.log('FID:', entry.processingStart - entry.startTime);
            }
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    console.log('CLS:', entry.value);
                }
            }
        }).observe({ entryTypes: ['layout-shift'] });
    }
}

// Resource hints
function addResourceHints() {
    // DNS prefetch for external resources
    const dnsPrefetchDomains = [
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'wa.me'
    ];

    dnsPrefetchDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = `//${domain}`;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
    optimizeImages();
    initializePerformanceMonitoring();
    addResourceHints();
});

// Service Worker registration (for caching)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// CARROSSEL SIMPLES QUE FUNCIONA
function initializeServicesCarousel() {
    console.log('Iniciando carrossel simples...');
    
    const track = document.querySelector('.services-track');
    const cards = document.querySelectorAll('.service-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!track || !cards.length || !prevBtn || !nextBtn) {
        console.log('Elementos não encontrados:', {track: !!track, cards: cards.length, prevBtn: !!prevBtn, nextBtn: !!nextBtn});
        return;
    }
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    console.log(`Total de cards: ${totalCards}`);
    
    function updateCarousel() {
        const translateX = -currentIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
        console.log(`Movendo para card ${currentIndex + 1}/${totalCards}`);
        
        // Atualizar botões
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === totalCards - 1 ? '0.5' : '1';
    }
    
    function goNext() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    function goPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Event listeners simples
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Botão NEXT clicado');
        goNext();
        return false;
    });
    
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Botão PREV clicado');
        goPrev();
        return false;
    });
    
    // Touch support
    let startX = 0;
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goNext();
            } else {
                goPrev();
            }
        }
    });
    
    // Inicializar
    updateCarousel();
    console.log('Carrossel inicializado com sucesso!');
    
    // Para debug
    window.debugCarousel = {
        next: goNext,
        prev: goPrev,
        current: () => currentIndex,
        total: totalCards
    };
}

