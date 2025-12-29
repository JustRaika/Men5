import * as THREE from 'three';
import vertexShader from './light.vert?raw';
import fragmentShader from './light.frag?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createLightMaterial() {
    return new THREE.ShaderMaterial({
        name: 'Light',
        uniforms: { 
            ...sharedUniforms,
            // Custom uniforms
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
}