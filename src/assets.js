// Alle Materialien und Spheres werden hier erstellt

import * as THREE from 'three';
import { 
    createNormalMaterial,
    createFirstMaterial,
    createZebraMaterial,
    createPositionMaterial,
    createDeformMaterial,
    createLightMaterial,
    createParticleMaterial
} from './shaders/materials/index.js';

export const materials = [
    createNormalMaterial(),
    createFirstMaterial(),
    createZebraMaterial(),
    createPositionMaterial(),
    createDeformMaterial(),
    createLightMaterial(),
    createParticleMaterial(),
];

export function createSpheres(materials, geometry = new THREE.SphereGeometry(1, 32, 32)) {
    return materials.map((mat, i) => {
        const sphere = new THREE.Mesh(geometry, mat);
        sphere.position.x = i * 2.5;
        return sphere;
    });
}

export function createParticlePoints(material, count = 500) {
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
