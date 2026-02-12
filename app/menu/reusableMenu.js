class reusableMenu extends Phaser.Scene {
    constructor() {
        super('reusableMenu');
    }

    create(data) {
        //Cursor Default Icon
        this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');

        var bgSfxTap = this.sound.add('click_sound', {
            loop: false,
            volume: 1
        });

        let descData = null;
        const configData = this.cache.json.get('config_data');

        switch (data.data.imp) {
            case 'profile_summary':
                descData = configData.profile_summary.english;
                break;

            case 'education':
                descData = configData.education.english;
                break;

            case 'professional_experience':
                descData = configData.professional_experience.english;
                break;

            case 'core_competence':
                descData = configData.core_competence.english;
                break;

            case 'projects':
                descData = configData.projects.english;
                break;

            case 'hobbies':
                descData = configData.hobbies.english;
                break;

            default:
                break;
        }

        //-----------------------------
        // OVERLAY
        //-----------------------------
        this.overlay = this.add.rectangle(
            0, 0,
            this.sys.game.config.width,
            this.sys.game.config.height,
            0x000000
        )
        .setInteractive()
        .setOrigin(0)
        .setAlpha(0.6)
        .setDepth(999);


        let modalWidth = 900;
        let modalHeight = 600;
        
        if (config.width >= 350 && config.width <= 500) 
        {
            modalWidth = 350;
            modalHeight = 600;
        }

        if (data.data.imp !== 'education' && data.data.imp !== 'professional_experience') {
            if (config.width >= 350 && config.width <= 500) 
            {
                modalWidth = 350;   // smaller width
                modalHeight = 600;  // smaller height
            }
            else
            {
                modalWidth = 900;   // smaller width
                modalHeight = 400;  // smaller height
            }
        }

        //-----------------------------
        // MODAL
        //-----------------------------
        this.modal_box = this.add.nineslice(
            config.width / 2,
            config.height / 2,
            'navigation_menu',
            0,
            modalWidth,
            modalHeight,
            32,32,32,32
        )
        .setOrigin(0.5)
        .setDepth(1000)
        .setTint(0x000000)
        .setAlpha(0);

        //-----------------------------
        // TITLE
        //-----------------------------
        const titleOffsetY = -modalHeight / 2 + 40; // 40px padding from top of modal
        this.modal_box_title = this.add.text(
            config.width / 2,
            config.height / 2 + titleOffsetY,
            `${data.data.title || '-'}`,
            {
                fontFamily: 'fibberish',
                fontSize: (config.width >= 350 && config.width <= 500) ? '20px' : '30px',
                fill: '#fff'
            }
        )
        .setOrigin(0.5)
        .setDepth(1001)
        .setStroke('#44403B', 6);

// -----------------------------
// SCROLLABLE DESCRIPTION
// -----------------------------
var checkDescWidth = (config.width >= 350 && config.width <= 500) ? 110 : 160;
const descWidth = modalWidth - checkDescWidth;  // leave padding
const descHeight = modalHeight - 160;
const centerX = config.width / 2;
const centerY = config.height / 2;

// Container for all content
this.descContainer = this.add.container(centerX, centerY).setDepth(1001);

// Track content height for scrolling
let totalContentHeight = 0;

// For sections that are just text (profile_summary, education, others)
let displayText = '';

if (data.data.imp === 'profile_summary' && Array.isArray(descData)) {
    let currentY = -descHeight / 2;
    const itemSpacing = 16;
    const itemWidth = descWidth;
    const padding = 16;

    descData.forEach(item => {
        let contentHeight = 0;
        const texts = [];
        let currentTextY = padding;

        // Fullname
        if (item.fullname) {
            const t = this.add.text(padding, currentTextY, `Name: ${item.fullname}`, {
                fontFamily:'fibberish',
                fontSize: (config.width >= 350 && config.width <= 500) ? '18px' :  '26px',
                fill:'#fff',
                fontStyle:'bold',
                wordWrap:{ width: itemWidth - 10 }
            }).setOrigin(0,0).setStroke('#44403B', 5);
            texts.push(t);
            currentTextY += t.height + 8;
        }

        // Description
        if (item.description) {
            const t = this.add.text(padding, currentTextY, item.description, {
                fontFamily:'fibberish',
                fontSize:(config.width >= 350 && config.width <= 500) ? '16px' : '20px',
                fill:'#fff',
                wordWrap:{ width: itemWidth - padding*2 }
            }).setOrigin(0,0).setStroke('#44403B', 4);
            texts.push(t);
            currentTextY += t.height + 8;
        }

        // Education or other titled entries
        if (item.title) {
            const titleText = this.add.text(padding, currentTextY, item.title.replace('_',' '), {
                fontFamily:'fibberish',
                fontSize: (config.width >= 350 && config.width <= 500) ? '18px' :'22px',
                fill:'#fff',
                fontStyle:'bold',
                wordWrap:{ width: itemWidth - 10 }
            }).setOrigin(0,0).setStroke('#44403B', 5);
            texts.push(titleText);
            currentTextY += titleText.height + 4;

            if (item.institution) {
                const t = this.add.text(padding, currentTextY, `Institution: ${item.institution}`, {
                    fontFamily:'fibberish',
                    fontSize:'20px',
                    fill:'#fff',
                    wordWrap:{ width: itemWidth - 10 }
                }).setOrigin(0,0).setStroke('#44403B', 4);
                texts.push(t);
                currentTextY += t.height + 2;
            }
            if (item.program) {
                const t = this.add.text(padding, currentTextY, `Program: ${item.program}`, {
                    fontFamily:'fibberish',
                    fontSize:'20px',
                    fill:'#fff',
                    wordWrap:{ width: itemWidth - 10 }
                }).setOrigin(0,0).setStroke('#44403B', 4);
                texts.push(t);
                currentTextY += t.height + 2;
            }
            if (item.address) {
                const t = this.add.text(padding, currentTextY, `Address: ${item.address}`, {
                    fontFamily:'fibberish',
                    fontSize:'20px',
                    fill:'#fff',
                    wordWrap:{ width: itemWidth - 10 }
                }).setOrigin(0,0).setStroke('#44403B', 4);
                texts.push(t);
                currentTextY += t.height + 4;
            }
        }

        // Details as bullets
        if (Array.isArray(item.details)) {
            item.details.forEach(detail => {
                const t = this.add.text(padding + 16, currentTextY, `• ${detail}`, {
                    fontFamily:'fibberish',
                    fontSize: (config.width >= 350 && config.width <= 500) ? '15px' : '20px',
                    fill:'#fff',
                    wordWrap:{ width: itemWidth - padding*3 }
                }).setOrigin(0,0).setStroke('#44403B', 4);
                texts.push(t);
                currentTextY += t.height + 4;
            });
        }

        // Link
        if (item.link) {
            const linkText = item.linkLabel || "[ Click to View ]";
            const t = this.add.text(padding, currentTextY, linkText, {
                fontFamily:'fibberish',
                fontSize:'20px',
                fill:'#00bfff',
                fontStyle:'bold'
            }).setOrigin(0,0).setStroke('#ffffff', 4)
              .setInteractive({ useHandCursor: true })
              .on('pointerdown', () => {
                  window.open(item.link, "_blank");
              });
            texts.push(t);
            currentTextY += t.height + 4;
        }

        contentHeight = currentTextY + padding;

        // Nineslice background for this entry
        const itemBg = this.add.nineslice(
            -descWidth / 2 + itemWidth / 2,
            currentY + contentHeight / 2,
            'button_one', 0,
            itemWidth,
            contentHeight,
            16,16,16,16
        ).setOrigin(0.5,0.5);

        // Container for the text objects
        const itemContainer = this.add.container(itemBg.x - itemWidth/2, currentY);
        texts.forEach(t => itemContainer.add(t));

        // Add to main description container
        this.descContainer.add([itemBg, itemContainer]);

        currentY += contentHeight + itemSpacing;
    });

    totalContentHeight = currentY + descHeight/2;
} else if (data.data.imp === 'education') {
    if (Array.isArray(descData)) {
        displayText = descData.map(item => {
            let line = `${item.title.replace('_',' ')}\n Institution:${item.institution || ''}`;
            if (item.program) line += ` - Program: ${item.program}`;
            if (item.address) line += `\n Address: ${item.address}`;
            return line;
        }).join('\n\n');
    }
} 
else if (data.data.imp === 'core_competence') {

    if (Array.isArray(descData)) {

        let currentY = -descHeight / 2; // start from top
        const itemSpacing = 100;        // space between items
        const spriteSize = (config.width >= 350 && config.width <= 500) ? 50 : 70;          // max sprite size
        const textOffsetX = (config.width >= 350 && config.width <= 500) ? 80 : 120;        // label text X offset
        const itemWidth = descWidth;    // width of nineslice
        const itemHeight = 80;          // height of each item background

        descData.forEach(item => {
            // Create nineslice background for this item
            const itemBg = this.add.nineslice(
                -descWidth / 2 + itemWidth / 2,  // x
                currentY + itemHeight / 2,       // y
                'button_one',             // key of your nineslice image
                0,
                itemWidth,
                itemHeight,
                16,16,16,16                      // corner sizes
            ).setOrigin(0.5, 0.5);

            // Container to hold sprite + text inside the background
            const itemContainer = this.add.container(itemBg.x - itemWidth / 2, currentY);

            // Add sprite if available
            if (item.img && this.textures.exists(item.img)) {
                const sprite = this.add.sprite(spriteSize / 2 + 20, itemHeight / 2, item.img);
                const scale = Math.min(spriteSize / sprite.width, spriteSize / sprite.height);
                sprite.setScale(scale);
                sprite.setOrigin(0.5, 0.5);
                itemContainer.add(sprite);
            }

            // Add label text
            const labelText = this.add.text(
                textOffsetX,
                itemHeight / 2 - 15,
                item.label || '',
                {
                    fontFamily: 'fibberish',
                    fontSize: (config.width >= 350 && config.width <= 500) ? '16px' : '24px',
                    fill: '#fff',
                    wordWrap: { width: itemWidth - textOffsetX - 20 }
                }
            ).setOrigin(0, 0).setStroke('#44403B', 5);

            itemContainer.add(labelText);

            // Add background + container to main descContainer
            this.descContainer.add([itemBg, itemContainer]);

            // Move Y for next item
            currentY += itemSpacing;
        });

        totalContentHeight = currentY + descHeight / 2;
    }
}
else {
    if (Array.isArray(descData)) {
        let currentY = -descHeight / 2;
        const itemSpacing = 16;
        const itemWidth = descWidth;
        const padding = 16;

        descData.forEach(item => {
            let contentHeight = 0;
            const texts = [];

            // Create text objects
            if (typeof item === 'string') {
                const t = this.add.text(padding, padding, item, {
                    fontFamily: 'fibberish',
                    fontSize: (config.width >= 350 && config.width <= 500) ? '18px': '24px',
                    fill: '#fff',
                    wordWrap: { width: itemWidth - padding*2 }
                }).setOrigin(0,0);
                texts.push(t);
                contentHeight = t.height + padding*2;
            } 
            else if (typeof item === 'object' && item !== null) {
                let currentTextY = padding;
                if (item.title) {
                    const t = this.add.text(padding, currentTextY, item.title, { fontFamily:'fibberish', fontSize:(config.width >= 350 && config.width <= 500) ? '18px' : '22px', fill:'#fff', wordWrap:{ width: itemWidth - 10 } }).setOrigin(0,0).setStroke('#44403B', 5);
                    texts.push(t); currentTextY += t.height + 4;
                }
                if (item.position) {
                    const t = this.add.text(padding, currentTextY, item.position, { fontFamily:'fibberish', fontSize: (config.width >= 350 && config.width <= 500) ? '16px' : '20px', fill:'#fff', wordWrap:{ width: itemWidth - 10 } }).setOrigin(0,0).setStroke('#44403B', 5);
                    texts.push(t); currentTextY += t.height + 4;
                }
                if (item.institution) {
                    const t = this.add.text(padding, currentTextY, item.institution, { fontFamily:'fibberish', fontSize: (config.width >= 350 && config.width <= 500) ? '16px' : '20px', fill:'#fff', wordWrap:{ width: itemWidth - 10 } }).setOrigin(0,0).setStroke('#44403B', 5);
                    texts.push(t); currentTextY += t.height + 4;
                }
                if (item.description) {
                    const t = this.add.text(padding, currentTextY, item.description, { fontFamily:'fibberish', fontSize: (config.width >= 350 && config.width <= 500) ? '16px' : '20px', fill:'#fff', wordWrap:{ width: itemWidth - padding*2 } }).setOrigin(0,0).setStroke('#44403B', 5);
                    texts.push(t); currentTextY += t.height + 4;
                }
                // Details as bullet points
                if (Array.isArray(item.details)) {
                    item.details.forEach(detail => {
                        const t = this.add.text(padding + 16, currentTextY, `• ${detail}`, { 
                            fontFamily:'fibberish', fontSize: (config.width >= 350 && config.width <= 500) ? '16px' :  '20px', fill:'#fff', wordWrap:{ width: itemWidth - padding*3 } 
                        }).setOrigin(0,0).setStroke('#44403B', 5);
                        texts.push(t);
                        currentTextY += t.height + 4;
                    });
                }
                if (item.link) {
                    const linkText = item.linkLabel || "[ Click to View ]"; // default text
                    const t = this.add.text(padding, currentTextY, linkText, { 
                        fontFamily: 'fibberish', 
                        fontSize: (config.width >= 350 && config.width <= 500) ? '16px' : '20px', 
                        fill: '#00bfff',
                    }).setOrigin(0,0)
                    .setStroke('#ffffff', 4)
                    .setInteractive({ useHandCursor: true })
                    .on('pointerdown', () => {
                        window.open(item.link, "_blank");
                    });
                    texts.push(t); 
                    currentTextY += t.height + 4;
                }


                contentHeight = currentTextY + padding;
            }

            // Create nineslice background
            const itemBg = this.add.nineslice(
                -descWidth / 2 + itemWidth / 2,
                currentY + contentHeight / 2,
                'button_one', 0,
                itemWidth,
                contentHeight,
                16,16,16,16
            ).setOrigin(0.5,0.5);

            // Container for the text
            const itemContainer = this.add.container(itemBg.x - itemWidth/2, currentY);

            // Add text objects to container individually
            texts.forEach(t => itemContainer.add(t));

            // Add background + container to main descContainer
            this.descContainer.add([itemBg, itemContainer]);

            currentY += contentHeight + itemSpacing;
        });

        totalContentHeight = currentY + descHeight/2;
    }
}




// Add text for sections that use displayText
if (displayText) {
    this.descriptionText = this.add.text(
        -descWidth / 2,
        -descHeight / 2,
        displayText,
        {
            fontFamily: 'fibberish',
            fontSize: '24px',
            fill: '#fff',
            wordWrap: { width: descWidth }
        }
    ).setOrigin(0,0).setStroke('#44403B', 6);

    this.descContainer.add(this.descriptionText);

    // Update totalContentHeight for text sections
    totalContentHeight = this.descriptionText.height;
}

// -----------------------------
// MASK (CLIPPING)
// -----------------------------
const maskGraphics = this.make.graphics();
maskGraphics.fillRect(centerX - descWidth/2, centerY - descHeight/2, descWidth, descHeight);
const mask = maskGraphics.createGeometryMask();
this.descContainer.setMask(mask);

// -----------------------------
// SCROLLBAR
// -----------------------------
const scrollbarWidth = 12;
const scrollbarPadding = 6;
const trackX = centerX + descWidth/2 - scrollbarPadding + 20;
const trackY = centerY - descHeight/2;

// Track
this.scrollTrack = this.add.rectangle(trackX, centerY, scrollbarWidth, descHeight, 0xffffff, 0.15)
    .setOrigin(0.5,0.5)
    .setDepth(1002);

// Max scroll
this.maxScroll = Math.max(totalContentHeight - descHeight, 0);

// Thumb height
const visibleRatio = descHeight / totalContentHeight;
this.thumbHeight = Phaser.Math.Clamp(descHeight * visibleRatio, 40, descHeight);

// Thumb
this.scrollThumb = this.add.rectangle(
    trackX,
    trackY + this.thumbHeight / 2,
    scrollbarWidth,
    this.thumbHeight,
    0xffffff,
    0.8
)
.setOrigin(0.5)
.setDepth(1003)
.setInteractive({ draggable: true, useHandCursor: true });

// Hide scrollbar if content fits
if (this.maxScroll <= 0){
    this.scrollTrack.setVisible(false);
    this.scrollThumb.setVisible(false);
}

this.currentScroll = 0;

this.updateScrollbar = () => {
    if (this.maxScroll <= 0) return;
    const scrollPercent = this.currentScroll / this.maxScroll;
    const travelDistance = descHeight - this.thumbHeight;
    this.scrollThumb.y = trackY + this.thumbHeight/2 + travelDistance * scrollPercent;
};

// -----------------------------
// MOUSE WHEEL
// -----------------------------
this.input.on('wheel', (pointer, _, __, deltaY) => {
    if (!Phaser.Geom.Rectangle.Contains(this.modal_box.getBounds(), pointer.x, pointer.y)) return;
    this.currentScroll += deltaY * 0.6;
    this.currentScroll = Phaser.Math.Clamp(this.currentScroll, 0, this.maxScroll);
    this.descContainer.y = centerY - this.currentScroll; // scroll container
    this.updateScrollbar();
});

this.input.setDraggable(this.scrollThumb);

this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
    if (gameObject !== this.scrollThumb) return;
    const minY = trackY + this.thumbHeight/2;
    const maxY = trackY + descHeight - this.thumbHeight/2;
    gameObject.y = Phaser.Math.Clamp(dragY, minY, maxY);
    const percent = (gameObject.y - minY) / (maxY - minY);
    this.currentScroll = percent * this.maxScroll;
    this.descContainer.y = centerY - this.currentScroll;
});

