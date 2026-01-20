precision mediump float;

// Common uniforms
// uniform float u_time;
// uniform vec2 u_scroll;
// uniform vec2 u_resolution;

// varyings
varying vec3 v_position;
varying vec3 v_normal;

// include chunks
#include <noisebase>
#include <simplex3D>
#include <worley3D>
#include <fbm>

void main() {

    // -----------------------------
    // 1. Worley for craters
    // -----------------------------
    vec2 cell = cellular(v_normal * 3.0);   // crater count / scale
    float crater = cell.x;                  // F1 = nearest cell
    crater = pow(crater, 1.5);         // crater sharpness

    // -----------------------------
    // 2. FBM Simplex for roughness
    // -----------------------------
    float surface = fbm(
        v_normal * 3.0,
        5,      // octaves
        2.0,    // lacunarity
        0.5,    // gain
        vec2(1.3, 1.7)
    );

    surface = surface * 0.5 + 0.5;

    // -----------------------------
    // 3. Combine
    // -----------------------------
    float height =
        crater * 0.6 +   // crater depth
        surface * 0.3;   // small noise

    height = clamp(height, 0.0, 1.0);

    // base colors
    vec3 dark = vec3(0.25, 0.12, 0.08);
    vec3 mid  = vec3(0.65, 0.35, 0.25);
    vec3 high = vec3(0.90, 0.75, 0.60);

    // smooth transitions
    vec3 color = mix(dark, mid, smoothstep(0.0, 0.7, height));
    color = mix(color, high, smoothstep(0.4, 1.0, height));

    gl_FragColor = vec4(vec3(color) , 1.0);
}