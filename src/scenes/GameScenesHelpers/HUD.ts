import { Container, Graphics, Text } from "pixi.js";
import { PlayerController } from '../../controllers/PlayerController';

export class HUD extends Container {
    public static instance: HUD;

    constructor() {
        super();
        HUD.instance = this;

        this.updateHUD();
    }

    updateHUD() {
        const health = PlayerController.instance.getHealth();
        const money = PlayerController.instance.getGold();
        const wave = PlayerController.instance.getWaves();
        const grapbg = new Graphics();
        grapbg.rect(20, 5, 150, 50);
        grapbg.fill(0x77CDFF);
        this.addChild(grapbg);

        const infoText = new Text(`
            Health: ${health} Money: ${money}
            Wave: / ${wave}`,
            {
                fontFamily: 'Arial',
                fontSize: 12,
                fill: 0x000000,
                // align: 'center',
            });
        infoText.position.set(0, 0);
        this.addChild(infoText);
    }
}