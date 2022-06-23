var PLAY = 1;
var END = 0;
var gameState = PLAY;


var oceano, imageOceano;
var Pc, imagePc, PcQuebrado;
var onda, imageOnda;
var rocha, imageRocha;
var grupoRochas;

var coins, imageCoin; 
var grupoCoins;
var score;

function preload(){

  imageOceano = loadImage("oceano.png");
  imagePc = loadAnimation("pirata.png");
  imageOnda = loadImage("onda.png");
  imageRocha = loadImage("pedras.png");
  PcQuebrado = loadAnimation("barco_quebrado.png");
  imageCoin = loadImage("coin.png");
}

function setup() {
  createCanvas(600, 600);
  oceano = createSprite(200,200);

  Pc = createSprite(300,500,30,30);
  Pc.setCollider("rectangle", 13, 40, 70, 160, 0);
  Pc.debug = true;

  oceano.addImage(imageOceano);
  oceano.scale= 2;
 
  Pc.addAnimation("navio", imagePc);
  Pc.addAnimation("quebrando", PcQuebrado);
  Pc.scale = 1;

  score = 0;
  
  grupoRochas = new Group();
  grupoCoins = new Group();
  
  
}

function draw() {
  background(180);
  
  
  if(keyDown(UP_ARROW)){
    Pc.y = Pc.y -5;
  }
  if(keyDown(DOWN_ARROW)){
    Pc.y = Pc.y +5;
  }
  if(keyDown(LEFT_ARROW)){
    Pc.x = Pc.x -5;
  }
  if(keyDown(RIGHT_ARROW)){
    Pc.x = Pc.x +5;
  }
  //if(mouseClicked){
  //  gameState === PLAY;
  //}
  if(gameState === PLAY){
    if(keyDown(UP_ARROW)){
      Pc.y = Pc.y -5;
    }
    if(keyDown(DOWN_ARROW)){
      Pc.y = Pc.y +5;
    }
    if(keyDown(LEFT_ARROW)){
      Pc.x = Pc.x -5;
    }
    if(keyDown(RIGHT_ARROW)){
      Pc.x = Pc.x +5;
    }
    
    if(grupoRochas.isTouching(Pc)){
      gameState = END;
      console.log("play");
    }
    if(grupoCoins.isTouching(Pc)){
      score = score +1;
      coins.destroy();
    }




    


      
  }
  


  
    
  
  if (gameState === END) {
    
    Pc.changeAnimation("quebrando");
    Pc.velocity = 0;
  }
   

  

  
  
  ondas();
  Rochas();
  moedas()

  drawSprites();
  text("score =" + score, 500, 10);
  
}


function  ondas() {


   if (frameCount % 5 === 0) {
    onda = createSprite(40,40);


    onda.x = Math.round(random(10,580));


    onda.addImage(imageOnda);
    onda.scale = 2;

    onda.velocityY = +4;
 


    onda.lifetime = 590;
    
    Pc.depth = onda.depth;

    Pc.depth = Pc.depth + 1;

    

    }
}

function Rochas(){
  if(frameCount % 100 === 0) {
    rocha = createSprite(50,70);
    rocha.setCollider("circle", 20, -25, 65);
    

    rocha.x = Math.round(random(0,590));
    rocha.velocityY = +4;

    rocha.addImage(imageRocha);
    rocha.scale = 1;
    rocha.lifetime = 590;

    rocha.deapth = onda.depth;

    rocha.depth = rocha.depth +1;

    grupoRochas.add(rocha);
  

  }       
  


}

function moedas(){

  if (frameCount % 100 === 0) {
    coins = createSprite(50,50);
    coins.setCollider("circle", 0, 0, 30);
    coins.debug = true;

    coins.x = Math.round(random(10,580));


    coins.addImage(imageCoin);
    coins.scale = 1;

    coins.velocityY = +2;
 


    coins.lifetime = 590;
    
    rocha.depth = coins.depth;

    rocha.depth = rocha.depth + 1;

    grupoCoins.add(coins);
  }


}
