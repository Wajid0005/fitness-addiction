// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Highlight Active Nav Link based on current URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 2. Center active nav link horizontally on mobile
    const activeLink = document.querySelector('.nav-links a.active');
    const navContainer = document.querySelector('.nav-container');
    if (activeLink && navContainer) {
        // Wait a small moment to ensure rendering is complete before scrolling
        setTimeout(() => {
            const linkRect = activeLink.getBoundingClientRect();
            const containerRect = navContainer.getBoundingClientRect();

            // Calculate the scroll position to center the active item
            const scrollLeft = activeLink.offsetLeft - (containerRect.width / 2) + (linkRect.width / 2);

            navContainer.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }, 100);
    }

    // 3. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // 4. WhatsApp Form Handler
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value || 'Not provided';
            const goal = document.getElementById('goal').value;
            const message = document.getElementById('message').value;

            const text = `Hi Fitness Addiction,\n\nI want to join the gym. Here are my details:\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Goal:* ${goal}\n*Message:* ${message}`;

            const whatsappUrl = `https://wa.me/919330345262?text=${encodeURIComponent(text)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // 5. Hero Image Slider (for index.html)
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;

        // Show first slide
        slides[0].classList.add('active');

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Change image every 5 seconds
    }
});

// 6. Testimonial Slider (for reviews.html)
let testimonialIndex = 0;

function showTestimonial(n) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');

    if (slides.length === 0) return;

    if (n >= slides.length) { testimonialIndex = 0; }
    if (n < 0) { testimonialIndex = slides.length - 1; }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[testimonialIndex].classList.add('active');
    dots[testimonialIndex].classList.add('active');
}

function moveTestimonial(n) {
    testimonialIndex += n;
    showTestimonial(testimonialIndex);
}

function currentTestimonial(n) {
    testimonialIndex = n;
    showTestimonial(testimonialIndex);
}

// Initialize Testimonial Slider (if exists)
document.addEventListener('DOMContentLoaded', () => {
    showTestimonial(0);
});
