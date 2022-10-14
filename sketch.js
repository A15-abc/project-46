let ground;
let lander;
var lander_img;
var bg_img;
var ground_img;
var obgroup;
var ob1, ob2, ob3, ob4, ob5, ob6;
var ob1i, ob2i, ob3i, ob4i, ob5i, ob6i;
var star, star_img, cgroup;
var ufo;
var heart, heart_img, heartgroup;


var vx = 0;
var g = 0.05;
var vy = 0;
var score = 0;
var x1;
var y1;
var x2;
var y2;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  ground_img = loadImage("bg_sur.png")
  ob1i = loadImage("alien.png")
  ob2i = loadImage("astronaut.png")
  ob3i = loadImage("met.png")
  ob4i = loadImage("rocket.png")
  ob5i = loadImage("sat.png")
  ob6i = loadImage("ufo.png")
  star_img = loadImage("star.png")
  heart_img = loadImage("heart.png")
}



function setup() {
  createCanvas(1000,700);
  frameRate(80);

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;

  ground = createSprite(500, 700, 1000, 100)
  obgroup = new Group()
  cgroup = new Group()
  heartgroup = new Group()
  


  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Vertical Velocity: "+round(vy),800,75);
  pop();

  
vy+=g
lander.velocityY = vy
lander.y = vy *100

  if (lander.isTouching(ground)){
    
    lander.collide(ground)
    vy = 0
    console.log("well-done!")
    score = score + 1
    newlevel()
  //fall down
  
  //lander.position.y+=vy;
 ;
  
  }
  
  lander.velocityY = 0
    lander.vy =0

    lander.x = World.mouseX

    if(keyDown(RIGHT_ARROW)){
      lander.x = lander.x + 2
    }
     if(keyDown(LEFT_ARROW)){
      lander.x = lander.x - 2
    }
    
    if(keyDown(UP_ARROW)){
      lander.y = lander.y - 2
    }
     if(keyDown(DOWN_ARROW)){
      lander.y = lander.y + 2
    }
//if (lander.isTouching(cgroup)){
  //score+=10
  
//}
for(var i=0; i<cgroup.length; i++){
  if(cgroup.get(i).isTouching(lander)){
    score+=10;
    cgroup.get(i).destroy()
  }
}

if (lander.y == 70){
  
}
if (lander.isTouching(obgroup)){
  score = score - 0.05
  lander.bounceOff(obgroup)
}

fill("white")
text("Score: "+round(score),800,60);

collectibles()
spawnufo()
hearts()
drawSprites()

}

function newlevel(){
  console.log("newlevel")

  ob1 = createSprite(Math.round(random(100,width-100)),Math.round(random(100,height-100)), 30,30);
  ob1.addImage(ob1i);
  ob1.scale = 0.01;
  ob1.lifetime = 200
  ob1.velocityX = Math.round(random(-10,10))
  ob1.velocityY = Math.round(random(-10,10))
  obgroup.add(ob1)

  ob2 = createSprite(Math.round(random(100,width-100)),Math.round(random(100,height-100)), 30,30);
  ob2.addImage(ob2i);
  ob2.scale = 0.04;
  ob2.lifetime = 300
  ob2.velocityX = Math.round(random(-10,10))
  ob2.velocityY = Math.round(random(-10,10))
  obgroup.add(ob2)
}

function collectibles(){
  if(frameCount%100==0){
    star = createSprite(Math.round(random(100,width-100)),Math.round(random(100,height-100)))
    star.addImage(star_img)
    star.scale = 0.1
    star.lifetime = 300
    cgroup.add(star)

  }
}

function hearts(){
  if(frameCount%500==0){
    heart = createSprite(Math.round(random(100,width-100)),Math.round(random(100,height-100)))
    heart.addImage(heart_img)
    heart.scale = 0.08
    heart.lifetime = 300
    heartgroup.add(heart)

  }
}

function spawnufo(){
  if(frameCount%200==0){
    ufo = createSprite(Math.round(random(100,width-100)),Math.round(random(100,height-100)))
    ufo.addImage(ob6i)
    ufo.scale = 0.05
    ufo.velocityX = Math.round(random(-10,10))
    ufo.velocityY = Math.round(random(-10,10))
    ufo.lifetime = 300
    obgroup.add(ufo)
  }
}

