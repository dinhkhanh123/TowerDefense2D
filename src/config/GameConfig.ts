export const GameConfig = {
    initialResources: 500,            // Tài nguyên ban đầu của người chơi
    initialScore: 0,                  // Điểm số khởi điểm
    difficulty: {
        easy: {
            enemySpawnRate: 1.0,      // Tốc độ xuất hiện kẻ địch (1.0 là chuẩn)
            playerHealth: 1000,       // Máu của người chơi khi bắt đầu ở độ khó dễ
            resourceMultiplier: 1.5,  // Tài nguyên tăng lên nhanh hơn khi tiêu diệt kẻ địch
        },
        medium: {
            enemySpawnRate: 1.5,      // Tốc độ xuất hiện kẻ địch tăng
            playerHealth: 750,        // Máu của người chơi ở độ khó trung bình
            resourceMultiplier: 1.2,  // Tài nguyên thu được từ kẻ địch
        },
        hard: {
            enemySpawnRate: 2.0,      // Tốc độ xuất hiện kẻ địch rất nhanh
            playerHealth: 500,        // Máu của người chơi giảm mạnh
            resourceMultiplier: 1.0,  // Tài nguyên thu được ít hơn
        }
    }
};
