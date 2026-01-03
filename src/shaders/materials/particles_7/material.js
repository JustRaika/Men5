import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createParticleMaterial() {    // change function name
    return new THREE.ShaderMaterial({
        name: 'Particles',                     // change material name
        uniforms: { 
            ...sharedUniforms,
            u_pointSize: { value: 5.0 },
            // Custom uniforms
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
}