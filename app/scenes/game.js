var config = {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#292524',
    scene: [
        loadScene, 
        portfolioScene, 
        languageMenu, 
        messengerMenu, 
        reusableMenu,
        instructionsMenu
    ],
    pixelArt: true,
    roundPixels: true,
    antialias: true,
    min: {
        width: 480,
        height: 720,
    },
    max: {
        width: 520,
        height: 780,
    },
    scale: {
        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: "body",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}


var game = new Phaser.Game(config);
