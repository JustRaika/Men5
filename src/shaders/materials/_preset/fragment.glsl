precision mediump float;

// Common uniforms
// uniform float u_time;
// uniform vec2 u_scroll;
// uniform vec2 u_resolution;
uniform float u_sceneFade;

// varyings
varying vec3 v_normal;

// include chunks
// #include <noisebase>
// #include <simplex3D>
// #include <perlin3D>
// #include <worley3D>
// #include <fbm>
// #include <curl>

void main() {
    gl_FragColor = vec4(v_normal * 0.5 + 0.5, 1.0);
    gl_FragColor.rgb *= u_sceneFade;
}