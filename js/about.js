
document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat-box');

    stats.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(20px)';
    });

    window.addEventListener('scroll', () => {
        stats.forEach(box => {
            const rect = box.getBoundingClientRect().top;
            if (rect < window.innerHeight - 50) {
                box.style.opacity = '1';
                box.style.transform = 'translateY(0)';
                box.style.transition = '0.6s ease';
            }
        });
    });
});
