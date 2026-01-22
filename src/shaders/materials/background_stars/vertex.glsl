precision mediump float;

varying vec3 v_position;
varying vec3 v_normal;

void main() {
    v_position = position;
    v_normal = normalize(normalMatrix * normal);

    //gl_Position = projectionMatrix * modelViewMatrix * vec4(v_position, 1.0);
    gl_Position = vec4(position, 1.0);
}
