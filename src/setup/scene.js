// Scene, Kamera und Licht einrichten

import * as THREE from 'three';

export function setupScene(canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        55,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        100
    );
    camera.position.set(0, 0, 4);
    return { scene, camera };
}

export function addLights(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
}
