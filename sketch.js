//Create variables here
var dog,happyDog,database,foodS,foodStock;



function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();

  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg)
  dog.scale=0.2


  foodStock=database.ref('Food');
  foodStock.on("value",readStock)
  
  
}


function draw() {  
  background(46, 139, 87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDogImg)
  }

  drawSprites();
  
  textSize(15);
  fill("white");
  text('Note: Press Up_Arrow Key To Feed The Dog Milk',90,30)


  text('Food Remaining '+foodS,190,160)
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}




