import * as THREE from 'three';

import noisebase from './noise_base_functions.glsl?raw';
import hash from './noise_hash.glsl?raw';
import fbm from './noise_fbm.glsl?raw';
import curl from './noise_curl.glsl?raw';
import worley from './noise_worley.glsl?raw';
import simplex from './noise_simplex.glsl?raw';
// webgl-noise (https://github.com/stegu/webgl-noise)
import perlin3D from './webgl-noise_perlin_3D.glsl?raw';
import perlin4D from './webgl-noise_perlin_4D.glsl?raw';
import simplex3D from './webgl-noise_simplex_3D.glsl?raw';
import simplex3DGradient from './webgl-noise_simplex_3D_gradient.glsl?raw';
import simplex4D from './webgl-noise_simplex_4D.glsl?raw';
import worley3D from './webgl-noise_worley_3D.glsl?raw';


export function registerChunks() {
    THREE.ShaderChunk['noisebase'] = noisebase;
    THREE.ShaderChunk['hash'] = hash;
    THREE.ShaderChunk['fbm'] = fbm;
    THREE.ShaderChunk['curl'] = curl;
    THREE.ShaderChunk['worley'] = worley;
    THREE.ShaderChunk['simplex'] = simplex;
    // webgl-noise (https://github.com/stegu/webgl-noise)
    THREE.ShaderChunk['perlin3D'] = perlin3D;
    THREE.ShaderChunk['perlin4D'] = perlin4D;
    THREE.ShaderChunk['simplex3D'] = simplex3D;
    THREE.ShaderChunk['simplex3DGradient'] = simplex3DGradient;
    THREE.ShaderChunk['simplex4D'] = simplex4D;
    THREE.ShaderChunk['worley3D'] = worley3D;
}