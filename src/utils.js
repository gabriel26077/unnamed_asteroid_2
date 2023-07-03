function write(str, x, y){
    fill(0);
    text(str, x, y);
    noFill();
}

function distancia2(ob1, ob2){
    return Math.pow(ob1.x-ob2.x,2) + Math.pow(ob1.y-ob2.y,2);
}

function circleColliding(ob1, ob2){
    d = distancia2(ob1, ob2);
    if(d*4.5 < Math.pow(ob1.radius + ob2.radius,2)){
        return true;
    }
    return false;
}

function testCircleCollideVector(c, vet){
    for(let i=0; i<vet.length; i++){
        if(circleColliding(c, vet[i])){
            return true;
        }
    }
    return false
}

function sign(x) {
    return x >= 0 ? 1 : -1;
}


function random_intervalo(a1,a2,b1,b2){
    let e = random(-1,1);
    let r;
    if(e<0){
        r = random(a1,a2);
    }else{
        r = random(b1,b2);
    }
    return r;
}
