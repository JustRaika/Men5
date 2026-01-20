import * as THREE from 'three';
import vertexShader from './first.vert?raw';
import fragmentShader from './first.frag?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createFirstMaterial() {
    return new THREE.ShaderMaterial({
        name: 'First Shader',
        userData: {
            description: `
                This shader program was the first one we created and successfully ran in this Three.js project. After debugging and learning how and where to define the necessary components, we were able to render a solid purple color. After the successful implementation, we were able to focus on the shaders.
                <br/>
                <br/>
                Check out our first 
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/01_first/first.vert" target="_blank">Vertex Shader</a>
                 & 
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/01_first/first.frag" target="_blank">Fragment Shader</a>
            `,
        },
        uniforms: { 
            ...sharedUniforms,
            // Custom uniforms
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
    });
}