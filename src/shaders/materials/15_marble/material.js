import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createMarbleMaterial() {    // change function name
    return new THREE.ShaderMaterial({
        name: 'Glas Marble',                     // change material name
        userData: {                              // change material description
            description: `
                This is a further raymarching experiment and a broaken down and simplified version from diffrent setups on <a href="https://www.shadertoy.com/view/Mlj3zW" target="_blank">shadertoy</a>. 
                Unlike the first setup, “Understanding Raymarch Setup”, this shader does not use SDFs inside the sphere to detect hard surfaces. Instead, the ray continues traveling through the entire sphere, accumulating values along its path. 
                <br/>
                The raymarching scene uses the same sphere, camera, sizes and positions as the Three.js scene, ensuring that the raymarch render aligns perfectly with the color applied to the sphere in the shader for Three.js.
                <br/>
                <br/>
                Check out the
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/15_marble/fragment.glsl" target="_blank">Fragment Shader</a>
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