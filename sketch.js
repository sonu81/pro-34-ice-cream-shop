
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var workerStanding, workerServing;
var worker;
var iceCream;
var rand = Math.floor(Math.random() * (4-1+1)+1);
var customerRand = Math.floor(Math.random() * (24-1+1)+1);
var order1Rand = Math.floor(Math.random() * (4-1+1)+1);
var order2Rand = Math.floor(Math.random() * (4-1+1)+1);
var order3Rand = Math.floor(Math.random() * (4-1+1)+1);
var customer1, customerImg1;
var customer2, customer2Img;
var customer3, customer3Img,  customer4Img;
var iceCreamSprite, mintImg, vanillaImg, chocolateImg, strawberryImg;
var tableImg;
var mintOrder, strawberryOrder, chocolateOrder, vanillaOrder;
var cust1Order, cust2Order, cust3Order;
var angry;
var madBoolean = false;
var madBoolean2 = false; 
var madBoolean3 = false;
var arcadeClassic;


function preload(){
arcadeClassic = loadFont("ARCADECLASSIC.TTF");

  mintImg = loadAnimation("minticecream.png");
vanillaImg = loadAnimation("vanillaicecream.png");
chocolateImg = loadAnimation("chocolateicecream.png");
strawberryImg = loadAnimation("strawberryicecream.png");

mintOrder = loadAnimation("mintorder.png");
strawberryOrder = loadAnimation("strawberryorder.png");
chocolateOrder = loadAnimation("chocolateorder.png");
vanillaOrder = loadAnimation("vanillaorder.png");

  tableImg = loadImage("table.jpg");

customerImg1 = loadImage("customer 1.png");
customer2Img = loadImage("customer 2.png");
customer3Img = loadImage("customer 3.png");
customer4Img = loadImage("customer 4.png");

angry = loadAnimation("angry.png");

  workerStanding = loadAnimation ("workerstanding.png");
  workerServing = loadAnimation("workerstanding.png", 
  "workerarmup.png","workerarmup.png", "workerstanding.png", "workerstanding.png", "workerstanding.png", "workerstanding.png",
   "workerstanding.png", "workerstanding.png", "workerstanding.png", "workerstanding.png",
    "workerstanding.png", "workerstanding.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
	Engine.run(engine);
	world = engine.world;

  worker = createSprite(width/12, height/2);
  worker.scale = width/2800;
  worker.addAnimation('standing' , workerStanding);
  worker.addAnimation('serving', workerServing);

  customer1 = createSprite(width/1.4, height/5, width/10, height/3);
  customer1.scale = width/2800;

  customer2 = createSprite(width/1.4, height/2, width/10, height/3);
  customer2.scale = width/2800;
  
  customer3 = createSprite(width/1.4, height/1.2, width/10, height/3);
  customer3.scale = width/2800;

  cust1Order = createSprite(width/1.2, height/10);
  cust1Order.scale = width/3800;
  cust1Order.addAnimation("mint", mintOrder);
  cust1Order.addAnimation("strawberry", strawberryOrder);
  cust1Order.addAnimation("chocolate", chocolateOrder);
  cust1Order.addAnimation("vanilla", vanillaOrder);
  cust1Order.addAnimation("mad", angry);

  cust2Order = createSprite(width/1.2, height/2.5);
  cust2Order.scale = width/3800;
  cust2Order.addAnimation("mint", mintOrder);
  cust2Order.addAnimation("strawberry", strawberryOrder);
  cust2Order.addAnimation("chocolate", chocolateOrder);
  cust2Order.addAnimation("vanilla", vanillaOrder);
  cust2Order.addAnimation("mad", angry);

  cust3Order = createSprite(width/1.2, height/1.4);
  cust3Order.scale = width/3800;
  cust3Order.addAnimation("mint", mintOrder);
  cust3Order.addAnimation("strawberry", strawberryOrder);
  cust3Order.addAnimation("chocolate", chocolateOrder);
  cust3Order.addAnimation("vanilla", vanillaOrder);
  cust3Order.addAnimation("mad", angry);
  
  engine.world.gravity.y = 0;

  var iceCreamOptions = {
    isStatic: false
  }

  iceCream = Bodies.rectangle(worker.position.x + 140, worker.position.y, 140, 140, iceCreamOptions);
  World.add(world, iceCream);

  iceCreamSprite = createSprite(worker.position.x + 140, worker.position.y);
  iceCreamSprite.scale = width/3500;
  iceCreamSprite.addAnimation('mint', mintImg);
  iceCreamSprite.addAnimation('strawberry' , strawberryImg);
  iceCreamSprite.addAnimation('chocolate', chocolateImg);
  iceCreamSprite.addAnimation('vanilla', vanillaImg);

}


function draw() {

  background(51);
  Engine.update(engine);
  
  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(RADIUS);

  noStroke();
textFont(arcadeClassic);
textSize(60);
fill("white");
text("use arrow and space keys", 50, 50);
  image(tableImg, width/2.5, height/2, width/2, height/1.2);

  Matter.Body.setVelocity(iceCream, {x:2.5, y:0});
  
  iceCreamSprite.position.x = iceCream.position.x;
  iceCreamSprite.position.y = iceCream.position.y;

  pickIceCream();
  pickCustomers();
  pickOrder();
  wrongOrder();
  arrowControls();

  if(collide(iceCream, customer1, 170) == true || collide(iceCream, customer2, 170) == true || collide(iceCream, customer3, 170) == true){
  Matter.Body.setPosition(iceCream, {x: worker.position.x + 140, y: worker.position.y});
  workerServe();
  
  rand = null;
  rand = Math.floor(Math.random() * (4-1+1)+1);  
  }

if (madBoolean == true){
  cust1Order.changeAnimation('mad');
}
if (madBoolean2 == true){
  cust2Order.changeAnimation('mad');
}
if (madBoolean3 == true){
  cust3Order.changeAnimation('mad');
}

if(madBoolean == true && madBoolean2 == true && madBoolean3 == true){
  iceCream.isStatic = true;
  Matter.Body.setVelocity(iceCream, {x:0, y:0});
  fill(51);
  rect(300, 40, width/2, height/15);
  fill("white");
  text("game over     try again", 50, 50);
}
  
  drawSprites(); 
}

function wrongOrder(){
  if(collide(iceCream, customer1, 170) == true){
    if(order1Rand == 1 && rand !== 1 ){
      madBoolean = true;
  }
  if(order1Rand == 2 && rand !== 3){
    madBoolean = true;
  }
  if (order1Rand == 3 && rand !== 2){
    madBoolean = true;
  }
  if (order1Rand == 4 && rand !== 4 ){
    madBoolean = true;
  }
  if (order1Rand == 1 && rand == 1){
    resetRand1();
  }
  if(order1Rand == 2 && rand == 3){
    resetRand1();
  }
  if (order1Rand == 3 && rand == 2){
    resetRand1();
  }
  if (order1Rand == 4 && rand == 4){
    resetRand1();
  }
}

  if(collide(iceCream, customer2, 170) == true){
    if(order2Rand == 1 && rand !== 1 ){
      madBoolean2 = true;
  }
  if(order2Rand == 2 && rand !== 3){
    madBoolean2 = true;
  }
  if (order2Rand == 3 && rand !== 2){
    madBoolean2 = true;
  }
  if (order2Rand == 4 && rand !== 4 ){
    madBoolean2 = true;
  }

  if (order2Rand == 1 && rand == 1){
    resetRand2();
  }
  if(order2Rand == 2 && rand == 3){
    resetRand2();
  }
  if (order2Rand == 3 && rand == 2){
    resetRand2();
  }
  if (order2Rand == 4 && rand == 4){
    resetRand2();
  }
  }

  
  if(collide(iceCream, customer3, 170) == true){
    if(order3Rand == 1 && rand !== 1 ){
      madBoolean3 = true;
  }
  if(order3Rand == 2 && rand !== 3){
    madBoolean3 = true;
  }
  if (order3Rand == 3 && rand !== 2){
    madBoolean3 = true;
  }
  if (order3Rand == 4 && rand !== 4 ){
    madBoolean3 = true;
  }

  if (order3Rand == 1 && rand == 1){
    resetRand3();
    
  }
  if(order3Rand == 2 && rand == 3){
    resetRand3();
  }
  if (order3Rand == 3 && rand == 2){
    resetRand3();
  }
  if (order3Rand == 4 && rand == 4){
    resetRand3();
  }
  }
  
}

function arrowControls(){
  if(keyCode == 40){
    Matter.Body.applyForce(iceCream, {x:0, y:0}, {x:0, y:0.08});
  }
  else if(keyCode == 38){
    Matter.Body.applyForce(iceCream, {x:0, y:0}, {x:0, y:-0.08});
  }
}
function keyReleased(){ if (keyCode === 32){
  rand = null;
rand = Math.floor(Math.random() * (4-1+1)+1);  
}
}

function pickIceCream(){

  if (rand == 1 ){
   iceCreamSprite.changeAnimation('mint');
  } 
  else if(rand == 2 ){
  iceCreamSprite.changeAnimation('strawberry');
  }
  else if(rand == 3){
    iceCreamSprite.changeAnimation('chocolate');
  }
  else if (rand == 4 ){
    iceCreamSprite.changeAnimation('vanilla');
  }
  
}

 
function collide(body,sprite, x){
  if(body!=null){
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x){
               return true; 
            }
            else{
              return false;
            }
         }
}

