import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { TowerType } from "../types/TowerType";
import { Tower } from "../models/Tower";
import { ObjectPool } from "../utils/ObjectPool";
import AssetLoad from "../utils/AssetLoad";
import { GameScene } from "../scenes/GameScene";

export class TowerController {
    private static instance: TowerController;
    private map: Container;
    private towers: Tower[] = [];
    private objectPool: ObjectPool;

    constructor(map: Container) {
        TowerController.instance = this;
        this.map = map;
        this.objectPool = new ObjectPool();
    }

    public static getInstance(map?: Container): TowerController {
        if (!TowerController.instance) {
            if (map) {
                TowerController.instance = new TowerController(map);
            }

        }
        return TowerController.instance;
    }

    createTower(towerType: TowerType, baseSprite: Sprite) {
        const tower = this.objectPool.getTowerFromPool(towerType);
        console.log(tower);
        console.log(baseSprite.position.x);

        baseSprite.removeAllListeners();
        this.map.removeChild(baseSprite);

        tower.sprite.texture = AssetLoad.getTexture('Archer_01');
        tower.sprite.position = baseSprite.position;
        tower.sprite.interactive = true;
        tower.sprite.cursor = 'pointer';
        tower.sprite.on('pointerdown', () => {
            GameScene.instance.displayTowerInfo(tower);
        });
        this.towers.push(tower);
        this.map.addChild(tower.sprite);
    }

    removeTower(tower: Tower, cost: number) {
        const idx = this.towers.indexOf(tower);

        if (idx !== -1) {
            this.towers.splice(idx, 1);
            this.map.removeChild(tower.sprite);
            this.objectPool.returnTowerToPool(tower.name, tower);
        }

        const slotTowerSprite = new Sprite(Texture.from('slot_tower'));
        slotTowerSprite.position = tower.sprite.position;
        slotTowerSprite.interactive = true;
        slotTowerSprite.eventMode = 'static';
        slotTowerSprite.cursor = 'pointer';

        slotTowerSprite.on('pointerdown', () => {
            GameScene.instance.slotTower = slotTowerSprite;
            GameScene.instance.controlTowerPanel();
        });

        this.map.addChild(slotTowerSprite);
    }
}