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

        // this.load.on('complete', () => {
            
        // });

        // Load dialogue data
        this.load.json('config_data', './assets/script/data.json');

        // Load. tilemap
        this.load.tilemapTiledJSON("map", "./assets/maps/map.json");

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

        //Panels
        this.load.image('navigation_menu', './assets/img/ui/transparent_border/panel-transparent-border-010.png');

        //Day Cycle
        this.load.image('day1', './assets/img/ui/day_night/day/1.png');
        this.load.image('day2', './assets/img/ui/day_night/day/2.png');
        this.load.image('day3', './assets/img/ui/day_night/day/3.png');
        this.load.image('day4', './assets/img/ui/day_night/day/4.png');
        this.load.image('day5', './assets/img/ui/day_night/day/5.png');
        this.load.image('day6', './assets/img/ui/day_night/day/6.png');
        this.load.image('day7', './assets/img/ui/day_night/day/7.png');
        this.load.image('day8', './assets/img/ui/day_night/day/8.png');
        this.load.image('day9', './assets/img/ui/day_night/day/9.png');
        this.load.image('day10', './assets/img/ui/day_night/day/10.png');


        //Day Cycle
        this.load.image('night1', './assets/img/ui/day_night/night/1.png');
        this.load.image('night2', './assets/img/ui/day_night/night/2.png');
        this.load.image('night3', './assets/img/ui/day_night/night/3.png');
        this.load.image('night4', './assets/img/ui/day_night/night/4.png');
        this.load.image('night5', './assets/img/ui/day_night/night/5.png');
        this.load.image('night6', './assets/img/ui/day_night/night/6.png');
        this.load.image('night7', './assets/img/ui/day_night/night/7.png');
        this.load.image('night8', './assets/img/ui/day_night/night/8.png');
        this.load.image('night9', './assets/img/ui/day_night/night/9.png');
        this.load.image('night10', './assets/img/ui/day_night/night/10.png');

        //Socials
        this.load.image('instagram', './assets/img/ui/socials/Emojis_Social_48x48_2.png');
        this.load.image('itch', './assets/img/ui/socials/Emojis_Social_48x48_5.png');
        this.load.image('gmail', './assets/img/ui/socials/Emojis_Social_48x48_18.png');
        this.load.image('playstore', './assets/img/ui/socials/Emojis_Social_48x48_23.png');
        this.load.image('github', './assets/img/ui/socials/Emojis_Social_48x48_35.png');
        this.load.image('linkedIn', './assets/img/ui/socials/Emojis_Social_48x48_37.png');
        this.load.image('tiktok', './assets/img/ui/socials/Emojis_Social_48x48_71.png');
        this.load.image('newgrounds', '.app/assets/img/ui/socials/Emojis_Social_48x48_76.png');
         
         
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