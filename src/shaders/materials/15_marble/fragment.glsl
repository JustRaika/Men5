precision mediump float;

// Common uniforms
uniform float u_time;
// uniform vec2 u_scroll;
// uniform vec2 u_resolution;

// varyings
varying vec3 v_normal;
varying vec3 v_position;
varying vec3 v_camPos;

// include chunks
// #include <noisebase>
// #include <simplex3D>
// #include <perlin3D>
// #include <worley3D>
// #include <fbm>
// #include <curl>

// static definitions
#define RADIUS 1.0
#define MAP_OCTAVE 5
#define STEPS 64

// complex square -> base of the marble-pattern
vec2 csqr( vec2 a )  { 
    return vec2( 
        a.x*a.x - a.y*a.y, 
        2.*a.x*a.y 
    ); 
}

// map scene -> create inner marble pattern
float map(in vec3 p)
{
    float result = 0.0; // Accumulation on ray to return
    vec3 c = p; // save point as center

    // ------------------------------------------------------------
    // ChatGPT description of the loop:
    // ------------------------------------------------------------
    // You throw a point into a mathematical blender,
    // twist and fold it several times,
    // and measure how often it “remembers” where it came from.
    // ------------------------------------------------------------

    for (int i = 0; i < MAP_OCTAVE; ++i) // loop pattern / add layers
    {
        p = 0.7 * abs(p) / dot(p,p) -0.7; // Create some sort of  infinite chaos (fractal inversion + fold)
        p.yz += csqr(p.yz); // add in each loop a new layer of the complex square
        p=p.zxy; // rotates axies to spread in all directions
        result += exp(-25.0 * abs(dot(p,c))); // creates thin glowing filaments between center and distorted point
    }
    return result;
}

// get first and last hit of ray (enter and leave)
// uses sphere as default 
vec2 intersectSphere( in vec3 ro, in vec3 rd, in vec4 sph ) // tMin & tMax
{
	vec3 oc = ro - sph.xyz; // “origin to center”: vector from sphere to camera
	float b = dot (rd, oc); // ray towords sphere? -> how much is the ray tha same as tha oc?
	float c = dot (oc, oc); // squared distance from ray origin to sphere center
	float h = b*b - c + sph.w*sph.w; // check if ray hits sphere
	if (h < 0.0) return vec2(-1.0); // if miss
	h = sqrt(h);
	return vec2(-b-h, -b+h ); // distance vales where the ray hits the sphere. (enter and leave)
}

// raymarch
vec3 raymarch( in vec3 ro, vec3 rd, vec2 tminmax )
{
    float t = tminmax.x; // first sphere hit
    float dt = 0.02; // step size
    dt = 0.02 + 0.01 * cos( u_time * 0.5); // animate step size

    vec3 col= vec3(0.0); // color
    float c = 0.0; // density value at the current sample

    for( int i=0; i < STEPS; i++ ) 
    {
        t += dt * exp(-2.0*c); // increase distance (dynamic step)
        if(t>tminmax.y)break; // break on shpere leave
        vec3 pos = ro + t * rd; // current position on ray
        c = 0.45 * map(ro + t * rd); // magic: get content at current point

        // adding up color
        col = 0.98*col + 0.08*vec3(c*c, c, c*c*c);  // green
        col = 0.99*col + 0.08*vec3(c*c*c, c*c, c);  // blue
        col = 0.99*col + 0.08*vec3(c, c*c*c, c*c);  // red
    }
    return col;
}

void main() {
    // camera
    vec3 ro = v_camPos; // ray origin
    vec3 rd = normalize(v_position - v_camPos); // ray direction
    
    // sphere bounds
    float radius = 1.0;
    vec2 tmm = intersectSphere( ro, rd, vec4(0.,0.,0.,radius) );

    // raymarch
    vec3 col = raymarch(ro,rd,tmm);

    // shade
    col = 0.5 *(log(1.0 + col));
    col = clamp(col, 0.0, 1.0);

    // alpha
    float intensity = max(max(col.r, col.g), col.b);
    float alpha = smoothstep(0.0, 0.3, intensity);

    if (tmm.x > 0.0)
    {
        vec3 hitPos = ro + tmm.x * rd;
        vec3 nor = normalize(hitPos);

        // classic Fresnel
        float fresnel = pow(
            1.0 - clamp(dot(nor, -rd), 0.0, 1.0),
            3.0
        );

        // subtle glass highlight
        vec3 glassTint = vec3(1.0); // white glass
        col += glassTint * fresnel * 0.25;

        // optional slight alpha boost at edges
        alpha += fresnel * 0.1;
    }

    gl_FragColor = vec4(col, alpha);
}