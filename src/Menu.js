

class Menu{
  constructor(x, y, width, height, color_background, color_option, color_option_hover, fontSize){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color_background = color_background;
    this.color_option = color_option;
    this.color_option_hover = color_option_hover;
    this.options = [];
    this.fontSize =  fontSize;
  }

  addOption(name, x, y, width, height, execute){
    this.options.push({
      'name': name,
      'x' : this.x+x,
      'y': this.y+y,
      'width': width,
      'height': height,
      'execute': execute,
      'color': this.color_option,
      'hover': false,
      })
  }
  

  show(){
    fill(this.color_background);
    rect(this.x, this.y, this.width, this.height);
    noFill();

    for(const option of this.options){
      fill(option.color);
      let _x = option.x - option.width/2;
      let _y = option.y - option.height/2;
      rect(_x, _y, option.width,option.height);

      fill(0);
      textFont("monospace", this.fontSize);
      textAlign(CENTER, CENTER);
      text(option.name,option.x,option.y);
      noFill();
    }
  }

  update(){
    for(const option of this.options){
      if(mouseX < option.x + option.width/2 &&
         mouseY < option.y + option.height/2 &&
         mouseX > option.x - option.width/2 &&
         mouseY > option.y - option.height/2)
      {
        option.color = this.color_option_hover;
        option.hover = true;
      }else{
        option.color = this.color_option;
        option.hover = false;
      }
    }

    for(const option of this.options){
      if(option.hover && mouseIsPressed){
        mouseIsPressed = false;
        option.execute();
      }
    
    }
  }
}