import * as THREE from 'three';
import vertexShader from './normal.vert?raw';
import fragmentShader from './normal.frag?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createNormalMaterial() {
    return new THREE.ShaderMaterial({
        name: 'Normals',
        userData: {
            description: `
                In this shader, we worked with varyings for the first time to pass data from the vertex shader to the fragment shader, by visualizing the normal vectors as colors.
                <br/>
                <br/>
                Check out the
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/02_normal/normal.frag" target="_blank">Fragment Shader</a>
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