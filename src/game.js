
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

var muffinsUpgradeCost=5;
var muffinsMoneyIncrease=2;
var muffinsTimer=8000;


var victoriaspongeUpgradeCost=10; 
var victoriaspongeMoneyIncrease=5; 
var victoriaspongeTimer=20000;

var redvelvetUpgradeCost=30;
var redvelvetMoneyIncrease=15; 
var redvelvetTimer=100000;


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
  upgradeVictoriaSpongeSprite.events.onInputDown.add(upgradeVictoriaSponge);
  
var upgradeRedvelvetSprite = game.add.sprite(250, timersPositionY+300, 'goldBar');
  upgradeRedvelvetSprite.inputEnabled = true; 
  upgradeRedvelvetSprite.events.onInputDown.add(upgradeRedvelvet);

}

/*
Displays the timer on screen - there may be a better way of doing this. 
*/
function render(){
  game.debug.text("money timer :"+  moneyTimer.duration, 32, timersPositionY);
  game.debug.text("muffins timer:"+ muffinsTime.duration, 32, timersPositionY+100);
  game.debug.text("victoria sponge timer:" + victoriaspongeTime.duration, 32,timersPositionY+200);
  game.debug.text("increase:"+victoriaspongeMoneyIncrease, 532, timersPositionY+200);
  game.debug.text("cost:" + victoriaspongeUpgradeCost,332, timersPositionY+200);

  game.debug.text("red velvet timer:"+ redvelvetTime.duration, 32, timersPositionY+300);
  game.debug.text("increase:"+redvelvetMoneyIncrease, 532, timersPositionY+300);
  game.debug.text("cost:" + redvelvetUpgradeCost,332, timersPositionY+300);
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


   muffinsTime = game.time.create(false);
   muffinsTime.loop(muffinsTimer, updateText);
   muffinsTime.start(); 

   victoriaspongeTime = game.time.create(false);
   victoriaspongeTime.loop(victoriaspongeTimer, updateVictoriaSpongeText);
   victoriaspongeTime.start();

   redvelvetTime = game.time.create(false);
   redvelvetTime.loop(redvelvetTimer, updateRedvelvetText);
   redvelvetTime.start();
}

function upgradeRedvelvet(){
  if(totalMoney>=redvelvetUpgradeCost){
    totalMoney-+redvelvetUpgradeCost;
    redvelvetUpgradeCost*=1.05;
    redvelvetMoneyIncrease+=5;
  }
}

function updateRedvelvetText(){
  totalMoney+=redvelvetMoneyIncrease;
  text.setText("    "+totalMoney);
}

function upgradeVictoriaSponge(){
  if(totalMoney>=victoriaspongeUpgradeCost){
    totalMoney-=victoriaspongeUpgradeCost;
    victoriaspongeUpgradeCost+=2;
    victoriaspongeMoneyIncrease+=2;
    text.setText("    "+totalMoney);
  }
}

function updateVictoriaSpongeText(){
  totalMoney+=victoriaspongeMoneyIncrease;
  text.setText("    "+totalMoney);
}
