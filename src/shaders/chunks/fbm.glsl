// include chunks
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