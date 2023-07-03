//const MAQUINA = 'LOCAL';
const MAQUINA = 'GIT_PAGES';

let func_intervalos = [];

estados = {'menu':1,'game_loop':2, 'tutorial':5, 'sobre':6, 'gameover': 7}
estado = estados.menu; 
projeteis = [];
projeteis_vel = 3;
meteoros = [];
pontos = 0;
vida_inicial = 100;
nivel = 1;

let img_Nave;
let img_gameover;
let img_Meteoro;
let img_tutorial;

let song_projetil;
let song_game;
let song_explosao;

//Caso queira rodar esse programa na máquina local, 
//precisará descomentar da linha 14 até a linha 19
//e comentar da linha 24 até a linha 27.

function preload(){


  if(MAQUINA === 'LOCAL'){
    img_Nave = loadImage("http://localhost:3000/images/Nave.png");
    img_gameover = loadImage("http://localhost:3000/images/gameover.png");
    img_Meteoro = loadImage("http://localhost:3000/images/Meteoro.png");
    img_tutorial = loadImage("http://localhost:3000/images/tutorial.png");
  }else if(MAQUINA === 'GIT_PAGES'){
    img_Nave = loadImage("servidor_arquivos/images/Nave.png");
    img_gameover = loadImage("servidor_arquivos/images/gameover.png");
    img_Meteoro = loadImage("servidor_arquivos/images/Meteoro.png");
    img_tutorial = loadImage("servidor_arquivos/images/tutorial.png")
 }



}

function setup() {
  WIDTH = 0.99*windowWidth;
  HEIGHT = 0.99*windowHeight;
  createCanvas(WIDTH, HEIGHT);
  menu = new Menu(WIDTH/2 - 400/2, HEIGHT/2-300/2,400,300,"#00FF00","#FFFF00","#FFFFFF",30);
  menu.addOption('Jogar',400/2, 70, 200,40, set_state_game_loop);
  menu.addOption('Tutorial',400/2, 120, 200,40, set_state_tutorial);
  menu.addOption('Creditos',400/2, 170, 200,40, set_state_sobre);
  menu.addOption('World',400/2, 220, 200,40, ()=>alert('Mundo'));


  mini_menu = new Menu(WIDTH - 100 , HEIGHT-50,200,200,"#00FF00","#FFFF00","#FFFFFF",30);
  mini_menu.addOption('menu',100/2,50/2,80,30,set_state_menu);

  player = new Nave(WIDTH/2, HEIGHT/2, vida_inicial);
  p = new Projetil(0,0, 400,400);

 if(MAQUINA === 'LOCAL'){
  song_game = new Audio("http://localhost:3000/sons/musica_de_fundo_do_jogo.mp3");
  song_explosao = new Audio("http://localhost:3000/sons/som_de_explosao.mp3");
  song_projetil = new Audio("http://localhost:3000/sons/som_de_tiro.mp3");
 }else if(MAQUINA === 'GIT_PAGES'){
  song_game = new Audio("servidor_arquivos/sons/musica_de_fundo_do_jogo.mp3");
  song_explosao = new Audio("servidor_arquivos/sons/som_de_explosao.mp3");
  song_projetil = new Audio("servidor_arquivos/sons/som_de_tiro.mp3");
}
  
}

function draw() {
  background(20);

  switch(estado){
    case estados.menu:
      run_menu();
    break;

    case estados.game_loop:
      run_game_loop();
    break;

    case estados.gameover:
      run_gameover();
    break;

    case estados.tutorial:
      run_tutorial();
    break;

    case estados.sobre:
      run_sobre();
    break;
  }

  
} 


function set_state_menu(){
  estado = estados.menu;
}

function set_state_game_loop(){

  for(let i=0;i<func_intervalos.length;i++)
    clearInterval(func_intervalos[i]);
  func_intervalos = [];

  estado = estados.game_loop;
  player.life = vida_inicial;
  meteoros = [];
  projeteis = [];
  pontos = 0;
  nivel = 0;
  func_intervalos.push(setInterval(novo_meteoro, 1000));
  song_game.play();
}


function set_state_sobre(){
  estado = estados.sobre;
}

function set_state_tutorial(){
  estado = estados.tutorial;
}

