import * as THREE from 'three';
import vertexShader from './zebra.vert?raw';
import fragmentShader from './zebra.frag?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createZebraMaterial() {
    return new THREE.ShaderMaterial({
        name: 'Zebra',
        uniforms: { 
            ...sharedUniforms,
            // Custom uniforms
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
}