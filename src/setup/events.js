// alle Event-Listener für das Canvas und das Fenster einrichten

export function setupEvents(canvas, callbacks) {
    const { onResize, onScroll, onMouseMove, onClickStart, onClickEnd } = callbacks;

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);
    canvas.addEventListener('mouseenter', () => callbacks.setMouseOnCanvas(true));
    canvas.addEventListener('mouseleave', () => callbacks.setMouseOnCanvas(false));
    window.addEventListener('mousedown', onClickStart);
    window.addEventListener('mouseup', onClickEnd);
    window.addEventListener('mousemove', onMouseMove);
}