function set_state_gameover(){
  for(let i=0;i<func_intervalos.length;i++)
    clearInterval(func_intervalos[i]);
  func_intervalos = [];
  estado = estados.gameover;
}



function run_menu(){
  menu.show();
  menu.update(); 
}

function run_game_loop(){

  _x = random_intervalo(-100,0,WIDTH, WIDTH+100);
  _y = random_intervalo(-100,0,HEIGHT, HEIGHT+100);
  
  player.show();
  for(const m of meteoros)
    m.update();
    
  if(testCircleCollideVector(player, meteoros)){
    player.life -= 15;
    pontos--;
  }

  if(player.life <= 0)
    set_state_gameover();
  

  for(let i=0; i<meteoros.length; i++){
        if(circleColliding(meteoros[i], player)){meteoros[i].life=0}else
        if(testCircleCollideVector(meteoros[i],projeteis)){
          meteoros[i].life -= 50;
          break;
        }
  }

  for(let i=0; i<meteoros.length; i++){
    if(distancia2(player, meteoros[i])>WIDTH*WIDTH){
      meteoros.splice(i,1);
      break;
    }
  }

  for(let i=0; i<meteoros.length; i++){
      if(meteoros[i].life <= 0){
        pontos++;
        if(meteoros[i].radius > 20){
          meteoros.push(new Meteoro(meteoros[i].x,meteoros[i].y,meteoros[i].radius/2,20,random(0,WIDTH),random(0,HEIGHT)));
          meteoros.push(new Meteoro(meteoros[i].x,meteoros[i].y,meteoros[i].radius/2,20,random(0,WIDTH),random(0,HEIGHT)));
          meteoros.push(new Meteoro(meteoros[i].x,meteoros[i].y,meteoros[i].radius/2,20,random(0,WIDTH),random(0,HEIGHT)));
        }
        meteoros.splice(i,1);
        song_explosao.play();
        break;
      }
  }

  for(let i=0; i<projeteis.length; i++){
    if(testCircleCollideVector(projeteis[i],meteoros)){
      projeteis.splice(i,1);
      break;
    }
  }




  for(const m of meteoros)
    m.show();
  


  if(mouseIsPressed){
    mouseIsPressed = false;
    projeteis.push(new Projetil(player.x, player.y,mouseX,mouseY, projeteis_vel));
    song_projetil.play();
    if(nivel>1)
    for(let i=0;i<nivel-1;i++){
      projeteis.push(new Projetil(player.x, player.y,mouseX+random(-30,30),mouseY + random(-30,30), projeteis_vel));
      song_projetil.play();
    }
  }

  for(let i=0; i<projeteis.length; i++){
    projeteis[i].update();
    projeteis[i].show();
    if(projeteis[i].dist_square(player.x,player.y) > 500*500)
      projeteis.splice(i, 1)
  }
  fill(255);
  text('pontos: '+pontos,100,40);
  text('vida: '+player.life,100,80);
  text('Nível '+nivel,WIDTH/2,60);

  noFill();

  if(pontos > 100*nivel){
    nivel++;
    player.life = vida_inicial*nivel;
    if(projeteis_vel < 10)
    projeteis_vel++;

    func_intervalos.push(setInterval(novo_meteoro, 5000));

  }


  mini_menu.show();
  mini_menu.update();
}



function run_sobre(){
  fill(255);
  text('Autor: Gabriel Sebstião do Nascimento Neto\n Matrícula: 20220027457\nProfessor: Rummenigge Rudson Dantas\nMateria: LOP\nTurma: 3B\n02/07/2023',WIDTH/2,HEIGHT/3);
  noFill();
  mini_menu.show();
  mini_menu.update();
}

function run_gameover(){
  imageMode(CENTER);
  image(img_gameover, WIDTH/2, HEIGHT/2,0.8*HEIGHT,0.8*HEIGHT);
  mini_menu.show();
  mini_menu.update();
}

function run_tutorial(){
  imageMode(CENTER);
  image(img_tutorial, WIDTH/2, HEIGHT/2);
  mini_menu.show();
  mini_menu.update();
}

function novo_meteoro(){
  if(estado==1 || estado == 2)
    meteoros.push(new Meteoro(_x, _y,50, 100,player.x, player.y));
}

