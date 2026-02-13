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


        // STORAGE FOR SPRITES
        this.characters = null;
        this.charactersById = {};
    }

    create(){
        //Cursor Default Icon
        this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');

        const loader = document.getElementById('fakeLoader');

        setTimeout(() => {
            loader.classList.add('hide');
        }, 120); // small delay prevents Phaser flicker

        loader.addEventListener('transitionend', () => {
            loader.remove();
        });


        this.scene.launch('instructionsMenu');

            
        let bg = this.sound.get('spring_break');

        if (!bg) {
            bg = this.sound.add('spring_break', {
                loop: true,
                volume: 1
            });
        }

        if (!bg.isPlaying) {
            bg.play();
        }

        var bgSfxTap = this.sound.add('click_sound', {
            loop: false,
            volume: 1
        });



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
                //console.warn(`Layer "${layerName}" not found in map`);
            }
        });
        

        const mapScale = (config.width >= 501 && config.width <= 1025) ?  2.5 : (config.width >= 350 && config.width <= 500) ?  1.6 : 1.6;

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



        this.map_manager = new mapManager(this, mapScale);

        //--------------------------
        // 2. BUILD PATHFINDING GRID
        //--------------------------
        this.grid = this.map_manager.generateGrid(this.map, path_layer_data);
        
        //--------------------------
        // 3. LOAD POINTS OF INTEREST
        //--------------------------
        this.poi = this.map_manager.loadPOIForMap(this.map);


        //this.showDebugGrid(this.map, this.map.tileWidth, mapScale, offsetX, offsetY);

        //--------------------------
        // 4. SETUP EASYSTAR
        //--------------------------
        this.easystar = new EasyStar.js();
        this.easystar.setGrid(this.grid);
        this.easystar.setAcceptableTiles([0]);

        // 1️⃣ Create POIs
        // Object.values(this.poi).forEach(poi => {
        //         // 🟢 PLAYER ZONE (separate body)
        //         const playerZone = this.add.rectangle(
        //             poi.worldX * mapScale + offsetX,
        //             poi.worldY * mapScale + offsetY,
        //             poi.width * mapScale,
        //             poi.height * mapScale,
        //             0xffffff,
        //             0.4
        //         );

        //         console.log('ss');
        //         if (poi.type == 'clickable_one') 
        //         {
                    
        //         }
                
        //         this.physics.add.existing(playerZone, true);
        //         playerZone.body.setSize(poi.width, poi.height);
        //         poi.playerZone = playerZone;
        //         playerZone.setDepth(999);

        //     });
            

            // Managers
            this.movementManager = new movementManager(this, mapScale);

            this.movementManager.setMapOffset(offsetX, offsetY);


            var tileSize = 16;

            this.characters = this.add.group();
            this.cache.json.get('config_data').characters.forEach(c => {
                
            const sprite = this.physics.add.sprite(0, 0, c.spriteKey, 0);
                    
            var shad_width = (c.type == 'player') ? 1.6 : 1.2;
            var shad_height = (c.type == 'player') ? 0.7 : 0.5;

            // Create shadow UNDER the character
            const shadow = this.add.ellipse(
                sprite.x,
                sprite.y,
                sprite.displayWidth * shad_width, // width
                sprite.displayHeight * shad_height, // height (flattened)
                0x000000,
                0.25 // opacity
            )
            .setDepth(8); // character is 9

            // Store reference
            sprite.shadow = shadow;

            sprite.setPosition(
                offsetX + (c.x * tileSize * mapScale) + (tileSize * mapScale / 2),
                offsetY + (c.y * tileSize * mapScale) + (tileSize * mapScale / 2)
            );

            sprite.setDepth(9);
            sprite.setOrigin(0.5);
            sprite.setScale(mapScale); 
            sprite.characterId = c.id;
            sprite.characterName = c.name;
            sprite.random_paths = c.random_paths;
            sprite.type = c.type;
            sprite.walkSpeed = c.walkSpeed;
            sprite.actionState = c.actionState;
            sprite.body.setSize(
                c.collisionWidth,
                c.collisionHeight,
                false
            );
            sprite.spriteKey = c.spriteKey;
            
            // Only for player
            if (c.type === "player") {

                // Arrow
                const arrow = this.add.image(0, -sprite.displayHeight * 0.6, 'arrow_decorative_e_small')
                .setScale(0.6);
                arrow.rotation =  Phaser.Math.DegToRad(180);

                // Optional floating animation (VERY NICE)
                this.tweens.add({
                    targets: [arrow],
                    y: arrow.y - 6,
                    duration: 800,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut'
                });

                // Name text
                const nameText = this.add.text(0, -sprite.displayHeight * 1.2, c.name, {
                    fontFamily: 'fibberish',
                    fontSize: '18px',
                    color: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 4
                })
                .setOrigin(0.5);


                // Optional floating animation (VERY NICE)
                this.tweens.add({
                    targets: [nameText],
                    y: nameText.y - 6,
                    duration: 800,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut'
                });


                // ✅ CREATE CONTAINER
                const container = this.add.container(sprite.x, sprite.y, [
                    arrow,
                    nameText
                ])
                .setDepth(100); // always above character

                sprite.uiContainer = container;
            }


            // Move hitbox to bottom center
            sprite.body.setOffset(
                (sprite.width - c.collisionWidth) / 2,
                sprite.height - c.collisionHeight
            );
            this.characters.add(sprite);
            this.charactersById[c.id] = sprite;
        });
        

        if (config.width >= 350 && config.width <= 1025) 
        {
            this.player = Object.values(this.charactersById).find(c => c.type === "player");

            //console.log('this.player: ',this.player);
            

            if (this.player) this.cameras.main.centerOn(Number(this.player.x), Number(this.player.y));
            //if (this.player) this.cameras.main.startFollow(this.player, true, 2, 2); .stopFollow();
        }
        // const sprite = this.physics.add.sprite(0, 0, 'player', 0);

        // sprite.setPosition(
        //     offsetX + (26 * tileSize * mapScale) + (tileSize * mapScale / 2),
        //     offsetY + (22 * tileSize * mapScale) + (tileSize * mapScale / 2)
        // );

        // sprite.setScale(mapScale); // IMPORTANT if map is scaled
        // sprite.setDepth(9);
        // sprite.setOrigin(0.5);

        if (config.width >= 350 && config.width <= 1025) 
        {
        const cam = this.cameras.main;

        // IMPORTANT: set camera bounds to your map
        cam.setBounds(offsetX, offsetY, mapWidth, mapHeight);

        // Enable dragging
        this.input.on('pointermove', (pointer) => {

            // Only drag if pointer is down
            if (!pointer.isDown) return;

            // Prevent dragging when clicking UI
            if (pointer.wasTouch && pointer.downElement?.tagName === "BUTTON") return;

            cam.scrollX -= (pointer.x - pointer.prevPosition.x);
            cam.scrollY -= (pointer.y - pointer.prevPosition.y);
        });

        }
        


        // Get all NPCs
        this.npcs = Object.values(this.charactersById).filter(c => c.type === "npc");

        // Start their random movement
        this.npcs.forEach(npc => {

            this.createAnimationsAnimals(npc.spriteKey);

            if (!npc.random_paths || npc.random_paths.length === 0) return;

            const moveToRandomPath = () => {
                // Pick a random destination from the npc.random_paths array
                const nextDest = Phaser.Utils.Array.GetRandom(npc.random_paths);

                this.movementManager.moveCharacterToTile({
                    map: this.map,
                    easystar: this.easystar,
                    charactersById: this.charactersById,
                    characterId: npc.characterId,
                    tileX: nextDest.x,
                    tileY: nextDest.y,
                    callback: () => {
                        // Character reached destination: face down
                        npc.setFrame(6);

                        // Wait 5 seconds before moving to the next random path
                        this.time.delayedCall(5000, moveToRandomPath);
                    }
                });
            };

            // Start the loop
            moveToRandomPath();
        });


        Object.values(this.poi).forEach(poi => {

        //---------------------------
        // INTERACTIVE ZONE
        //---------------------------
        var zone = null;
        if (poi.type.includes("clickable")) {
        
        zone = this.add.zone(
            poi.worldX * mapScale + offsetX,
            poi.worldY * mapScale + offsetY,
            poi.width * mapScale,
            poi.height * mapScale
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .setDepth(6); // BELOW houses
        zone.poi = poi;
    
        //---------------------------
        // HIGHLIGHT GRAPHIC
        //---------------------------

        const highlight = this.add.graphics()
            .setDepth(9) // still below houses if houses=10
            .setVisible(false);

        this.drawCorners(highlight, zone);


        //---------------------------
        // POINTER EVENTS
        //---------------------------

        zone.on('pointerover', () => {

            this.input.setDefaultCursor(
                'url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer'
            );
            
            highlight.setVisible(true);
        });

        zone.on('pointerdown', () => {
            if (this.player) this.cameras.main.startFollow(this.player, true, 0.5, 0.5);
            this.input.setDefaultCursor(
                'url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer'
            );
                    
            this.movementManager.moveCharacterToTile({
            map: this.map,
            easystar: this.easystar,
            charactersById: this.charactersById,
            characterId: 1,
            tileX: zone.poi.pos_x,
            tileY: zone.poi.pos_y,
            callback: () => {

            const character = this.charactersById[1];
            // Assuming frame 0 of your sprite sheet is the "down" frame
            character.setFrame(0);

            this.cameras.main.stopFollow();

            this.scene.launch('reusableMenu',{
                data:zone.poi
            });
            
            }
        });
        
            bgSfxTap.play();
        });


        zone.on('pointerout', () => {

            this.input.setDefaultCursor(
                'url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer'
            );

            highlight.setVisible(false);
        });

        
        }

    
        });


        this.handleCreateTilesData(this,['houses','blacksmith_forge'],this.map);



        //--------------------------
        // 5. NAVIGATION MENU
        //--------------------------
        var dayCycle_section = this.add.nineslice(
            config.width / 2 , 
            40, 
            'navigation_menu', 0, 
            (this.player) ? 100 : 700, 
            (this.player) ? 70 : 80, 
            16, 16, 16, 16)
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setTint(0x000000)
        .setVisible((this.player) ? true : false)
        .setAlpha(0.6);
        
        var navigation_section = this.add.nineslice(
            config.width / 2 , 
            (this.player) ? 110 : 50, 
            'navigation_menu', 0, 
            (this.player) ? 350 : 700, 
            (this.player) ? 60 : 80, 
            16, 16, 16, 16)
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setTint(0x000000)
        .setAlpha(0.6);

        var socials_section = this.add.nineslice(
            (this.player) ? config.width - 100 : config.width / 2 + 200 + 270 + 50 , 
            (this.player) ? config.height - 40 : 50, 
            'navigation_menu', 0,
            (this.player) ? 170 : 270, 
            (this.player) ? 50 : 80, 16, 16, 16, 16)
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setTint(0x000000)
        .setAlpha(0.6);

        var resume_section = this.add.nineslice(
            (this.player) ? 60 : config.width / 2 - 200 - 270 - 50 , 
            (this.player) ? config.height - 40 : 50, 
            'navigation_menu', 0, 
            (this.player) ? 90 : 270, 
            (this.player) ? 50 : 80, 16, 16, 16, 16)
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setTint(0x000000)
        .setAlpha(0.6);



        const mail_button = this.add.sprite(
            (this.player) ? socials_section.x - 50 : socials_section.x - 70 , 
            (this.player) ? config.height - 40 : 50, 'gmail')
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setScale((this.player) ? 0.6 : 0.7)
        .setInteractive({ useHandCursor: true });

        mail_button.on('pointerdown', () => {
            window.open(this.cache.json.get('config_data').contact.english.mail[0].link, "_blank");
        });

        mail_button.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
        });

        mail_button.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        mail_button.on('pointerup',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        const github_button = this.add.sprite(
            (this.player) ? socials_section.x : socials_section.x, 
            (this.player) ? config.height - 40 : 50, 
            'github')
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setScale((this.player) ? 0.6 : 0.7)
        .setInteractive({ useHandCursor: true });

        github_button.on('pointerdown', () => {
            window.open(this.cache.json.get('config_data').contact.english.github[0].link, "_blank");
        });

        github_button.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
        });

        github_button.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        github_button.on('pointerup',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        const linkedIn_button = this.add.sprite(
            (this.player) ? socials_section.x + 50 : socials_section.x + 70, 
            (this.player) ? config.height - 40 : 50, 'linkedIn')
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setScale((this.player) ? 0.6 : 0.7)
        .setInteractive({ useHandCursor: true });

        linkedIn_button.on('pointerdown', () => {
            window.open(this.cache.json.get('config_data').contact.english.linked_in[0].link, "_blank");
        });


        linkedIn_button.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
        });

        linkedIn_button.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        linkedIn_button.on('pointerup',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        const sound_button = this.add.sprite(
            (this.player) ? resume_section.x : resume_section.x, 
            (this.player) ? config.height - 40 : 50, 
            'volume')
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setScale((this.player) ? 0.6 : 0.7)
        .setInteractive({ useHandCursor: true });

        let isMuted = false; // track mute state

        sound_button.on('pointerdown', () => {
            isMuted = !isMuted;          // toggle state
            this.sound.mute = isMuted;   // apply to all sounds

            // Optional: change button texture depending on state
            if (isMuted) {
                sound_button.setTexture('volume_off'); // a texture for muted state
            } else {
                sound_button.setTexture('volume');    // original texture
            bgSfxTap.play();
            }
        });


        sound_button.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
        });

        sound_button.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        sound_button.on('pointerup',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });
        // const language_button = this.add.sprite(resume_section.x, 50, 'language')
        // .setOrigin(0.5)
        // .setDepth(1000)
        // .setScrollFactor(0) 
        // .setScale(0.7)
        // .setInteractive({ useHandCursor: true });

        // const settings_button = this.add.sprite(resume_section.x + 70, 50, 'settings')
        // .setOrigin(0.5)
        // .setDepth(1000)
        // .setScrollFactor(0) 
        // .setScale(0.7)
        // .setInteractive({ useHandCursor: true });

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


        this.anims.create({
            key: 'nightCycle',
            frames: [
                { key: 'night1' },
                { key: 'night2' },
                { key: 'night3' },
                { key: 'night4' },
                { key: 'night5' },
                { key: 'night6' },
                { key: 'night7' },
                { key: 'night8' },
                { key: 'night9' },
                { key: 'night10' }
            ],
            frameRate: 8,
            repeat: -1
        });

        const day_cycle_sprite = this.add.sprite(
            config.width / 2, 
            (this.player) ? 40 : 50, 'day1')
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0) 
        .setScale((this.player) ? 0.65 : 0.9)
        .setInteractive({ useHandCursor: true });

        day_cycle_sprite.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
        });

        day_cycle_sprite.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        day_cycle_sprite.on('pointerup',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        day_cycle_sprite.on('pointerdown', () => {   
            this.dayManager.toggleCycle();
        });

        //day_cycle_sprite.play('dayCycle');

        this.dayManager = new dayCycleManager(this, day_cycle_sprite);


        this.my_resume = this.add.text(
            (this.player) ? config.width / 2 - 50 : config.width / 2 - 120, 
            (this.player) ? 110 : 50,
            '● Resume', {
            fontFamily: 'fibberish',
            fontSize: (this.player) ? '18px' : '26px',
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setDepth(1001)
        .setScrollFactor(0) 
        .setStroke('#44403B', 6)
        .setInteractive({ useHandCursor: true });

        this.my_resume.on('pointerdown',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
            this.my_resume.setTint(0xFFB93B);
        });

        this.my_resume.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
            this.my_resume.setTint(0xFFB93B);
        });

        this.my_resume.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
            this.my_resume.setTint(0xFFFFFF);
        });

        this.my_resume.on('pointerup',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
            this.my_resume.setTint(0xFFFFFF);
        });

        this.my_resume.on('pointerdown', () => {
            window.open(this.cache.json.get('config_data').nav.resume, "_blank");
        });



        this.my_home = this.add.text(
            (this.player) ? this.my_resume.x - 70 : this.my_resume.x - 120,
            (this.player) ? 110 : 50,
            '● Home', {
            fontFamily: 'fibberish',
            fontSize: (this.player) ? '18px' : '26px',
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setDepth(1001)
        .setScrollFactor(0) 
        .setStroke('#44403B', 6)
        .setInteractive({ useHandCursor: true });


        this.my_home.on('pointerdown', () => {
            window.location.href = this.cache.json.get('config_data').nav.homepage;
        });


        this.my_home.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
            this.my_home.setTint(0xFFB93B);
        });


        this.my_home.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
            this.my_home.setTint(0xFFFFFF);
        });

        this.my_home.on('pointerup',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
            this.my_home.setTint(0xFFFFFF);
        });


        this.my_hobbies = this.add.text(
            (this.player) ? config.width / 2 + 30 : config.width / 2 + 120, 
            (this.player) ? 110 : 50,
            '● Hobbies', {
            fontFamily: 'fibberish',
            fontSize: (this.player) ? '18px' : '26px',
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setDepth(1001)
        .setScrollFactor(0) 
        .setStroke('#44403B', 6)
        .setInteractive({ useHandCursor: true });


        this.my_hobbies.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
            this.my_hobbies.setTint(0xFFB93B);
        });

        this.my_hobbies.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
            this.my_hobbies.setTint(0xFFFFFF);
        });

        this.my_hobbies.on('pointerup',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
            this.my_hobbies.setTint(0xFFFFFF);
        });

        this.my_hobbies.on('pointerdown',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
            
            this.scene.launch('reusableMenu',{
                data:{
                    title:"Hobbies",
                    imp:"hobbies"
                }
            });
        });

        this.my_contact = this.add.text(
            (this.player) ? this.my_hobbies.x + 80 : this.my_hobbies.x + 120, 
            (this.player) ? 110 : 50,
            '● Contact', {
            fontFamily: 'fibberish',
            fontSize: (this.player) ? '18px' : '26px',
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setDepth(1001)
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


        this.my_contact.on('pointerup',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
            this.my_contact.setTint(0xFFFFFF);
        });

        this.my_contact.on('pointerdown', () => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
            
            this.scene.launch('messengerMenu',{
                data:{
                    title:"Contact",
                    imp:"hobbies"
                }
            });
        });


        //this.cache.json.get('config_data');


        this.createAnimations('player');
        }


        showDebugGrid(tilemap, tileSize = 16, mapScale = 1, offsetX = 0, offsetY = 0) {

            if (this.debugGraphics) this.debugGraphics.clear();
            else this.debugGraphics = this.add.graphics();

            this.debugGraphics
                .lineStyle(1, 0xff0000, 0.3)
                .setDepth(600);

            const scaledTile = tileSize * mapScale;

            for (let y = 0; y < tilemap.height; y++) {
                for (let x = 0; x < tilemap.width; x++) {

                    this.debugGraphics.strokeRect(
                        offsetX + (x * scaledTile),
                        offsetY + (y * scaledTile),
                        scaledTile,
                        scaledTile
                    );
                }
            }
        }

        

        createAnimations(spriteKey) {
            // DOWN
            this.anims.create({
                key: `${spriteKey}_walk_down`,
                frames: this.anims.generateFrameNumbers(spriteKey, { start: 0, end: 3 }),
                frameRate: 8,
                repeat: -1
            });


            // RIGHT
            this.anims.create({
                key: `${spriteKey}_walk_right`,
                frames: this.anims.generateFrameNumbers(spriteKey, { start: 8, end: 11 }),
                frameRate: 8,
                repeat: -1
            });

            // UP
            this.anims.create({
                key: `${spriteKey}_walk_up`,
                frames: this.anims.generateFrameNumbers(spriteKey, { start: 16, end: 19 }),
                frameRate: 8,
                repeat: -1
            });

            // IDLE (optional but recommended)
            this.anims.create({
                key: `${spriteKey}_idle_down`,
                frames: [{ key: spriteKey, frame: 0 }],
                frameRate: 1
            });
        }

        createAnimationsAnimals(spriteKey) {

            // RIGHT
            this.anims.create({
                key: `${spriteKey}_walk_right`,
                frames: this.anims.generateFrameNumbers(spriteKey, { start: 6, end: 11 }),
                frameRate: 8,
                repeat: -1
            });

            // UP
            this.anims.create({
                key: `${spriteKey}_walk_up`,
                frames: this.anims.generateFrameNumbers(spriteKey, { start: 6, end: 11 }),
                frameRate: 8,
                repeat: -1
            });

            // DOWN
            this.anims.create({
                key: `${spriteKey}_walk_down`,
                frames: this.anims.generateFrameNumbers(spriteKey, { start: 6, end: 11 }),
                frameRate: 8,
                repeat: -1
            });

            // IDLE (optional but recommended)
            this.anims.create({
                key: `${spriteKey}_idle_down`,
                frames: [{ key: spriteKey, frame: 6 }],
                frameRate: 1
            });
        }

    drawCorners(graphics, zone) {

        const w = zone.width;
        const h = zone.height;
        const x = zone.x - w/2;
        const y = zone.y - h/2;
        
        
        const len = 12;

        this.add.text(
            x + w/2, y + h + 20,
            `${zone.poi.title}`, {
            fontFamily: 'fibberish',
            fontSize: '28px',
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setDepth(1000)
        .setVisible(true)
        .setStroke('#44403B', 8);

        graphics.clear();
        graphics.lineStyle(4, 0xffffff);

        // top-left
        graphics.lineBetween(x, y, x+len, y);
        graphics.lineBetween(x, y, x, y+len);

        // top-right
        graphics.lineBetween(x+w, y, x+w-len, y);
        graphics.lineBetween(x+w, y, x+w, y+len);

        // bottom-left
        graphics.lineBetween(x, y+h, x+len, y+h);
        graphics.lineBetween(x, y+h, x, y+h-len);

        // bottom-right
        graphics.lineBetween(x+w, y+h, x+w-len, y+h);
        graphics.lineBetween(x+w, y+h, x+w, y+h-len);
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
            

            //console.log("Animated tiles count:", scene.animatedTiles.length);
        };


    update(time, delta) {
        // 1️⃣ Update animated tiles
        this.handleAnimateTiles(this, delta);

        //shadows
        this.characters.getChildren().forEach(char => {

            if (!char.shadow) return;

            var shad_pos = (char.type == 'player') ? 0.5 : 0.4;

            char.shadow.setPosition(
                char.x,
                char.y + char.displayHeight * shad_pos  // tweak until feet match
            );

            // Player UI
            if (char.uiContainer) {
                char.uiContainer.setPosition(char.x, char.y);
            }
        });
        }
}

