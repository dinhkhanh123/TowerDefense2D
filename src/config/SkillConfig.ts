export const SkillConfig = {
    FIREBALL: {
        name: "Fireball",
        damage: 100,               // Sát thương của quả cầu lửa
        range: 200,                // Phạm vi kỹ năng
        cooldown: 5,               // Thời gian hồi chiêu (giây)
        manaCost: 50,              // Lượng mana tiêu tốn
    },
    LIGHTNING_STRIKE: {
        name: "Lightning Strike",
        damage: 150,
        range: 250,
        cooldown: 8,
        manaCost: 70,
    },
    HEAL: {
        name: "Heal",
        healAmount: 200,           // Lượng máu hồi
        range: 0,                  // Kỹ năng này không có phạm vi vì nó áp dụng cho chính người chơi
        cooldown: 10,
        manaCost: 40,
    },
    FROST_NOVA: {
        name: "Frost Nova",
        damage: 50,
        range: 150,
        cooldown: 6,
        manaCost: 60,
        slowEffect: 0.5,           // Giảm 50% tốc độ di chuyển của kẻ địch
    }
};
