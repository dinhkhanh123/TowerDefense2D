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
import { MapBuilder } from './MapBuilder';
import { ResultPannel } from './ResultPannel';


export class GameScene extends Container {
    public static instance: GameScene;
    private levelManager: LevelManager;
    private objectPool: ObjectPool;
    private mapContainer: Container;
    private towerSelectionPannel: TowerSelectionPannel;
    private towerInfoPannel: TowerInfoPannel;
    private towerController: TowerController;
    private projectileController: ProjectileController;
    private enemyController: EnemyController;
    private playerController: PlayerController;
    private mapBuilder: MapBuilder;
    private headsUpDisplay: HUD;

    constructor(levelId: number) {
        super();
        GameScene.instance = this;
        this.objectPool = new ObjectPool();
        this.mapContainer = new Container();
        this.addChild(this.mapContainer);

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
        this.mapBuilder = new MapBuilder(this.mapContainer);
        this.mapBuilder.buildMap(levelData.map.tiles);

        this.enemyController.spawnEnemyFromLevel(levelData);

        EventHandle.on('gameResult', (isWin) => { this.showResult(isWin) });

    }

    showResult(isWin: boolean): void {
        const resultPannel = new ResultPannel(isWin);
        this.addChild(resultPannel);
    }

    private retryGame(): void {
        // Logic để chơi lại game
        console.log('Restarting game...');
        this.removeChild(GameScene.instance);
        // Khởi động lại GameScene
    }

    private exitGame(): void {
        // Logic để thoát game
        console.log('Exiting to main menu...');
        this.removeChild(GameScene.instance);
        // Quay về MainMenuScene
    }

    update(deltaTime: number) {
        this.enemyController.update(deltaTime);
        this.towerController.update(deltaTime);
        this.projectileController.update(deltaTime);
    }
}