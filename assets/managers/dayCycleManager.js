class dayCycleManager {
    constructor(scene, sprite){
        this.scene = scene;
        this.sprite = sprite;
        this.manualOverride = false;

        this.currentMode = null;

        this.init();

        // Checks every minute
        this.scene.time.addEvent({
            delay: 60000,
            loop: true,
            callback: this.checkTime,
            callbackScope: this
        });
    }

    init(){
        this.checkTime();
    }

    checkTime(){

        if(this.manualOverride) return;

        const hour = new Date().getHours();

        const isDay = hour >= 6 && hour < 18;

        if(isDay && this.currentMode !== "day"){
            this.setDay();
        }
        else if(!isDay && this.currentMode !== "night"){
            this.setNight();
        }
    }


    setDay(){

        this.currentMode = "day";

        this.sprite.play("dayCycle", true);

        // removes dark tint
        this.scene.cameras.main.setBackgroundColor("#87CEEB");

        this.scene.layers.forEach(layer=>{
            //layer.clearTint();
            layer.setTint(0xffffff);
        });

        //console.log("Switched to DAY");
    }

    setNight(){

        this.currentMode = "night";

        this.sprite.play("nightCycle", true);

        // darker blue
        this.scene.cameras.main.setBackgroundColor("#0b0f2a");

        this.scene.layers.forEach(layer=>{
            layer.setTint(0x6a7abf); // soft moonlight
        });

        //console.log("Switched to NIGHT");
    }

    toggleCycle(){

        this.manualOverride = true;

        if(this.currentMode === "day"){
            this.setNight();
        }else{
            this.setDay();
        }
    }


}

window.dayCycleManager = dayCycleManager;
