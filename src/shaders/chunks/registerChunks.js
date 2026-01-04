import * as THREE from 'three';

// webgl-noise (https://github.com/stegu/webgl-noise)
import noisebase from './webgl-noise_base_functions.glsl?raw';
import perlin3D from './webgl-noise_perlin_3D.glsl?raw';
import perlin4D from './webgl-noise_perlin_4D.glsl?raw';
import simplex3D from './webgl-noise_simplex_3D.glsl?raw';
import simplex3DGradient from './webgl-noise_simplex_3D_gradient.glsl?raw';
import simplex4D from './webgl-noise_simplex_4D.glsl?raw';
import worley3D from './webgl-noise_worley_3D.glsl?raw';
//
import fbm from './noise_fbm.glsl?raw';
import curl from './noise_curl.glsl?raw';

export function registerChunks() {
    // webgl-noise (https://github.com/stegu/webgl-noise)
    THREE.ShaderChunk['noisebase'] = noisebase;
    THREE.ShaderChunk['perlin3D'] = perlin3D;
    THREE.ShaderChunk['perlin4D'] = perlin4D;
    THREE.ShaderChunk['simplex3D'] = simplex3D;
    THREE.ShaderChunk['simplex3DGradient'] = simplex3DGradient;
    THREE.ShaderChunk['simplex4D'] = simplex4D;
    THREE.ShaderChunk['worley3D'] = worley3D;
    //
    THREE.ShaderChunk['fbm'] = fbm;
    THREE.ShaderChunk['curl'] = curl;
}