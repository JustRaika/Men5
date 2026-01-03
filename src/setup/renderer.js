// Renderer Setup

import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/Addons.js';

export function setupRenderer(canvas) {
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 4));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    return renderer;
}

export function setupLabelRenderer(canvas) {
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(canvas.innerWidth, canvas.innerHeight);
    labelRenderer.domElement.style.position = "fixed";
    labelRenderer.domElement.style.top = "0px";
    labelRenderer.domElement.style.pointerEvents = "none";
    labelRenderer.domElement.setAttribute("id", "sphereLabels");
    document.body.appendChild(labelRenderer.domElement);
    return labelRenderer;
}