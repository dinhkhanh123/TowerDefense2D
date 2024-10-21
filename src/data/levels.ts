// src/data/levels.ts

export const levels = [
    {
        id: 1,
        name: 'Level 1',
        difficulty: 'easy',
        map: {
            tiles: [
                [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0], // Hàng 1
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], // Hàng 2
                [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], // Hàng 3
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0], // Hàng 4
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], // Hàng 5
                [0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Hàng 6
                [0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0], // Hàng 7
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], // Hàng 8
                [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0], // Hàng 9
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], // Hàng 10
            ],
            tileSize: 64, // Kích thước mỗi ô vuông (64px x 64px)
        },
        waves: [
            {
                enemies: [
                    { type: 'Grunt', count: 2 },
                    { type: 'Monster', count: 3 }
                ],
                spawnInterval: 1000 // Thời gian xuất hiện kẻ địch (ms)
            },
            {
                enemies: [
                    { type: 'Grunt', count: 2 },
                    { type: 'Monster', count: 3 }
                ],
                spawnInterval: 1500
            },
        ],
        waveInterval: 3000,
        towersAvailable: [
            { type: 'archer', count: 3 },
            { type: 'cannon', count: 2 }
        ],
        resources: {
            gold: 100,
            mana: 50
        },
        objectives: {
            defendPoint: { x: 13, y: 9 },  // Điểm mà bạn phải bảo vệ
            enemyPath: [
                { x: 0, y: 1 },
                { x: 13, y: 9 }
            ]
        }
    },
    // Các level khác sẽ được thêm vào đây.
];
