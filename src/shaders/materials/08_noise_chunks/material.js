import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createNoiseMaterial() {    // change function name
    return new THREE.ShaderMaterial({
        name: 'Noise Chunks',              // change material name
        userData: {                        // change material description
            description: `
                This shader showcases different noise algorithms we implemented. It cycles through: <br/>
                Simplex 3D, <br/>
                Perlin 4D, <br/>
                Worley F1, <br/>
                Worley F2-F1 (borders) and <br/>
                Curl noise. 
                <br/>
                <br/>
                To reuse these noises in other shaders, we stored the algorithms in separate chunk files that can be included as needed. Because some noise functions share common code, loading multiple noises at once initially caused errors. To solve this, we moved the overlapping code into a shared "noise base functions" file. This approach requires loading the base functions along with the specific noise, but it also allows all noise types to be used together in a single shader. Understanding, implementing, adapting, and using these noise functions correctly required a significant amount of effort.
                <br/>
                <br/>
                Check out our
                <a href="https://github.com/JustRaika/Men5/tree/main/src/shaders/chunks" target="_blank">Noise Chunks</a>
                 & 
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/08_noise_chunks/fragment.glsl" target="_blank">Fragment Shader</a>
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