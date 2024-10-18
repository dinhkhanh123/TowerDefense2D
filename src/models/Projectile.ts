export class Projectile {
    id: string;            // ID của projectile
    damage: number;        // Lượng sát thương mà projectile gây ra
    speed: number;         // Tốc độ di chuyển của projectile
    position: { x: number, y: number }; // Vị trí hiện tại của projectile
    direction: { x: number, y: number }; // Hướng di chuyển của projectile
    range: number;         // Phạm vi mà projectile có thể di chuyển trước khi biến mất
    traveledDistance: number; // Khoảng cách mà projectile đã di chuyển

    constructor(id: string, damage: number, speed: number, position: { x: number, y: number }, direction: { x: number, y: number }, range: number) {
        this.id = id;
        this.damage = damage;
        this.speed = speed;
        this.position = position;
        this.direction = direction;
        this.range = range;
        this.traveledDistance = 0;
    }

    // Di chuyển projectile theo hướng đã định
    move(deltaTime: number): void {
        const distance = this.speed * deltaTime;
        this.position.x += this.direction.x * distance;
        this.position.y += this.direction.y * distance;
        this.traveledDistance += distance;
    }

    // Kiểm tra xem projectile có đạt giới hạn phạm vi hay chưa
    isOutOfRange(): boolean {
        return this.traveledDistance >= this.range;
    }

    // Gây sát thương khi va chạm
    hit(target: { takeDamage: (damage: number) => void }): void {
        target.takeDamage(this.damage);
        console.log(`Projectile ${this.id} đã gây ${this.damage} sát thương lên mục tiêu.`);
    }
}
