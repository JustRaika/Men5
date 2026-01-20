import * as THREE from 'three';
import vertexShader from './zebra.vert?raw';
import fragmentShader from './zebra.frag?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createZebraMaterial() {
    return new THREE.ShaderMaterial({
        name: 'Zebra & Time',
        userData: {                              // change material description
            description: `
                This shader was our first attempt at creating color variations across a surface. The Y-Position is used in a cosine function to produce a smooth black and white fade effect. Additionally, we experimented with passing uniforms, such as u_time, to animate the colors dynamically.
                <br/>
                <br/>
                Check out our
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/03_zebra/zebra.frag" target="_blank">Fragment Shader</a>
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