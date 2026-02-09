class portfolioScene extends Phaser.Scene{
    constructor() {
        super("portfolioScene");

        //LAYERS CONFIG
        this.layers = [];

        //MARKERS CONFIG
        this.poi = {};

        //GRID CONFIG
        this.grid = [];

        // EASYSTAR CONFIG
        this.easystar = null;
    }

    create(){
        //Cursor Default Icon
        this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');

    
        // Load interior map and layers
        this.map = this.make.tilemap({ key: 'map' });

        // Load tilesets (only once)

        const barnSet = this.map.addTilesetImage("barn", "barn");
        const blacksmithForgeSet = this.map.addTilesetImage("blacksmith_forge", "blacksmith_forge");
        const cliffHighSet = this.map.addTilesetImage("cliff_high", "cliff_high");

        const houseInteriorTilesSet = this.map.addTilesetImage(
            "house_interior_tiles",
            "house_interior_tiles"
        );
        const houseInteriorItemsSet = this.map.addTilesetImage(
            "house_interiors_items",
            "house_interiors_items"
        );

        const housesSet = this.map.addTilesetImage("houses", "houses");

        const kitchenInteriorSet = this.map.addTilesetImage(
            "kitchen_interior",
            "kitchen_interior"
        );
        const marketAssetsSet = this.map.addTilesetImage(
            "market_assets",
            "market_assets"
        );

        const newTreeTilesSet = this.map.addTilesetImage(
            "newTree_tiles",
            "newTree_tiles"
        );
        const rugsSet = this.map.addTilesetImage("rugs", "rugs");

        const snowTilesetSet = this.map.addTilesetImage(
            "snow_tileset",
            "snow_tileset"
        );
        const summerTilesetSet = this.map.addTilesetImage(
            "summer_tileset",
            "summer_tileset"
        );

        const summerTreesStuffSet = this.map.addTilesetImage(
            "summer_trees_stuff",
            "summer_trees_stuff"
        );
        const summerWaterfallSet = this.map.addTilesetImage(
            "summer_waterfall_watertiles",
            "summer_waterfall_watertiles"
        );

        const tavernInteriorSet = this.map.addTilesetImage(
            "tavern_interior",
            "tavern_interior"
        );
        const tavernSet = this.map.addTilesetImage("tavern", "tavern");

        const tiledTreesSet = this.map.addTilesetImage(
            "tiled_trees",
            "tiled_trees"
        );

        const tilesAndExteriorItemsSet = this.map.addTilesetImage(
            "tiles_and_exterior_items",
            "tiles_and_exterior_items"
        );
        const tilesAndItemsSet = this.map.addTilesetImage(
            "tiles_and_items",
            "tiles_and_items"
        );
        const tilesExteriorItemsSet = this.map.addTilesetImage(
            "tiles_exterior_items",
            "tiles_exterior_items"
        );

        const tilesetSet = this.map.addTilesetImage("tileset", "tileset");
        const treesStuffSet = this.map.addTilesetImage(
            "trees_stuff",
            "trees_stuff"
        );

        const allowedPathsSet = this.map.addTilesetImage(
            "allowed_paths",
            "allowed_paths"
        );


        // Tilesets available to all layers
        const allTilesets = [
            "barn",
            "blacksmith_forge",
            "cliff_high",
            "house_interior_tiles",
            "house_interiors_items",
            "houses",
            "kitchen_interior",
            "market_assets",
            "newTree_tiles",
            "rugs",
            "snow_tileset",
            "summer_tileset",
            "summer_trees_stuff",
            "summer_waterfall_watertiles",
            "tavern_interior",
            "tavern",
            "tiled_trees",
            "tiles_and_exterior_items",
            "tiles_and_items",
            "tiles_exterior_items",
            "tileset",
            "trees_stuff",
            "allowed_paths"
        ];


        const layersToCreate = this.map.layers.map(l => l.name);

        layersToCreate.forEach(layerName => {
            const layer = this.map.createLayer(layerName, allTilesets);
            if (layer) {
                layer.setDepth(1);
                this.layers.push(layer);
            } else {
                console.warn(`Layer "${layerName}" not found in map`);
            }
        });
        

        const mapScale = 1.5;

        // Scale all layers
        this.layers.forEach(layer => layer.setScale(mapScale));

        // --- Center the layers ---
        const mapWidth = this.map.widthInPixels * mapScale;
        const mapHeight = this.map.heightInPixels * mapScale;

        const offsetX = (config.width - mapWidth) / 2;
        const offsetY = (config.height - mapHeight) / 2;

        this.layers.forEach(layer => layer.setPosition(offsetX, offsetY));

        var path_layer_data = null;
        this.layers.forEach(layer => {
            if (layer.layer.name == 'path_layer') {
            path_layer_data = layer;
            }
        });



        this.map_manager = new mapManager(this.scene);

        //--------------------------
        // 2. BUILD PATHFINDING GRID
        //--------------------------
        this.grid = this.map_manager.generateGrid(this.map, path_layer_data);
        
        //--------------------------
        // 3. LOAD POINTS OF INTEREST
        //--------------------------
        this.poi = this.map_manager.loadPOIForMap(this.map);


        //--------------------------
        // 4. SETUP EASYSTAR
        //--------------------------
        this.easystar = new EasyStar.js();
        this.easystar.setGrid(this.grid);
        this.easystar.setAcceptableTiles([0]);

        // 1️⃣ Create POIs
        Object.values(this.poi).forEach(poi => {
                // 🟢 PLAYER ZONE (separate body)
                const playerZone = this.add.rectangle(
                    poi.worldX * mapScale + offsetX,
                    poi.worldY * mapScale + offsetY,
                    poi.width * mapScale,
                    poi.height * mapScale,
                    0x00ff00,
                    0.4
                );

                console.log('ss');
                
                this.physics.add.existing(playerZone, true);
                playerZone.body.setSize(poi.width, poi.height);
                poi.playerZone = playerZone;
                playerZone.setDepth(999);

            });
            
        this.handleCreateTilesData(this,['houses','blacksmith_forge'],this.map);



        //--------------------------
        // 5. NAVIGATION MENU
        //--------------------------

        var navigation_section = this.add.nineslice(config.width / 2 , 50, 'navigation_menu', 0, 700, 80, 32, 32, 32, 32)
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setTint(0x000000)
        .setAlpha(0.6);

        var socials_section = this.add.nineslice(config.width - 200 , 50, 'navigation_menu', 0, 270, 80, 32, 32, 32, 32)
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setTint(0x000000)
        .setAlpha(0.6);



        const mail_button = this.add.sprite(socials_section.x - 100 , 50, 'gmail')
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setScale(0.7)
        .setInteractive({ useHandCursor: true });

        const itchio_button = this.add.sprite(socials_section.x - 40, 50, 'itch')
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setScale(0.7)
        .setInteractive({ useHandCursor: true });

        const github_button = this.add.sprite(socials_section.x + 30, 50, 'github')
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setScale(0.7)
        .setInteractive({ useHandCursor: true });

        const linkedIn_button = this.add.sprite(socials_section.x + 100, 50, 'linkedIn')
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setScale(0.7)
        .setInteractive({ useHandCursor: true });

        this.anims.create({
            key: 'dayCycle',
            frames: [
                { key: 'day1' },
                { key: 'day2' },
                { key: 'day3' },
                { key: 'day4' },
                { key: 'day5' },
                { key: 'day6' },
                { key: 'day7' },
                { key: 'day8' },
                { key: 'day9' },
                { key: 'day10' }
            ],
            frameRate: 8,
            repeat: -1
        });

        const day_cycle_sprite = this.add.sprite(config.width / 2 , 50, 'day1')
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setScale(0.9)
        .setInteractive({ useHandCursor: true });

        day_cycle_sprite.play('dayCycle');


        this.my_projects = this.add.text(
            config.width / 2 - 120, 50,
            'Projects', {
            fontFamily: 'fibberish',
            fontSize: '26px',
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setStroke('#44403B', 6)
        .setInteractive({ useHandCursor: true });

        this.my_projects.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
            this.my_projects.setTint(0xFFB93B);
        });


        this.my_projects.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
            this.my_projects.setTint(0xFFFFFF);
        });


        this.my_home = this.add.text(
            this.my_projects.x - 120, 50,
            'Home', {
            fontFamily: 'fibberish',
            fontSize: '26px',
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setStroke('#44403B', 6)
        .setInteractive({ useHandCursor: true });


        this.my_home.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
            this.my_home.setTint(0xFFB93B);
        });


        this.my_home.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
            this.my_home.setTint(0xFFFFFF);
        });



        this.my_skills = this.add.text(
            config.width / 2 + 120, 50,
            'Skills', {
            fontFamily: 'fibberish',
            fontSize: '26px',
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setStroke('#44403B', 6)
        .setInteractive({ useHandCursor: true });


        this.my_skills.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
            this.my_skills.setTint(0xFFB93B);
        });


        this.my_skills.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
            this.my_skills.setTint(0xFFFFFF);
        });



        this.my_contact = this.add.text(
            this.my_skills.x + 120, 50,
            'Contact', {
            fontFamily: 'fibberish',
            fontSize: '26px',
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setStroke('#44403B', 6)
        .setInteractive({ useHandCursor: true });

        this.my_contact.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
            this.my_contact.setTint(0xFFB93B);
        });


        this.my_contact.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
            this.my_contact.setTint(0xFFFFFF);
        });

        //this.cache.json.get('config_data');
        }



    handleAnimateTiles = (scene, delta) => {
        if (!scene.animatedTiles || !scene.animatedTiles.length) return;

        scene.animatedTiles.forEach(item => {
            const anim = item.tileAnimationData;
            const tile = item.tile;

            item.elapsedTime += delta;

            // Calculate total duration of the animation
            const totalDuration = anim.reduce((sum, f) => sum + f.duration, 0);
            item.elapsedTime %= totalDuration;

            // Determine which frame to show
            let currentTime = 0;
            for (let frame of anim) {
                currentTime += frame.duration;
                if (item.elapsedTime < currentTime) {
                    tile.index = frame.tileid + item.firstgid;
                    break;
                }
            }
        });
        };

    handleCreateTilesData = (scene, tilenames, worldMap) => {
            scene.animatedTiles = [];

            tilenames.forEach(element => {
                
            const tileset = worldMap.tilesets.find(ts => ts.name === element);
            if (!tileset || !tileset.tileData) return;

            const firstgid = tileset.firstgid;

            for (let tileid in tileset.tileData) {
                const tileInfo = tileset.tileData[tileid];
                if (!tileInfo.animation) continue;

                // Loop through all layers
                worldMap.layers.forEach(layer => {
                    if (!layer.data) return;

                    layer.data.forEach(row => {
                        row.forEach(t => {
                            if (!t || t.index === -1) return;

                            // Check if this tile matches the animated tile id
                            if (t.index - firstgid === parseInt(tileid)) {
                                scene.animatedTiles.push({
                                    tile: t,
                                    tileAnimationData: tileInfo.animation,
                                    firstgid: firstgid,
                                    elapsedTime: 0
                                });
                            }
                        });
                    });
                });
            }
            });
            

            console.log("Animated tiles count:", scene.animatedTiles.length);
        };

    update(time, delta) {
            // 1️⃣ Update animated tiles
            this.handleAnimateTiles(this, delta);
        }
}

