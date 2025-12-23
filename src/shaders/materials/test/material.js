import * as THREE from 'three';
import vertexShader from './test.vert?raw';
import fragmentShader from './test.frag?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createTestMaterial() {
    return new THREE.ShaderMaterial({
        uniforms: { 
            ...sharedUniforms,
            // Custom uniforms
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
}