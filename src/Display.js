
class Display{
    constructor(x,y,width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }



    show(obj, op){
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
        textSize(20);
        write(`Mão: ${op[obj.hand]}
Aldeões: ${obj.aldeoes}
Comida: ${obj.comida}
Consumo: ${obj.consumo}
Ocas: ${obj.ocas}
fazendas: ${obj.fazendas}`
        ,this.x+5, this.y+0.1*this.height);

        noFill();
    }
}