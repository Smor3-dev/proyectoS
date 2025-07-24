// Inicializar AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
    delay: 0
});

// Navbar scroll effect para Bootstrap
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.custom-navbar');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling para nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Cerrar navbar de Bootstrap si esta abierto
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
            
            // Scroll suave con offset para el header fijo
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Refresh AOS cuando se redimensiona la ventana
window.addEventListener('resize', function() {
    AOS.refresh();
});

// Preloader opcional
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Parallax effect sutil para el hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Cerrar menu celu al hacer clic en overlay
document.addEventListener('click', function(e) {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    }
});

// Animacion para stats del producto
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const text = stat.textContent;
                
                // Solo animar números, no las estrellas
                if (!text.includes('★') && !text.includes('%')) {
                    let count = 0;
                    const target = parseInt(text);
                    const increment = target / 30;
                    
                    const updateCount = () => {
                        if (count < target) {
                            count += increment;
                            stat.textContent = Math.floor(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.textContent = target;
                        }
                    };
                    
                    updateCount();
                }
                
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// Inicializar animaciones
document.addEventListener('DOMContentLoaded', function() {
    animateStats();
    
    // Prevenir scroll horizontal en celu
    document.body.style.overflowX = 'hidden';
});

// Optimizacion de performance para scroll
let ticking = false;

function updateNavbar() {
    const navbar = document.querySelector('.custom-navbar');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    ticking = false;
}

function requestNavbarUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}

// listener optimizado
window.removeEventListener('scroll', arguments.callee);
window.addEventListener('scroll', requestNavbarUpdate);