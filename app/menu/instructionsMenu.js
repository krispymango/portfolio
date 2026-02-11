class instructionsMenu extends Phaser.Scene {
    constructor(){
        super('instructionsMenu');
    }

    create(data){
        //Cursor Default Icon
        this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');

        var bgSfxTap = this.sound.add('click_sound', {
            loop: false,
            volume: 1
        });

        // Decide modal size
        let modalWidth = 400;
        let modalHeight = 300;


        //-----------------------------
        // MODAL
        //-----------------------------
        this.modal_box = this.add.nineslice(
            config.width / 2,
            config.height - 100,
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
            `Abdul - Razak Mahama`,
            {
                fontFamily: 'fibberish',
                fontSize: '30px',
                fill: '#fff'
            }
        )
        .setOrigin(0.5)
        .setDepth(1001)
        .setStroke('#44403B', 6);

        const centerX = config.width / 2;
        const centerY = config.height / 2;




        //-----------------------------
        // PREVIOUS BUTTON
        //-----------------------------
        const cancelOffsetY = modalHeight / 2 - 40; // 40px padding from bottom of modal
        this.modal_box_cancel_btn = this.add.nineslice(
            centerX - 100,
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
            centerX - 100,
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
            this.fadeOut();
            bgSfxTap.play();
        });



        //-----------------------------
        // NNEXT BUTTON
        //-----------------------------
        
        this.modal_box_submit_btn = this.add.nineslice(
            centerX + 100,
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
        .setTint(0x05DF72);

        this.modal_box_submit_btn_text = this.add.text(
            centerX + 100,
            centerY + cancelOffsetY,
            `Submit`,
            {
                fontFamily: 'fibberish',
                fontSize: '22px',
                fill: '#44403B'
            }
        )
        .setOrigin(0.5)
        .setDepth(1001)
        .setStroke('#ffffff', 6);


        this.modal_box_submit_btn.on('pointerdown', () => {
            this.submitMessage();
            bgSfxTap.play();
        });
    }
}