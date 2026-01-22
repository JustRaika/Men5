precision mediump float;

varying vec3 v_position;
varying vec3 v_normal;

// include chunks
#include <noisebase>
#include <simplex3D>
#include <worley3D>
#include <fbm>

void main() {
    v_position = position;
    v_normal = normalize(normal);

    // 1. Worley for craters
    vec2 cell = cellular(v_normal * 3.0);   // crater count / scale crater count
    float crater = cell.x;                  // F1 = nearest cell
    crater = 1.0 - crater;                  // invert color
    crater = pow(crater, 6.0);         // crater sharpness

    // 2. FBM Simplex for roughness
    float surface = fbm(
        v_normal * 3.0,
        5,      // octaves
        2.0,    // lacunarity
        0.5,    // gain
        vec2(1.3, 1.7)
    );

    surface = surface * 0.5 + 0.5;

    // 3. Combine
    float height =
        crater * -0.2 +   // crater depth
        surface * 0.05;   // small noise

    vec3 newPos = v_position + v_normal * height;
    
    // Vertex shader output
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}