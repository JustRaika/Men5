precision mediump float;

// uniforms
uniform float u_time;

// varyings
varying vec3 v_position;
varying vec2 v_uv;
varying vec3 v_normal;

void main() {
    vec2 p = v_uv;
    vec2 q = p - vec2(0.5);

    // Set the surface color
    vec3 col = vec3(0.5, 0.5, 1);

    col *= v_normal.x + 1.0;
    // col *= smoothstep( 0.2, 0.3, length( q ));

    // Fragment shader output
    gl_FragColor = vec4(col, 1.0);
}