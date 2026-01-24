precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_sceneFade;

#include <noisebase>
#include <simplex3D>
#include <fbm>

varying vec2 vUv;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

    float time = u_time * 0.4;

    float r = length(uv);
    float tunnel = smoothstep(0.9, 0.2, r);

    vec3 p = vec3(uv * 1.5, time);

    float clouds = fbm(p, 4, 2.0, 0.5, vec2(10.0, 20.0));
    clouds = smoothstep(0.2, 0.8, clouds);

    float stars = step(0.995, hash(uv * 200.0 + time));

    vec3 nebula = mix(
        vec3(0.2, 0.15, 0.4),
        vec3(0.8, 0.4, 1.0),
        clouds
    );

    vec3 col = nebula * tunnel;
    col += stars * vec3(1.2);

    col *= smoothstep(1.2, 0.3, r);


    gl_FragColor = vec4(col, 1.0);

    gl_FragColor.rgb *= u_sceneFade;
}
