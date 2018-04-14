
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
  Creates a timer variable which uses the moneyTimerLength as the time length
  and calls updateText upon reaching 0.
  */
  moneyTimer = game.time.create(false);
  moneyTimer.loop(moneyTimerLength, updateText);
  moneyTimer.start(); 


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
  var upgradeMoneySprite = game.add.sprite(game.world.centerX, game.world.centerY, 'goldBar');
  upgradeMoneySprite.inputEnabled = true; 
  upgradeMoneySprite.events.onInputDown.add(upgradeMoney);

}

/*
Displays the timer on screen - there may be a better way of doing this. 
*/
function render(){
  game.debug.text(moneyTimer.duration, 32, 32);

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