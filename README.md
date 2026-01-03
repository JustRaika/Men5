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

## Map UV to -1 - 1
```glsl
vec2 p = v_uv * 2.0;
vec2 q = p - vec2(0.5, 0.5);

// modify vec2 to move element
vec2 q = p - vec2(0.3, 0.6);
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
