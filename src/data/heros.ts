import { Hero } from "../models/Hero";


// Tạo danh sách hero với thông tin chi tiết
export const heroData: Hero[] = [
    new Hero(
        1,         // ID của hero
        "Warrior", // Tên hero
        1.2,       // Tốc độ
        100,       // Bán kính tấn công
        100,       // Máu tối đa
        50,        // Mana tối đa
        20,        // Sức mạnh tấn công
        5          // Phòng thủ
    ),
    new Hero(
        2,
        "Mage",
        1.0,       // Tốc độ chậm hơn so với Warrior
        150,       // Bán kính tấn công xa hơn
        80,        // Máu tối đa thấp hơn
        100,       // Mana tối đa cao
        30,        // Sức mạnh tấn công cao hơn
        2          // Phòng thủ thấp hơn
    ),
    new Hero(
        3,
        "Archer",
        1.5,       // Tốc độ nhanh hơn
        120,       // Bán kính tấn công vừa phải
        70,        // Máu tối đa
        40,        // Mana tối đa thấp
        15,        // Sức mạnh tấn công
        3          // Phòng thủ vừa phải
    ),
    new Hero(
        4,
        "Paladin",
        1.1,       // Tốc độ vừa phải
        80,        // Bán kính tấn công thấp hơn
        150,       // Máu tối đa cao
        60,        // Mana tối đa vừa phải
        25,        // Sức mạnh tấn công vừa phải
        8          // Phòng thủ cao
    ),
    new Hero(
        5,
        "Assassin",
        1.8,       // Tốc độ rất nhanh
        90,        // Bán kính tấn công
        60,        // Máu tối đa thấp
        30,        // Mana tối đa
        35,        // Sức mạnh tấn công cao
        1          // Phòng thủ rất thấp
    )
];
