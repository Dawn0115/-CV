(function () {
    'use strict';

    const nav = document.querySelector('.nav');
    const onScroll = () => {
        if (window.scrollY > 20) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const targets = document.querySelectorAll('.section, .entry, .hero-inner > *');
    targets.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        targets.forEach(el => io.observe(el));
    } else {
        targets.forEach(el => el.classList.add('in'));
    }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id.length > 1) {
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
})();
