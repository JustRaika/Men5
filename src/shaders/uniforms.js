import * as THREE from 'three';

export const sharedUniforms = {
    u_time: { value: 0 },
    u_scroll: { value: 0 },
    u_resolution: { value: new THREE.Vector2() },
    u_mouse: { value: new THREE.Vector2() }
};