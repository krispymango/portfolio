class instructionsMenu extends Phaser.Scene {
    constructor(){
        super('instructionsMenu');
    }

    create(){
        //Cursor Default Icon
        this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        
        const configData = this.cache.json.get('config_data');

        const checkVisit = localStorage.getItem('checkVisit') ? localStorage.getItem('checkVisit') : localStorage.setItem('checkVisit',true);

        // pick instructions
        this.messages = (config.width >= 350 && config.width <= 500) 
            ? configData.instructions.mobile[checkVisit ? "default" : "first_time"]
            : configData.instructions.desktop[checkVisit ? "default" : "first_time"];

        // track position
        this.currentMessageIndex = 0;


        var bgSfxTap = this.sound.add('click_sound', {
            loop: false,
            volume: 1
        });

        // Decide modal size
        let modalWidth = (config.width >= 350 && config.width <= 500) ? 300 : 500;
        let modalHeight = 150;


        const centerX = config.width / 2;
        const centerY = config.height / 2;


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


        //-----------------------------
        // MODAL
        //-----------------------------
        this.modal_box = this.add.nineslice(
            centerX,
            centerY + 100,
            'navigation_menu',
            0,
            modalWidth,
            modalHeight,
            32,32,32,32
        )
        .setOrigin(0.5)
        .setDepth(1000)
        .setTint(0x000000)
        .setAlpha(0.8)
        .setInteractive();

        //-----------------------------
        // NAME BOX
        //-----------------------------
        this.name_box = this.add.nineslice(
            (config.width >= 350 && config.width <= 500) ? this.modal_box.x - 50 : this.modal_box.x -  90,
            this.modal_box.y - 110,
            'navigation_menu',
            0,
            (config.width >= 350 && config.width <= 500) ? 200 : 300,
            60,
            32,32,32,32
        )
        .setOrigin(0.5)
        .setDepth(1000)
        .setTint(0x000000)
        .setAlpha(0.8)
        .setInteractive();



        this.modal_box_desc = this.add.text(
            this.modal_box.x,
            this.modal_box.y,
            this.messages[this.currentMessageIndex],
            {
                fontFamily: 'fibberish',
                fontSize: (config.width >= 350 && config.width <= 500) ? '17px' : '19px',
                fill: '#fff',
                wordWrap:{ width: this.modal_box.displayWidth - 20 }
            }
        )
        .setOrigin(0.5)
        .setDepth(1001)
        .setStroke('#44403B', 6);


        //-----------------------------
        // TITLE
        //-----------------------------
        const titleOffsetY = -modalHeight / 2 + 40; // 40px padding from top of modal
        this.modal_box_title = this.add.text(
            (config.width >= 350 && config.width <= 500) ?  this.modal_box.x - 50 : this.modal_box.x - 90,
            this.modal_box.y - 110,
            `Abdul - Razak Mahama`,
            {
                fontFamily: 'fibberish',
                fontSize: (config.width >= 350 && config.width <= 500) ? '18px' : '25px',
                fill: '#fff'
            }
        )
        .setOrigin(0.5)
        .setDepth(1001)
        .setStroke('#44403B', 6);




        //-----------------------------
        // PREVIOUS BUTTON
        //-----------------------------
        const previousOffsetY = modalHeight / 2 - 40; // 40px padding from bottom of modal
        this.modal_box_previous_btn = this.add.nineslice(
            (config.width >= 350 && config.width <= 500) ? centerX - 80 : centerX - 100,
            this.modal_box.y + 100,
            'button_one',
            0,
            (config.width >= 350 && config.width <= 500) ? 120 :  180,
            40,
            16,16,16,16
        )
        .setOrigin(0.5)
        .setDepth(1000)
        .setInteractive({ useHandCursor: true })
        .setTint(0xE8E8E8);

        this.modal_box_previous_btn_text = this.add.text(
            (config.width >= 350 && config.width <= 500) ? centerX - 80 : centerX - 100,
            this.modal_box.y + 100,
            `Previous`,
            {
                fontFamily: 'fibberish',
                fontSize: '22px',
                fill: '#fff'
            }
        )
        .setOrigin(0.5)
        .setDepth(1001)
        .setStroke('#44403B', 6);


        this.modal_box_previous_btn.on('pointerdown', () => {
            this.previousMessage();
            bgSfxTap.play();
        });

        this.modal_box_previous_btn.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
        });

        this.modal_box_previous_btn.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        this.modal_box_previous_btn.on('pointerup',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        //-----------------------------
        // NNEXT BUTTON
        //-----------------------------
        
        this.modal_box_next_btn = this.add.nineslice(
            (config.width >= 350 && config.width <= 500) ? centerX + 80 : centerX + 100,
            this.modal_box.y + 100,
            'button_one',
            0,
            (config.width >= 350 && config.width <= 500) ? 120 : 180,
            40,
            16,16,16,16
        )
        .setOrigin(0.5)
        .setDepth(1000)
        .setInteractive({ useHandCursor: true })
        .setTint(0xE8E8E8);

        this.modal_box_next_btn_text = this.add.text(
            (config.width >= 350 && config.width <= 500) ? centerX + 80 : centerX + 100,
            this.modal_box.y + 100,
            `Next`,
            {
                fontFamily: 'fibberish',
                fontSize: '22px',
                fill: '#fff'
            }
        )
        .setOrigin(0.5)
        .setDepth(1001)
        .setStroke('#44403B', 6);


        this.modal_box_next_btn.on('pointerdown', () => {
            this.nextMessage();
            bgSfxTap.play();
        });

        this.modal_box_next_btn.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
        });

        this.modal_box_next_btn.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        this.modal_box_next_btn.on('pointerup',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        this.updateButtons();
    }


    nextMessage(){
        if(this.currentMessageIndex < this.messages.length - 1){
            this.currentMessageIndex++;
            this.modal_box_desc.setText(
                this.messages[this.currentMessageIndex]
            );
            console.log('this.currentMessageIndex: ',this.currentMessageIndex);
            
        }
        else
        {
                this.fadeOut();
        }
        this.updateButtons();
    }


    previousMessage(){
        if(this.currentMessageIndex > 0){
            this.currentMessageIndex--;
            this.modal_box_desc.setText(
                this.messages[this.currentMessageIndex]
            );
        }
        this.updateButtons();
    }

    updateButtons(){

        this.modal_box_previous_btn.setAlpha(
            this.currentMessageIndex === 0 ? 0.5 : 1
        );

        this.modal_box_next_btn.setAlpha(
            //this.currentMessageIndex === this.messages.length - 1 ? 0.5 : 1
        );
    }


    fadeIn(duration = 200) {
    this.tweens.add({
        targets: [this.modal_box],
        alpha: [0, 0.7],
        duration
    });

    this.tweens.add({
        targets: [this.modal_box_title, this.modal_box_previous_btn, this.modal_box_previous_btn_text, this.modal_box_next_btn, this.modal_box_next_btn_text],
        alpha: { from: 0, to: 1 },
        duration: duration + 100
    });
    }

    fadeOut(duration = 200) {
        this.tweens.add({
            targets: [this.overlay, this.modal_box, this.modal_box_title, this.modal_box_previous_btn, this.modal_box_previous_btn_text, this.modal_box_next_btn, this.modal_box_next_btn_text],
            alpha: 0,
            duration,
            onComplete: () => { this.scene.stop(); }
        });
    }

}