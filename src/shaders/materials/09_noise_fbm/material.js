import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createNoise2Material() {    // change function name
    return new THREE.ShaderMaterial({
        name: 'Fractial Brownian motion',        // change material name
        userData: {                              // change material description
            description: `
                This shader showcases Fractal Brownian Motion (fBM). In our case, this means layering the same noise function multiple times (called octaves) to create richer and more detailed patterns. Our fBM function directly calls the Simplex 3D noise function. To use other noise types, the same structure can be reused by copying the code and calling a different noise function inside the loop.
                <br/>
                <br/>
                Check out our
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/chunks/noise_fbm.glsl" target="_blank">Fractal Brownian Motion Chunk</a>
                 & 
                <a href="https://github.com/JustRaika/Men5/tree/main/src/shaders/materials/09_noise_fbm" target="_blank">Fragment Shader</a>
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