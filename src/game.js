var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
 
game.state.add('play', {
    preload: function() {
        // Preload all the images we will use for the game
        this.load.image('cakeimg', 'assets/cakeimg.png');
        this.load.image('pudding', 'assets/pudding.jpg');
        this.load.image('castlecake', 'assets/castlecake.jpg');
        this.load.image('bakery', 'assets/bakery.jpg');
        this.load.image('goldCoin','assets/GoldCoin.png');
        this.load.image('goldBar','assets/GoldBar.png');

    },
    create: function() {
        var state = this; 

       var bakerySprite = game.add.sprite(0, 0,'bakery');
       bakerySprite.width = state.game.width;
       bakerySprite.height = state.game.height;

       var cakeimgSprite = game.add.sprite(state.game.world.width, 150, 'cakeimg');
       cakeimgSprite.anchor.setTo(0.5, 0.5);

    },
    render: function() {
        game.debug.text('Adventure Awaits!', 250, 290);
    }
});
 
game.state.start('play');