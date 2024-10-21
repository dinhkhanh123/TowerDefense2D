import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { TowerType } from "../types/TowerType";
import { Tower } from "../models/Tower";
import { ObjectPool } from "../utils/ObjectPool";
import AssetLoad from "../utils/AssetLoad";
import { GameScene } from "../scenes/GameScene";
import { EnemyController } from "./EnemyController";

export class TowerController {
    private static instance: TowerController;
    private map: Container;
    private towers: Tower[] = [];


    constructor(map: Container) {
        TowerController.instance = this;
        this.map = map;

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
        const tower = ObjectPool.instance.getTowerFromPool(towerType);
        console.log(tower);
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
            ObjectPool.instance.returnTowerToPool(tower.name, tower);
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

    upgradeTower(id: number) {
        const tower = this.towers.find(tower => tower.id === id);
        if (tower && tower.level < 3) {
            tower.upgrade();
        } else {
            console.error(`Tower with ID ${id} not found. hoac level max`);
        }
    }

    update(deltaTime: number) {
        this.towers.forEach(tower => {
            const targetInRange = EnemyController.getInstance()
                .getEnemy()
                .filter(
                    enemy =>
                        enemy.isAlive &&
                        tower.isInRange(enemy.getUpdatePositionEnemy()
                        ));

            targetInRange.forEach(enemy => {
                if (!tower.targets.includes(enemy)) {
                    tower.targets.push(enemy);
                }
            });

            if (tower.targets.length > 0) {
                const target = tower.targets[0];
                if (!target.isAlive || !tower.isInRange(target.getUpdatePositionEnemy())) {
                    tower.targets.shift();
                } else {
                    tower.setTarget(target);
                    tower.update(deltaTime);
                }
            }
        });
    }
}