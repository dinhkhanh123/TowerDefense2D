import { Sprite, Texture } from "pixi.js";
import AssetLoad from "../utils/AssetLoad";

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

        this.projectileType = projectileType;
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
    shoot(target: any): void {
        console.log(`${this.name} bắn vào mục tiêu ${target.id}`);
        // Thực hiện logic bắn đạn, có thể dựa trên loại đạn được định nghĩa trong projectileType
    }
}