import { Tower } from "../models/Tower";

export const towersData: Tower[] = [
    new Tower(
        1,
        "Archer",
        5, // Damage
        150, // Range
        3, // Fire rate (seconds per shot)
        100, // Cost
        "arrow" // Projectile type
    ),
    new Tower(
        2,
        "Cannon",
        20, // Damage
        150, // Range
        2, // Fire rate
        150, // Cost
        "cannonball" // Projectile type
    ),
    new Tower(
        3,
        "Mage",
        10, // Damage
        200, // Range
        5, // Fire rate
        200, // Cost
        "magic_blast" // Projectile type
    ),
    new Tower(
        4,
        "Fire",
        15, // Damage
        200, // Range
        3, // Fire rate
        250, // Cost
        "fireball" // Projectile type
    )
];