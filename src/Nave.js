class Nave{
    constructor(x,y, life){
        this.life = life;
        this.x = x;
        this.y = y;
        this.radius = 100;
        this.angle = 0.0;
    }

    show(){
        push();
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let mouseAngle = atan2(dy, dx);
        

        fill("white");
        //circle(this.x,this.y,this.radius);
        translate(this.x,this.y);
        rotate(mouseAngle+PI/2);
        imageMode(CENTER);
        image(img_Nave,0,0,this.radius,this.radius);
        fill('red');
        noFill();
        
        
        pop();
    } 

    
}