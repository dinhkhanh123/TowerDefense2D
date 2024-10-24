import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { TowerSelectionPannel } from "../TowerSelectionPannel";
import { TowerInfoPannel } from "../TowerInfoPannel";
import { LevelTypes } from "../../types/LevelTypes";
import { EnemyController } from "../../controllers/EnemyController";

export class MapBuilder {
    private mapContainer: Container;
    private levelData: LevelTypes;

    constructor(mapContainer: Container, levelData: LevelTypes) {
        this.mapContainer = mapContainer;
        this.levelData = levelData;
    }

    public buildMap(): void {
        this.levelData.map.tiles.forEach((row, rowIndex) => {
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

        const pointStart = this.levelData.waves[0].spawnPoints;
        for (let i = 0; i < pointStart.length; i++) {
            const x = pointStart[i].x * 64;
            const y = pointStart[i].y * 64;
            this.createStartSpawnTile(x, y);
        }
    }

    private createEmptyTile(x: number, y: number) {
        const grap = new Graphics();
        grap.rect(x, y, 64, 64);
        grap.fill(0x72BF78);
        grap.interactive = true;
        grap.on('pointerdown', () => {
            TowerSelectionPannel.instance.visible = false;
            TowerInfoPannel.instance.visible = false;
        });
        this.mapContainer.addChild(grap);
    }

    private createPathTile(x: number, y: number) {
        const grap = new Graphics();
        grap.rect(x, y, 64, 64);
        grap.fill(0xF6EFBD);
        grap.interactive = true;
        grap.on('pointerdown', () => {
            TowerSelectionPannel.instance.visible = false;
            TowerInfoPannel.instance.visible = false;
        });
        this.mapContainer.addChild(grap);
    }

    private createTowerTile(x: number, y: number) {
        const slotTowerSprite = new Sprite(Texture.from('slot_tower'));

        slotTowerSprite.position.set(x, y);
        slotTowerSprite.interactive = true;
        slotTowerSprite.eventMode = 'static';
        slotTowerSprite.cursor = 'pointer';

        slotTowerSprite.on('pointerdown', () => {
            TowerSelectionPannel.instance.slotTower = slotTowerSprite;
            TowerSelectionPannel.instance.menuTower();
        });

        this.mapContainer.addChild(slotTowerSprite);
    }

    // Tạo nút Start Spawn tại vị trí cụ thể
    private createStartSpawnTile(x: number, y: number): void {
        const spawnButton = new Sprite(Texture.from('slot_tower'));

        spawnButton.position.set(x, y);
        spawnButton.interactive = true;
        spawnButton.eventMode = 'static';
        spawnButton.cursor = 'pointer';

        spawnButton.on('pointerdown', () => {
            EnemyController.instance.spawnEnemyFromLevel(this.levelData);
            spawnButton.visible = false;
        });

        this.mapContainer.addChild(spawnButton);
    }
}