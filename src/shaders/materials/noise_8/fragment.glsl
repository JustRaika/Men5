precision mediump float;

// Common uniforms
uniform float u_time;
// uniform vec2 u_scroll;
// uniform vec2 u_resolution;

// varyings
varying vec3 v_position;
varying vec3 v_normal;

// include chunks
#include <hash>

void main() {
    // Simple noise based on position
    float n = hash(v_position * 0.1);
    gl_FragColor = vec4(vec3(n), 1.0);
}