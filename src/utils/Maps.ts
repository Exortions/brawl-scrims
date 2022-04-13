// Bounty - shooting star, deeper danger, overgrown canyon
// Knockout - belles rock, goldarm gulch, flaring phoenix
// Hotzone - open business, temple of boom, ring of fire
// Heist - forks out, safe zone, bridge too far
// Gemgrab - deathcap trap, crystal arcade, double swoosh, minecart madness
// Brawlball - super beach, pinhole punt, center stage
const MODES = ['bounty', 'knockout', 'hotzone', 'heist', 'gemgrab', 'brawlball'];
const MAPS = [
    {
        name: 'Shooting Star',
        file: 'shooting-star.png',
        mode: 'bounty'
    },
    {
        name: 'Deeper Danger',
        file: 'deeper-danger.png',
        mode: 'bounty'
    },
    {
        name: 'Overgrown Canyon',
        file: 'overgrown-canyon.png',
        mode: 'bounty'
    },
    {
        name: 'Belle\'s Rock', // eslint-disable-line prettier/prettier
        file: 'belles-rock.png',
        mode: 'knockout'
    },
    {
        name: 'Goldarm Gulch',
        file: 'goldarm-gulch.png',
        mode: 'knockout'
    },
    {
        name: 'Flaring Phoenix',
        file: 'flaring-phoenix.png',
        mode: 'knockout'
    },
    {
        name: 'Open Business',
        file: 'open-business.png',
        mode: 'hotzone'
    },
    {
        name: 'Temple of Boom',
        file: 'temple-of-boom.png',
        mode: 'hotzone'
    },
    {
        name: 'Ring of Fire',
        file: 'ring-of-fire.png',
        mode: 'hotzone'
    },
    {
        name: 'Forks Out',
        file: 'forks-out.png',
        mode: 'heist'
    },
    {
        name: 'Safe Zone',
        file: 'safe-zone.png',
        mode: 'heist'
    },
    {
        name: 'Bridge Too Far',
        file: 'bridge-too-far.png',
        mode: 'heist'
    },
    {
        name: 'Deathcap Trap',
        file: 'deathcap-trap.png',
        mode: 'gemgrab'
    },
    {
        name: 'Crystal Arcade',
        file: 'crystal-arcade.png',
        mode: 'gemgrab'
    },
    {
        name: 'Double Swoosh',
        file: 'double-swoosh.png',
        mode: 'gemgrab'
    },
    {
        name: 'Minecart Madness',
        file: 'minecart-madness.png',
        mode: 'gemgrab'
    },
    {
        name: 'Super Beach',
        file: 'super-beach.png',
        mode: 'brawlball'
    },
    {
        name: 'Pinhole Punt',
        file: 'pinhole-punt.png',
        mode: 'brawlball'
    },
    {
        name: 'Center Stage',
        file: 'center-stage.png',
        mode: 'brawlball'
    }
];

export function getRandomMode(): string {
    return MODES[Math.floor(Math.random() * MODES.length)];
}

export function getRandomMap(mode: string): { name: string; file: string } {
    return MAPS.filter(map => map.mode === mode)[
        Math.floor(Math.random() * MAPS.filter(map => map.mode === mode).length)
    ];
}

export function beautifyMode(mode: string): string {
    switch (mode) {
        case 'bounty':
            return 'Bounty';
        case 'knockout':
            return 'Knockout';
        case 'hotzone':
            return 'Hot Zone';
        case 'heist':
            return 'Heist';
        case 'gemgrab':
            return 'Gem Grab';
        case 'brawlball':
            return 'Brawl Ball';
        default:
            return 'Unknown';
    }
}