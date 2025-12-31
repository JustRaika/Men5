import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { sharedUniforms } from './shaders/uniforms.js';
import { materials, createSpheres } from './assets.js';
import { setupRenderer } from './setup/renderer.js';
import { setupScene, addLights } from './setup/scene.js';
import { setupEvents } from './setup/events.js';
import { raycast, sphereRotationManager, updateCameraRotation } from './utils.js';
import { createParticleMaterial } from './shaders/materials/particles_7/material.js';
import { createParticlePoints } from './assets.js';

const canvas = document.querySelector('#three');

// globale Variablen
let scene, camera, renderer, clock, stats;
let spheres = [];
let mousePos = new THREE.Vector2(), mouseOnCanvas = true;

// Zeitmanager
const timeManager = {
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

// ----------------- INIT -----------------
function init() {
    if (!canvas) return console.error('Canvas not found!');
    ({ scene, camera } = setupScene(canvas));
    renderer = setupRenderer(canvas);
    addLights(scene);

    // Stats
    if (!import.meta.env.PROD) {
        stats = new Stats();
        document.body.appendChild(stats.dom);
    }

    // Assets
    spheres = createSpheres(materials);
    spheres.forEach(s => scene.add(s));

	const particleMat = createParticleMaterial();
	const particleSystem = createParticlePoints(particleMat, 100);
	scene.add(particleSystem);

    // Clock
    clock = new THREE.Clock();

    // Events
    setupEvents(canvas, {
        onResize,
        onScroll,
        onMouseMove,
        onClickStart,
        onClickEnd,
        setMouseOnCanvas: val => mouseOnCanvas = val
    });

    // Initial resize & scroll
    onResize();
    onScroll();

    // Animation loop
    renderer.setAnimationLoop(render);
}

// ----------------- RENDER -----------------
function render() {
    timeManager.update(clock);
    if (!import.meta.env.PROD) stats.update();
    renderer.render(scene, camera);
}

// ----------------- EVENTS -----------------
function onResize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    sharedUniforms.u_resolution.value.set(width, height);
}

function onScroll() {
    const scrollTop = window.scrollY;
    sharedUniforms.u_scroll.value = scrollTop;

    // Kamera seitlich scrollen
    const maxX = (materials.length - 1) * 2.5;
    const scrollFraction = scrollTop / (document.documentElement.scrollHeight - window.innerHeight);
    camera.position.x = scrollFraction * maxX;
}

function onMouseMove(event) {
    mousePos.set(event.clientX, event.clientY);

    if (sphereRotationManager.rotating && raycast.hit) {
        sphereRotationManager.update(mousePos);
    }

    updateCameraRotation(mousePos, canvas, camera);
}

function onClickStart() {
    if (!mouseOnCanvas) return;

    // Raycast for rotation or pause
    raycast.getIntersects(mousePos, canvas, camera, scene, false);
    if (raycast.hit) {
        sphereRotationManager.start(mousePos);
    } else {
        timeManager.pause(clock);
    }
}

function onClickEnd() {
    sphereRotationManager.rotating = false;
    timeManager.resume(clock);
}

// ----------------- START -----------------
init();
