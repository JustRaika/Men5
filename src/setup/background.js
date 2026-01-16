import * as THREE from 'three';
import { createBackgroundStarsMaterial } from '../shaders/materials/background_stars/material.js';

export function addStarBackground(scene) {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = createBackgroundStarsMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = "Background";
    mesh.frustumCulled = false;
    mesh.renderOrder = -1;

    scene.add(mesh);
}
