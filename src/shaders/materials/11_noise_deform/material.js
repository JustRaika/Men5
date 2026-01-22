import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createNoiseDeformMaterial() {    // change function name
    return new THREE.ShaderMaterial({
        name: 'Noise Deform',                    // change material name
        userData: {                              // change material description
            description: `
                By combining what we learned, we created this shader, which brings together different noise functions, deformation, and color. Worley noise is used to form the craters, while fBM breaks up the uniform look and adds more detail to the color. A similar look like the “Mix Worley with Simplex” shader is used to map both deformation and color.
                <br/>
                Additionally, we encountered the limitations and loss of detail that occur when passing deformed vertex data to the fragment shader. Because of this, we run the same noise calculations in both the vertex and the fragment shader to preserve detail.
                <br/>
                <br/>
                Check out our
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/11_noise_deform/vertex.glsl" target="_blank">Vertex Shader</a>, 
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/11_noise_deform/fragment.glsl" target="_blank">Fragment Shader</a>
                 & 
                <a href="https://github.com/JustRaika/Men5/tree/main/src/shaders/chunks" target="_blank">Noise Chunks</a>
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