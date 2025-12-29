import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

// Import custom shader materials
import { sharedUniforms } from './shaders/uniforms.js';
import { createFirstMaterial } from './shaders/materials/first_2/material.js';
import { createZebraMaterial } from './shaders/materials/zebra_3/material.js';
import { createPositionMaterial } from './shaders/materials/position_4/material.js';
import { createNormalMaterial } from './shaders/materials/normal_1/material.js';
import { createDeformMaterial } from './shaders/materials/deform_5/material.js';
import { createLightMaterial } from './shaders/materials/light_6/material.js';
import { createParticleMaterial } from './shaders/materials/particles_7/material.js';	

// Array to store materials
const materials = [
	createNormalMaterial(),
	createFirstMaterial(),
	createZebraMaterial(),
	createPositionMaterial(),
	createDeformMaterial(),
	createLightMaterial(),
	createParticleMaterial(),
];

const canvas = document.querySelector('#three'); // to which canvas we will render

// Global variables to which we need access in multiple functions
let scene, renderer, camera, clock;
let stats;
let sphere;

// State variables
let mousePos = new THREE.Vector2();
let mouseOnCanvas = true;
let timeOnPause = false;
let elapsedTimeOnPause = 0;
let timePaused = 0;

// interaction variables
let sharedRaycasterSelection;
let sphereRotating = false;
let sphereRotationStartPos = 0;

// Create a loading manager (Used for tracking loading progress of external assets)
const loadingManager = new THREE.LoadingManager();
loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    const progress = (itemsLoaded / itemsTotal) * 100;
    console.log(`Progress: ${progress.toFixed(2)}% (${itemsLoaded} of ${itemsTotal})`);
};

// setup function
function init() {
	
	// Check if canvas is available
	if (!canvas) {
		console.error('Canvas element not found!');
		return;
	}

	// Renderer draws the canvas
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer({ antialias: true, canvas }); // antialias for smoother edges
	/* Shadows
	renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
	*/

	camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 4);

	// Add stats
    stats = new Stats();
    document.body.appendChild( stats.dom );

	// Add assets
	addAssets();

	// Add Light
	addLight();

    // Handle resize
    window.addEventListener('resize', onResize, false);
    onResize();

	// Handle scroll
	window.addEventListener('scroll', onScroll, false);
	onScroll();

	// Handle click
	canvas.addEventListener('mouseenter', () => { mouseOnCanvas = true; });
	canvas.addEventListener('mouseleave', () => { mouseOnCanvas = false; });
	window.addEventListener('mousedown', onClickStart, false);
	window.addEventListener('mouseup', onClickEnd, false);
	window.addEventListener('mousemove', onMouseMove, false);

	// render loop
    clock = new THREE.Clock();
    renderer.setAnimationLoop(render);
}

function addAssets() {
	// Add a simple Sphere
	const geometry = new THREE.SphereGeometry( 1, 32, 32 );
	const normalMaterial = createNormalMaterial();

	// sphere = new THREE.Mesh( geometry, normalMaterial );
	// const testMaterial = createPositionMaterial();
	// let sphereShader = new THREE.Mesh( geometry, testMaterial );
	// scene.add( sphere );
	// scene.add( sphereShader );
	// sphere.position.x = -1.5;
	// sphereShader.position.x = 1.5;

	for (let mat of materials) {
		let sphereInstance = new THREE.Mesh( geometry, mat );
		sphereInstance.position.x = materials.indexOf(mat) * 2.5;
		scene.add( sphereInstance );
	}
}

function addLight() {
	// Add a simple Ambient Light
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);
	// Add light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);
}

function render() {
	// Update time (uniform)
	timeHandler();

    // Update
    stats.update();

    // Render the scene
    renderer.render(scene, camera);
}

function timeHandler() {
	if (!timeOnPause) {
		const elapsedTime = clock.getElapsedTime() - timePaused;
		sharedUniforms.u_time.value = elapsedTime;
	}
}

function onClickStart() {
	if (mouseOnCanvas) {
		// reycast
		let clickPos = new THREE.Vector2(
			(mousePos.x / canvas.clientWidth) * 2 - 1, 
			-(mousePos.y / canvas.clientHeight) * 2 + 1);
		const raycaster = new THREE.Raycaster();
		raycaster.setFromCamera( clickPos, camera );
		const intersects = raycaster.intersectObjects( scene.children, false );

		if (intersects.length > 0) {
			sharedRaycasterSelection = intersects[0].object;
			sphereRotationStartPos = mousePos.x;
			sphereRotating = true;

		} else {
			// pause time
			timeOnPause = true;
			elapsedTimeOnPause = clock.getElapsedTime();
		}
	}
}
function onClickEnd() {
	sphereRotating = false;

	if (timeOnPause) {
		timePaused += clock.getElapsedTime() - elapsedTimeOnPause;
		timeOnPause = false;
	}
}

function updateSphereRotation(eventX) {
	let rotation = sphereRotationStartPos + eventX;
	sharedRaycasterSelection.rotation.y = rotation * 0.01;
}

function onMouseMove(event) {
	if (sphereRotating) {
		updateSphereRotation(event.clientX)
	}
	mousePos = new THREE.Vector2(event.clientX, event.clientY);
	
}

function onResize() {
    const pixelRatio = Math.min(window.devicePixelRatio, 4); // Limit to 4x for performance
    const width = Math.round(canvas.clientWidth * pixelRatio);
    const height = Math.round(canvas.clientHeight * pixelRatio);

	// update uniforms
	sharedUniforms.u_resolution.value.x = width;
	sharedUniforms.u_resolution.value.y = height;

    // Set renderer size and adjust canvas attributes
    renderer.setSize(width, height, false);
    canvas.width = width;
    canvas.height = height;

    // Update camera aspect ratio and projection matrix
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
}

// Get scroll position as a fraction
function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = docHeight ? scrollTop / docHeight : 0;

	// Print scroll fraction
    // console.log(scrollFraction.toFixed(2)); // prints with 2 decimals
	
	// update uniform
	sharedUniforms.u_scroll.value = scrollTop;

	// rotate camera based on scroll
	scrollSideways(scrollFraction);
}

// Test Scroll Event
function rotateCamera(scrollFraction) {
	const angle = scrollFraction * Math.PI * 2;
	camera.position.x = Math.sin(angle) * 4;
	camera.position.z = Math.cos(angle) * 4;
	camera.lookAt(0, 0, 0);
}

// Scroll Event -> scroll sideways
function scrollSideways(scrollFraction) {
	const maxScrollX = (materials.length - 1) * 2.5;
	camera.position.x = scrollFraction * maxScrollX;
}

init();