import { enemiesData } from "../data/enemies";
import { Enemy } from "../models/Enemy";

export class EnemyFactory {
    public static instance: EnemyFactory;
    private static enemyId: number = 0;

    constructor() {
        EnemyFactory.instance = this;
    }

    public static createEnemy(enemyName: string): Enemy | null {
        const id = this.enemyId++;
        const enemyData = enemiesData.find(enemy => enemy.name === enemyName);
        if (enemyData) {
            return new Enemy(
                id,
                enemyData.name,
                enemyData.hp,
                enemyData.speed,
                enemyData.damage,
                enemyData.reward
            );
        }
        return null;
    }

    public static createEnemyById(enemyId: number): Enemy | null {
        const enemyData = enemiesData.find(enemy => enemy.id === enemyId);
        if (enemyData) {
            return new Enemy(
                enemyData.id,
                enemyData.name,
                enemyData.hp,
                enemyData.speed,
                enemyData.damage,
                enemyData.reward
            );
        }
        return null;
    }
}


