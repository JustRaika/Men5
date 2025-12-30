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
