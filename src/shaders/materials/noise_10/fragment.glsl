precision mediump float;

// Common uniforms
uniform float u_time;
// uniform vec2 u_scroll;
// uniform vec2 u_resolution;

// varyings
varying vec3 v_position;
varying vec3 v_normal;

// include chunks
#include <noisebase>
#include <simplex3D>
#include <worley3D>

void main() {
    float n = cellular(v_position * 5.0 + u_time * 0.2).x + 0.5 * snoise(v_position * 2.0 + u_time * 0.5);
    gl_FragColor = vec4(vec3(n), 1.0);
}