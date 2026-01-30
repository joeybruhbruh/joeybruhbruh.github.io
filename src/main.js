import { animate, inView, stagger } from 'motion';

// Hero Animations
animate(
    ".greeting, .name, .title, .social-links, .hero-actions",
    { opacity: [0, 1], x: [-50, 0] },
    { delay: stagger(0.2), duration: 0.8 },
);
animate('.hero-image', { opacity: [0, 1], scale: [0.8, 1] }, { duration: 1, delay: 0.6 });

// Staggered Stats
inView('.stats', (info) => {
    const target = info.target || info;
    if (!target.querySelectorAll) return;
    animate(
        target.querySelectorAll('.stat-item'),
        { opacity: [0, 1], y: [20, 0] },
        { delay: stagger(0.2), duration: 0.5 },
    );
});

// Services Animation
inView('.services-grid', (info) => {
    const target = info.target || info;
    if (!target.querySelectorAll) return;
    animate(
        target.querySelectorAll('.service-card'),
        { opacity: [0, 1], y: [50, 0] },
        { delay: stagger(0.1), duration: 0.6 },
    );
});

// About Me Animation
inView('.about-content', (info) => {
    // Uses global selectors, but scoping to be safe if desired. 
    // Currently relying on global class names as per original code.
    animate('.about-image', { opacity: [0, 1], x: [-50, 0] }, { duration: 0.8 });
    animate('.about-text', { opacity: [0, 1], x: [50, 0] }, { duration: 0.8, delay: 0.2 });
});

// Skills Animation (Circular Progress Mockup)
inView('.skills-row', (info) => {
    const target = info.target || info;
    if (!target.querySelectorAll) return;
    animate(
        target.querySelectorAll('.skill-item'),
        { opacity: [0, 1], scale: [0.5, 1] },
        { delay: stagger(0.1), duration: 0.5 },
    );
});

// Projects Animation
inView('.projects-grid', (info) => {
    const target = info.target || info;
    if (!target.querySelectorAll) return;
    animate(
        target.querySelectorAll('.project-card'),
        { opacity: [0, 1], y: [50, 0] },
        { delay: stagger(0.1), duration: 0.5 },
    );
});

// Tab Interaction
const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        // Simple filter animation effect
        animate('.projects-grid', { opacity: [0, 1] }, { duration: 0.4 });
    });
});

// Button Hover Effects (additional JS based scale)
const buttons = document.querySelectorAll('.btn');
buttons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
        animate(btn, { scale: 1.05 }, { duration: 0.2 });
    });
    btn.addEventListener('mouseleave', () => {
        animate(btn, { scale: 1 }, { duration: 0.2 });
    });
});
