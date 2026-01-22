// Kleine Helferfunktionen und Manager

import * as THREE from 'three';

import { sharedUniforms } from './shaders/uniforms.js';

// Raycast: Erkennung von Objekten unter dem Mauszeiger
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
        // exclude background from hits
        if (this.hits[0]?.object?.name === "Background") this.hits = [];

        if (this.hits.length > 0) {
            this.hit = true;
        } else {
            this.hit = false;
        }
        return this.hits;
    }
};

// Manager für die Rotation der Kugeln
export const sphereRotationManager = {
    speed: 0.01,
    object: null,
    rotating: false,
    initialRotation: 0,
    startPos: 0,
    start(mouse) {
        raycast.hits[0].object.userData.group ? this.object = raycast.hits[0].object.userData.group : this.object = raycast.hits[0].object;
        this.initialRotation = this.object.rotation.y;
        this.startPos = mouse.x;
        this.rotating = true;
    },
    update(mouse) {
        let deltaX = mouse.x - this.startPos;
        this.object.rotation.y = this.initialRotation + deltaX * this.speed;
    }
};

// Kamera-Rotation basierend auf Mausposition
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

// Zeit-Manager zum Pausieren und Fortsetzen der Animationen
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

// Erkennung mobiler Geräte
export function isMobileDevice() {
    return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        ) ||
        window.matchMedia('(max-width: 768px)').matches
    );
}

// Erkennung von Klicks basierend auf Zeit und Distanz wischen Mouse Down und Up
export const clickManager = {
    CLICK_TIME: 0.2,
    CLICK_DIST: 5,
    isDown: false,
    startPos: new THREE.Vector2(),
    startTime: 0,
    start(clock, e) {
        this.isDown = true;
        this.startTime = clock.getElapsedTime();
        this.startPos.set(e.clientX, e.clientY);
    },
    stop(clock, e) {
        this.isDown = false;
        // get delta
        const deltaTime = clock.getElapsedTime() - this.startTime;
        const deltaDistance = this.startPos.distanceTo(
            new THREE.Vector2(e.clientX, e.clientY)
        );

        const isClick = deltaTime < this.CLICK_TIME && deltaDistance < this.CLICK_DIST;
        return isClick;
    }
};