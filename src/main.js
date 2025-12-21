import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

const canvas = document.querySelector('#three');

let scene, renderer, camera, clock;
let stats;
let sphere;

// Create a loading manager (Used for tracking loading progress of external assets)
const loadingManager = new THREE.LoadingManager();
loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    const progress = (itemsLoaded / itemsTotal) * 100;
    console.log(`Progress: ${progress.toFixed(2)}% (${itemsLoaded} of ${itemsTotal})`);
};

function init() {
	
	// Check if canvas is available
	if (!canvas) {
		console.error('Canvas element not found!');
		return;
	}

	// Create base Elements
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
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

    // Handle window resize
    window.addEventListener('resize', onResize, false);
    onResize();

	// render loop
    clock = new THREE.Clock();
    renderer.setAnimationLoop(render);
}

function addAssets() {
	// Add a simple Sphere
	const geometry = new THREE.SphereGeometry( 1, 32, 32 );
	const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
	sphere = new THREE.Mesh( geometry, material );
	scene.add( sphere );
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
    // Get delta time (in seconds) from the clock
    const deltaTime = clock.getDelta();

    // Update
    stats.update();

    // Render the scene
    renderer.render(scene, camera);
}

function onResize() {
    const pixelRatio = Math.min(window.devicePixelRatio, 4); // Limit to 4x for performance
    const width = Math.round(canvas.clientWidth * pixelRatio);
    const height = Math.round(canvas.clientHeight * pixelRatio);

    // Set renderer size and adjust canvas attributes
    renderer.setSize(width, height, false);
    canvas.width = width;
    canvas.height = height;

    // Update camera aspect ratio and projection matrix
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
}

init();