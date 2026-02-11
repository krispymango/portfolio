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

        //Player Sprites
        this.load.spritesheet("player", "./assets/img/characters/player.png", {
            frameWidth: 20,
            frameHeight: 20
        });


        //Panels
        this.load.image('navigation_menu', './assets/img/ui/transparent_border/panel-transparent-border-010.png');

        //Buttons
        this.load.image('button_one', './assets/img/ui/transparent_center/panel-transparent-center-010.png');


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
        this.load.image('newgrounds', './assets/img/ui/socials/Emojis_Social_48x48_76.png');
         
        //Misc
        this.load.image('volume', './assets/img/ui/misc/Emojis_48x48_29.png');
        this.load.image('volume_off', './assets/img/ui/misc/Emojis_48x48_30.png');
        this.load.image('language', './assets/img/ui/misc/Emojis_48x48_33.png');
        this.load.image('settings', './assets/img/ui/misc/Emojis_48x48_62.png');
        this.load.image('arrow_decorative_e_small', './assets/img/ui/misc/arrow_decorative_e_small.webp');
        //this.load.image('divider_extra', './assets/img/ui/kenney_ui-pack/PNG/Extra/Default/divider.webp');
         
        //Logos
        this.load.image('reactjs', './assets/img/ui/logos/reactjs.png');
        this.load.image('nodejs', './assets/img/ui/logos/nodejs.png');
        this.load.image('php', './assets/img/ui/logos/php.png');
        this.load.image('sql', './assets/img/ui/logos/api.png');
        this.load.image('api', './assets/img/ui/logos/sql.png');
        this.load.image('tahoma', './assets/img/ui/logos/tahoma.png');
        this.load.image('reactnative', './assets/img/ui/logos/reactnative.png');
        this.load.image('githubTwo', './assets/img/ui/logos/github.png');
        this.load.image('phaser', './assets/img/ui/logos/phaser.png');
        this.load.image('ubuntu', './assets/img/ui/logos/ubuntu.png');
        this.load.image('burpsuite', './assets/img/ui/logos/burpsuite.png');


        //Audio
        this.load.audio("spring_break", ["./assets/audio/spring_break.wav"]);
        this.load.audio("click_sound", ["./assets/audio/click-b.mp3"]);
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