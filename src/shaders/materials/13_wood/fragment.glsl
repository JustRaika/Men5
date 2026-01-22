precision mediump float;

uniform float u_time;

varying vec3 v_normal;
varying vec3 v_position;

// include chunks
#include <noisebase>
#include <simplex3D>
#include <fbm>

void main() {
    vec3 p = normalize(v_position);
    float radius = length(p.yz); // direction

    float distortion = fbm( // lines distortion
        p * 2.0,
        5,
        2.0,
        0.5,
        vec2(1.7, 9.2)
    );
    radius += distortion * 0.05;

    float rings = sin(radius * 30.0); // rings
    rings = abs(rings);

    rings = smoothstep(0.1, 0.9, rings); // sharpen rings

    float grain = snoise(p * 10.0); // grain for detail
    grain = grain * 0.5 + 0.5;

    float wood = rings;
    wood = mix(wood, grain, 0.3); // combine

    // wood color
    vec3 darkWood   = vec3(0.4, 0.2, 0.08);
    vec3 lightWood = vec3(0.75, 0.55, 0.35);

    vec3 color = mix(darkWood, lightWood, wood);

    float light = dot(v_normal, normalize(vec3(0.4, 0.8, 0.3))) * 0.5 + 0.5;
    color *= light;

    gl_FragColor = vec4(vec3(color), 1.0);
}