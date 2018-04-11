
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var game = new Phaser.Game(800, 600, Phaser.AUTO, '',{preload: preload, create: create, update: update });

var text;
var count;
var moneyTimer;

function preload(){
    this.load.image('cakeimg', 'assets/cakeimg.png');
    this.load.image('pudding', 'assets/pudding.jpg');
    this.load.image('castlecake', 'assets/castlecake.jpg');
    this.load.image('bakery', 'assets/bakery.jpg');
    this.load.image('goldCoin','assets/GoldCoin.png');
    this.load.image('goldBar','assets/GoldBar.png');
    this.load.image('oven', 'assets/oven.png');

}

function create() {

    count = 0;

    // create timer
    moneyTimer = game.time.create(false);
    // set the timer event to occur after 2 seconds
    moneyTimer.loop(2000, updateText);
    // start the timer
    moneyTimer.start(); 

    var moneyIcon = game.add.sprite(game.world.innerWidth, game.world.innerHeight, 'goldCoin');
    text = game.add.text(0, 0, ""+count, {
        font: "35px Arial",
        fill: "#ff0044",
        align: "right"
    });
    moneyIcon.addChild(text);
    
    // text.anchor.setTo(0, 0);

    var ovenSprite = game.add.sprite(game.world.centerX, game.world.centerY, 'oven');
    ovenSprite.anchor.setTo(0.5,0.5);

    var moneyIcon = game.add.sprite(game.world.innerWidth, game.world.innerHeight, 'goldCoin');
    moneyIcon.addChild(text);

}

function update() {

    game.input.onDown.addOnce(updateText, this);

}


function updateText() {

    count++;

    text.setText("    "+count);
}