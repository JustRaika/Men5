import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { setupRenderer, setupLabelRenderer } from './setup/renderer.js';
import { setupScene, addLights } from './setup/scene.js';
import { setupEvents } from './setup/events.js';
import { sharedUniforms } from './shaders/uniforms.js';
import { materials, createSpheres, createSphereLabels } from './assets.js';
import { createParticleMaterial } from './shaders/materials/particles_7/material.js';
import { createParticlePoints } from './assets.js';
import { raycast, sphereRotationManager, updateCameraRotation, timeManager } from './utils.js';
import { registerChunks } from './shaders/chunks/registerChunks.js';
import { addStarBackground } from './setup/background.js';
import { setupAboutUI, setupSphereInfoUI, showSphereInfo, hideSphereInfo, updateSphereInfoPosition } from './setup/ui.js';

const canvas = document.querySelector('#three');

// globale Variablen
let scene, camera, renderer, clock, stats, labelRenderer;
let spheres = [];
let mousePos = new THREE.Vector2(), mouseOnCanvas = true;

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
    registerChunks();
    const sphereGroup = new THREE.Group();
    sphereGroup.name = "Spheres";
    spheres = createSpheres(materials);
    spheres.forEach(s => scene.add(s));

	const particleMat = createParticleMaterial();
	const particleSystem = createParticlePoints(particleMat, 800);
	particleSystem.position.x += 15;
	scene.add(particleSystem);

    // Labels
    labelRenderer = setupLabelRenderer(canvas);
    scene.add(createSphereLabels(materials));

    // Clock
    clock = new THREE.Clock();

    // UI
    setupAboutUI({ timeManager, clock });
    setupSphereInfoUI();

    // Events
    setupEvents(canvas, {
        onResize,
        onScroll,
        onMouseMove,
        onClickStart,
        onClickEnd,
        setMouseOnCanvas: val => mouseOnCanvas = val
    });

    // Resize & scroll
    onResize();
    onScroll();

    // Animation loop
    renderer.setAnimationLoop(render);

	// Background
	addStarBackground(scene);
}

// ----------------- RENDER -----------------
function render() {
    timeManager.update(clock);
    if (!import.meta.env.PROD) stats.update();
    updateSphereInfoPosition(camera);
    labelRenderer.render(scene, camera);
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
    labelRenderer.setSize(width, height)
}

function onScroll() {
    const scrollTop = window.scrollY;
    sharedUniforms.u_scroll.value = scrollTop;

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

    raycast.getIntersects(mousePos, canvas, camera, scene, false);

    if (raycast.hit) {
        showSphereInfo(raycast.hits[0].object);
        sphereRotationManager.start(mousePos);
    } else {
        hideSphereInfo();
        timeManager.pause(clock);
    }
}

function onClickEnd() {
    sphereRotationManager.rotating = false;
    timeManager.resume(clock);
}

// ----------------- START -----------------
init();
