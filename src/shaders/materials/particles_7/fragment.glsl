precision mediump float;

// Common uniforms
// uniform float u_time;
// uniform vec2 u_scroll;
// uniform vec2 u_resolution;

// varyings
//varying vec3 v_normal;
varying vec3 v_color;

void main() {
    
    vec2 coord = gl_PointCoord - 0.5;
    float dist = length(coord);
    if (dist > 0.5) discard;

    gl_FragColor = vec4(v_color, 1.0);
}