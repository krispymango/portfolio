class loadScene extends Phaser.Scene{
    constructor(){
        super('loadScene');
    }

    preload(){

        // Load data
        this.load.json('script', './assets/script/data.json');

        // --- Create a progress bar ---
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        // Draw box from (0,0)
        this.progressBox.fillRect(0, 0, 300, 30);
        // Position its center
        this.progressBox.x = config.width / 2 - 150;
        this.progressBox.y = config.height / 2 + 30;

        this.progressBar = this.add.graphics();

        this.load.on('progress', (value) => {
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            // Same idea: draw from (0,0)
            this.progressBar.fillRect(0, 0, 300 * value, 30);
            this.progressBar.x = config.width / 2 - 150;
            this.progressBar.y = config.height / 2 + 30;
        });

        this.load.on('complete', () => {
            
        });
    }

    create(){

        this.add.text(
            0,
            0,
            '', {
            fontFamily: "Kenney_Future_Narrow",
            fontSize: '22px',
            fill: '#fff'
        }).setOrigin(0.5)
        .setStroke('#44403B', 4)
        .setDepth(1);

        this.add.text(
            0,
            0,
            '', {
            fontFamily: "fibberish",
            fontSize: '22px',
            fill: '#fff'
        }).setOrigin(0.5)
        .setStroke('#44403B', 4)
        .setDepth(1);

        setTimeout(() => {
            this.scene.start('portfolioScene');
        }, 2000);
    
    }
}