import { Enemy } from "../models/Enemy";

// Dữ liệu về các loại kẻ địch
export const enemiesData: Enemy[] = [
    new Enemy(
        1,
        "Grunt",
        100,    // HP
        1,    // Speed
        10,     // Damage
        50
    ),
    new Enemy(
        2,
        "Monster",
        200,    // HP
        1.5,    // Speed
        20,     // Damage
        100

    ),
    new Enemy(
        3,
        "Giant",
        300,    // HP
        1.0,    // Speed
        30,     // Damage
        150

    ),
    new Enemy(
        4,
        "Speedster",
        500,    // HP
        0.8,    // Speed
        50,     // Damage
        300
    ),
    new Enemy(
        5,
        "Boss",
        500,    // HP
        0.8,    // Speed
        50,     // Damage
        300
    )
];