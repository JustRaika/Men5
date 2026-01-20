precision highp float;

// Common uniforms
// uniform float u_time;
// uniform vec2 u_scroll;
// uniform vec2 u_resolution;
uniform vec2 u_mouse;

// varyings
varying vec3 v_normal;
varying vec3 v_position;
varying vec3 v_camPos;

// raymarch definitions
#define STEPS 64 // loop steps
#define MAX_DIST 5.0 // far plane from camera -> cam.pos: 4.0 + radius: 0.5
#define SURF_DIST 0.001 // acurracy threshold 

// signed distance to sphere
float sdfSphere(vec3 p, float r) {
    float mouseX = u_mouse.x * -0.4 + 0.55; // remap to 0.15, 9.5
    float mouseY = u_mouse.y * -0.4 + 0.55; // remap to 0.15, 9.5

    p.x *= mouseX; // make it oval
    p.y *= mouseY; // make it oval
    return length(p) - r; // returns where the current ray point is -> negative: in the sphere / positive: outside / 0: surface
}

// scene SDF
float map(vec3 p) {
    return sdfSphere(p, 0.5);
}

// raymarch
float raymarch(vec3 ro, vec3 rd) {
    float d = 0.0; // current traveled distance along ray
    for (int i = 0; i < STEPS; i++) {
        vec3 p = ro + rd * d; // get point at travel distance
        float h = map(p); // check distance SDF
        if (h < SURF_DIST || d > MAX_DIST) break; // break on hit or if nothing is hit after MAX_DIST
        d += h; // jump to surface
    }
    return d; // return distance to hit
}

void main() {
    // ray direction in object space
    vec3 ro = v_camPos; // ray origin
    vec3 rd = normalize(v_position - v_camPos); // ray direction

    float d = raymarch(ro, rd); // find hit of every ray (distance from camera)

    vec3 p = ro + rd * d; // hit position in space
    
    float dist = map(p); // Signed distance to surface (in ASD position and scale)

    // SURFACE
    float surface = smoothstep(0.03, 0.0, abs(dist));

    vec3 baseColor = vec3(0.29, 0.2, 0.53);
    vec3 color = baseColor * surface * 1.5;
    float alpha = clamp(surface, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
}