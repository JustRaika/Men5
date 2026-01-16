// Alle Materialien und Spheres werden hier erstellt

import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/Addons.js';

import { createNormalMaterial } from './shaders/materials/normal_1/material.js';
import { createFirstMaterial } from './shaders/materials/first_2/material.js';
import { createZebraMaterial } from './shaders/materials/zebra_3/material.js';
import { createPositionMaterial } from './shaders/materials/position_4/material.js';
import { createDeformMaterial } from './shaders/materials/deform_5/material.js';
import { createLightMaterial } from './shaders/materials/light_6/material.js';
import { createParticleMaterial } from './shaders/materials/particles_7/material.js';
import { createNoiseMaterial } from './shaders/materials/noise_chunks_8/material.js';
import { createNoise2Material } from './shaders/materials/noise_fbm_9/material.js';
import { createWorleyNoiseMaterial } from './shaders/materials/noise_mix_10/material.js';
import { createNoiseDeformMaterial } from './shaders/materials/noise_deform_11/material.js';
import { createGlowMaterial } from './shaders/materials/innerglow_12/material.js';
import { createWoodMaterial } from './shaders/materials/wood_13/material.js';
import { createRaymarchMaterial } from './shaders/materials/raymarch_14/material.js';
import { createMarbleMaterial } from './shaders/materials/marble_15/material.js';

export const materials = [
    createNormalMaterial(),
    createFirstMaterial(),
    createZebraMaterial(),
    createPositionMaterial(),
    createDeformMaterial(),
    createLightMaterial(),
    createParticleMaterial(),
    createNoiseMaterial(),
    createNoise2Material(),
    createWorleyNoiseMaterial(),
    createNoiseDeformMaterial(),
    createGlowMaterial(),
    createWoodMaterial(),
    createRaymarchMaterial(),
    createMarbleMaterial(),
];

// Erstellt Kugel-Meshes mit den gegebenen Materialien
export function createSpheres(offset, materials, geometry = new THREE.SphereGeometry(1, 32, 32) ) {
    return materials.map((mat, i) => {
        const sphere = new THREE.Mesh(geometry, mat);

        sphere.name = mat.name;
        sphere.description = `This sphere demonstrates the ${mat.name} shader. <a href="#">This is a Link</a>`;
        sphere.position.x = i * offset;

        // 🔑 DAS ist der entscheidende Teil
        sphere.userData = {
            title: mat.name,
            description: `This sphere demonstrates the ${mat.name} shader.`,
        };

        return sphere;
    });
}

// Erstellt untere Labels für die Kugeln
export function createSphereLabels(offset, materials) {
    const sphereLabelGroup = new THREE.Group();
    sphereLabelGroup.name = "Sphere Labels";
    const positionY = -1.4;

    materials.map((mat, i) => {
        const p = document.createElement("p");
        p.textContent = mat.name;
        const label = new CSS2DObject(p);
        label.name = mat.name;
        label.position.set(i * offset, positionY, 0);
        sphereLabelGroup.add(label);
    });

    return sphereLabelGroup;
}

// Erstellt ein Partikel-System mit zufälligen Positionen in einer Kugel
export function createParticlePoints(material, count) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const theta = Math.random() * 3 * Math.PI; // Random angle
        const phi = Math.acos(2 * Math.random() - 1); // Random angle for spherical coordinates

        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.sin(phi) * Math.sin(theta);
        const z = Math.cos(phi);

        positions[i * 3 + 0] = x * 1.5; // Scale to desired radius
        positions[i * 3 + 1] = y * 1.25;
        positions[i * 3 + 2] = z * 1.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const points = new THREE.Points(geometry, material);
    return points;
}
