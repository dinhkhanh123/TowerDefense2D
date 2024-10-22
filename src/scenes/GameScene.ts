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
import { GameConfig } from '../config/GameConfig';
import { PlayerController } from '../controllers/PlayerController';
import { HUD } from './HUD';
import { TowerInfoPannel } from './TowerInfoPannel';
import { TowerSelectionPannel } from './TowerSelectionPannel';


export class GameScene extends Container {
    public static instance: GameScene;
    private app: Application;
    private levelManager: LevelManager;
    private objectPool: ObjectPool;
    private mapContainer: Container;
    private towerSelectionPannel: TowerSelectionPannel;
    private towerInfoPannel: TowerInfoPannel;
    private towerController: TowerController;
    private projectileController: ProjectileController;
    private enemyController: EnemyController;
    private playerController: PlayerController;
    private headsUpDisplay: HUD;

    constructor(app: Application, levelId: number) {
        super();
        GameScene.instance = this;
        this.app = app;
        this.objectPool = new ObjectPool();
        this.mapContainer = new Container();

        this.levelManager = new LevelManager(levelId);
        const levelData = this.levelManager.getLevelData();

        this.towerController = new TowerController(this.mapContainer);
        this.projectileController = new ProjectileController(this.mapContainer);
        this.enemyController = new EnemyController(this.mapContainer, levelData.map.tiles);
        this.playerController = new PlayerController(levelData.id);
        this.headsUpDisplay = new HUD();
        this.addChild(this.headsUpDisplay);


        this.towerSelectionPannel = new TowerSelectionPannel();
        this.addChild(this.towerSelectionPannel);
        this.towerInfoPannel = new TowerInfoPannel();
        this.addChild(this.towerInfoPannel)


        this.buildMap(levelData.map.tiles);

        this.enemyController.spawnEnemyFromLevel(levelData);

        this.app.ticker.add(time => {
            this.enemyController.update(time.deltaTime);
            this.towerController.update(time.deltaTime);
            this.projectileController.update(time.deltaTime);
        });

        this.towerSelectionPannel.visible = false;
    }

    private buildMap(tiles: number[][]): void {
        tiles.forEach((row, rowIndex) => {
            row.forEach((tile, colIndex) => {
                const x = colIndex * 64;
                const y = rowIndex * 64;
                switch (tile) {
                    case 0:
                        this.createEmptyTile(x, y);
                        break;
                    case 1:
                        this.createPathTile(x, y);
                        break;
                    case 2:
                        this.createTowerTile(x, y);
                        break;
                    default:
                        console.error(`Invalid tile value at [${rowIndex}, ${colIndex}]: ${tile}`);
                        break;
                }
            });
        });

        this.app.stage.addChild(this.mapContainer);
        this.app.stage.addChild(this.towerSelectionPannel);
        this.app.stage.addChild(this.towerInfoPannel);
        this.app.stage.addChild(this.headsUpDisplay);
    }

    createEmptyTile(x: number, y: number) {
        const grap = new Graphics();
        grap.rect(x, y, 64, 64);
        grap.fill(0x72BF78);
        grap.interactive = true;
        grap.on('pointerdown', () => {
            this.towerSelectionPannel.visible = false;
            this.towerInfoPannel.visible = false;
        });
        this.mapContainer.addChild(grap);
    }

    createPathTile(x: number, y: number) {
        const grap = new Graphics();
        grap.rect(x, y, 64, 64);
        grap.fill(0xF6EFBD);
        grap.interactive = true;
        grap.on('pointerdown', () => {
            this.towerSelectionPannel.visible = false;
            this.towerInfoPannel.visible = false;
        });
        this.mapContainer.addChild(grap);
    }

    createTowerTile(x: number, y: number) {
        const slotTowerSprite = new Sprite(Texture.from('slot_tower'));

        slotTowerSprite.position.set(x, y);
        slotTowerSprite.interactive = true;
        slotTowerSprite.eventMode = 'static';
        slotTowerSprite.cursor = 'pointer';

        slotTowerSprite.on('pointerdown', () => {
            this.towerSelectionPannel.slotTower = slotTowerSprite;
            this.towerSelectionPannel.menuTower();
        });

        this.mapContainer.addChild(slotTowerSprite);
    }

}