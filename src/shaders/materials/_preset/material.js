import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createPresetMaterial() {    // change function name
    return new THREE.ShaderMaterial({
        name: 'Preset',                     // change material name
        userData: {                              // change material description
            description: `
                Material Description
                <br/>
                <br/>
                Check out the 
                <a href="#" target="_blank">Link</a>
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