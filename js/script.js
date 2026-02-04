// ===== INITIALISER AOS =====
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        offset: 100
    });
});

// ===== NAVBAR MOBILE TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });
}

// Fermer le menu quand on clique sur un lien
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navMenu.classList.remove('active');
    });
});

// Fermer le menu en cliquant ailleurs
document.addEventListener('click', function (event) {
    if (!event.target.closest('.navbar')) {
        navMenu.classList.remove('active');
    }
});

// ===== STICKY NAVBAR EFFECT =====
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== BOOKING FORM VALIDATION & SUBMISSION =====
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Récupérer les valeurs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        const occasion = document.getElementById('occasion').value;
        const preferences = document.getElementById('preferences').value;

        // Validation
        if (!name || !email || !phone || !date || !time || !guests) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Veuillez entrer une adresse email valide');
            return;
        }

        // Simuler l'envoi
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Réservation en cours...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert(`Merci ${name}! Votre réservation pour ${guests} personne(s) le ${date} à ${time} a été confirmée. Une confirmation a été envoyée à ${email}.`);
            bookingForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ===== CONTACT FORM VALIDATION & SUBMISSION =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Récupérer les valeurs
        const cname = document.getElementById('cname').value;
        const cemail = document.getElementById('cemail').value;
        const cphone = document.getElementById('cphone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validation
        if (!cname || !cemail || !subject || !message) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cemail)) {
            alert('Veuillez entrer une adresse email valide');
            return;
        }

        // Simuler l'envoi
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert(`Merci ${cname}! Nous avons reçu votre message et nous vous répondrons dans les 24 heures.`);
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ===== AJOUTER CLASSE ACTIVE À LA NAVIGATION =====
function setActiveNavLink() {
    const currentLocation = location.pathname + location.search;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (currentLocation.includes(href) || 
            (href === 'index.html' && currentLocation.endsWith('/')) ||
            (href === 'index.html' && currentLocation === '')) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

// ===== SCROLL ANIMATIONS REFRESH =====
window.addEventListener('scroll', function () {
    AOS.refresh();
});

// ===== INTERACTIVE ELEMENTS =====
// Ajouter des effets de survol supplémentaires
const cards = document.querySelectorAll('.specialty-card, .review-card, .about-card, .team-card, .condition-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ===== AFFICHER LA DATE ACTUELLE DANS LES INPUTS DATE =====
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ===== ACTIVER LA PAGINATION AOS AU DÉFILEMENT =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observer tous les éléments avec AOS
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// ===== CONSOLE LOG POUR DEBUG =====
console.log('Restaurant Website Loaded Successfully! 🍽️');
console.log('Pages disponibles: index.html, menu.html, reservations.html, about.html, contact.html');
