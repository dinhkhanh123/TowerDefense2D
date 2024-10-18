import { Hero } from "./Hero";

export class Player {
    id: string;            // ID của người chơi
    name: string;          // Tên người chơi
    level: number;         // Cấp độ người chơi
    experience: number;    // Điểm kinh nghiệm hiện tại
    heroes: Hero[];        // Danh sách các hero mà người chơi sở hữu
    resources: number;     // Tài nguyên mà người chơi có (ví dụ: vàng, năng lượng)

    constructor(id: string, name: string, level: number, experience: number, resources: number) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.experience = experience;
        this.heroes = [];
        this.resources = resources;
    }

    // Thêm hero vào danh sách của người chơi
    addHero(hero: Hero): void {
        this.heroes.push(hero);
    }

    // Tăng điểm kinh nghiệm và lên cấp khi đạt đủ điều kiện
    gainExperience(exp: number): void {
        this.experience += exp;
        if (this.experience >= this.level * 100) { // Ví dụ: cần 100 kinh nghiệm để lên mỗi cấp
            this.levelUp();
        }
    }

    // Tăng cấp độ cho người chơi
    private levelUp(): void {
        this.level += 1;
        this.experience = 0;
        console.log(`${this.name} đã lên cấp ${this.level}!`);
    }

    // Kiểm tra tài nguyên của người chơi
    hasEnoughResources(amount: number): boolean {
        return this.resources >= amount;
    }

    // Tiêu thụ tài nguyên
    consumeResources(amount: number): boolean {
        if (this.hasEnoughResources(amount)) {
            this.resources -= amount;
            return true;
        }
        return false;
    }
}
