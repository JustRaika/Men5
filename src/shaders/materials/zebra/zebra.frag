precision mediump float;

// Common uniforms
uniform float u_time;

// Common varyings
varying vec3 v_position;


/*
 * The main program
 */
void main() {

    // Set the surface color
    vec3 surface_color = vec3(0.5 + 0.5 * cos(20.0 * v_position.y + 3.0 * u_time));

    // Fragment shader output
    gl_FragColor = vec4(surface_color, 1.0);
}