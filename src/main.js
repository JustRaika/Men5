import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { sharedUniforms } from './shaders/uniforms.js';
import { materials, createSpheres } from './assets.js';
import { setupRenderer } from './setup/renderer.js';
import { setupScene, addLights } from './setup/scene.js';
import { setupEvents } from './setup/events.js';
import { getMouseRay } from './utils.js';
import { createParticleMaterial } from './shaders/materials/particles_7/material.js';
import { createParticlePoints } from './assets.js';

const canvas = document.querySelector('#three');

// globale Variablen
let scene, camera, renderer, clock, stats;
let mousePos = new THREE.Vector2();
let mouseOnCanvas = true;
let sphereRotating = false;
let sphereRotationStartPos = 0;
let sharedRaycasterSelection;
let spheres = [];

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
        this.paused = false;
        this.offset += clock.getElapsedTime() - this.pausedAt;
    }
};

// ----------------- INIT -----------------
function init() {
    if (!canvas) return console.error('Canvas not found!');
    ({ scene, camera } = setupScene(canvas));
    renderer = setupRenderer(canvas);
    addLights(scene);

    // Stats
    stats = new Stats();
    document.body.appendChild(stats.dom);

    // Assets
    spheres = createSpheres(materials);
    spheres.forEach(s => scene.add(s));

	//Assets: Partikel
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
    stats.update();
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
    if (sphereRotating && sharedRaycasterSelection) {
        const rotation = sphereRotationStartPos + event.clientX;
        sharedRaycasterSelection.rotation.y = rotation * 0.01;
    }
}

function onClickStart() {
    if (!mouseOnCanvas) return;

    const raycaster = getMouseRay(mousePos, canvas, camera);
    const intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {
        sharedRaycasterSelection = intersects[0].object;
        sphereRotationStartPos = mousePos.x;
        sphereRotating = true;
    } else {
        timeManager.pause(clock);
    }
}

function onClickEnd() {
    sphereRotating = false;
    timeManager.resume(clock);
}

// ----------------- START -----------------
init();
