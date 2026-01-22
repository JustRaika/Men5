precision mediump float;

uniform float u_time;

varying vec3 v_normal;

void main() {
    vec3 col = vec3(0.7, 0.2, 0.9);

    float strength = 1.0;
    float ambient = 0.3;
    vec3 light = normalize(vec3(1.0, 1.0, 1.0));
    
    // rotate light based on position and time
    vec3 lightRot = vec3(light.x * cos(u_time), light.y, light.z * sin(u_time));

    float dProd = max(0.0, dot(v_normal, lightRot)) * strength + ambient;
    col *= dProd;

    gl_FragColor = vec4(col, 1.0);
}