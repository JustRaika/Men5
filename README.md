# The Shader Planetarium 
A mentoring project in collaboration to get to know the realm of shaders in computer graphics. 

# Contributors
- [Jan Schwegler](https://github.com/JanSchwegler)
- [Dominika Degtyareva](https://github.com/JustRaika)

# How to install and run
1. Clone the repository
   ```bash
   git clone https://github.com/JustRaika/Men5.git
   ```
   -> Alternatively, you can download the ZIP file from the GitHub repository and extract it to your desired location or do it via `Github Desktop`.

2. Navigate to the project directory
    ```bash
    cd Men5
    ```

3. Install dependencies
     ```bash
        npm install
     ```
    -> This project requires Node (v20 or higher) and npm (bundled with Node.js). If you don't have Node, please download and install it from https://nodejs.org/.

4. Start the development server
     ```bash
        npm run dev
    ``` 

5. Open your browser and go to `http://localhost:5173/Men5/dist/` (or the URL provided in the terminal). Ensure the port is available.


# Tech Setup
- Three.js
- Vite
- GLSL
- HTML/CSS/JS
- Node.js
- (WebGL)

# Shader Basics
All technical research is recorded on our [Miro!](https://miro.com/app/board/uXjVJGpaUj0=/)

# Shader Knowlege aquired
- Shader languages: GLSL
- Shader types: Vertex, Fragment, Compute
- Shader platforms: WebGL
- Shader editors: Shadertoy
- Uniforms
- Setup and Include
- Varyings

# Snippets

## Noises
For most of the Noises the position can me added to the time with a scalar:
```glsl
vec3 p = v_position * 2.0 + 0.3 * u_time;
```
### Worley 3D
Most common: use F1 as grayscale 
```glsl
float n = cellular(v_position * 3.0).x;
gl_FragColor = vec4(vec3(n), 1.0);
```
Use cell borders (F2 − F1)
```glsl
vec2 c = cellular(v_position * 3.0);
float edge = c.y - c.x;
gl_FragColor = vec4(vec3(edge), 1.0);
```

### Perlin 3D
```glsl
float n = cnoise(v_position * 2.0);
gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
```

### Perlin 4D
```glsl
float n = cnoise(vec4(v_position * 2.0, 0.3 * u_time));
gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
```

### Simplex 3D
```glsl
float n = snoise(v_position * 2.0);
gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
```

### Simplex 3D Gradient
```glsl
vec3 grad;
float n = snoise(v_position * 3.0, grad);
gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
```

### Simplex 4D
```glsl
float n = snoise(vec4(v_position * 2.0, 0.3 * u_time));
gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
```

### fbm
Fractial Brownian motion takes a noise and adds octaves to it. That means multiple layers of the noise multiplied. With every octave, the base noise function is called again. With the "step", an offset can be added to each layer (diffrent in each layer).
```glsl
vec3 pos = vec3(v_position.xy, 0.3 * u_time);
float n = fbm(pos, 5, 2.0, 0.4, vec2(0.0, 0.0));
gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
```
This works on flat surfaces but not on spheres. For spheres, its best to map to spherical coordinates:
```glsl
float scale = 1.0;

vec3 p = normalize(v_position);
float theta = atan(p.y, p.x);
float phi = acos(p.z);

vec3 sp = vec3(cos(theta) * sin(phi),
                sin(theta) * sin(phi),
                cos(phi)) * scale;

float n = fbm(sp, 5, 2.0, 0.4, vec2(0.0, 0.0));

gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
```
(After the scale, motion can be added. For example: scale + 0.3 * u_time)

## Map UV to -1,1
```glsl
vec2 p = v_uv * 2.0;
vec2 q = p - vec2(0.5, 0.5);

// modify vec2 to move element
vec2 q = p - vec2(0.3, 0.6);
```

## Map from -1,1 to 0,1
```glsl
0.5 + 0.5 * n

// example
vec3 n = noise(v_position); // n: -1,1
gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0); // 0,1
```
## Custom smoothstep function of f
```glsl
float u = f * f * ( 3.0 - 2.0 * f );
float u = smoothstep( 0.0, 1.0, f );
```

# Resources
- [https://threejs.org/]

- [https://thebookofshaders.com/]
- [https://www.shadertoy.com/]
- [https://aerotwist.com/tutorials/an-introduction-to-shaders-part-2/]
- [https://webgl-shaders.com/index.html]

# ToDo
- [ ] Kind of interactable for spheres
- [ ] 
