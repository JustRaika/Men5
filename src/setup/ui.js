export function setupUI({ timeManager, clock }) {
    const aboutBtn = document.getElementById('about-btn');
    const overlay = document.getElementById('about-overlay');
    const closeBtn = document.getElementById('about-close');

    if (!aboutBtn || !overlay || !closeBtn) return;

    aboutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.classList.add('active');
        timeManager?.pause(clock);
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        timeManager?.resume(clock);
    });

    // ESC zum Schließen (nice UX)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
            timeManager?.resume(clock);
        }
    });
}
