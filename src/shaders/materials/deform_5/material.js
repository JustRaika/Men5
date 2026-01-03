import * as THREE from 'three';
import vertexShader from './deform.vert?raw';
import fragmentShader from './deform.frag?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createDeformMaterial() {
    return new THREE.ShaderMaterial({
        name: 'Vertex Deform',
        uniforms: { 
            ...sharedUniforms,
            // Custom uniforms
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
}