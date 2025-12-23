import * as THREE from 'three';

export const sharedUniforms = {
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uResolution: { value: new THREE.Vector2() }
};