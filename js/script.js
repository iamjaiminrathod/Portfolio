
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    if (e.keyCode == 123) return false; // F12
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0))) return false;
    if (e.ctrlKey && (e.keyCode == 'U'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0) || e.keyCode == 'X'.charCodeAt(0))) return false;
};

const hamburger = document.querySelector('.hamburger');
const navItems = document.querySelector('.nav-items');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navItems.classList.toggle('active');
});

document.querySelectorAll('.nav-items a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navItems.classList.remove('active');
    });
});

const sliderWrapper = document.getElementById('sliderWrapper');
const cards = document.querySelectorAll('.project-card');
const dotsContainer = document.getElementById('dotsContainer');

let scrollInterval;
const delay = 3000; 

if (dotsContainer && cards.length > 0) {
    cards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
}
const dots = document.querySelectorAll('.dot');

function updateDots() {
    if (cards.length > 0) {
        let index = Math.round(sliderWrapper.scrollLeft / cards[0].offsetWidth);
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
    }
}

if (sliderWrapper) {
    sliderWrapper.addEventListener('scroll', updateDots);
}

function startAutoScroll() {
    if (!sliderWrapper || cards.length === 0) return;
    scrollInterval = setInterval(() => {
        const cardWidth = cards[0].offsetWidth;
        const gap = 30; 
        const scrollAmount = cardWidth + gap;
        const maxScroll = sliderWrapper.scrollWidth - sliderWrapper.clientWidth;
        
        if (sliderWrapper.scrollLeft >= maxScroll - 10) {
            sliderWrapper.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            sliderWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }, delay);
}

startAutoScroll();

if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', () => clearInterval(scrollInterval));
    sliderWrapper.addEventListener('mouseleave', startAutoScroll);
    sliderWrapper.addEventListener('touchstart', () => clearInterval(scrollInterval));
    sliderWrapper.addEventListener('touchend', startAutoScroll);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20; 

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbzbtlrajknVzyDKf1uaGTnhUnHgeDGtKx0xHy5LiUy9xIlVMtdbXszwQiN8jTpGx-2onQ/exec';

const setupSheetForm = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = "Sending...";
        btn.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                if (formId === 'newsletterForm') {
                    btn.innerText = "Subscribed Successfully!!";
                } else {
                    btn.innerText = "Message Sent Successfully!!";
                }

                btn.style.backgroundColor = "#28a745"; 
                btn.style.color = "#fff";
                form.reset(); 

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = ""; 
                    btn.style.color = "";
                    btn.disabled = false;
                }, 3000);
            })
            .catch(error => {
                btn.innerText = "Error! Try Again";
                btn.style.backgroundColor = "#dc3545"; 
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = "";
                    btn.disabled = false;
                }, 3000);
            });
    });
};
setupSheetForm('contactForm');
setupSheetForm('newsletterForm');