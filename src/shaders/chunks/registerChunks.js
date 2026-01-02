import * as THREE from 'three';
import hash from './noise_hash.glsl?raw';
import fbm from './noise_fbm.glsl?raw';
import curl from './noise_curl.glsl?raw';
import worley from './noise_worley.glsl?raw';
import simplex from './noise_simplex.glsl?raw';

export function registerChunks() {
    THREE.ShaderChunk['hash'] = hash;
    THREE.ShaderChunk['fbm'] = fbm;
    THREE.ShaderChunk['curl'] = curl;
    THREE.ShaderChunk['worley'] = worley;
    THREE.ShaderChunk['simplex'] = simplex;
}