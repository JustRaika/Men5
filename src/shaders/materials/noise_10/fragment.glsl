precision mediump float;

// Common uniforms
uniform float u_time;
// uniform vec2 u_scroll;
// uniform vec2 u_resolution;

// varyings
varying vec3 v_position;
varying vec3 v_normal;

// include chunks
#include <simplex>
#include <worley>

void main() {
    // Simple noise based on position
    float n = worley(v_position * 5.0 + u_time * 0.2) + 0.5 * simplex(v_position * 2.0 + u_time * 0.5);
    gl_FragColor = vec4(vec3(n), 1.0);
}