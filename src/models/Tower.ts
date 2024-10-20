import { PointData, Sprite, Texture } from "pixi.js";
import AssetLoad from "../utils/AssetLoad";
import { Enemy } from "./Enemy";
import { ProjectileController } from "../controllers/ProjectileController";

export class Tower {
    id: number;             // ID của tháp
    name: string;           // Tên của tháp
    sprite: Sprite;         // Sprite của tháp
    damage: number;         // Sát thương của tháp
    range: number;          // Phạm vi tấn công của tháp
    fireRate: number;       // Tốc độ bắn (giây giữa các lần bắn)
    cost: number;           // Chi phí để xây tháp
    level: number;          // Cấp độ của tháp
    position!: { x: number; y: number }; // Vị trí của tháp trên bản đồ
    projectileType: string; // Loại đạn bắn ra (có thể là tên class đạn hoặc ID)
    targets: Enemy[] = [];
    target!: Enemy;

    private cooldownTime: number;
    private attackTime: number;

    constructor(
        id: number,
        name: string,
        damage: number,
        range: number,
        fireRate: number,
        cost: number,
        projectileType: string
    ) {
        this.id = id;
        this.name = name;
        this.sprite = new Sprite(Texture.EMPTY);
        this.damage = damage;
        this.range = range;
        this.fireRate = fireRate;
        this.cost = cost;
        this.level = 1; // Tháp khởi đầu ở level 1

        this.cooldownTime = 50;
        this.attackTime = 0;

        this.projectileType = projectileType;

    }

    setTarget(target: Enemy) {
        this.target = target;
    }

    // Phương thức nâng cấp tháp
    upgrade(): void {
        this.level++;
        this.damage *= 1.2;     // Mỗi lần nâng cấp tăng sát thương 20%
        this.range *= 1.1;      // Phạm vi tăng 10%
        this.fireRate *= 0.9;   // Tốc độ bắn tăng (giảm thời gian giữa các lần bắn)
        this.cost *= 1.5;       // Chi phí tăng theo cấp độ
    }

    // Phương thức bắn đạn
    update(deltaTime: number): void {
        // const dx = this.target.sprite.x - this.sprite.x;
        // const dy = this.target.sprite.y - this.sprite.y;

        // const angle = Math.atan2(dy, dx);
        // this.spriteAniTower.rotation = angle + Math.PI / 2;

        this.attackTime += deltaTime;
        if (this.attackTime >= this.cooldownTime) {
            ProjectileController.getInstance().createProjectile(this, this.target);
            this.attackTime = 0;
        }
    }

    public isInRange(enemyPosition: PointData): boolean {
        const distance = Math.sqrt(
            Math.pow(enemyPosition.x - this.sprite.x, 2) +
            Math.pow(enemyPosition.y - this.sprite.y, 2)
        );
        return distance <= this.range;
    }
}