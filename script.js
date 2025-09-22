// Navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Sticky header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ✅ Contact form submission with success message
const contactForm = document.getElementById('contactForm');

// Create success message div
const successMsg = document.createElement('div');
successMsg.style.display = 'none';
successMsg.style.color = 'green';
successMsg.style.marginTop = '10px';
successMsg.style.fontWeight = 'bold';
successMsg.textContent = '✅ Message submitted successfully!';
contactForm.appendChild(successMsg);

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    fetch("https://script.google.com/macros/s/AKfycbxTO1HYVsOomVff9vRzpwEoez18C_hscfNbfaustX6MFih9zzAyQW1LF8yAEt-d_m3-/exec", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(() => {
        // Show success message
        successMsg.style.display = 'block';
        
        // Hide after 3 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);

        contactForm.reset();
    })
    .catch(err => {
        console.error(err);
        alert("❌ Something went wrong. Please try again.");
    });
});
