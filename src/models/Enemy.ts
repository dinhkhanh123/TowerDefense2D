import { Container, Graphics, PointData, Sprite, Texture } from "pixi.js";
import { BfsPathfinding } from "../utils/BfsPathfinding";
import { EnemyController } from "../controllers/EnemyController";

export class Enemy {
    id: number;
    name: string;
    sprite: Container;
    hp: number;
    speed: number;
    damage: number;
    reward: number;
    position!: { x: number, y: number }
    currentPosition!: { x: number, y: number };
    goalPosition!: { x: number, y: number };
    pathfinding!: BfsPathfinding;
    currentPathIndex: number = 0;
    isAlive: boolean;

    constructor(
        id: number,
        name: string,
        hp: number,
        speed: number,
        damage: number,
        reward: number,
    ) {
        this.id = id;
        this.name = name;
        this.sprite = new Container();
        this.hp = hp;
        this.speed = speed;
        this.damage = damage;
        this.reward = reward;
        this.isAlive = true;

        const sprite = new Sprite(Texture.from('enemy1'));
        sprite.anchor.set(0.5);
        this.sprite.addChild(sprite);
    }

    setPosition(pointStart: { x: number, y: number }, pointEnd: { x: number, y: number }, path: BfsPathfinding) {
        this.currentPosition = { x: pointStart.x, y: pointStart.y };
        this.goalPosition = { x: pointEnd.x, y: pointEnd.y };
        this.pathfinding = path;
        this.currentPathIndex = 0;
        this.isAlive = true;
    }

    takeDamage(id: number, damage: number) {
        if (id === this.id) {
            this.hp -= damage;

            if (this.hp <= 0) {
                this.hp = 0;
                this.isAlive = false;

                EnemyController.getInstance().removeEnemy(this);
            }
        }
    }

    update(deltaTime: number) {
        const path = this.pathfinding.bfs(this.currentPosition, this.goalPosition);

        if (path && this.currentPathIndex < path.length) {

            const target = path[this.currentPathIndex];
            const tileCenterX = (target.x * 64) + (64 / 2); // Thêm 64/2 để vào giữa ô
            const tileCenterY = (target.y * 64) + (64 / 2); // Thêm 64/2 để vào giữa ô

            const dx = tileCenterX - this.sprite.x;
            const dy = tileCenterY - this.sprite.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 1) {
                this.sprite.x += (dx / dist) * this.speed * deltaTime;
                this.sprite.y += (dy / dist) * this.speed * deltaTime;
            } else {
                this.currentPathIndex++;
            }
        }
    }

    public getUpdatePositionEnemy(): PointData {
        this.position = { x: this.sprite.x - 64 / 2, y: this.sprite.y - 64 / 2 };
        return this.position;
    }

    hasReachedGoal(): boolean {
        const dx = this.goalPosition.x * 64 + 32 - this.sprite.x;
        const dy = this.goalPosition.y * 64 + 32 - this.sprite.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < 1;
    }
}
