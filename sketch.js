var sword,swordimg;
var inv1,inv2,inv3,inv4;
var fruit,alien;
var fruit1img,fruit2img,fruit3img,fruit4img,alienimg;
var enemyGroup,fruitGroup;
var score,chances;
var gamestate="play";
var gameover,GameOverimg;
var knifeS,gameoverS;



function preload(){
  
  swordimg=loadImage("knife.png");
  
  fruit1img=loadImage("fruit1.png");
  fruit2img=loadImage("fruit2.png");
  fruit3img=loadImage("fruit3.png");
  fruit4img=loadImage("fruit4.png");
  
  alienimg=loadAnimation("alien1.png","alien2.png");
  
  GameOverimg=loadImage("gameover.png");

  knifeS=loadSound("knifeSound.mp3");
  gameoverS=loadSound("gameoverSound.mp3");
}

function setup(){
  createCanvas(600,600);
  
  sword=createSprite(300,300,10,10);
  sword.addImage(swordimg);
  sword.scale=0.5;

  
  inv1=createSprite(300,2,600,5);
  inv1.visible=false;
  inv2=createSprite(300,598,600,5);
  inv2.visible=false;
  inv3=createSprite(2,300,5,600);
  inv3.visible=false;
  inv4=createSprite(598,300,5,600);
  inv4.visible=false;
  
  fruitGroup=new Group();
  enemyGroup=new Group();
  
  score=0;
  chances=3;
  
  gameover=createSprite(300,320,10,10);
  gameover.addImage(GameOverimg);
  gameover.scale=1;

}

function draw(){
  background("lightgreen");

  if(gamestate==="play"){
    
   sword.y=mouseY;
   sword.x=mouseX;
        
   sword.collide(inv1);
   sword.collide(inv2);
   sword.collide(inv3);
   sword.collide(inv4);
  
   FRUIT();
   ENEMY();
  
   if(sword.isTouching(fruitGroup)){
     fruitGroup.destroyEach();
     score=score+2;    
     knifeS.play(); 
   }
  
   if(sword.isTouching(enemyGroup)) {
     enemyGroup.destroyEach();
     chances=chances-1;
     score=score-3;
     knifeS.play(); 
   }
    
     gameover.visible=false;  
    
     if(chances===0){
     gamestate="end";
     gameoverS.play();  
   }
    
  }else if(gamestate==="end"){   
    fruitGroup.setVelocityEach(0);
    enemyGroup.setVelocityEach(0);
    sword.x=300;
    sword.y=250;
    gameover.visible=true;    
    fill("black");
    textSize(20);
    text("ENTER to restart",220,370);
    textSize(25);
    text("Score  "+score,250,210);
  }    

  
  if(keyWentDown("enter")){
    gamestate="play";
    score=0;
    chances=3;
  }
 
  fill("black");
  textSize(15);
  text("Score  "+score,20,30);
  textSize(15);
  text("Chances  "+chances,100,30);

  drawSprites();
}

function FRUIT(){
  if(World.frameCount%80===0){
  fruit=createSprite(600,Math.round(random(50,340)),10,10);
  rand=Math.round(random(1,4));
    
  if(rand===1){
    fruit.addImage(fruit1img); 
  } else if (rand===2){
    fruit.addImage(fruit2img);
  }else if(rand===3){
    fruit.addImage(fruit3img);
  }else if(rand===4){
    fruit.addImage(fruit4img);
  }
    
  fruit.scale=0.17;
  fruit.velocityX=-(2+1*score/4);
  fruit.setLifetime=125;
  fruitGroup.add(fruit);
  } 
}

function ENEMY(){
  if(World.frameCount%150===0) {
  alien=createSprite(600,Math.round(random(50,350)),10,10);
  alien.addAnimation("moving",alienimg);
  alien.velocityX=-(2+1*score/5);
  alien.setLifetime=125;
  enemyGroup.add(alien);
  }  
}



