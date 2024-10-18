export class Skill {
    id: string;               // ID duy nhất cho mỗi kỹ năng
    name: string;             // Tên của kỹ năng
    damage: number;           // Sát thương mà kỹ năng gây ra
    range: number;            // Phạm vi kỹ năng có thể tấn công
    cooldown: number;         // Thời gian hồi chiêu (khoảng cách giữa 2 lần sử dụng)
    currentCooldown: number;  // Thời gian hồi còn lại trước khi có thể sử dụng lại
    manaCost: number;         // Năng lượng (mana) cần để sử dụng kỹ năng
    effect: string;           // Hiệu ứng đặc biệt của kỹ năng (nếu có), ví dụ: "stun", "burn"
    targetType: string;       // Loại mục tiêu: "single" hoặc "area"

    constructor(
        id: string,
        name: string,
        damage: number,
        range: number,
        cooldown: number,
        manaCost: number,
        effect: string,
        targetType: string
    ) {
        this.id = id;
        this.name = name;
        this.damage = damage;
        this.range = range;
        this.cooldown = cooldown;
        this.currentCooldown = 0; // Bắt đầu với giá trị 0, tức là có thể sử dụng ngay
        this.manaCost = manaCost;
        this.effect = effect;
        this.targetType = targetType;
    }

    // Kiểm tra xem kỹ năng đã sẵn sàng để sử dụng chưa
    isReady(): boolean {
        return this.currentCooldown <= 0;
    }

    // Sử dụng kỹ năng lên mục tiêu
    use(): void {
        if (this.isReady()) {
            console.log(`${this.name} được sử dụng gây ${this.damage} sát thương với hiệu ứng ${this.effect}`);
            this.currentCooldown = this.cooldown; // Đặt thời gian hồi chiêu sau khi sử dụng
        } else {
            console.log(`${this.name} đang trong thời gian hồi chiêu (${this.currentCooldown}s còn lại)`);
        }
    }

    // Giảm thời gian hồi chiêu (thường được gọi mỗi khung hình hoặc theo thời gian)
    reduceCooldown(deltaTime: number): void {
        if (this.currentCooldown > 0) {
            this.currentCooldown -= deltaTime;
            if (this.currentCooldown < 0) {
                this.currentCooldown = 0;
            }
        }
    }
}
