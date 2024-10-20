import { Container, PointData } from "pixi.js";
import { Projectile } from "../models/Projectile";
import { TowerType } from "../types/TowerType";
import { Tower } from "../models/Tower";
import { Enemy } from "../models/Enemy";
import { ObjectPool } from "../utils/ObjectPool";

export class ProjectileController {
    private static instance: ProjectileController;
    private map: Container;
    private projectiles: Projectile[] = [];
    private target!: Enemy;

    constructor(map: Container) {
        this.map = map;
    }

    public static getInstance(map?: Container): ProjectileController {
        if (!ProjectileController.instance) {
            if (map) {
                ProjectileController.instance = new ProjectileController(map);
            }

        }
        return ProjectileController.instance;
    }

    createProjectile(tower: Tower, enemy: Enemy) {
        const projectile = ObjectPool.instance.getProjectileFromPool(tower.name);

        projectile.sprite.x = tower.sprite.x + 32;
        projectile.sprite.y = tower.sprite.y + 32;

        projectile.sprite.anchor.set(0.5);

        projectile.setTarget(enemy);

        this.projectiles.push(projectile);

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