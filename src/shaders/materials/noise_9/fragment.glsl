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

float fbm(vec3 p, int octaves, float lacunarity, float gain, vec2 step) {
    float sum = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;

    for(int i = 0; i < 10; i++) { // max loop count must be constant
        if(i >= octaves) break;

        vec3 offset = vec3(step * float(i), 0.0);
        sum += amplitude * snoise(p * frequency - offset);

        frequency *= lacunarity;
        amplitude *= gain;
    }

    return sum;
}

void main() {
    float scale = 1.0;

    vec3 p = normalize(v_position);
    float theta = atan(p.y, p.x);
    float phi = acos(p.z);

    vec3 sp = vec3(cos(theta) * sin(phi),
                   sin(theta) * sin(phi),
                   cos(phi)) * scale;

    float n = fbm(sp, 5, 2.0, 0.4, vec2(0.0, 0.0));

    gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
}