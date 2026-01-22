import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createLightMaterial() {
    return new THREE.ShaderMaterial({
        name: 'Fake Light',
        userData: {
            description: `
                With this shader, we attempted to add a sense of depth using custom lighting. By default, shaders do not react to the light sources in the scene, so we implemented our own light calculation. Using the dot product between the light direction (in object space) and the normal vector, we determined where the surface is lit. Additionally, we animated the light source by rotating it around the sphere. 
                <br/>
                Because the light position is defined directly in the shader as a simple vec3, it does not take the sphere's rotation into account.
                <br/>
                <br/>
                Check out our
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/06_light/fragment.glsl" target="_blank">Fragment Shader</a>
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