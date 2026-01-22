precision mediump float;

varying vec3 v_position;
varying vec3 v_normal;

void main() {
    v_position = position;
    v_normal = normalize(normal);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(v_position, 1.0);
}