vec3 random3(vec3 c){
    float j = 4096.0*sin(dot(c,vec3(17.0,59.4,15.0)));
    vec3 r;
    r.z = fract(512.0*j);
    j *= .125;
    r.x = fract(512.0*j);
    j *= .125;
    r.y = fract(512.0*j);
    return r-0.5;
}

float worley(vec3 P){
    float dist = 1.0;
    for(int xo=-1;xo<=1;xo++)
    for(int yo=-1;yo<=1;yo++)
    for(int zo=-1;zo<=1;zo++){
        vec3 b = floor(P)+vec3(xo,yo,zo);
        vec3 r = random3(b);
        dist = min(dist,length(r+ b - P));
    }
    return dist;
}