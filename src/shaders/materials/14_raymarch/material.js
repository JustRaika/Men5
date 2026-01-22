import * as THREE from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';
import { sharedUniforms } from '../../uniforms.js';

export function createRaymarchMaterial() {    // change function name
    return new THREE.ShaderMaterial({
        name: 'Understanding Raymarch Setup',                     // change material name
        userData: {                              // change material description
            description: `
                In this shader, we experimented with the basics of raymarching. It was a challenge to wrap our heads around the concept and understand a simple raymarch function for detecting surfaces. Raymarching is a different rendering technique compared to traditional mesh-based rendering with vertices and triangles.
                <br/>
                Here, we represented a sphere mathematically using a Signed Distance Field (SDF). Raymarching casts a ray for each pixel to detect the surface of the SDF sphere. The resulting render is then used as a color fot the shader on the Three.js sphere. We also bound the size of the SDF sphere to the mouse position, demonstrating that the raymarching effect exists only within the bounds of the mesh.
                <br/>
                Raymarching is particularly useful for creating complex shapes without geometry and for visualizing volumes or semi-transparent objects.
                <br/>
                <br/>
                Check out the
                <a href="https://github.com/JustRaika/Men5/blob/main/src/shaders/materials/14_raymarch/fragment.glsl" target="_blank">Fragment Shader</a>
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