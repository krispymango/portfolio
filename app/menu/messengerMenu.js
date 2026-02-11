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
        z-index: 10000;
    `;

    // Full Name
    this.inputName = document.createElement('input');
    this.inputName.type = 'text';
    this.inputName.placeholder = 'Full Name';
    this.inputName.style.cssText = inputStyle + `width: ${(config.width >= 350 && config.width <= 500) ? 200 : 400}px; left:${centerX - (config.width >= 350 && config.width <= 500) ? 70 : 200}px; top:${centerY - 140}px;`;
    document.body.appendChild(this.inputName);

    // Email
    this.inputEmail = document.createElement('input');
    this.inputEmail.type = 'email';
    this.inputEmail.placeholder = 'Email';
    this.inputEmail.style.cssText = inputStyle + `width: ${(config.width >= 350 && config.width <= 500) ? 200 : 400}px; left:${centerX - (config.width >= 350 && config.width <= 500) ? 70 : 200}px; top:${centerY - 70}px;`;
    document.body.appendChild(this.inputEmail);

    // Message
    this.inputMessage = document.createElement('textarea');
    this.inputMessage.placeholder = 'Your message...';
    this.inputMessage.style.cssText = inputStyle + `width: ${(config.width >= 350 && config.width <= 500) ? 200 : 400}px; height: 150px; left:${centerX - (config.width >= 350 && config.width <= 500) ? 70 : 200}px; top:${centerY + 0}px; resize: none;`;
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

        //-----------------------------
        // FADE IN
        //-----------------------------
        this.fadeIn();
    }


    submitMessage(){
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

        fetch('http://192.168.150.13:81/front_desk/api/v1_api.php', requestOptions)
        .then((response) => response.json())
        .then((jsonData) => {
            //console.log(jsonData);
            clearTimeout(timeoutId); // Clear the timeout if an error occurs

            if(jsonData[0].status == 1)
            {
            //checkFirstLogin(jsonData[0]);
            //saveData(jsonData[0]);
            }
            else
            {
            //setErrorMessage(jsonData.message ? jsonData.message : 'Wrong login credentials!');
  
            }
        })
        .catch((error) => {
        clearTimeout(timeoutId); // Clear the timeout if an error occurs
        //setErrorMessage('Wrong login credentials!');
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