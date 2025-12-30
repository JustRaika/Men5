// für kleine Helferfunktionen wie Raycaster

import * as THREE from 'three';

export function getMouseRay(mouse, canvas, camera) {
    const pos = new THREE.Vector2(
        (mouse.x / canvas.clientWidth) * 2 - 1,
        -(mouse.y / canvas.clientHeight) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pos, camera);
    return raycaster;
}
