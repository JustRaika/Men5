import * as THREE from 'three';
import vertexShader from './normal.vert?raw';
import fragmentShader from './normal.frag?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createNormalMaterial() {
    return new THREE.ShaderMaterial({
        name: 'Normals',
        uniforms: { 
            ...sharedUniforms,
            // Custom uniforms
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
}