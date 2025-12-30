// Renderer Setup

import * as THREE from 'three';

export function setupRenderer(canvas) {
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 4));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    return renderer;
}
