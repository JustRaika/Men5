import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { setupRenderer, setupLabelRenderer } from './setup/renderer.js';
import { setupScene, addLights } from './setup/scene.js';
import { setupEvents } from './setup/events.js';
import { sharedUniforms } from './shaders/uniforms.js';
import { materials, createSpheres, createSphereLabels } from './assets.js';
import { createParticleMaterial } from './shaders/materials/particles_7/material.js';
import { createParticlePoints } from './assets.js';
import { raycast, sphereRotationManager, updateCameraRotation, timeManager, clickManager } from './utils.js';
import { registerChunks } from './shaders/chunks/registerChunks.js';
import { addStarBackground } from './setup/background.js';
import { setupAboutUI, setupSphereInfoUI, showSphereInfo, hideSphereInfo, updateSphereInfoPosition } from './setup/ui.js';

const canvas = document.querySelector('#three');

// globale Variablen
let scene, camera, renderer, clock, stats, labelRenderer;
let spheres = [], sphereSpacing = 3.5;
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
    spheres = createSpheres(sphereSpacing, materials);
    spheres.forEach(s => sphereGroup.add(s));

    // Group particle objects easy click and rotation
    let particleSphere = spheres.find(s => s.name === 'Particles');
    if (particleSphere) {
        let particleGroup = new THREE.Group();
        particleGroup.name = particleSphere.name;
        particleGroup.description = particleSphere.description;
        particleGroup.position.x = particleSphere.position.x;
        particleSphere.position.x = 0;
        particleSphere.userData.group = particleGroup;
        particleGroup.add(particleSphere);

        const particleMat = createParticleMaterial();
        const particleSystem = createParticlePoints(particleMat, 800);
        particleSystem.userData.group = particleGroup;
        particleSystem.name = particleSphere.name;
        particleSystem.description = particleSphere.description;
        particleGroup.add(particleSystem);

        sphereGroup.remove(particleSphere);
        sphereGroup.add(particleGroup);
    }

    // Labels
    labelRenderer = setupLabelRenderer(canvas);
    sphereGroup.add(createSphereLabels(sphereSpacing, materials));

    // Add scene
    scene.add(sphereGroup);

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

    const maxX = (materials.length - 1) * sphereSpacing;
    const scrollFraction = scrollTop / (document.documentElement.scrollHeight - window.innerHeight);
    camera.position.x = scrollFraction * maxX;
}

function onMouseMove(event) {
    mousePos.set(event.clientX, event.clientY);

    sharedUniforms.u_mouse.value.set(
        (event.clientX / canvas.clientWidth) * 2 - 1,
        -(event.clientY / canvas.clientHeight) * 2 + 1
    );

    if (sphereRotationManager.rotating && raycast.hit) {
        sphereRotationManager.update(mousePos);
    }

    updateCameraRotation(mousePos, canvas, camera);
}

function onClickStart(event) {
    if (!mouseOnCanvas) return;

    raycast.getIntersects(mousePos, canvas, camera, scene, true);
    hideSphereInfo();

    if (raycast.hit) {
        clickManager.start(clock, event);
        sphereRotationManager.start(mousePos);
    } else {
        timeManager.pause(clock);
    }
}

function onClickEnd(event) {
    sphereRotationManager.rotating = false;
    timeManager.resume(clock);
    // if click -> show sphere info
    if(clickManager.stop(clock, event)) raycast.hits[0].object.userData.group ? showSphereInfo(raycast.hits[0].object.userData.group) : showSphereInfo(raycast.hits[0].object);
}

// ----------------- START -----------------
init();
