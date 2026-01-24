import * as THREE from 'three'
import { createIntroMaterial } from '../shaders/materials/intro_raymarch/material.js'

// Sets up the intro scene with camera and quad mesh
export function setupIntro(renderer) {
    const scene = new THREE.Scene()

    const camera = new THREE.OrthographicCamera(
        -1, 1, 1, -1, 0, 1
    )

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = createIntroMaterial()
    const mesh = new THREE.Mesh(geometry, material)

    scene.add(mesh)

    return {
        scene,
        camera,
        material
    }
}
