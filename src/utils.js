// für kleine Helferfunktionen wie Raycaster

import * as THREE from 'three';

import { sharedUniforms } from './shaders/uniforms.js';

export const raycast = {
    raycaster: new THREE.Raycaster(),
    hits: [],
    hit: false,
    getMouseRay(mouse, canvas, camera, getChildren = false) {
        const pos = new THREE.Vector2(
            (mouse.x / canvas.clientWidth) * 2 - 1,
            -(mouse.y / canvas.clientHeight) * 2 + 1
        );
        this.raycaster.setFromCamera(pos, camera);
    },
    getIntersects(mouse, canvas, camera, scene, getChildren = false) {
        
        this.getMouseRay(mouse, canvas, camera);
        this.hits = this.raycaster.intersectObjects(scene.children, getChildren);
        if (this.hits.length > 0) {
            this.hit = true;
        } else {
            this.hit = false;
        }
        return this.hits;
    }
};

export const sphereRotationManager = {
    speed: 0.01,
    object: null,
    rotating: false,
    initialRotation: 0,
    startPos: 0,
    start(mouse) {
        this.object = raycast.hits[0].object;
        this.initialRotation = this.object.rotation.y;
        this.startPos = mouse.x;
        this.rotating = true;
    },
    update(mouse) {
        let deltaX = mouse.x - this.startPos;
        this.object.rotation.y = this.initialRotation + deltaX * this.speed;
    }
};

export function updateCameraRotation(mouse, canvas, camera) {
    const strength = 0.05;
    const targetRotation = new THREE.Euler(
        (mouse.y / canvas.clientHeight - 0.5) * strength,
        (mouse.x / canvas.clientWidth - 0.5) * strength,
        0,
        'XYZ'
    )
    camera.quaternion.setFromEuler(targetRotation);
}

export const timeManager = {
    paused: false,
    pausedAt: 0,
    offset: 0,
    update(clock) {
        if (!this.paused) sharedUniforms.u_time.value = clock.getElapsedTime() - this.offset;
    },
    pause(clock) {
        this.paused = true;
        this.pausedAt = clock.getElapsedTime();
    },
    resume(clock) {
        if (this.paused) this.offset += clock.getElapsedTime() - this.pausedAt;
        this.paused = false;
    }
};