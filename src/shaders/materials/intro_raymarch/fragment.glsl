precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_sceneFade;

#include <noisebase>
#include <simplex3D>
#include <fbm>

varying vec2 vUv;

// This function generates a pseudo-random value based on the input coordinates p. 
// It uses fractal and dot products to create a unique hash value, which can be useful for creating random patterns.
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

    float time = u_time * 0.1;

    // Create a tunnel effect using radial coordinates
    float r = length(uv);
    float tunnel = smoothstep(2.5, 0.0, r); 

    vec3 p = vec3(uv * 1.5, time);

    float clouds = fbm(p, 8, 2.0, 0.5, vec2(10.0, 20.0));
    clouds = smoothstep(0.2, 0.8, clouds);

    float stars = step(0.995, hash(uv * 200.0 + time));

    vec3 nebula = mix(
        vec3(0.05, 0.05, 0.15),
        vec3(0.6, 0.3, 1.9),
        clouds
    );

    vec3 col = nebula * tunnel;
    col += stars * vec3(0.6);

    col *= smoothstep(1.6, 0.8, r); // Vignette

    gl_FragColor = vec4(col, 1.0);

    gl_FragColor.rgb *= u_sceneFade;
}
