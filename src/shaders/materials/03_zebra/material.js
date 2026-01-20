import * as THREE from 'three';
import vertexShader from './zebra.vert?raw';
import fragmentShader from './zebra.frag?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createZebraMaterial() {
    return new THREE.ShaderMaterial({
        name: 'Zebra & Time',
        userData: {                              // change material description
            description: `
                This Shader was the first try to get diffrent colors on the surface based on the position. The Z Axies is used in a cosinus function to create a fade in height. Additionally we tried to pass uniforms, like the time, to animate the color.
                <br/>
                Check out our
                <a href="#" target="_blank">Fragment Shader</a>
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