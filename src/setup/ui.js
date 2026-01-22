import * as THREE from 'three';

// Sets up the about section overlay with open/close functionality
export function setupAboutUI({ timeManager, clock }) {
     const aboutBtn = document.getElementById('about-btn');
     const overlay = document.getElementById('about-overlay');
     const closeBtn = document.getElementById('about-close');

     if (!aboutBtn || !overlay || !closeBtn) return;

     // Open overlay when about button is clicked
     aboutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          overlay.classList.add('active');
          document.body.classList.add('ui-open');
          timeManager?.pause(clock); // Pause the clock/animation
          hideSphereInfo();
     });

     // Close overlay when close button or overlay background is clicked
     closeBtn.addEventListener('click', close);
     overlay.addEventListener('click', (e) => {
          if (e.target === overlay) close();
     });

     // Close overlay when Escape key is pressed
     window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && overlay.classList.contains('active')) {
                close();
          }
     });

     // Helper function to close overlay and resume animation
     function close() {
          overlay.classList.remove('active');
          document.body.classList.remove('ui-open');
          timeManager?.resume(clock);
     }
}

let infoEl = null; // DOM element for the info box
let targetObject = null; // The 3D object being tracked

const offset = { x: -400, y: -180 }; // Pixel offset for info box positioning

// Creates the sphere info UI element and attaches it to the page
export function setupSphereInfoUI() {
     infoEl = document.createElement('div');
     infoEl.className = 'sphere-info';
     infoEl.innerHTML = `
          <button class="sphere-info-close">✕</button>
          <h3></h3>
          <div></div>
     `;
     document.body.appendChild(infoEl);

     infoEl.querySelector('.sphere-info-close')
          .addEventListener('click', hideSphereInfo);
}

// Displays the sphere info box with the object's name and description
export function showSphereInfo(object) {
     targetObject = object;
     infoEl.querySelector('h3').textContent = object.name;
     infoEl.querySelector('div').innerHTML = object.description ? object.description : `
          Currently is no description available.
          <br/>
          <br/>
          <a href="https://github.com/JustRaika/Men5/tree/main/src/shaders/materials" target="_blank">Our Shader Programs</a>    
     `;
     infoEl.classList.add('active');
}

// Hides the sphere info box
export function hideSphereInfo() {
     targetObject = null;
     infoEl.classList.remove('active');
     infoEl.addEventListener('transitionend', () => {
          infoEl.style.transform = 'none';
     }, { once: true });
}

// Updates the info box position to follow the 3D object on screen
export function updateSphereInfoPosition(camera) {
     if (!targetObject || !infoEl.classList.contains('active')) return;

     const pos = targetObject.position.clone();
     pos.project(camera); // Convert 3D position to screen coordinates

     const x = (pos.x * 0.5 + 0.5) * window.innerWidth + offset.x;
     const y = (-pos.y * 0.5 + 0.5) * window.innerHeight + offset.y;

     infoEl.style.transform = `translate(${x}px, ${y}px)`;
}
