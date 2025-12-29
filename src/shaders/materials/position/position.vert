precision mediump float;

// declare the varyings to pass data to the fragment shader
varying vec3 v_position;
varying vec3 v_normal;
varying vec2 v_uv;

void main() {
    // Save the varyings
    v_position = position;
    v_normal = normalize(normalMatrix * normal);
    v_uv = uv;

    // Vertex shader output
    gl_Position = projectionMatrix * modelViewMatrix * vec4(v_position, 1.0);
}