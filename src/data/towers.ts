import { Tower } from "../models/Tower";

export const towersData: Tower[] = [
    new Tower(
        1,
        "Archer",
        50, // Damage
        150, // Range
        1.5, // Fire rate (seconds per shot)
        100, // Cost
        "arrow" // Projectile type
    ),
    new Tower(
        2,
        "Cannon",
        100, // Damage
        100, // Range
        2.0, // Fire rate
        150, // Cost
        "cannonball" // Projectile type
    ),
    new Tower(
        3,
        "Mage",
        70, // Damage
        200, // Range
        1.0, // Fire rate
        200, // Cost
        "magic_blast" // Projectile type
    ),
    new Tower(
        4,
        "Fire",
        120, // Damage
        130, // Range
        2.5, // Fire rate
        250, // Cost
        "fireball" // Projectile type
    )
];