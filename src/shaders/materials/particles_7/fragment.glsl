precision mediump float;

// Common uniforms
// uniform float u_time;
// uniform vec2 u_scroll;
// uniform vec2 u_resolution;

// varyings
varying vec3 v_normal;

void main() {
    gl_FragColor = vec4(v_normal * 0.5 + 0.5, 1.0);
}