class loadScene extends Phaser.Scene{
    constructor(){
        super('loadScene');
    }

    preload(){

        // Load data
        this.load.json('script', './assets/script/data.json');

        // --- Progress bar ---
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
            this.progressBar.fillRect(0, 0, 300 * value, 30);
            this.progressBar.x = config.width / 2 - 150;
            this.progressBar.y = config.height / 2 + 30;
        });

        this.load.on('complete', () => {
            
        });

        // Load dialogue data
        this.load.json('story', './assets/script/data.json');


        //Tilesets
        this.load.image("barn", "./assets/img/tiles/barn.png");
        this.load.image("blacksmith_forge", "./assets/img/tiles/blacksmith_forge.png");
        this.load.image("cliff_high", "./assets/img/tiles/cliff_high.png");

        this.load.image("house_interior_tiles", "./assets/img/tiles/house_interior_tiles.png");
        this.load.image("house_interiors_items", "./assets/img/tiles/house_interiors_items.png");
        this.load.image("houses", "./assets/img/tiles/houses.png");

        this.load.image("kitchen_interior", "./assets/img/tiles/kitchen_interior.png");
        this.load.image("market_assets", "./assets/img/tiles/market_assets.png");

        this.load.image("newTree_tiles", "./assets/img/tiles/newTree_tiles.png");
        this.load.image("rugs", "./assets/img/tiles/rugs.png");

        this.load.image("snow_tileset", "./assets/img/tiles/snow_tileset.png");
        this.load.image("summer_tileset", "./assets/img/tiles/summer_tileset.png");

        this.load.image("summer_trees_stuff", "./assets/img/tiles/summer_trees_stuff.png");
        this.load.image("summer_waterfall_watertiles", "./assets/img/tiles/summer_waterfall_watertiles.png");

        this.load.image("tavern_interior", "./assets/img/tiles/tavern_interior.png");
        this.load.image("tavern", "./assets/img/tiles/tavern.png");

        this.load.image("tiled_trees", "./assets/img/tiles/tiled_trees.png");

        this.load.image("tiles_and_exterior_items", "./assets/img/tiles/tiles_and_exterior_items.png");
        this.load.image("tiles_and_items", "./assets/img/tiles/tiles_and_items.png");
        this.load.image("tiles_exterior_items", "./assets/img/tiles/tiles_exterior_items.png");

        this.load.image("tileset", "./assets/img/tiles/tileset.png");
        this.load.image("trees_stuff", "./assets/img/tiles/trees_stuff.png");
        
        this.load.image("allowed_paths", "./assets/img/tiles/allowed_paths.png");


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