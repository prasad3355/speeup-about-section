// ==================== NAVIGATION FUNCTIONALITY ====================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==================== ACTIVE SECTION HIGHLIGHT ====================
function setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ==================== SMOOTH SCROLL REVEAL ANIMATION ====================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 150 && elementBottom > 0) {
            element.classList.add('active');
        }
    });
}

// ==================== PARALLAX SCROLL EFFECT ====================
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const heroGradient = document.querySelector('.hero-gradient');
    
    if (heroGradient) {
        heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}

// ==================== FLOATING CARDS ANIMATION ====================
function animateFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        const delay = index * 0.5;
        const duration = 3 + (index * 0.3);
        
        card.style.animationDelay = `${delay}s`;
        card.style.animationDuration = `${duration}s`;
    });
}

// ==================== STATS COUNTER ANIMATION ====================
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function checkAndAnimate() {
        if (animated) return;
        
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const rect = heroSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animated = true;
                stats.forEach(stat => {
                    const target = stat.innerText;
                    const isNumber = !isNaN(parseInt(target));
                    
                    if (isNumber) {
                        const finalValue = parseInt(target);
                        let currentValue = 0;
                        const increment = finalValue / 50;
                        const duration = 2000;
                        const stepTime = duration / 50;
                        
                        const counter = setInterval(() => {
                            currentValue += increment;
                            if (currentValue >= finalValue) {
                                stat.innerText = finalValue;
                                clearInterval(counter);
                            } else {
                                stat.innerText = Math.floor(currentValue);
                            }
                        }, stepTime);
                    }
                });
            }
        }
    }
    
    window.addEventListener('scroll', checkAndAnimate);
    checkAndAnimate();
}

// ==================== IMPACT STATS COUNTER ====================
function animateImpactStats() {
    const impactStats = document.querySelectorAll('.impact-stat');
    let animated = false;
    
    function checkScroll() {
        if (animated) return;
        
        impactStats.forEach(stat => {
            const statTop = stat.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (statTop < windowHeight - 200) {
                animated = true;
                animateImpactNumber(stat);
            }
        });
    }
    
    function animateImpactNumber(element) {
        const text = element.innerText;
        const numberMatch = text.match(/\d+/);
        
        if (numberMatch) {
            const finalValue = parseInt(numberMatch[0]);
            const suffix = text.replace(/\d+/, '');
            let currentValue = 0;
            const increment = finalValue / 40;
            const duration = 1500;
            const stepTime = duration / 40;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    element.innerText = finalValue + suffix;
                    clearInterval(counter);
                } else {
                    element.innerText = Math.floor(currentValue) + suffix;
                }
            }, stepTime);
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();
}

// ==================== SMOOTH HOVER EFFECTS ====================
function initHoverEffects() {
    const visionCards = document.querySelectorAll('.vision-card');
    
    visionCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    const processCards = document.querySelectorAll('.process-card');
    
    processCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
    
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
}

// ==================== TECH BOXES ANIMATION ====================
function animateTechBoxes() {
    const techBoxes = document.querySelectorAll('.tech-box');
    
    techBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.style.animation = `fadeInScale 0.6s ease-out forwards`;
        }, index * 100);
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ==================== PULSE ANIMATION CONTROL ====================
function initPulseAnimation() {
    const pulseCore = document.querySelector('.pulse-core');
    
    if (pulseCore) {
        window.addEventListener('scroll', () => {
            const pulseSection = document.querySelector('.mission-section');
            if (pulseSection) {
                const rect = pulseSection.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight && rect.bottom > 0) {
                    pulseCore.style.boxShadow = '0 0 60px rgba(0, 200, 83, 0.4)';
                } else {
                    pulseCore.style.boxShadow = 'none';
                }
            }
        });
    }
}

// ==================== TIMELINE PROGRESS INDICATOR ====================
function animateTimeline() {
    const timeline = document.querySelector('.timeline');
    
    if (timeline) {
        window.addEventListener('scroll', () => {
            const timelineRect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (timelineRect.top < windowHeight && timelineRect.bottom > 0) {
                const scrollProgress = (windowHeight - timelineRect.top) / (windowHeight + timelineRect.height);
                const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);
                
                timeline.style.setProperty('--timeline-progress', clampedProgress);
            }
        });
    }
}

// ==================== SCROLL TO TOP FUNCTIONALITY ====================
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient-primary);
        color: var(--dark);
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(0, 200, 83, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== PERFORMANCE OPTIMIZATION ====================
let ticking = false;

function requestTick(callback) {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            callback();
            ticking = false;
        });
        ticking = true;
    }
}

function optimizedScroll() {
    requestTick(() => {
        revealOnScroll();
        parallaxEffect();
        setActiveLink();
    });
}

// ==================== INITIALIZE ALL FUNCTIONS ====================
function init() {
    animateFloatingCards();
    animateStats();
    animateImpactStats();
    initHoverEffects();
    initPulseAnimation();
    animateTimeline();
    initScrollToTop();
    
    window.addEventListener('scroll', optimizedScroll);
    
    revealOnScroll();
    
    const techSection = document.querySelector('.tech-section');
    if (techSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTechBoxes();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(techSection);
    }
}

// ==================== PAGE LOAD ====================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==================== SMOOTH ANCHOR SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==================== PREVENT ANIMATION JANK ON RESIZE ====================
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

const resizeStyle = document.createElement('style');
resizeStyle.textContent = `
    .resize-animation-stopper * {
        animation: none !important;
        transition: none !important;
    }
`;
document.head.appendChild(resizeStyle);
