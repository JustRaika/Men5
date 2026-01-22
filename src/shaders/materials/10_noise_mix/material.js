import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createWorleyNoiseMaterial() {    // change function name
    return new THREE.ShaderMaterial({
        name: 'Mix Worley with Simplex',         // change material name
        userData: {                              // change material description
            description: `
                While experimenting with different noise functions, we learned how to load and combine two of them: Worley noise and Simplex noise. This shader demonstrates how mixing these two noise types can produce interesting visual effects. The Worley noise creates a cellular pattern, while the Simplex noise adds smooth variations.
                <br/>
                <br/>
                Check out the
                <a href="https://github.com/JustRaika/Men5/tree/main/src/shaders/chunks" target="_blank">Noise Chunks</a>
                 & 
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/10_noise_mix/fragment.glsl" target="_blank">Fragment Shader</a>
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