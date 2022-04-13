import * as fs from 'fs';

export function getPlayers(): object[] {
    const data = fs.readFileSync('./data/players.json');

    return JSON.parse(data.toString());
}

export function getPlayer(
    id: string
):
    | {
          brawl_stars_id: string;
          id: string;
          is_banned: boolean;
          is_host: boolean;
          trophies: number;
          strikes: number;
      }
    | undefined {
    const data = fs.readFileSync('./data/players.json');
    const players = JSON.parse(data.toString());

    return players.find((p: { id: string }) => p.id === id);
}

export function addPlayer(id: string, brawlStarsId: string, isHost: boolean): void {
    const data = fs.readFileSync('./data/players.json');
    const players = JSON.parse(data.toString());

    players.push({
        id,
        brawl_stars_id: brawlStarsId,
        is_host: isHost,
        is_banned: false,
        trophies: 0,
        strikes: 0
    });

    fs.writeFileSync('./data/players.json', JSON.stringify(players));
}

export function removePlayer(id: string): void {
    const data = fs.readFileSync('./data/players.json');
    const players = JSON.parse(data.toString());

    const player = players.find((p: { id: string }) => p.id === id);

    if (!player) {
        return;
    }

    players.splice(players.indexOf(player), 1);

    fs.writeFileSync('./data/players.json', JSON.stringify(players));
}

export default class Player {
    private id: string;

    private brawl_stars_id: string;
    private is_banned: boolean;
    private is_host: boolean;
    private trophies: number;
    private strikes: number;

    constructor(id: string) {
        const player = getPlayer(id);

        if (!player) throw new Error(`Player with id ${id} not found.`);

        this.id = id;
        this.brawl_stars_id = player.brawl_stars_id;
        this.is_banned = player.is_banned;
        this.is_host = player.is_host;
        this.trophies = player.trophies;
        this.strikes = player.strikes;
    }

    public getId(): string {
        return this.id;
    }

    public isBanned(): boolean {
        return this.is_banned;
    }

    public isHost(): boolean {
        return this.is_host;
    }

    public getTrophies(): number {
        return this.trophies;
    }

    public getStrikes(): number {
        return this.strikes;
    }
}
