// This file include function that are used cross diffrent noises. So they can be included in the same file without glashing.

// Perlin 3D / Simplex 3D / Simplex 3D Grad / Worley
vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

// Perlin 3D / Perlin 4D / Simplex 3D / Simplex 3D Grad / Simplex 4D
vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

// Perlin 3D / Perlin 4D / Simplex 3D / Simplex 3D Grad / Simplex 4D
vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+10.0)*x);
}

// Perlin 3D / Perlin 4D / Simplex 3D / Simplex 3D Grad / Simplex 4D
vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}