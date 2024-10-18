import { Skill } from "../models/Skill";

// Dữ liệu về các kỹ năng trong game
export const skillsData: Skill[] = [
    new Skill(
        "fireball",
        "Fireball",
        150,      // Damage
        300,      // Range
        10,       // Cooldown (seconds)
        20,       // Mana cost
        "burn",   // Effect
        "single"  // Target type: single-target skill
    ),
    new Skill(
        "lightning_strike",
        "Lightning Strike",
        200,      // Damage
        400,      // Range
        15,       // Cooldown (seconds)
        25,       // Mana cost
        "stun",   // Effect: stun the target for a few seconds
        "single"  // Single-target skill
    ),
    new Skill(
        "blizzard",
        "Blizzard",
        100,      // Damage per tick
        500,      // Range (area)
        20,       // Cooldown (seconds)
        30,       // Mana cost
        "freeze", // Effect: slow down all enemies in the area
        "area"    // Area-target skill
    ),
    new Skill(
        "heal",
        "Heal",
        -200,     // Negative damage for healing
        300,      // Range
        12,       // Cooldown (seconds)
        15,       // Mana cost
        "heal",   // Effect: restores health
        "single"  // Single-target heal
    )
];
