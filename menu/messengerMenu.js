class messengerMenu extends Phaser.Scene {
    constructor(){
        super('messengerMenu');
    }

    create(){

        //Cursor Default Icon
        this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');

        var bgSfxTap = this.sound.add('click_sound', {
            loop: false,
            volume: 1
        });

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

        // Decide modal size
        let modalWidth = 500;
        let modalHeight = 500;

        if (config.width >= 350 && config.width <= 500) 
        {
            modalWidth = 350;
            modalHeight = 500;
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
        // POP UP MESSAGE
        //-----------------------------
        this.popup_box = this.add.nineslice(
            (config.width >= 350 && config.width <= 500) ? config.width/2 : config.width/2,
            60,
            'navigation_menu',
            0,
            (config.width >= 350 && config.width <= 500) ? 280 : 350,
            60,
            32,32,32,32
        )
        .setOrigin(0.5)
        .setVisible(false)
        .setDepth(1000)
        .setTint(0x000000)
        .setAlpha(1);

        //-----------------------------
        // POP UP MESSAGE TITLE
        //-----------------------------
        this.popup_box_text = this.add.text(
            (config.width >= 350 && config.width <= 500) ?  this.popup_box.x : this.popup_box.x,
            this.popup_box.y,
            ``,
            {
                fontFamily: 'fibberish',
                fontSize: (config.width >= 350 && config.width <= 500) ? '18px' : '25px',
                fill: '#fff'
            }
        )
        .setOrigin(0.5)
        .setVisible(false)
        .setDepth(1001)
        .setStroke('#44403B', 6);


        //-----------------------------
        // TITLE
        //-----------------------------
        const titleOffsetY = -modalHeight / 2 + 40; // 40px padding from top of modal
        this.modal_box_title = this.add.text(
            config.width / 2,
            config.height / 2 + titleOffsetY,
            `Contact`,
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
    // INPUT BOXES
    //-----------------------------
    const inputStyle = `
        position: absolute;
        font-family: fibberish;
        font-size: 20px;
        padding: 8px;
        border: 2px solid #fff;
        background: #111;
        color: #fff;
        outline: none;
        z-index: 1000;
    `;

    var checkInputAlign = (config.width >= 350 && config.width <= 500) ? 200 : 400;
    var checkLeftAlign = (config.width >= 350 && config.width <= 500) ? 110 : 200

    // Full Name
    this.inputName = document.createElement('input');
    this.inputName.type = 'text';
    this.inputName.placeholder = 'Full Name';
    this.inputName.style.cssText = inputStyle + `width: ${checkInputAlign}px; left:${centerX - checkLeftAlign}px; top:${centerY - 140}px;`;
    document.body.appendChild(this.inputName);

    // Email
    this.inputEmail = document.createElement('input');
    this.inputEmail.type = 'email';
    this.inputEmail.placeholder = 'Email';
    this.inputEmail.style.cssText = inputStyle + `width: ${checkInputAlign}px; left:${centerX - checkLeftAlign}px; top:${centerY - 70}px;`;
    document.body.appendChild(this.inputEmail);

    // Message
    this.inputMessage = document.createElement('textarea');
    this.inputMessage.placeholder = 'Your message...';
    this.inputMessage.style.cssText = inputStyle + `width: ${checkInputAlign}px; height: 150px; left:${centerX - checkLeftAlign}px; top:${centerY + 0}px; resize: none;`;
    document.body.appendChild(this.inputMessage);

        //-----------------------------
        // CANCEL BUTTON
        //-----------------------------
        const cancelOffsetY = modalHeight / 2 - 40; // 40px padding from bottom of modal
        this.modal_box_cancel_btn = this.add.nineslice(
            (config.width >= 350 && config.width <= 500) ? centerX - 60 : centerX - 100,
            centerY + cancelOffsetY,
            'button_one',
            0,
            (config.width >= 350 && config.width <= 500) ? 100 : 180,
            40,
            16,16,16,16
        )
        .setOrigin(0.5)
        .setDepth(1000)
        .setInteractive({ useHandCursor: true })
        .setTint(0xE8E8E8);

        this.modal_box_cancel_btn_text = this.add.text(
            (config.width >= 350 && config.width <= 500) ? centerX - 60 : centerX - 100,
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


        this.modal_box_cancel_btn.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
        });

        this.modal_box_cancel_btn.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        this.modal_box_cancel_btn.on('pointerup',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });


        //-----------------------------
        // SUBMIT BUTTON
        //-----------------------------
        
        this.modal_box_submit_btn = this.add.nineslice(
            (config.width >= 350 && config.width <= 500) ? centerX + 60 : centerX + 100,
            centerY + cancelOffsetY,
            'button_one',
            0,
            (config.width >= 350 && config.width <= 500) ? 100 : 180,
            40,
            16,16,16,16
        )
        .setOrigin(0.5)
        .setDepth(1000)
        .setInteractive({ useHandCursor: true })
        .setTint(0x05DF72);

        this.modal_box_submit_btn_text = this.add.text(
            (config.width >= 350 && config.width <= 500) ? centerX + 60 : centerX + 100,
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

        this.modal_box_submit_btn.on('pointerover',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/hand_thin_point.png), pointer');
        });

        this.modal_box_submit_btn.on('pointerout',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        this.modal_box_submit_btn.on('pointerup',() => {
            this.input.setDefaultCursor('url(./assets/img/ui/cursors/Default/pointer_c_shaded.png), pointer');
        });

        //-----------------------------
        // FADE IN
        //-----------------------------
        this.fadeIn();


        //-----------------------------
        // LOAD OVERLAY
        //-----------------------------
        // this.load_overlay = this.add.rectangle(
        //     0, 0,
        //     this.sys.game.config.width,
        //     this.sys.game.config.height,
        //     0x000000
        // )
        // .setInteractive()
        // .setOrigin(0)
        // .setAlpha(0.6)
        // .setDepth(9999)
        // .setVisible(false);
        
    }


    submitMessage(){
            document.getElementById("darkOverlay").style.display = "block";

            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
                controller.abort();
            }, 15000);

            const formData = new FormData();
            formData.append('type', 'contact');
            formData.append('email', this.inputEmail.value ? this.inputEmail.value : '');
            formData.append('fullname', this.inputName.value ? this.inputName.value : '');
            formData.append('message', this.inputMessage.value ? this.inputMessage.value : '');

          const requestOptions = {
            method: 'POST',
            body: formData,
            signal: controller.signal // Associate the AbortController's signal with the fetch
          };

        fetch('https://api.kriolay.com/send-message.php', requestOptions)
        .then((response) => response.json())
        .then((jsonData) => {
            //console.log(jsonData);
            clearTimeout(timeoutId); // Clear the timeout if an error occurs

            document.getElementById("darkOverlay").style.display = "none";

            if(jsonData[0].status == 1)
            {
                
                
                this.popup_box.setVisible(true);
                this.popup_box_text.setText(jsonData[0] ? jsonData[0].message : 'Message Sent!');
                this.popup_box_text.setVisible(true);

                this.inputEmail.value = "";
                this.inputName.value = "";
                this.inputMessage.value = "";


                setTimeout(() => {
                    this.popup_box.setVisible(false);
                    this.popup_box_text.setText('');
                    this.popup_box_text.setVisible(false);
                }, 1000 * 6);
            //checkFirstLogin(jsonData[0]);
            //saveData(jsonData[0]);
            }
            else
            {
                
                this.popup_box.setVisible(true);
                this.popup_box_text.setText(jsonData[0] ? jsonData[0].message : 'Please try again!');
                this.popup_box_text.setVisible(true);

                setTimeout(() => {
                    this.popup_box.setVisible(false);
                    this.popup_box_text.setText('');
                    this.popup_box_text.setVisible(false);
                }, 1000 * 6);
            //setErrorMessage(jsonData.message ? jsonData.message : 'Wrong login credentials!');
  
            }
        })
        .catch((error) => {
        clearTimeout(timeoutId); // Clear the timeout if an error occurs
        //setErrorMessage('Wrong login credentials!');
                
                document.getElementById("darkOverlay").style.display = "none";
                this.popup_box.setVisible(true);
                this.popup_box_text.setText('Please try again!');
                this.popup_box_text.setVisible(true);

                setTimeout(() => {
                    this.popup_box.setVisible(false);
                    this.popup_box_text.setText('');
                    this.popup_box_text.setVisible(false);
                }, 1000 * 6);
        });
    }

    fadeIn(duration = 200) {
        this.tweens.add({
            targets: [this.modal_box],
            alpha: [0, 0.7],
            duration
        });

        this.tweens.add({
            targets: [this.modal_box_title, this.modal_box_cancel_btn, this.modal_box_cancel_btn_text, this.inputName, this.inputEmail, this.inputMessage],
            alpha: { from: 0, to: 1 },
            duration: duration + 100
        });
    }

    fadeOut(duration = 200) {
        this.tweens.add({
            targets: [this.overlay, this.modal_box, this.modal_box_title,  this.modal_box_cancel_btn, this.modal_box_cancel_btn_text, this.inputName, this.inputEmail, this.inputMessage],
            alpha: 0,
            duration,
            onComplete: () => { 
            // Remove HTML inputs
            this.inputName?.remove();
            this.inputEmail?.remove();
            this.inputMessage?.remove();
            this.scene.stop(); 
        }
        });
    }
}