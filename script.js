document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // If the element has a count-up inside it, trigger that too
                const counters = entry.target.querySelectorAll('.count-up');
                counters.forEach(counter => startCountUp(counter));

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // 2. Number Count Up Animation
    function startCountUp(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 2000; // 2 seconds
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);

            const current = Math.floor(start + (target - start) * ease);
            el.textContent = '¥' + current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = '¥' + target.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }

    // 3. Glitch Text Randomizer (Optional extra chaos)
    const glitchTexts = document.querySelectorAll('.glitch-effect');
    setInterval(() => {
        glitchTexts.forEach(el => {
            if (Math.random() > 0.95) {
                el.style.textShadow = `2px 0 ${Math.random() > 0.5 ? '#ff2a6d' : '#05d9e8'}, -2px 0 ${Math.random() > 0.5 ? '#00fff9' : '#ff00c1'}`;
                setTimeout(() => el.style.textShadow = 'none', 100);
            }
        });
    }, 200);

    // 4. Sticky CTA Visibility Logic
    const stickyCTA = document.querySelector('.sticky-cta-wrapper');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            stickyCTA.classList.add('visible');
        } else {
            stickyCTA.classList.remove('visible');
        }
    });
});
