import { PointData, Sprite } from "pixi.js";
import { TowerType } from "../types/TowerType";
import AssetLoad from "../utils/AssetLoad";
import { Enemy } from "./Enemy";
import { ProjectileController } from "../controllers/ProjectileController";

export class Projectile {
    id: number;
    sprite: Sprite;
    damage: number;
    speed: number;
    type: string;
    target!: Enemy;

    constructor(id: number, sprite: Sprite, type: string) {
        this.id = id;
        this.type = type;
        this.sprite = sprite;
        this.sprite.scale.set(.6);
        this.damage = 5;
        this.speed = 6;
    }

    setTarget(enemyTarget: Enemy) {
        this.target = enemyTarget;
    }

    update(deltaTime: number): void {
        this.target.getUpdatePositionEnemy();
        const dx = this.target.sprite.x - this.sprite.x;
        const dy = this.target.sprite.y - this.sprite.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        this.sprite.rotation = Math.atan2(dy, dx);
        if (distance < this.speed * deltaTime) {
            this.hit();
        } else {
            this.sprite.x += (dx / distance) * this.speed * deltaTime;
            this.sprite.y += (dy / distance) * this.speed * deltaTime;
        }
    }

    // Gây sát thương khi va chạm
    hit(): void {
        this.target.takeDamage(this.target.id, this.damage)
        ProjectileController.getInstance().removeProjectile(this.type, this);
    }
}
