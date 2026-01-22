import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createParticleMaterial() {    // change function name
    return new THREE.ShaderMaterial({
        name: 'Particles',                     // change material name
        userData: {                              // change material description
            description: `
                This particle shader is a mix between what we learned so far and added some particles with additive blending. 
                The vertex shader positions the particles in space and adjusts their size based on distance to the camera. 
                The fragment shader gives each particle a soft, glowing appearance by calculating the distance from the center of the point and applying a radial gradient.
                <br/>
                <br/>
                Check out the 
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/07_particles/vertex.glsl" target="_blank">Vertex Shader</a>
                 & 
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/07_particles/fragment.glsl" target="_blank">Fragment Shader</a>
            `,
        },
        uniforms: { 
            ...sharedUniforms,
            u_pointSize: { value: 5.0 },
            // Custom uniforms
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
}