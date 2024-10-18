import { Skill } from "./Skill";

export class Hero {
    id: string;            // ID của hero
    name: string;          // Tên của hero
    hp: number;            // Số lượng máu hiện tại
    maxHp: number;         // Số lượng máu tối đa
    mp: number;            // Số lượng năng lượng hiện tại
    maxMp: number;         // Số lượng năng lượng tối đa
    attackPower: number;   // Sức mạnh tấn công cơ bản
    defense: number;       // Chỉ số phòng thủ
    skills: Skill[];       // Danh sách các kỹ năng mà hero có thể sử dụng

    constructor(id: string, name: string, maxHp: number, maxMp: number, attackPower: number, defense: number) {
        this.id = id;
        this.name = name;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.maxMp = maxMp;
        this.mp = maxMp;
        this.attackPower = attackPower;
        this.defense = defense;
        this.skills = [];
    }

    // Hồi máu cho hero
    heal(amount: number): void {
        this.hp += amount;
        if (this.hp > this.maxHp) {
            this.hp = this.maxHp;
        }
        console.log(`${this.name} đã được hồi ${amount} máu.`);
    }

    // Nhận sát thương
    takeDamage(amount: number): void {
        const damage = Math.max(amount - this.defense, 0); // Trừ phòng thủ ra khỏi sát thương nhận được
        this.hp -= damage;
        if (this.hp < 0) {
            this.hp = 0;
        }
        console.log(`${this.name} nhận ${damage} sát thương, còn ${this.hp} HP.`);
    }

    // Sử dụng kỹ năng
    useSkill(skillId: string): void {
        const skill = this.skills.find(s => s.id === skillId);
        if (skill && skill.isReady()) {
            if (this.mp >= skill.manaCost) {
                this.mp -= skill.manaCost;
                skill.use();
            } else {
                console.log(`${this.name} không đủ mana để sử dụng kỹ năng ${skill.name}`);
            }
        } else {
            console.log(`${this.name} không thể sử dụng kỹ năng đó ngay bây giờ`);
        }
    }

    // Thêm kỹ năng vào hero
    addSkill(skill: Skill): void {
        this.skills.push(skill);
    }
}
