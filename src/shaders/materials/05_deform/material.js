import * as THREE from 'three';
import vertexShader from './deform.vert?raw';
import fragmentShader from './deform.frag?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createDeformMaterial() {
    return new THREE.ShaderMaterial({
        name: 'Vertex Deform',
        userData: {
            description: `
                This is our first experiment using the vertex shader. We explored how vertices can be modified and how they behave when transformed. Initially, we tried squashing, stretching, and moving them around. Afterwards, we added a displacement effect similar to the zebra shader code and animated all vertices over time using a time-based-sine function.
                <br/>
                <br/>
                Check out our
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/05_deform/deform.vert" target="_blank">Vertex Shader</a>
            `,
        },
        uniforms: { 
            ...sharedUniforms,
            // Custom uniforms
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
}