this.updateScrollbar();


        //-----------------------------
        // FADE IN
        //-----------------------------
        this.fadeIn();

        //-----------------------------
        // CANCEL BUTTON
        //-----------------------------
        const cancelOffsetY = modalHeight / 2 - 40; // 40px padding from bottom of modal
        this.modal_box_cancel_btn = this.add.nineslice(
            centerX,
            centerY + cancelOffsetY,
            'button_one',
            0,
            180,
            40,
            16,16,16,16
        )
        .setOrigin(0.5)
        .setDepth(1000)
        .setInteractive({ useHandCursor: true })
        .setTint(0xE8E8E8);

        this.modal_box_cancel_btn_text = this.add.text(
            centerX,
            centerY + cancelOffsetY,
            `Cancel`,
            {
                fontFamily: 'fibberish',
                fontSize: '22px',
                fill: '#fff'
            }
        )
        .setOrigin(0.5)
        .setDepth(1001)
        .setStroke('#44403B', 6);


        this.modal_box_cancel_btn.on('pointerdown', () => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
            this.fadeOut();
            bgSfxTap.play();
        });


        this.modal_box_cancel_btn.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
        });

        this.modal_box_cancel_btn.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        this.modal_box_cancel_btn.on('pointerup',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });
    }

    fadeIn(duration = 200) {
        this.tweens.add({
            targets: [this.modal_box, this.scrollTrack],
            alpha: [0, 0.7],
            duration
        });

        this.tweens.add({
            targets: [this.modal_box_title, this.descContainer, this.modal_box_cancel_btn, this.modal_box_cancel_btn_text, this.modal_box_submit_btn, this.modal_box_submit_btn_text],
            alpha: { from: 0, to: 1 },
            duration: duration + 100
        });
    }

    fadeOut(duration = 200) {
        this.tweens.add({
            targets: [this.overlay, this.modal_box, this.modal_box_title, this.descContainer, this.modal_box_cancel_btn, this.modal_box_cancel_btn_text, this.modal_box_submit_btn, this.modal_box_submit_btn_text],
            alpha: 0,
            duration,
            onComplete: () => { this.scene.stop(); }
        });
    }
}
