import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createIntroMaterial() {    // change function name
    return new THREE.ShaderMaterial({
        name: 'Intro',                     // change material name
        uniforms: { 
            ...sharedUniforms,
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2() },
            u_fade: { value: 1.0 } 
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
}