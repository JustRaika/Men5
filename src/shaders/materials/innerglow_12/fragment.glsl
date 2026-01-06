precision mediump float;

uniform float u_time;

varying vec3 v_normal;
varying vec3 v_viewPosition;

void main() {

    vec3 normal = normalize(v_normal);
    vec3 viewDir = normalize(-v_viewPosition);

    // outer glow based on rim lighting
    float rim = 1.0 - max(dot(normal, viewDir), 0.0);
    rim = pow(rim, 2.5);


    float pulse = sin(u_time * 4.2) * 0.5 + 0.5;
    pulse = mix(0.8, 1.2, pulse);

    float glow = rim * pulse;

    // inner color based on distance to center
    float inner = smoothstep(3.5, 0.0, length(v_viewPosition));

    vec3 innerColor = mix(
        vec3(0.1, 0.2, 0.6),
        vec3(0.3, 0.8, 1.0),
        inner
    );

    vec3 glowColor = vec3(0.73, 0.64, 0.95);

    // final color
    vec3 color =
        innerColor * inner +
        glowColor * glow * 2.0;

    gl_FragColor = vec4(color, 1.0);
}
