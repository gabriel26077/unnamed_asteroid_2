class Meteoro{
    constructor(x,y, radius, life,xf,yf){
        this.life = life;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.angle = 0;
        this.ax =  (xf-x)/Math.sqrt((yf-y)*(yf-y) + (xf-x)*(xf-x));
        this.ay =  (yf-y)/Math.sqrt((yf-y)*(yf-y) + (xf-x)*(xf-x));
    }

    
    show(){
        push();
        imageMode(CENTER);
        translate(this.x, this.y);
        rotate(this.angle);
        this.angle+=0.01;
        //circle(0,0,this.radius);
        image(img_Meteoro,0, 0,this.radius, this.radius);
        pop();
        
    }

    update(){
        this.x += this.ax;
        this.y += this.ay;
    }


}