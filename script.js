// Smooth scrolling for the entire page
document.documentElement.style.scrollBehavior = 'smooth';

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 25px rgba(0,0,0,0.12)';
    } else {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe project showcases and stat items
document.querySelectorAll('.project-showcase, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Observe work items for animation
const workItemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.work-item').forEach(el => {
    workItemObserver.observe(el);
});

// Observe Why Choose cards - simpler animation
const whyCardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.why-card').forEach(el => {
    if (!el.style.opacity) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    }
    whyCardObserver.observe(el);
});

// Observe contact info items
const infoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    infoObserver.observe(el);
});

// Project Gallery Modal - Show all images in grid
function openProjectGallery(projectId) {
    const projectElement = document.querySelector(`[data-project="${projectId}"]`);
    const galleryElement = projectElement.querySelector('.project-gallery');
    const images = Array.from(galleryElement.querySelectorAll('img'));
    
    const projectTitle = projectElement.querySelector('.project-header h3').textContent;
    
    createGalleryModal(projectTitle, images);
    document.body.style.overflow = 'hidden';
}

function createGalleryModal(title, images) {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    
    const header = document.createElement('div');
    header.className = 'gallery-modal-header';
    header.innerHTML = `
        <div class="gallery-modal-title">${title} - ${images.length} Images</div>
        <button class="gallery-modal-close" onclick="closeGalleryModal()">&times;</button>
    `;
    
    const content = document.createElement('div');
    content.className = 'gallery-modal-content';
    
    images.forEach((img, index) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'gallery-modal-image';
        imageWrapper.style.animationDelay = `${index * 0.05}s`;
        
        const image = document.createElement('img');
        image.src = img.src;
        image.alt = `Image ${index + 1}`;
        image.loading = 'lazy';
        
        imageWrapper.appendChild(image);
        imageWrapper.addEventListener('click', () => openFullscreenImage(img.src));
        
        content.appendChild(imageWrapper);
    });
    
    modal.appendChild(header);
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Close on Escape key
    document.addEventListener('keydown', handleGalleryKeyboard);
}

function closeGalleryModal() {
    const modal = document.querySelector('.gallery-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
    document.removeEventListener('keydown', handleGalleryKeyboard);
}

function openFullscreenImage(src) {
    const fullscreen = document.createElement('div');
    fullscreen.className = 'fullscreen-image-view';
    
    const img = document.createElement('img');
    img.src = src;
    
    fullscreen.appendChild(img);
    document.body.appendChild(fullscreen);
    
    fullscreen.addEventListener('click', () => {
        fullscreen.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            fullscreen.remove();
        }, 300);
    });
}

function handleGalleryKeyboard(e) {
    if (e.key === 'Escape') {
        closeGalleryModal();
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes zoomIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Create WhatsApp message
        const whatsappMessage = `Hello! I'm ${name}. ${message}`;
        const whatsappURL = `https://wa.me/918898025189?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Show success message
        alert('Thank you! Redirecting you to WhatsApp...');
        contactForm.reset();
    });
}

// Lazy Loading Images with Fade-in Animation
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease';
                
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
                
                // If image is already cached
                if (img.complete) {
                    img.style.opacity = '1';
                }
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Parallax Effect for Hero Section (subtle)
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const hero = document.querySelector('.hero-background');
            if (hero) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;
                hero.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Number Counter Animation for Stats - triggers on scroll
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '%');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '%');
        }
    }, 25);
};

// Observe stat numbers - auto-animate on scroll
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                statNumber.textContent = '0' + (text.includes('+') ? '+' : '%');
                animateCounter(statNumber, number);
            }
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statObserver.observe(stat);
});

// Smooth reveal for project descriptions
const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.project-description, .project-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    textObserver.observe(el);
});

// Add smooth momentum scrolling for mobile
if ('scrollBehavior' in document.documentElement.style) {
    document.documentElement.style.scrollBehavior = 'smooth';
}
