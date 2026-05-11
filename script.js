document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTop = document.getElementById('scroll-top');
    const scrollProgress = document.getElementById('scroll-progress');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // --- Theme Toggle Logic ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        let theme = 'dark';
        if (body.classList.contains('light-mode')) {
            theme = 'light';
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
        localStorage.setItem('theme', theme);
    });

    // --- Scroll Events ---
    window.addEventListener('scroll', () => {
        // Navbar glassmorphism effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrolled + "%";
        }
        
        // Scroll to top button visibility
        if (window.scrollY > 500) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
        
        highlightActiveLink();
    });

    // Scroll to Top functionality
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Navigation ---
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('open');
        const icon = navToggle.querySelector('i');
        if (navLinksContainer.classList.contains('open')) {
            icon.classList.replace('fa-bars-staggered', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars-staggered');
        }
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('open');
            const icon = navToggle.querySelector('i');
            icon.classList.replace('fa-xmark', 'fa-bars-staggered');
        });
    });

    // Highlight active link on scroll
    function highlightActiveLink() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- Form Handling ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you! Your message has been sent successfully.');
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            if (input.value) {
                alert(`Subscribed ${input.value} to our newsletter!`);
                input.value = '';
            }
        });
    }
});
