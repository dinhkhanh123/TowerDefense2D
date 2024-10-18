export const TowerConfig = {
    ARCHER_TOWER: {
        name: "Archer Tower",
        damage: 10,                // Sát thương của tháp bắn tên
        range: 150,                // Phạm vi bắn của tháp
        attackSpeed: 1.5,          // Tốc độ bắn (giây giữa mỗi lần bắn)
        cost: 100,                 // Chi phí để xây dựng tháp
    },
    CANNON_TOWER: {
        name: "Cannon Tower",
        damage: 50,                // Sát thương cao của tháp pháo
        range: 200,                // Phạm vi bắn của tháp pháo
        attackSpeed: 3.0,          // Tốc độ bắn chậm
        cost: 150,                 // Chi phí để xây dựng tháp pháo
    },
    MAGE_TOWER: {
        name: "Mage Tower",
        damage: 30,                // Sát thương phép thuật
        range: 180,                // Phạm vi bắn trung bình
        attackSpeed: 2.0,          // Tốc độ bắn phép thuật
        cost: 120,                 // Chi phí để xây dựng tháp phép thuật
    }
};
