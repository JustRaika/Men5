// Alle Materialien und Spheres werden hier erstellt

import * as THREE from 'three';

import { createNormalMaterial } from './shaders/materials/normal_1/material.js';
import { createFirstMaterial } from './shaders/materials/first_2/material.js';
import { createZebraMaterial } from './shaders/materials/zebra_3/material.js';
import { createPositionMaterial } from './shaders/materials/position_4/material.js';
import { createDeformMaterial } from './shaders/materials/deform_5/material.js';
import { createLightMaterial } from './shaders/materials/light_6/material.js';
import { createParticleMaterial } from './shaders/materials/particles_7/material.js';
import { createNoiseMaterial } from './shaders/materials/noise_8/material.js';
import { createNoise9Material } from './shaders/materials/noise_9/material.js';
import { createBackgroundStarsMaterial } from './shaders/materials/background_stars/material.js';

export const materials = [
    createNormalMaterial(),
    createFirstMaterial(),
    createZebraMaterial(),
    createPositionMaterial(),
    createDeformMaterial(),
    createLightMaterial(),
    createParticleMaterial(),
    createNoiseMaterial(),
    createNoise9Material(),
    createBackgroundStarsMaterial(),
];

export function createSpheres(materials, geometry = new THREE.SphereGeometry(1, 32, 32)) {
    return materials.map((mat, i) => {
        const sphere = new THREE.Mesh(geometry, mat);
        sphere.position.x = i * 2.5;
        return sphere;
    });
}

export function createParticlePoints(material, count) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 5;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const points = new THREE.Points(geometry, material);
    return points;
}
