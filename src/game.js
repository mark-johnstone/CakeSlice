
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
};


var game = new Phaser.Game(800, 600, Phaser.AUTO, '',{preload: preload, create: create, update: update, render: render });

var text;
var totalMoney=0;
var moneyTimer;
var moneyIncreaseRate = 1; 
var moneyTimerLength = 2000; // length of time in ms 
var upgradeCost=5; 

var upsidedownpineapplecakeUpgradeCost=10;
var upsidedownpineapplecakeMoneyIncrease = 3; 
var upsidedownpineapplecakeTimer = 10000;


var chocolatecake = createCake(100,600,15000,1.05);
var victoriasponge = createCake(5,10,20000,1.05);
var redvelvet = createCake(15, 30, 30000, 1.05);

var timersPositionY=100;
/*

*/
function preload(){
    this.load.image('pudding', 'assets/pudding.jpg');
    this.load.image('castlecake', 'assets/castlecake.jpg');
    this.load.image('bakery', 'assets/bakery.jpg');
    this.load.image('goldCoin','assets/GoldCoin.png');
    this.load.image('goldBar','assets/GoldBar.png');
    this.load.image('oven', 'assets/oven.png');

//     // You can use your own methods of making the plugin publicly available. Setting it as a global variable is the easiest solution.
// slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
// slickUI.load('assets/ui/kenney/kenney.json'); // Use the path to your kenney.json. This is the file that defines your theme.
}

function create() {

  /*
  Creates a timer variable for each of our cake types using the time value for each
  that increments the total money upon finish
  */
  createTimers(); 

  


  /*
  Creates the visual icon used to represent money and attaches the 
  totalMoney variable to show how much is owned by the player.  
  */
  var moneyIcon = game.add.sprite(game.world.innerWidth, game.world.innerHeight, 'goldCoin');
  text = game.add.text(0, 0, "    "+totalMoney, {
      font: "35px Arial",
      fill: "#ff0044",
      align: "right"
  });
  moneyIcon.addChild(text);

  // creates a sprite which calls the upgradeMoney function when clicked.
  var upgradeMoneySprite = game.add.sprite(250, timersPositionY, 'goldBar');
  upgradeMoneySprite.inputEnabled = true; 
  upgradeMoneySprite.events.onInputDown.add(upgradeMoney);

   var upgradeVictoriaSpongeSprite = game.add.sprite(250, timersPositionY+200, 'goldBar');
  upgradeVictoriaSpongeSprite.inputEnabled = true; 
  upgradeVictoriaSpongeSprite.events.onInputDown.add(victoriasponge.upgradeRecipe);
  
var upgradeRedvelvetSprite = game.add.sprite(250, timersPositionY+300, 'goldBar');
  upgradeRedvelvetSprite.inputEnabled = true; 
  // upgradeRedvelvetSprite.events.onInputDown.add(upgradeRedvelvet);

}

/*
Displays the timer on screen - there may be a better way of doing this. 
*/
function render(){
  game.debug.text("victoria sponge timer:" + victoriaspongeTimer.duration, 32,timersPositionY+200);
  game.debug.text("increase:"+victoriasponge.moneyIncrease, 532, timersPositionY+200);
  game.debug.text("cost:" + victoriasponge.upgradeCost,332, timersPositionY+200);

  game.debug.text("red velvet timer:"+ redvelvetTimer.duration, 32, timersPositionY+300);
  game.debug.text("increase:"+redvelvet.moneyIncrease, 532, timersPositionY+300);
  game.debug.text("cost:" + redvelvet.upgradeCost,332, timersPositionY+300);
}

function update() {
 
}

/*
Checks that the player has money available to buy the upgrade. 
If so deduct the cost of upgrading, increate the money increase
rate and cost of next update then set the text so that it refreshes
on screen.
*/
function upgradeMoney(){
  if(totalMoney>=upgradeCost){
    totalMoney-=upgradeCost;
    moneyIncreaseRate+= 1;
    upgradeCost+=1;
    text.setText("    "+totalMoney);
  }
}

/*
Updates the total money by adding the increase rate to it and sets text 
so that it refreshes on screen.
*/

function updateText() {
  totalMoney+= moneyIncreaseRate;
  text.setText("    "+totalMoney);
}

function createTimers(){
   moneyTimer = game.time.create(false);
   moneyTimer.loop(moneyTimerLength, updateText);
   moneyTimer.start();

   victoriaspongeTimer = game.time.create(false);
   victoriaspongeTimer.loop(victoriasponge.timerLength, victoriasponge.sellCake);
   victoriaspongeTimer.start();

   redvelvetTimer = game.time.create(false);
   redvelvetTimer.loop(redvelvet.timerLength, redvelvet.sellCake);
   redvelvetTimer.start();

}

function createCake(moneyIncreaseRate, upgradeCost, timerLength, multiplier){
  
  var obj={};
  obj.moneyIncrease=moneyIncreaseRate;
  obj.upgradeCost=upgradeCost;
  obj.timerLength=timerLength;
  obj.upgradeMultiplier = multiplier; 
  
  //TODO find a way to create the timer in here

  obj.upgradeRecipe = function (){
    if(totalMoney>=obj.upgradeCost){
      totalMoney-=obj.upgradeCost; 
      obj.upgradeCost=multiplier * upgradeCost;
      obj.moneyIncrease+=5;
      text.setText("    "+totalMoney);
    }
  }
  obj.sellCake = function () {
    totalMoney+= obj.moneyIncrease; 
    text.setText("    "+totalMoney);
  }
  return obj;
}


