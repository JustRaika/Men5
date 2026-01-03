import * as THREE from 'three';
import vertexShader from './first.vert?raw';
import fragmentShader from './first.frag?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createFirstMaterial() {
    return new THREE.ShaderMaterial({
        name: 'First Shader',
        uniforms: { 
            ...sharedUniforms,
            // Custom uniforms
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
    });
}