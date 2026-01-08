export function setupUI({ timeManager, clock }) {
    const aboutBtn = document.getElementById('about-btn');
    const overlay = document.getElementById('about-overlay');
    const closeBtn = document.getElementById('about-close');

    if (!aboutBtn || !overlay || !closeBtn) return;

    function openAbout() {
        overlay.classList.add('active');
        document.body.classList.add('no-scroll');
        timeManager?.pause(clock);
    }

    function closeAbout() {
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
        timeManager?.resume(clock);
    }

    aboutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAbout();
    });

    closeBtn.addEventListener('click', closeAbout);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeAbout();
        }
    });
}
