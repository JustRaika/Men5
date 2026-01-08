import { isMobileDevice } from '../utils.js';

export function setupUI({ timeManager, clock }) {
    const mobileOverlay = document.getElementById('mobile-overlay');

    // commented out for Nika so she can work in peace in the browser view of vsc
    // if (isMobileDevice()) {
    //     mobileOverlay?.classList.add('active');
    //     document.body.classList.add('no-scroll');
    //     timeManager?.pause(clock);
    //     return;
    // }

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
