import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createGlowMaterial() {    // change function name
    return new THREE.ShaderMaterial({
        name: 'Glow',                     // change material name
        userData: {
            description: `
                This shader creates an inner glow effect by using a radial gradient in the fragment shader. 
                The glow intensity is calculated based on the distance from the center of the object, creating a smooth transition from the center to the edges. 
                <br/>
                <br/>
                Check out the 
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/12_innerglow/fragment.glsl" target="_blank">Fragment Shader</a>
            `,
        },
        uniforms: { 
            ...sharedUniforms,
            // Custom uniforms
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
}
