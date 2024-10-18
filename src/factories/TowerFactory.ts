import { towersData } from "../data/towers";
import { Tower } from "../models/Tower";

export class TowerFactory {
    public static instance: TowerFactory;
    private static towerId: number = 0;
    constructor() {
        TowerFactory.instance = this;
    }

    public static createTower(name: string): Tower | null {
        const id = this.towerId++;
        const towerData = towersData.find(tower => tower.name === name);
        if (towerData) {
            return new Tower(
                id,
                towerData.name,
                towerData.damage,
                towerData.range,
                towerData.fireRate,
                towerData.cost,
                towerData.projectileType
            );
        }
        return null;
    }
}