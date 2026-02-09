import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { setupRenderer, setupLabelRenderer } from './setup/renderer.js';
import { setupScene, addLights } from './setup/scene.js';
import { setupEvents } from './setup/events.js';
import { sharedUniforms } from './shaders/uniforms.js';
import { materials, createSpheres, createSphereLabels } from './assets.js';
import { createParticleMaterial } from './shaders/materials/07_particles/material.js';
import { createParticlePoints } from './assets.js';
import { raycast, sphereRotationManager, updateCameraRotation, timeManager, clickManager } from './utils.js';
import { registerChunks } from './shaders/chunks/registerChunks.js';
import { addStarBackground } from './setup/background.js';
import { setupIntro } from './setup/intro.js'
import { setupMobileUI, setupAboutUI, setupSphereInfoUI, showSphereInfo, hideSphereInfo, updateSphereInfoPosition } from './setup/ui.js';

const canvas = document.querySelector('#three');

// globale Variablen
let scene, camera, renderer, clock, stats, labelRenderer;
let spheres = [], sphereSpacing = 3.5;
let mousePos = new THREE.Vector2(), mouseOnCanvas = true;
let intro = null; // Intro scene
let showIntro = false; // Intro scene
let introStartTime = 0; // Intro scene
const INTRO_DURATION = 11; // Intro scene
let hintShown = false; // Interaction hint
const dpr = Math.min(window.devicePixelRatio, 4); 
const rt = new THREE.WebGLRenderTarget(canvas.clientWidth * dpr, canvas.clientWidth * dpr, false);


// ----------------- INIT -----------------
function init() {
    if (!canvas) return console.error('Canvas not found!');
    ({ scene, camera } = setupScene(canvas));
    renderer = setupRenderer(canvas);
    // addLights(scene);
    // renderer.autoClear = false;

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

    // Particles
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

    // Intro
    intro = setupIntro(renderer);
    introStartTime = clock.getElapsedTime();

    // Start Button
    const startOverlay = document.getElementById('start-overlay');
    const startBtn = document.getElementById('start-btn');

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            startOverlay.style.display = 'none';
            introStartTime = clock.getElapsedTime();
            showIntro = true;
            // show hint
            const hint = document.getElementById('interaction-hint');
            hint.classList.add('visible');
            setTimeout(() => {
                hint.classList.remove('visible');
            }, 12000);
        });
    }

    // UI
    setupMobileUI({ timeManager, clock });
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
// Old normal scene render function
// function render() {
//     timeManager.update(clock);
//     if (!import.meta.env.PROD) stats.update();
//     updateSphereInfoPosition(camera);
//     labelRenderer.render(scene, camera);
//     renderer.render(scene, camera);
// }

let introFadeInTime = 5;
let introTransitionDurration = 3;
let introTransition = 0;
function render() {

    timeManager.update(clock);
    if (!import.meta.env.PROD) stats.update();
    const elapsed = clock.getElapsedTime();

    // render backup texture
    if (!intro.material.uniforms.u_tMainScene.value) {
        renderer.setRenderTarget(rt);
        renderMainScene();
        renderer.setRenderTarget(null);
        intro.material.uniforms.u_tMainScene = {value: rt.texture};
        renderer.clear();
    }

    // fade in intro
    if (intro.material.uniforms.u_fadeIn.value <= 1) { 
        intro.material.uniforms.u_fadeIn.value = (clock.getElapsedTime() / introFadeInTime);
    }

    // ----------------- INTRO -----------------
    if (introTransition <= 0 && !showIntro) {
        renderer.render(intro.scene, intro.camera);
    }

    // ----------------- TRANSITION -----------------
    else if (introTransition < 1) {
        // create texture
        renderer.setRenderTarget(rt);
        renderMainScene();
        renderer.setRenderTarget(null);
        intro.material.uniforms.u_tMainScene = {value: rt.texture};
        // transition
        introTransition = (elapsed - introStartTime) / introTransitionDurration;
        sharedUniforms.u_sceneFade.value = introTransition;
        document.documentElement.style.setProperty('--overlay-opacity', introTransition);
        // if (introTransition >= 1) {console.log("END");} // to track end of transition
        // render intro
        renderer.render(intro.scene, intro.camera);
    }
    
    // ----------------- MAIN SCENE -----------------
    else if (introTransition >= 1) {
        renderMainScene();
    }
    // ----------------- OLD -----------------

    // renderer.clear();
    // renderer.clearDepth();
    // renderer.clear(true, true, true);

    

    // ----------------- INTRO -----------------
    // if (showIntro && intro) {
    //     const t = (elapsed - introStartTime) / INTRO_DURATION;

    //     // intro.material.uniforms.u_time.value = elapsed;
    //     // intro.material.uniforms.u_resolution.value.set(
    //     //     canvas.clientWidth,
    //     //     canvas.clientHeight
    //     // );

    //     // intro.material.uniforms.u_fade.value = 1.0 - smoothstep(0.7, 1.0, t);

    //     // sharedUniforms.u_sceneFade.value = smoothstep(0.1, 0.7, t); // The 0.1 is when it starts fading in, and 0.7 is when it finishes

    //     // renderer.render(intro.scene, intro.camera);

    //     // Interaction hint at end of intro
    //     if (t >= 1.0) {
    //         // showIntro = false;
    //         // sharedUniforms.u_sceneFade.value = 1.0;

    //         if (!hintShown) {
    //             const hint = document.getElementById('interaction-hint');
    //             hint.classList.add('visible');

    //             setTimeout(() => {
    //                 hint.classList.remove('visible');
    //             }, 12000);

    //             hintShown = true;
    //         }
    //     }
    //     return;
    // }

    // ----------------- NORMAL SCENE -----------------
    // const timeSinceIntroEnd = elapsed - (introStartTime + INTRO_DURATION);

    // sharedUniforms.u_sceneFade.value = 1.0;

    // timeManager.update(clock);
    // if (!import.meta.env.PROD) stats.update();
    // updateSphereInfoPosition(camera);
    // // renderer.clearDepth();
    // labelRenderer.render(scene, camera);
    // renderer.render(scene, camera);
}

function renderMainScene() {
    updateSphereInfoPosition(camera);
    labelRenderer.render(scene, camera);
    renderer.render(scene, camera);
}

function renderIntroScene() {
    renderer.render(intro.scene, intro.camera);
}

function transitionScene() {
    introTransition = (elapsed - introStartTime) / INTRO_DURATION;
}

// ----------------- EVENTS -----------------
function onResize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    sharedUniforms.u_resolution.value.set(width, height);
    labelRenderer.setSize(width, height);
    // Intro camera
    rt.setSize(width * dpr, height * dpr, false);
    intro.camera.aspect = width / height;
    intro.camera.updateProjectionMatrix();
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


// ----------------- HELPERS (to auslagern, sry) -----------------
function smoothstep(edge0, edge1, x) {
    x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return x * x * (3 - 2 * x);
}

// ----------------- START -----------------
init();
