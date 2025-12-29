precision mediump float;

// declare the varyings to pass data to the fragment shader
varying vec3 v_position;
varying vec3 v_normal;
uniform float u_time;

void main() {
    // Save the varyings
    v_position = position;
    v_normal = normalize(normalMatrix * normal);

    float height = 0.15;

    // Vertex shader output
    gl_Position = projectionMatrix * modelViewMatrix * vec4((v_position.x * 0.5) + 0.03 * cos(v_position.y * 18.0 + 2.0 * u_time), 
    v_position.y + height * sin(u_time * 1.6) + height, 
    v_position.z, 
    1.0);
}