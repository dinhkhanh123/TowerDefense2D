import { Container, PointData } from "pixi.js";
import { Projectile } from "../models/Projectile";
import { TowerType } from "../types/TowerType";
import { Tower } from "../models/Tower";
import { Enemy } from "../models/Enemy";
import { ObjectPool } from "../utils/ObjectPool";

export class ProjectileController {
    public static instance: ProjectileController;
    private map: Container;
    private projectiles: Projectile[] = [];
    private target!: Enemy;

    constructor(map: Container) {
        ProjectileController.instance = this;
        this.map = map;
    }


    createProjectile(tower: Tower, enemy: Enemy) {
        const projectile = ObjectPool.instance.getProjectileFromPool(tower.name);

        projectile.sprite.x = tower.sprite.x + 32;
        projectile.sprite.y = tower.sprite.y + 32;

        projectile.setTarget(enemy, tower.damage, tower.fireRate);

        this.projectiles.push(projectile);

        projectile.sprite.zIndex = 100;
        this.map.addChild(projectile.sprite);
    }

    removeProjectile(typeTower: string, projectile: Projectile) {
        const index = this.projectiles.indexOf(projectile);

        if (index !== -1) {
            this.projectiles.splice(index, 1);

            ObjectPool.instance.returnProjectileToPool(typeTower, projectile);

            this.map.removeChild(projectile.sprite);


        }
    }

    update(deltaTime: number) {
        this.projectiles.forEach((projectile) => {
            projectile.update(deltaTime);
        });
    }
}