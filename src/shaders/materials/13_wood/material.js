import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createWoodMaterial() {    // change function name
    return new THREE.ShaderMaterial({
        name: 'Wood',                     // change material name
        userData: {                       // change material description
            description: `
                This basic wood texture is created using the approach from the “Zebra & Time” shader. The initial vertical stripe pattern is then distorted using fBM to break up the regular structure. A small, soft Simplex noise is added to introduce subtle detail and variation in the brighter areas of the wood. After the color mapping step, a soft light coming from the top right is applied.
                <br/>
                <br/>
                Check out our
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/13_wood/fragment.glsl" target="_blank">Fragment Shader</a>
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