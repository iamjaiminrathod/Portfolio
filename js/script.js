const hamburger = document.querySelector('.hamburger');
        const navItems = document.querySelector('.nav-items');

        // Mobile menu toggle logic
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

        // --- Auto Slider & Swipe Logic ---
        const sliderWrapper = document.getElementById('sliderWrapper');
        const cards = document.querySelectorAll('.project-card');
        const dotsContainer = document.getElementById('dotsContainer');
        
        let scrollInterval;
        const delay = 3000; // 3 seconds pause
        
        // Setup Dots based on total cards
        cards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });
        const dots = document.querySelectorAll('.dot');

        function updateDots() {
            // Find which card is currently visible
            let index = Math.round(sliderWrapper.scrollLeft / cards[0].offsetWidth);
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }

        sliderWrapper.addEventListener('scroll', updateDots);

        function startAutoScroll() {
            scrollInterval = setInterval(() => {
                const cardWidth = cards[0].offsetWidth;
                const gap = 30; // Matches CSS gap
                const scrollAmount = cardWidth + gap;

                // Check if we reached the end
                const maxScroll = sliderWrapper.scrollWidth - sliderWrapper.clientWidth;
                
                if (sliderWrapper.scrollLeft >= maxScroll - 10) {
                    // Loop back to start
                    sliderWrapper.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Move to next card
                    sliderWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, delay);
        }

        // Start slider initially
        startAutoScroll();

        // Pause auto-scroll when user hovers or touches
        sliderWrapper.addEventListener('mouseenter', () => clearInterval(scrollInterval));
        sliderWrapper.addEventListener('mouseleave', startAutoScroll);
        sliderWrapper.addEventListener('touchstart', () => clearInterval(scrollInterval));
        sliderWrapper.addEventListener('touchend', startAutoScroll);