function workerServe(){
  worker.changeAnimation('serving');
  
 setTimeout(()=>{
  worker.changeAnimation('standing')
  }, 800);
}


function resetRand1(){
  order1Rand = null;
  order1Rand = Math.floor(Math.random() * (4-1+1)+1);
}

function resetRand2 (){
  order2Rand = null;
  order2Rand = Math.floor(Math.random() * (4-1+1)+1);
}

function resetRand3(){
  order3Rand = null;
  order3Rand = Math.floor(Math.random() * (4-1+1)+1);
}

function pickOrder(){
if(order1Rand == 1){
  cust1Order.changeAnimation('mint');
} else if(order1Rand == 2){
  cust1Order.changeAnimation('chocolate');
} else if(order1Rand == 3){
  cust1Order.changeAnimation('strawberry');
} else if(order1Rand == 4){
  cust1Order.changeAnimation('vanilla');
}
if(order2Rand == 1){
  cust2Order.changeAnimation('mint');
} else if(order2Rand == 2){
  cust2Order.changeAnimation('chocolate');
} else if(order2Rand == 3){
  cust2Order.changeAnimation('strawberry');
} else if(order2Rand == 4){
  cust2Order.changeAnimation('vanilla');
}
if(order3Rand == 1){
  cust3Order.changeAnimation('mint');
} else if(order3Rand == 2){
  cust3Order.changeAnimation('chocolate');
} else if(order3Rand == 3){
  cust3Order.changeAnimation('strawberry');
} else if(order3Rand == 4){
  cust3Order.changeAnimation('vanilla');
}
}


