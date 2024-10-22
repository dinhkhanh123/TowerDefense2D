import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { TowerSelectionPannel } from "./TowerSelectionPannel";
import { TowerInfoPannel } from "./TowerInfoPannel";

export class MapBuilder {
    private mapContainer: Container;


    constructor(mapContainer: Container) {
        this.mapContainer = mapContainer;

    }

    public buildMap(tiles: number[][]): void {
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
}