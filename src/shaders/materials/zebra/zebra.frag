#define GLSLIFY 1
// Common uniforms
uniform float uTime;

// Common varyings
varying vec3 v_position;


/*
 * The main program
 */
void main() {

    // Set the surface color
    vec3 surface_color = vec3(0.5 + 0.5 * cos(20.0 * v_position.y + 3.0 * uTime));

    // Fragment shader output
    gl_FragColor = vec4(surface_color, 1.0);
}