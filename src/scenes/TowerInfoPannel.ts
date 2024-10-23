import { Container, Graphics, Sprite, Texture, Text } from "pixi.js";
import { Tower } from "../models/Tower";
import { PlayerController } from "../controllers/PlayerController";
import { TowerSelectionPannel } from "./TowerSelectionPannel";


export class TowerInfoPannel extends Container {
    public static instance: TowerInfoPannel;
    private towerRange: Sprite;

    constructor() {
        super();
        TowerInfoPannel.instance = this;
        this.towerRange = new Sprite();
    }

    infoTower(tower: Tower) {
        TowerSelectionPannel.instance.visible = false;
        this.visible = true;
        this.towerRange.texture = Texture.from('range_tower');
        this.towerRange.anchor.set(0.5);
        this.towerRange.position.set(tower.sprite.x + 32, tower.sprite.y + 32);
        this.towerRange.width = tower.range * 2;
        this.towerRange.height = tower.range * 2;
        this.addChild(this.towerRange);

        const grapbg = new Graphics();
        grapbg.rect(0, 640, 1024, 160);
        grapbg.fill(0x77CDFF);
        this.addChild(grapbg);

        const infoText = new Text(`Tower: ${tower.name}\nLevel: ${tower.level}\nDamage: ${tower.damage}\nFireRate: ${tower.fireRate}\nCost: ${tower.cost}\nRange: ${tower.range}`, {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0x000000,
        });
        infoText.position.set(50, 650);
        this.addChild(infoText);

        const upgradeTowerBtn = new Graphics();
        upgradeTowerBtn.rect(500, 650, 200, 50);
        upgradeTowerBtn.fill(0xFFBD73);
        upgradeTowerBtn.interactive = true;
        upgradeTowerBtn.cursor = 'pointer';
        upgradeTowerBtn.on('pointerdown', () => {
            PlayerController.instance.upgradeTower(tower.id, tower.level, tower.cost);
            this.infoTower(tower);
        });
        this.addChild(upgradeTowerBtn);

        const removeTowerBtn = new Graphics();
        removeTowerBtn.rect(500, 720, 200, 50);
        removeTowerBtn.fill(0xFFCFB3);
        removeTowerBtn.interactive = true;
        removeTowerBtn.cursor = 'pointer';
        removeTowerBtn.on('pointerdown', () => {
            PlayerController.instance.sellTower(tower, tower.cost);
            this.towerRange.texture = Texture.EMPTY;
        });
        this.addChild(removeTowerBtn);
    }

}