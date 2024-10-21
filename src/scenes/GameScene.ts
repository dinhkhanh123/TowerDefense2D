import { TowerController } from './../controllers/TowerController';
import { EnemyController } from './../controllers/EnemyController';
import { Application, Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { LevelManager } from "../managers/LevelManager";
import { EnemyTypes } from "../types/EnemyTypes";
import { EventHandle } from '../utils/EventHandle';
import { Tower } from '../models/Tower';
import { TowerType } from '../types/TowerType';
import AssetLoad from '../utils/AssetLoad';
import { ObjectPool } from '../utils/ObjectPool';
import { ProjectileController } from '../controllers/ProjectileController';
import { LevelTypes } from '../types/LevelTypes';


export class GameScene extends Container {
    public static instance: GameScene;
    private app: Application;
    private levelManager: LevelManager;
    private objectPool: ObjectPool;
    private mapContainer: Container;
    private controlPanel: Container;
    private displayPannel: Container;

    public slotTower!: Sprite;
    private towerRange: Sprite;

    private tileSize: number;



    constructor(app: Application, levelId: number) {
        super();
        GameScene.instance = this;
        this.app = app;
        this.objectPool = new ObjectPool();
        this.mapContainer = new Container();
        this.controlPanel = new Container();
        this.displayPannel = new Container();
        this.levelManager = new LevelManager(levelId);
        const levelData = this.levelManager.getLevelData();
        this.tileSize = levelData.map.tileSize;

        this.towerRange = new Sprite();

        TowerController.getInstance(this.mapContainer);
        ProjectileController.getInstance(this.mapContainer);
        EnemyController.getInstance(this.mapContainer, levelData.map.tiles);


        this.buildMap(levelData.map.tiles);
        EnemyController.getInstance().spawnEnemyFromLevel(levelData);

        this.app.ticker.add(time => {
            EnemyController.getInstance().update(time.deltaTime);
            TowerController.getInstance().update(time.deltaTime);
            ProjectileController.getInstance().update(time.deltaTime);
        });

        this.controlPanel.visible = false;
    }

    private buildMap(tiles: number[][]): void {
        tiles.forEach((row, rowIndex) => {
            row.forEach((tile, colIndex) => {
                const x = colIndex * this.tileSize;
                const y = rowIndex * this.tileSize;
                switch (tile) {
                    case 0:
                        this.createEmptyTile(x, y, this.tileSize);
                        break;
                    case 1:
                        this.createPathTile(x, y, this.tileSize);
                        break;
                    case 2:
                        this.createTowerTile(x, y, this.tileSize);
                        break;
                    default:
                        console.error(`Invalid tile value at [${rowIndex}, ${colIndex}]: ${tile}`);
                        break;
                }
            });
        });

        this.app.stage.addChild(this.mapContainer);
        this.app.stage.addChild(this.controlPanel);
        this.app.stage.addChild(this.displayPannel);

    }

    createEmptyTile(x: number, y: number, tileSize: number) {
        const grap = new Graphics();
        grap.rect(x, y, tileSize, tileSize);
        grap.fill(0x72BF78);
        grap.interactive = true;
        grap.on('pointerdown', () => {
            this.controlPanel.visible = false;
            this.displayPannel.visible = false;
        });
        this.mapContainer.addChild(grap);
    }

    createPathTile(x: number, y: number, tileSize: number) {
        const grap = new Graphics();
        grap.rect(x, y, tileSize, tileSize);
        grap.fill(0xF6EFBD);
        grap.interactive = true;
        grap.on('pointerdown', () => {
            this.controlPanel.visible = false;
            this.displayPannel.visible = false;
        });
        this.mapContainer.addChild(grap);
    }

    createTowerTile(x: number, y: number, tileSize: number) {
        const slotTowerSprite = new Sprite(Texture.from('slot_tower'));

        slotTowerSprite.position.set(x, y);
        slotTowerSprite.interactive = true;
        slotTowerSprite.eventMode = 'static';
        slotTowerSprite.cursor = 'pointer';

        slotTowerSprite.on('pointerdown', () => {
            this.slotTower = slotTowerSprite;
            this.controlTowerPanel();
        });

        this.mapContainer.addChild(slotTowerSprite);
    }

    controlTowerPanel() {
        this.displayPannel.visible = false;
        this.controlPanel.visible = true;
        const grapbg = new Graphics();
        grapbg.rect(0, 640, 1024, 160);
        grapbg.fill(0xFEF9F2);
        this.controlPanel.addChild(grapbg);

        const towerType: TowerType[] = [TowerType.Archer, TowerType.Mage, TowerType.Fire, TowerType.Cannon];


        const startX = 50;
        const startY = this.mapContainer.height + 20;
        const cardSpacing = 20;

        for (let i = 0; i < towerType.length; i++) {
            // Calculate the x position of each card
            const cardX = startX + i * (100 + cardSpacing);
            const cardY = startY;

            const card = this.createCardTower(towerType[i], cardX, cardY);
            this.controlPanel.addChild(card);
        }
    }

    displayTowerInfo(tower: Tower) {
        this.controlPanel.visible = false;
        this.displayPannel.visible = true;

        this.towerRange.texture = Texture.from('range_tower');
        this.towerRange.anchor.set(0.5);
        this.towerRange.position.set(tower.sprite.x + 32, tower.sprite.y + 32);
        this.towerRange.width = tower.range * 2;
        this.towerRange.height = tower.range * 2;
        this.displayPannel.addChild(this.towerRange);


        const grapbg = new Graphics();
        grapbg.rect(0, 640, 1024, 160);
        grapbg.fill(0x77CDFF);
        this.displayPannel.addChild(grapbg);

        // Hiển thị thông tin tháp (ví dụ: loại tháp, mức độ nâng cấp, ...)
        const infoText = new Text(`
            Tower: ${tower.name}
            Level: ${tower.level}
            Damage: ${tower.damage}
            FireRate:${tower.fireRate}\t
            Cost:${tower.cost}\t
            Range:${tower.range}`, {
                fontFamily: 'Arial',
                fontSize: 16,
                fill: 0x000000,
                // align: 'center',
            });
        infoText.position.set(50, 650);
        this.displayPannel.addChild(infoText);

        const upgradeTowerBtn = new Graphics();
        upgradeTowerBtn.rect(500, 650, 200, 50);
        upgradeTowerBtn.fill(0xFFBD73);
        upgradeTowerBtn.interactive = true;
        upgradeTowerBtn.cursor = 'pointer';
        upgradeTowerBtn.on('pointerdown', () => {
            TowerController.getInstance().upgradeTower(tower.id);
            this.displayTowerInfo(tower);
        });
        this.displayPannel.addChild(upgradeTowerBtn);

        const removeTowerBtn = new Graphics();
        removeTowerBtn.rect(500, 720, 200, 50);
        removeTowerBtn.fill(0xFFCFB3);
        removeTowerBtn.interactive = true;
        removeTowerBtn.cursor = 'pointer';
        removeTowerBtn.on('pointerdown', () => {
            TowerController.getInstance().removeTower(tower, tower.cost);
            this.towerRange.texture = Texture.EMPTY;
        });
        this.displayPannel.addChild(removeTowerBtn);
    }

    createCardTower(type: TowerType, x: number, y: number): Container {
        const card = new Container();
        const spriteTower = new Sprite(AssetLoad.getTexture('Archer_01'));
        spriteTower.position.set(x, y);


        spriteTower.interactive = true;
        spriteTower.cursor = 'pointer';
        spriteTower.on('pointerdown', () => {
            TowerController.getInstance().createTower(type, this.slotTower);
        });
        card.addChild(spriteTower);
        return card;
    }

}