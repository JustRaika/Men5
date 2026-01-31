// Start Button + Hint

export function setupIntroUI(onStart) {
    const overlay = document.getElementById('start-overlay');
    const btn = document.getElementById('start-btn');

    btn.addEventListener('click', () => {
        overlay.style.display = 'none';
        onStart();
    });
}

export function showInteractionHint(duration = 6000) {
    const hint = document.getElementById('interaction-hint');
    if (!hint) return;

    hint.classList.add('visible');
    setTimeout(() => hint.classList.remove('visible'), duration);
}
