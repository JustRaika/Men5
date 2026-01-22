precision mediump float;

varying vec3 v_position;
varying vec3 v_normal;
varying vec3 v_camPos;

void main() {
    v_position = position;
    v_normal = normalize(normalMatrix * normal);

    // camera position transformed into object space
    v_camPos = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(v_position, 1.0);
}