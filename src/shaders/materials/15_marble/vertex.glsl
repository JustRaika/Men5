precision mediump float;

// declare the varyings to pass data to the fragment shader
varying vec3 v_position;
varying vec3 v_normal;
varying vec3 v_camPos;

void main() {
    // Save the varyings
    v_position = position;
    v_normal = normalize(normal);
    v_camPos = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;

    // Vertex shader output
    gl_Position = projectionMatrix * modelViewMatrix * vec4(v_position, 1.0);
}