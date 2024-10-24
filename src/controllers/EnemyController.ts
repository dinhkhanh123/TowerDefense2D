import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { Enemy } from "../models/Enemy";
import { ObjectPool } from "../utils/ObjectPool";
import { EnemyTypes } from "../types/EnemyTypes";
import { BfsPathfinding } from "../utils/BfsPathfinding";
import { LevelTypes } from "../types/LevelTypes";
import { PlayerController } from "./PlayerController";
import { EventHandle } from "../utils/EventHandle";

export class EnemyController {
    public static instance: EnemyController;
    private map: Container;
    private grid: number[][];
    private enemies: Enemy[] = [];

    private levelData!: LevelTypes;
    private isSpawningWave: boolean = false;
    private currentWaveIndex: number = 0;
    private spawnTimer: number = 0;
    private wavePauseTimer: number = 0;


    private enemiesToSpawn: { type: string, count: number }[] = [];
    private currentEnemyIndex: number = 0;

    constructor(map: Container, grid: number[][]) {
        EnemyController.instance = this;
        this.map = map;
        this.grid = grid;
    }

    // Tạo enemy mới dựa trên vị trí spawnPoint và mục tiêu
    public createEnemy(spawnPoint: { x: number, y: number }, goal: { x: number, y: number }, enemyType: string) {
        const enemy = ObjectPool.instance.getEnemyFromPool(enemyType);

        enemy.sprite.x = spawnPoint.x * 64 + 32;
        enemy.sprite.y = spawnPoint.y * 64 + 32;

        const pathfinding = new BfsPathfinding(this.grid);

        enemy.setPosition(spawnPoint, goal, pathfinding);

        this.enemies.push(enemy);

        this.map.addChild(enemy.sprite);
    }

    //xóa enemy khi nó bị tiêu diệt
    removeEnemy(enemy: Enemy) {
        const index = this.enemies.indexOf(enemy);
        if (index !== -1) {
            this.enemies.splice(index, 1);
            this.map.removeChild(enemy.sprite);

            ObjectPool.instance.returnEnemyToPool(enemy.name, enemy);
            PlayerController.instance.addGold(enemy.reward);
        }
    }

    update(deltaTime: number) {
        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);

            if (!enemy.isAlive || enemy.hasReachedGoal()) {
                this.removeEnemy(enemy);
            }

            if (enemy.hasReachedGoal()) {
                PlayerController.instance.takeDamage(enemy.damage);
            }

        });


        this.updateWaveSpawning(deltaTime);

        this.updateEnemyZIndex();

        if (this.enemies.length === 0) {
            PlayerController.instance.checkWin();
        }
    }

    getEnemy(): Enemy[] {
        return this.enemies;
    }

    updateWaveSpawning(deltaTime: number) {
        if (!this.isSpawningWave) {
            return;
        }

        const currentWave = this.levelData.waves[this.currentWaveIndex];
        this.spawnTimer += deltaTime;

        if (this.enemiesToSpawn.length === 0) {
            // Tạo danh sách enemy để spawn ngẫu nhiên dựa trên wave data
            currentWave.enemies.forEach(enemyInfo => {
                for (let i = 0; i < enemyInfo.count; i++) {
                    this.enemiesToSpawn.push({ type: enemyInfo.type, count: 1 });
                }
            });
            this.enemiesToSpawn = this.shuffleArray(this.enemiesToSpawn);  // Xáo trộn thứ tự enemy
        }

        PlayerController.instance.updateCurrentWave(this.currentWaveIndex + 1);

        if (this.currentEnemyIndex < this.enemiesToSpawn.length) {
            // Kiểm tra nếu spawnTimer đã vượt qua spawnInterval
            if (this.spawnTimer >= this.levelData.spawnInterval) {
                // Lựa chọn ngẫu nhiên một vị trí spawn từ danh sách spawnPositions của wave
                const randomSpawnPosition = currentWave.spawnPoints[
                    Math.floor(Math.random() * currentWave.spawnPoints.length)
                ];
                const enemyInfo = this.enemiesToSpawn[this.currentEnemyIndex];

                // Spawn enemy tại vị trí spawn ngẫu nhiên đã chọn
                EnemyController.instance.createEnemy(
                    randomSpawnPosition,  // Spawn tại vị trí ngẫu nhiên
                    currentWave.defendPoint,
                    enemyInfo.type
                );

                this.spawnTimer = 0;  // Reset lại timer sau mỗi lần spawn
                this.currentEnemyIndex++;  // Tăng index để spawn enemy tiếp theo
            }
        } else if (this.wavePauseTimer >= this.levelData.waveInterval) {
            // Khi tất cả enemy trong wave đã spawn xong, bắt đầu đợt mới sau waveInterval
            this.currentWaveIndex++;
            this.enemiesToSpawn = [];
            this.currentEnemyIndex = 0;
            this.wavePauseTimer = 0;

            if (this.currentWaveIndex === this.levelData.waves.length) {
                this.isSpawningWave = false;  // Kết thúc tất cả các đợt
            }
        } else {
            this.wavePauseTimer += deltaTime;
        }
    }

    spawnEnemyFromLevel(levelData: LevelTypes) {
        this.levelData = levelData;
        this.isSpawningWave = true;
        this.currentWaveIndex = 0;
        this.enemiesToSpawn = [];
        this.currentEnemyIndex = 0;
        this.spawnTimer = 0;
        this.wavePauseTimer = 0;

        PlayerController.instance.updateCurrentWave(this.currentEnemyIndex + 1);
    }

    private shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    private updateEnemyZIndex() {
        this.enemies.forEach((enemy) => {
            enemy.sprite.zIndex = 1;
        });

        // Cập nhật zIndex cho từng enemy dựa trên tọa độ
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy1 = this.enemies[i];
            for (let j = 0; j < this.enemies.length; j++) {
                const enemy2 = this.enemies[j];
                if (enemy1 !== enemy2) {
                    // Nếu enemy1 nằm dưới enemy2 (có y lớn hơn), tăng zIndex
                    if (enemy1.sprite.y > enemy2.sprite.y ||
                        (enemy1.sprite.y === enemy2.sprite.y && enemy1.sprite.x > enemy2.sprite.x)) {
                        enemy1.sprite.zIndex++;
                    }
                }
            }
        }
    }

    private createSpawnWarning(x: number, y: number): Sprite {
        const warningSprite = new Sprite(Texture.from('slot_tower'));

        warningSprite.position.set(x, y);
        warningSprite.interactive = true;
        this.map.addChild(warningSprite);

        return warningSprite;
    }
}