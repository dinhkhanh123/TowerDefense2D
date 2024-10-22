import { Sprite } from "pixi.js";
import { levels } from "../data/levels";
import { Player } from "../models/Player";
import { TowerType } from "../types/TowerType";
import { towersData } from "../data/towers";
import { TowerController } from "./TowerController";
import { GameScene } from "../scenes/GameScene";
import { Tower } from "../models/Tower";
import { HUD } from "../scenes/HUD";

export class PlayerController {
    public static instance: PlayerController;
    private player!: Player;
    constructor(idLevel: number) {
        PlayerController.instance = this;

        const levelData = levels.find(lv => lv.id == idLevel);
        if (levelData) {
            this.player = new Player(levelData.id, levelData.name, levelData.resources.gold, levelData.resources.health, levelData.waves.length);
        }
    }



    buyTower(towerType: TowerType, baseSprite: Sprite) {
        const tower = towersData.find(t => t.name === towerType);
        if (tower && this.player.coin >= tower.cost) {
            TowerController.instance.createTower(towerType, baseSprite);
            this.consumeGold(tower.cost);
            HUD.instance.updateHUD();
        } else {
            console.log("Not enough gold");
        }
    }

    sellTower(tower: Tower, amount: number) {
        const costSell = amount * 0.8;
        TowerController.instance.removeTower(tower);
        this.addGold(costSell);
        HUD.instance.updateHUD();
    }

    upgradeTower(idTower: number, level: number, amount: number) {
        if (level < 3 && amount <= this.player.coin) {
            TowerController.instance.upgradeTower(idTower);
            this.consumeGold(amount);
            HUD.instance.updateHUD();
        }
    }

    consumeGold(amount: number) {
        this.player.consumeResources(amount);
    }

    addGold(amount: number) {
        this.player.addResources(amount);
    }

    // Nhan damage khi enemy di vao thanh
    takeDamage(amount: number) {
        if (this.player.health >= amount) {
            this.player.takeDamage(amount);
            HUD.instance.updateHUD();
        }
    }

    // Getter cho thông tin Player
    public getHealth(): number {
        return this.player.health;
    }

    public getGold(): number {
        return this.player.coin;
    }

    public getWaves(): number {
        return this.player.wave;
    }
}