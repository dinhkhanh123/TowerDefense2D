import { Sprite } from "pixi.js";
import { levels } from "../data/levels";
import { Player } from "../models/Player";
import { TowerType } from "../types/TowerType";
import { towersData } from "../data/towers";
import { TowerController } from "./TowerController";
import { GameScene } from "../scenes/GameScene";

export class PlayerController {
    private static instance: PlayerController;
    private player!: Player;
    constructor(idLevel: number) {
        const levelData = levels.find(lv => lv.id == idLevel);
        if (levelData) {
            this.player = new Player(levelData.id, levelData.name, levelData.resources.gold, levelData.resources.health, levelData.waves.length);
        }
        console.log(this.player);
    }

    // Phương thức để lấy instance của PlayerController
    public static getInstance(idLevel?: number): PlayerController {
        if (!PlayerController.instance && idLevel) {
            PlayerController.instance = new PlayerController(idLevel);
        }
        return PlayerController.instance;
    }

    buyTower(towerType: TowerType, baseSprite: Sprite) {
        const dataTower = towersData.find(t => t.name === towerType);
        if (dataTower && this.player.coin >= dataTower.cost) {
            TowerController.getInstance().createTower(towerType, baseSprite);
            this.consumeGold(dataTower.cost);
            GameScene.instance.updateHUD();
        } else {
            console.log("Not enough gold");
        }
    }

    consumeGold(amount: number) {
        this.player.consumeResources(amount);
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