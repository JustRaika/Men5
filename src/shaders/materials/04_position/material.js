import * as THREE from 'three';
import vertexShader from './position.vert?raw';
import fragmentShader from './position.frag?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createPositionMaterial() {
    return new THREE.ShaderMaterial({
        name: 'UV, Position & Math',
        userData: {
            description: `
                This is a further experiment in drawing custom shapes and colors on a surface using a shader. The palm tree is created on top of a gradient background, which is then multiplied by two different mathematical functions defining the leaves and the stem. Since these functions output values between 0 and 1, they either preserve the background or cancel it out, resulting in black areas. 
                <br/>
                Because the shader is drawn in 2D using UV coordinates, the UV seam is visible on the surface.
                <br/>
                <br/>
                Check out the
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/04_position/position.frag" target="_blank">Fragment Shader</a>
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