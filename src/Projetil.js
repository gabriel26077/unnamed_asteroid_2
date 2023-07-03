class Projetil{
    constructor(x,y,xf,yf,fire_hate){
        this.x = x;
        this.y = y;
        this.ax =  fire_hate*(xf-x)/Math.sqrt((yf-y)*(yf-y) + (xf-x)*(xf-x));
        this.ay =  fire_hate*(yf-y)/Math.sqrt((yf-y)*(yf-y) + (xf-x)*(xf-x));
        this.radius = 10;
    }

    update(){
        this.x += this.ax;
        this.y += this.ay;
    }

    show(){
        fill('red');
        circle(this.x,this.y,this.radius);
        noFill();
    }

    dist_square(x,y){
        return (this.x-x)*(this.x-x) + (this.y-y)*(this.y-y);
    }
}