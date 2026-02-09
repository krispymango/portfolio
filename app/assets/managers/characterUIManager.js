class characterUIManager {
    constructor(scene, player) {
        this.scene = scene;
        this.camera = scene.cameras.main;
        const { width, height } = scene.scale;
        this.baseX = 10;
        this.baseY = 10;

        // ===============================
        // MAIN UI CONTAINER
        // ===============================
        this.container = scene.add.container(this.baseX, this.baseY);
        this.container.setScrollFactor(0);
        this.container.setDepth(10000);

        // ===============================
        // COIN UI
        // ===============================
        this.coinBackground = scene.add.rectangle(width - 170, 50, 140, 40, 0x000000, 0.6).setOrigin(0);
        this.coinText = scene.add.text(
            this.coinBackground.x + this.coinBackground.width / 2,
            this.coinBackground.y + this.coinBackground.height / 2,
            "",
            { fontFamily: "fibberish", fontSize: "25px", color: "#ffffff" }
        ).setOrigin(0.5).setStroke("#44403B", 4);

        // ===============================
        // MENU BUTTON
        // ===============================
        this.menuButton = scene.add.rectangle(this.coinBackground.x - 100, this.coinBackground.y, 40, 40, 0x000000, 0.6)
        .setScrollFactor(0)
        .setOrigin(0)
        .setInteractive({ useHandCursor: true });
        this.menuButtonIcon = scene.add.image(this.menuButton.x, this.menuButton.y, "menu_horizontal_icon").setScale(0.7).setOrigin(0);

        this.menuButtonIcon.on("pointerover", () => this.menuButtonIcon.setFillStyle(0x666666, 0.8));
        this.menuButtonIcon.on("pointerout", () => this.menuButtonIcon.setFillStyle(0x000000, 0.6));
        this.menuButtonIcon.on("pointerdown", () => {

        });


        // ===============================
        // INVENTORY BUTTON
        // ===============================
        this.inventoryButton = scene.add.rectangle(this.coinBackground.x - 50, this.coinBackground.y, 40, 40, 0x000000, 0.6)
            .setOrigin(0)
            .setScrollFactor(0)
            .setDepth(10000)
            .setInteractive({ useHandCursor: true });
        this.inventoryButtonIcon = scene.add.image(this.inventoryButton.x, this.inventoryButton.y, "inventory_box_icon")
            .setOrigin(0)
            .setScrollFactor(0)
            .setDepth(10001)
            .setScale(0.8)
            .disableInteractive();

        this.inventoryButton.on("pointerover", () => this.inventoryButton.setFillStyle(0x666666, 0.8));
        this.inventoryButton.on("pointerout", () => this.inventoryButton.setFillStyle(0x000000, 0.6));
        this.inventoryButton.on("pointerdown", () => showInventory());


// ===============================
// STATS BAR (SPLIT 1/3 + 2/3)
// ===============================
this.STATS_WIDTH = 170;
this.STATS_HEIGHT = 60;


this.statsContainer = scene.add.container(width - 250, 100);

// Background
this.statsBackground = scene.add.rectangle(width - 270, 100, 240, 90, 0x000000, 0.6).setOrigin(0);

// Split sizes
const LEFT_WIDTH = this.STATS_WIDTH * 0.33;
const RIGHT_WIDTH = this.STATS_WIDTH * 0.67;

// ---------- LEFT SIDE (TEXT) ----------
this.usernameText = scene.add.text(
    8,
    this.STATS_HEIGHT * 0.25,
    `${player.characterName} — ${player.work}`,
    { fontFamily: "fibberish", fontSize: "20px", color: "#ffffff" }
).setOrigin(0, 0.5);

this.hpText = scene.add.text(
    8,
    this.STATS_HEIGHT * 0.75,
    "HP",
    { fontFamily: "fibberish", fontSize: "16px", color: "#ffffff" }
).setOrigin(0, 0.5);

this.engText = scene.add.text(
    8,
    this.STATS_HEIGHT * 1.25,
    "EN",
    { fontFamily: "fibberish", fontSize: "16px", color: "#ffffff" }
).setOrigin(0, 0.5);

// ---------- RIGHT SIDE (BARS) ----------
const BAR_X = LEFT_WIDTH + 6;
const BAR_WIDTH = RIGHT_WIDTH - 12;
const BAR_HEIGHT = 6;

// HP BAR BACKGROUND
this.hpBarBg = scene.add.rectangle(
    BAR_X,
    this.STATS_HEIGHT * 0.75,
    BAR_WIDTH,
    BAR_HEIGHT,
    0x222222,
    1
).setOrigin(0, 0.5);

// HP BAR FILL
this.hpBar = scene.add.rectangle(
    BAR_X,
    this.STATS_HEIGHT * 0.75,
    BAR_WIDTH,
    BAR_HEIGHT,
    0x00aa00,
    1
).setOrigin(0, 0.5);

// ENG BAR BACKGROUND
this.engBarBg = scene.add.rectangle(
    BAR_X,
    this.STATS_HEIGHT * 1.25,
    BAR_WIDTH,
    BAR_HEIGHT,
    0x222222,
    1
).setOrigin(0, 0.5);

// ENG BAR FILL
this.engBar = scene.add.rectangle(
    BAR_X,
    this.STATS_HEIGHT * 1.25,
    BAR_WIDTH,
    BAR_HEIGHT,
    0x0066ff,
    1
).setOrigin(0, 0.5);

// Add to stats container
this.statsContainer.add([
    this.statsBackground,
    this.usernameText,
    this.hpText,
    this.engText,
    this.hpBarBg,
    this.hpBar,
    this.engBarBg,
    this.engBar
]);

        // this.coinText = scene.add.text(
        //     this.coinBackground.x + this.coinBackground.width / 2,
        //     this.coinBackground.y + this.coinBackground.height / 2,
        //     "",
        //     { fontFamily: "fibberish", fontSize: "25px", color: "#ffffff" }
        // ).setOrigin(0.5).setStroke("#44403B", 4);


        // ===============================
        // INVENTORY BOX
        // ===============================
        this.inventoryBox = scene.add.rectangle(width / 2, height / 2, width - 120, height - 140, 0x000000, 0.9).setOrigin(0.5);

        const MARGIN = 30, TITLE_HEIGHT = 40, TAB_HEIGHT = 40, TAB_GAP = 12;
        const SLOT_SIZE = 48, SLOT_GAP = 24;
        const INNER_WIDTH = this.inventoryBox.width - MARGIN * 2;

        // ===============================
        // INVENTORY TITLE
        // ===============================
        this.inventoryTitle = scene.add.text(this.inventoryBox.x, this.inventoryBox.y - this.inventoryBox.height / 2 + MARGIN, "Inventory",
            { fontFamily: "fibberish", fontSize: "34px", color: "#ffffff" })
            .setOrigin(0.5, 0)
            .setStroke('#44403B', 4);

        // ===============================
        // TABS DATA
        // ===============================
        this.tabs = ["Tools", "Food","Crafting","Weapons", "Gallery"];
        this.activeTab = "Tools";
        this.tabButtons = {};

        const TAB_WIDTH = (INNER_WIDTH - TAB_GAP * (this.tabs.length - 1)) / this.tabs.length;

        // ===============================
        // TABS CONTAINER
        // ===============================
        this.tabsContainer = scene.add.container(
            this.inventoryBox.x - this.inventoryBox.width / 2 + MARGIN,
            this.inventoryTitle.y + TITLE_HEIGHT + 10
        );

        this.tabs.forEach((tab, i) => {
            const x = i * (TAB_WIDTH + TAB_GAP);
            const bg = scene.add.rectangle(x, 0, TAB_WIDTH, TAB_HEIGHT, 0x333333, 0.9)
                .setOrigin(0)
                .setScrollFactor(0)
                .setDepth(10001)
                .setInteractive({ useHandCursor: true });

            const label = scene.add.text(x + TAB_WIDTH / 2, TAB_HEIGHT / 2, tab, { fontFamily: "fibberish", fontSize: "20px", color: "#ffffff" }).setOrigin(0.5);
            bg.on("pointerdown", () => this.switchTab(tab));
            this.tabsContainer.add([bg, label]);
            this.tabButtons[tab] = bg;
        });

        // ===============================
        // ITEMS CONTAINER SPLIT (LEFT: display, RIGHT: grid)
        // ===============================
        this.itemsContainer = scene.add.container(this.tabsContainer.x, this.tabsContainer.y + TAB_HEIGHT + MARGIN);

        // Left panel
        const PANEL_WIDTH = 250;
        const PANEL_HEIGHT = this.inventoryBox.height - (TITLE_HEIGHT + TAB_HEIGHT + MARGIN * 2 + MARGIN * 2);
        this.itemDisplayPanel = scene.add.container(0, 0);
        this.itemDisplayPanelBg = scene.add.rectangle(0, 0, PANEL_WIDTH, PANEL_HEIGHT, 0x44403B, 1).setOrigin(0, 0);

        this.itemNameText = scene.add.text(10, 10, "", { fontFamily: "fibberish", fontSize: "22px", color: "#ffffff" });
        this.itemDescriptionText = scene.add.text(10, 40, "", { fontFamily: "fibberish", fontSize: "18px", color: "#cccccc", wordWrap: { width: PANEL_WIDTH - 20 } });

        this.itemButton1 = scene.add.rectangle(PANEL_WIDTH / 2 - 60, PANEL_HEIGHT - 60, 100, 40, 0x333333, 1).setScrollFactor(0).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.itemButton1Text = scene.add.text(this.itemButton1.x, this.itemButton1.y, "", { fontFamily: "fibberish", fontSize: "20px", color: "#ffffff" }).setOrigin(0.5);

        this.itemButton2 = scene.add.rectangle(PANEL_WIDTH / 2 + 60, PANEL_HEIGHT - 60, 100, 40, 0x333333, 1).setScrollFactor(0).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.itemButton2Text = scene.add.text(this.itemButton2.x, this.itemButton2.y, "", { fontFamily: "fibberish", fontSize: "20px", color: "#ffffff" }).setOrigin(0.5);

        this.itemDisplayPanel.add([this.itemDisplayPanelBg, this.itemNameText, this.itemDescriptionText, this.itemButton1, this.itemButton1Text, this.itemButton2, this.itemButton2Text]);
        this.itemsContainer.add(this.itemDisplayPanel);

        // Right grid
        this.itemGridContainer = scene.add.container(PANEL_WIDTH + 20, 0);
        this.itemGroups = {
            Tools: scene.add.container(0, 0),
            Food: scene.add.container(0, 0),
            Weapons: scene.add.container(0, 0),
            Gallery: scene.add.container(0, 0),
            Crafting: scene.add.container(0, 0)
        };
        Object.values(this.itemGroups).forEach(group => {
            group.setVisible(false);
            this.itemGridContainer.add(group);
        });
        this.itemsContainer.add(this.itemGridContainer);

        // ===============================
        // CLOSE BUTTON
        // ===============================
        this.closeButtonBg = scene.add.rectangle(this.inventoryBox.x + this.inventoryBox.width / 2 - MARGIN - 20, this.inventoryBox.y - this.inventoryBox.height / 2 + MARGIN + 10, 32, 32, 0x550000, 0.9)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(10002)
            .setInteractive({ useHandCursor: true });
        this.closeButtonText = scene.add.text(this.closeButtonBg.x, this.closeButtonBg.y, "✕", { fontFamily: "Arial", fontSize: "20px", color: "#ffffff" }).setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(10003);
        this.closeButtonBg.on("pointerover", () => this.closeButtonBg.setFillStyle(0xaa0000, 1));
        this.closeButtonBg.on("pointerout", () => this.closeButtonBg.setFillStyle(0x550000, 0.9));
        this.closeButtonBg.on("pointerdown", () => hideInventory());

        

      
        // ===============================
        // ADD TO MAIN CONTAINER
        // ===============================
        this.container.add([
            this.coinBackground, 
            this.coinText, 
            this.menuButton, 
            this.menuButtonIcon, 
            this.inventoryButton, 
            this.inventoryButtonIcon, 
            this.statsBackground,
            this.statsContainer,
            this.inventoryBox, 
            this.inventoryTitle, 
            this.tabsContainer, 
            this.itemsContainer, 
            this.closeButtonBg, 
            this.closeButtonText
]);


        
        // ===============================
        // SHOW/HIDE LOGIC
        // ===============================
        const showInventory = () => {
            this.populateItems(player);
            this.inventoryBox.setVisible(true);
            this.inventoryTitle.setVisible(true);
            this.tabsContainer.setVisible(true);
            this.itemsContainer.setVisible(true);
            this.closeButtonBg.setVisible(true);
            this.closeButtonText.setVisible(true);
        };
        const hideInventory = () => {
            this.inventoryBox.setVisible(false);
            this.inventoryTitle.setVisible(false);
            this.tabsContainer.setVisible(false);
            this.itemsContainer.setVisible(false);
            this.closeButtonBg.setVisible(false);
            this.closeButtonText.setVisible(false);
        };
        hideInventory();
        

        this.switchTab("Tools");

        this.update(player);
    }

    createCraftSlot(recipe, index, player) {
    const SLOT_SIZE = 48;
    const SLOT_GAP = 24;
    const ITEMS_PER_ROW = 4;

    const col = index % ITEMS_PER_ROW;
    const row = Math.floor(index / ITEMS_PER_ROW);

    const bg = this.scene.add.rectangle(
        col * (SLOT_SIZE + SLOT_GAP),
        row * (SLOT_SIZE + SLOT_GAP),
        SLOT_SIZE,
        SLOT_SIZE,
        0x333333,
        0.9
    ).setScrollFactor(0).setOrigin(0).setInteractive({ useHandCursor: true });

    const icon = this.scene.add.text(
        bg.x + SLOT_SIZE / 2,
        bg.y + SLOT_SIZE / 2,
        "⚒",
        { fontSize: "22px" }
    ).setOrigin(0.5);

    bg.on("pointerdown", () => {
        this.showCraftDetails(recipe, player);
    });

    return [bg, icon];
}

showCraftDetails(recipe, player) {
    this.itemNameText.setText(recipe.name);

    const requirements = Object.entries(recipe.ingredients)
        .map(([item, qty]) => {
            const has = player.inventory.filter(i => i.name === item).length;
            return `${item}: ${has}/${qty}`;
        })
        .join("\n");

    this.itemDescriptionText.setText(
        `Requires:\n${requirements}`
    );

    this.itemButton1Text.setText("Craft");
    this.itemButton1.setVisible(true);
    this.itemButton1Text.setVisible(true);
    this.itemButton1.setAlpha(
            this.canCraft(recipe, player) ? 1 : 0.4
        );


    this.itemButton1.removeAllListeners();
    this.itemButton1.on("pointerdown", () => {
        if (this.canCraft(recipe, player)) {
            this.craftItem(recipe, player);
            this.populateItems(player);
        }
    });
}

canCraft(recipe, player) {
    return Object.entries(recipe.ingredients).every(([item, qty]) => {
        return player.inventory.filter(i => i.name === item).length >= qty;
    });
}

craftItem(recipe, player) {
    // Remove ingredients
    for (let item in recipe.ingredients) {
        let qty = recipe.ingredients[item];
        for (let i = player.inventory.length - 1; i >= 0 && qty > 0; i--) {
            if (player.inventory[i].name === item) {
                player.inventory.splice(i, 1);
                qty--;
            }
        }
    }

    // Add crafted item
    for (let i = 0; i < recipe.output.quantity; i++) {
        player.inventory.push({
            name: recipe.output.name,
            type: recipe.type,
            equip: false
        });
    }
}


populateItems(player) {
    // Clear existing items
Object.entries(this.itemGroups).forEach(([name, group]) => {
    if (name !== "Crafting") {
        group.removeAll(true);
    }
});

    const SLOT_SIZE = 48;
    const SLOT_GAP = 24;
    const INNER_WIDTH = this.inventoryBox.width - 30 * 2;
    const ITEMS_PER_ROW = Math.floor((INNER_WIDTH - 250 - 20 + SLOT_GAP) / (SLOT_SIZE + SLOT_GAP));

    const createSlot = (item, index) => {
        const col = index % ITEMS_PER_ROW;
        const row = Math.floor(index / ITEMS_PER_ROW);

        const slotBg = this.scene.add.rectangle(
            col * (SLOT_SIZE + SLOT_GAP),
            row * (SLOT_SIZE + SLOT_GAP),
            SLOT_SIZE,
            SLOT_SIZE,
            0x222222,
            0.9
        )
        .setOrigin(0)
        .setScrollFactor(0)
        .setStrokeStyle(2, 0x666666)
        .setInteractive({ useHandCursor: true });

        // Tileset frame
        let tilesetKey, frame;
        switch(item.type.toLowerCase()) {
            case "tools":
            case "weapons":
                tilesetKey = "attribute_items";
                frame = item.img?.tiles?.[0] ?? 0;
                break;
            case "food":
                tilesetKey = "crops";
                frame = item.img?.tiles?.[0] ?? 0;
                break;
            default:
                tilesetKey = "attribute_items";
                frame = 0;
        }

        const icon = this.scene.add.sprite(
            col * (SLOT_SIZE + SLOT_GAP) + SLOT_SIZE / 2,
            row * (SLOT_SIZE + SLOT_GAP) + SLOT_SIZE / 2,
            tilesetKey,
            frame
        ).setOrigin(0.5).setScale(1).setScrollFactor(0);

        // Slot click: show details
        slotBg.on("pointerdown", () => {
            this.itemNameText.setText(item.name);
            this.itemDescriptionText.setText(item.description || "No description");

            if(item.type.toLowerCase() === "food") {
                // Food: show "Use" button
                this.itemButton1Text.setText("Use");
                this.itemButton2.setVisible(false);
                this.itemButton2Text.setVisible(false);

                // Add click to Use
                this.itemButton1.removeAllListeners();
                this.itemButton1.on("pointerdown", () => {
                    console.log(`Used ${item.name}`);
                    // You can call a function here to consume food
                });

            } else {
                // Tools or Weapons: show "Equip"
                const updateButtonText = () => {
                    this.itemButton1Text.setText(item.equip ? "Unequip" : "Equip");
                };
                updateButtonText();

                this.itemButton2.setVisible(false);
                this.itemButton2Text.setVisible(false);

                this.itemButton1.removeAllListeners();
                this.itemButton1.on("pointerdown", () => {
                    // Toggle equip state
                    item.equip = !item.equip;
                    console.log(`${item.name} equip state: ${item.equip}`);
                    updateButtonText();
                });
            }

            this.itemButton1.setVisible(true);
            this.itemButton1Text.setVisible(true);
        });

        return [slotBg, icon];
    };

    const types = ["Tools", "Food", "Weapons"];
    types.forEach(type => {
        const itemsOfType = player.inventory.filter(i => i.type.toLowerCase() === type.toLowerCase());
        itemsOfType.forEach((item, idx) => {
            const slotElements = createSlot(item, idx);
            this.itemGroups[type].add(slotElements);
        });
    });
    // ===============================
// POPULATE CRAFTING TAB
// ===============================
this.itemGroups.Crafting.removeAll(true);

Object.values(RECIPES).forEach((recipe, idx) => {
    const slotElements = this.createCraftSlot(recipe, idx, player);
    this.itemGroups.Crafting.add(slotElements);
});

}


    switchTab(tab) {
        this.activeTab = tab;
        Object.entries(this.itemGroups).forEach(([name, group]) => group.setVisible(name === tab));
        Object.entries(this.tabButtons).forEach(([name, btn]) => btn.setFillStyle(name === tab ? 0x666666 : 0x333333));
        // Clear left panel
        this.itemNameText.setText("");
        this.itemDescriptionText.setText("");
        this.itemButton1.setVisible(false);
        this.itemButton1Text.setVisible(false);
        this.itemButton2.setVisible(false);
        this.itemButton2Text.setVisible(false);
    }

    update(player) {
        if(!this.container.visible) return;
        const cam = this.camera;
        const invZoom = 1 / cam.zoom;
        const { width, height } = this.scene.scale;

        // ===============================
// UPDATE STATS BARS
// ===============================
const hpPercent = Phaser.Math.Clamp(player.attributes.health / player.attributes.max_health, 0, 1);
const engPercent = Phaser.Math.Clamp(player.attributes.energy / player.attributes.max_energy, 0, 1);

const RIGHT_WIDTH = this.STATS_WIDTH * 0.67 - 12;

this.hpBar.width = Phaser.Math.Linear(
    this.hpBar.width,
    RIGHT_WIDTH * hpPercent,
    0.1
);

this.engBar.width = Phaser.Math.Linear(
    this.engBar.width,
    RIGHT_WIDTH * engPercent,
    0.1
);


// const RIGHT_WIDTH = this.STATS_WIDTH * 0.67 - 12;

// this.hpBar.width = RIGHT_WIDTH * hpPercent;
// this.engBar.width = RIGHT_WIDTH * engPercent;


        this.coinText.setText(`Coins ${player.coins}`);
        this.container.setScale(invZoom);
        this.container.setPosition(this.baseX + (width * (1 - invZoom)) / 2, this.baseY + (height * (1 - invZoom)) / 2);
    }

    show() { this.container.setVisible(true); }
    hide() { this.container.setVisible(false); }
}

window.characterUIManager = characterUIManager;
