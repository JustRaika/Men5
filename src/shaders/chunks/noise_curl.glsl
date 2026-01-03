// based on fbm and hash
#include <fbm>

vec3 curl(vec3 p) {
    const float eps = 0.01;
    float dx = fbm(p + vec3(eps,0,0)) - fbm(p - vec3(eps,0,0));
    float dy = fbm(p + vec3(0,eps,0)) - fbm(p - vec3(0,eps,0));
    float dz = fbm(p + vec3(0,0,eps)) - fbm(p - vec3(0,0,eps));
    return normalize(vec3(dy - dz, dz - dx, dx - dy));
}
