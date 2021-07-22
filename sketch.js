
var dog,sadDog,happyDog;
var database;
var position;
var lastFed;
var foodObj;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  foodObj = new Food();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);
  fill(255,255,254);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM" ,350,30);
  }else if(lastFed==0){
    text("Last feed : 12 AM",350,30)
  }
  drawSprites();
  foodObj.display();
}

//function to read food Stock
function feedDog() {
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock(-1));
  }
}

//function to update food stock and last fed time
function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTimae:hour()
  })
}

//function to add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}