function pickCustomers(){
  if (customerRand == 1){
    customer1.addImage(customerImg1);
    customer2.addImage(customer2Img);
    customer3.addImage(customer3Img);
  } else if(customerRand == 2){
    customer1.addImage(customerImg1);
    customer2.addImage(customer3Img);
    customer3.addImage(customer2Img);
  }else if(customerRand == 3){
    customer1.addImage(customerImg1);
    customer2.addImage(customer2Img);
    customer3.addImage(customer4Img);
  } else if(customerRand == 4){
    customer1.addImage(customerImg1);
    customer2.addImage(customer4Img);
    customer3.addImage(customer2Img);
  } else if (customerRand == 5){
    customer1.addImage(customerImg1);
    customer2.addImage(customer3Img);
    customer3.addImage(customer4Img);
  } else if(customerRand == 6){
    customer1.addImage(customerImg1);
    customer2.addImage(customer4Img);
    customer3.addImage(customer3Img);
  }else if(customerRand == 7){
    customer1.addImage(customer2Img);
    customer2.addImage(customerImg1);
    customer3.addImage(customer3Img);
  }else if(customerRand == 8){
    customer1.addImage(customer2Img);
    customer2.addImage(customer3Img);
    customer3.addImage(customerImg1);
  }else if(customerRand == 9){
    customer1.addImage(customer2Img);
    customer2.addImage(customer3Img);
    customer3.addImage(customer4Img);
  }else if(customerRand == 10){
    customer1.addImage(customer2Img);
    customer2.addImage(customer4Img);
    customer3.addImage(customer3Img);
  }else if(customerRand == 11){
    customer1.addImage(customer2Img);
    customer2.addImage(customerImg1);
    customer3.addImage(customer4Img);
  }else if(customerRand == 12){
    customer1.addImage(customer2Img);
    customer2.addImage(customer4Img);
    customer3.addImage(customerImg1);
  }else if(customerRand == 13){
    customer1.addImage(customer3Img);
    customer2.addImage(customerImg1);
    customer3.addImage(customer2Img);
  }else if(customerRand == 14){
    customer1.addImage(customer3Img);
    customer2.addImage(customer2Img);
    customer3.addImage(customerImg1);
  }else if(customerRand == 15){
    customer1.addImage(customer3Img);
    customer2.addImage(customerImg1);
    customer3.addImage(customer4Img);
  }else if(customerRand == 16){
    customer1.addImage(customer3Img);
    customer2.addImage(customer4Img);
    customer3.addImage(customerImg1);
  }else if(customerRand == 17){
    customer1.addImage(customer3Img);
    customer2.addImage(customer4Img);
    customer3.addImage(customer2Img);
  }else if(customerRand == 18){
    customer1.addImage(customer3Img);
    customer2.addImage(customer2Img);
    customer3.addImage(customer4Img);
  }else if(customerRand == 19){
    customer1.addImage(customer4Img);
    customer2.addImage(customerImg1);
    customer3.addImage(customer2Img);
  }else if(customerRand == 20){
    customer1.addImage(customer4Img);
    customer2.addImage(customer2Img);
    customer3.addImage(customerImg1);
  }else if(customerRand == 21){
    customer1.addImage(customer4Img);
    customer2.addImage(customer2Img);
    customer3.addImage(customer3Img);
  }else if(customerRand == 22){
    customer1.addImage(customer4Img);
    customer2.addImage(customer3Img);
    customer3.addImage(customer2Img);
  }else if(customerRand == 23){
    customer1.addImage(customer4Img);
    customer2.addImage(customer3Img);
    customer3.addImage(customerImg1);
  }else if(customerRand == 24){
    customer1.addImage(customer4Img);
    customer2.addImage(customerImg1);
    customer3.addImage(customer3Img);
  }
}

