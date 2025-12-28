import * as THREE from 'three';
import vertexShader from './position.vert?raw';
import fragmentShader from './position.frag?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createPositionMaterial() {
    return new THREE.ShaderMaterial({
        name: 'Position',
        uniforms: { 
            ...sharedUniforms,
            // Custom uniforms
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
}