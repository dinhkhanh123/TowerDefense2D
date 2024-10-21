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
        this.levelManager = new LevelManager(levelId);
        const levelData = this.levelManager.getLevelData();
        this.tileSize = levelData.map.tileSize;

        this.towerRange = new Sprite();



        TowerController.getInstance(this.mapContainer);
        ProjectileController.getInstance(this.mapContainer);
        EnemyController.getInstance(this.mapContainer, levelData.map.tiles);


        this.buildMap(levelData.map.tiles);
        this.spawnEnemyFromLevel(levelData);

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
    }

    createEmptyTile(x: number, y: number, tileSize: number) {
        const grap = new Graphics();
        grap.rect(x, y, tileSize, tileSize);
        grap.fill(0x72BF78);
        grap.interactive = true;
        grap.on('pointerdown', () => {
            this.controlPanel.visible = false;
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
        this.controlPanel.visible = true;

        this.towerRange.texture = Texture.from('range_tower');
        this.towerRange.anchor.set(0.5);
        this.towerRange.position.set(tower.sprite.x + 32, tower.sprite.y + 32);
        this.towerRange.width = tower.range * 2;
        this.towerRange.height = tower.range * 2;
        this.controlPanel.addChild(this.towerRange);


        const grapbg = new Graphics();
        grapbg.rect(0, 640, 1024, 160);
        grapbg.fill(0x77CDFF);
        this.controlPanel.addChild(grapbg);

        // Hiển thị thông tin tháp (ví dụ: loại tháp, mức độ nâng cấp, ...)
        const infoText = new Text(`Tower: ${tower.name}\nLevel: ${tower.level}`, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0x000000,
            align: 'center',
        });
        infoText.position.set(50, 650);
        this.controlPanel.addChild(infoText);

        const removeTowerBtn = new Graphics();
        removeTowerBtn.rect(50, 720, 200, 50);
        removeTowerBtn.fill(0xFFCFB3);
        removeTowerBtn.interactive = true;
        removeTowerBtn.cursor = 'pointer';
        removeTowerBtn.on('pointerdown', () => {
            TowerController.getInstance().removeTower(tower, tower.cost);
            this.towerRange.texture = Texture.EMPTY;
        });
        this.controlPanel.addChild(removeTowerBtn);
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

    private spawnEnemyFromLevel(levelData: LevelTypes) {
        let currentWaveIndex = 0;

        // Hàm spawn đợt (wave)
        const spawnWave = (waveIndex: number) => {
            const wave = levelData.waves[waveIndex];
            let enemiesInWave = 0; // Số lượng enemy trong wave hiện tại

            wave.enemies.forEach((enemyInfo) => {
                for (let i = 0; i < enemyInfo.count; i++) {
                    setTimeout(() => {
                        EnemyController.getInstance().createEnemy(
                            levelData.objectives.enemyPath[0],
                            levelData.objectives.defendPoint,
                            enemyInfo.type
                        );
                        enemiesInWave++; // Tăng số lượng enemy trong wave khi spawn
                    }, wave.spawnInterval * i);
                }
            });

            // Kiểm tra khi nào tất cả enemy trong wave này bị tiêu diệt
            const checkWaveCompletion = () => {
                if (EnemyController.getInstance().getEnemy().length === 0) {
                    // Khi tất cả quái bị tiêu diệt
                    console.log(`Wave ${waveIndex + 1} hoàn thành`);

                    currentWaveIndex++;
                    if (currentWaveIndex < levelData.waves.length) {
                        // Thêm khoảng thời gian chờ trước khi spawn wave tiếp theo
                        setTimeout(() => {
                            spawnWave(currentWaveIndex);
                        }, levelData.waveInterval);
                    } else {
                        console.log("Tất cả các wave đã hoàn thành");
                    }
                } else {
                    // Tiếp tục kiểm tra nếu vẫn còn quái vật sống
                    setTimeout(checkWaveCompletion, 1000); // Kiểm tra lại sau 1 giây
                }
            };

            // Bắt đầu kiểm tra wave hiện tại
            setTimeout(checkWaveCompletion, 1000); // Kiểm tra sau khi đợt spawn quái kết thúc
        };

        // Bắt đầu spawn đợt đầu tiên
        spawnWave(currentWaveIndex);
    }
}