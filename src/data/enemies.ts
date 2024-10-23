import { Enemy } from "../models/Enemy";

// Dữ liệu về các loại kẻ địch
export const enemiesData: Enemy[] = [
    new Enemy(
        1,
        "Grunt",
        20,    // HP
        1,    // Speed
        1,     // Damage
        20
    ),
    new Enemy(
        2,
        "Monster",
        30,    // HP
        1.5,    // Speed
        1,     // Damage
        50

    ),
    new Enemy(
        3,
        "Giant",
        50,    // HP
        1.0,    // Speed
        2,     // Damage
        70

    ),
    new Enemy(
        4,
        "Speedster",
        50,    // HP
        0.8,    // Speed
        2,     // Damage
        80
    ),
    new Enemy(
        5,
        "Boss",
        50,    // HP
        0.8,    // Speed
        2,     // Damage
        100
    )
];
