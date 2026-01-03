import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createBackgroundStarsMaterial() {    // change function name
    return new THREE.ShaderMaterial({
        name: 'BackgroundStars',                     // change material name
        uniforms: { 
            ...sharedUniforms,
            // Custom uniforms
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        depthWrite: false,
        depthTest: false
    });
}
