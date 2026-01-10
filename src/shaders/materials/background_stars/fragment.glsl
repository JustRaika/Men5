precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

float random(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    float density = 600.0;
    vec2 grid = uv * density;

    // change star visibility with time
    grid = uv * density + u_time * 0.025;

    vec2 cell = fract(grid) - 0.5;
    vec2 id = floor(grid);

    float rnd = random(id);

    float star = step(0.98, rnd);

    float d = length(cell);
    float circle = smoothstep(0.08, 0.0, d);

    float flicker = sin(u_time * 3.0 + rnd * 10.0) * 0.15 + 0.90;
    //float flicker = sin(u_time * 1.5 + rnd * 10.0) * 0.4 + 0.6;

    float brightness = star * circle * flicker;

    // gradient
    float gf = uv.y;
    vec3 bgColorTop= vec3(0.06, 0.04, 0.1);
    vec3 bgColorBottom = vec3(0.01, 0.01, 0.03);
    vec3 bgColor = mix(bgColorBottom, bgColorTop, gf);

    // mix
    bgColor += brightness;

    gl_FragColor = vec4(vec3(bgColor), 1.0);
}
