var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
 
game.state.add('play', {
    preload: function() {
        // Preload all the images we will use for the game
        this.load.image('cakeimg', 'assets/cakeimg.png');
        this.load.image('mockup-bw', 'assets/mockup-bw.png');
        this.load.image('pudding', 'assets/pudding.jpg');
        this.load.image('castlecake', 'assets/castlecake.jpg');
    },
    create: function() {
        var cakeimgSprite = game.add.sprite(450, 290, 'pudding');
        cakeimgSprite.anchor.setTo(0.5, 0.5);

        var state = this; 
        
        this.background = this.game.add.group();
        // setup each of our background layers to take the full screen
    ['mockup-bw']//, 'forest-lights', 'forest-middle', 'forest-front']
        .forEach(function(image) {
            var bg = state.game.add.tileSprite(0, 0, state.game.world.width,
                state.game.world.height, image, '', state.background);
            bg.tileScale.setTo(1,1);
        });
    },
    render: function() {
        game.debug.text('Adventure Awaits!', 250, 290);
    }
});
 
game.state.start('play');