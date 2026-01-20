import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createMarbleMaterial() {    // change function name
    return new THREE.ShaderMaterial({
        name: 'Glas Marble',                     // change material name
        userData: {                              // change material description
            description: `
                Material Description
                <br/>
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/marble_15/fragment.glsl" target="_blank">Fragmentshader</a>
            `,
        },
        uniforms: { 
            ...sharedUniforms,
            // Custom uniforms
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        depthWrite: false,
    });
}