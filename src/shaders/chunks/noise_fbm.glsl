// based on hash
#include <hash>

float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 5; i++) {
        value += amplitude * hash(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}
