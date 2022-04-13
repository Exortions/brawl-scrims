import * as fs from 'fs';

export function getScrims(): object[] {
    const data = fs.readFileSync('./data/scrims.json');

    return JSON.parse(data.toString());
}

export function getScrim(
    id: number
):
    | {
          id: number;
          team_code: string;
          players: { id: string; brawl_stars_id: string; is_host: boolean; trophies: number }[];
          teams: { id: string }[][];
          captains: { id: string }[];
          map: string;
          channel: string;
          role: string;
      }
    | undefined {
    const data = fs.readFileSync('./data/scrims.json');
    const scrims = JSON.parse(data.toString());

    return scrims.find((s: { id: number }) => s.id === id);
}

export function getScrimByTeamCode(
    teamCode: string
):
    | {
          id: number;
          team_code: string;
          players: { id: string; brawl_stars_id: string; is_host: boolean; trophies: number }[];
          teams: { id: string }[][];
          captains: { id: string }[];
          map: string;
          channel: string;
          role: string;
      }
    | undefined {
    const data = fs.readFileSync('./data/scrims.json');
    const scrims = JSON.parse(data.toString());

    return scrims.find((s: { team_code: string }) => s.team_code === teamCode.toUpperCase());
}

export function addScrim(team: {
    id: number;
    team_code: string;
    players: { id: string; brawl_stars_id: string; is_host: boolean; trophies: number }[];
    teams: { id: string }[][];
    captains: { id: string }[];
    map: string;
    channel: string;
    role: string;
}): void {
    const data = fs.readFileSync('./data/scrims.json');
    const scrims = JSON.parse(data.toString());

    scrims.push({
        id: team.id,
        team_code: team.team_code,
        players: team.players,
        captains: team.captains,
        map: team.map,
        channel: team.channel,
        role: team.role
    });

    fs.writeFileSync('./data/scrims.json', JSON.stringify(scrims));
}

export function removeScrim(id: number): void {
    const data = fs.readFileSync('./data/scrims.json');
    const scrims = JSON.parse(data.toString());

    const scrim = scrims.find((s: { id: number }) => s.id === id);

    if (!scrim) {
        return;
    }

    scrims.splice(scrims.indexOf(scrim), 1);

    fs.writeFileSync('./data/scrims.json', JSON.stringify(scrims));
}

export default class Scrim {
    private id: number;

    constructor(id: number) {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }

    public getTeamCode(): string {
        const scrim = getScrim(this.id);

        if (!scrim) {
            return '';
        }

        return scrim.team_code;
    }

    public getPlayers(): {
        id: string;
        brawl_stars_id: string;
        is_host: boolean;
        trophies: number;
    }[] {
        const scrim = getScrim(this.id);

        if (!scrim) {
            return [];
        }

        return scrim.players;
    }

    public getTeams(): { id: string }[][] {
        const scrim = getScrim(this.id);

        if (!scrim) {
            return [];
        }

        return scrim.teams;
    }

    public getCaptains(): {
        id: string;
    }[] {
        const scrim = getScrim(this.id);

        if (!scrim) {
            return [];
        }

        return scrim.captains;
    }

    public addPlayer(id: string, brawlStarsId: string, isHost: boolean): void {
        const scrim = getScrim(this.id);

        if (!scrim) {
            return;
        }

        scrim.players.push({
            id,
            brawl_stars_id: brawlStarsId,
            is_host: isHost,
            trophies: 0
        });

        removeScrim(this.getId());
        addScrim(scrim);
    }

    public addTeam(players: { id: string }[]): void {
        const scrim = getScrim(this.id);

        if (!scrim) {
            return;
        }

        scrim.teams.push(players);

        removeScrim(this.getId());
        addScrim(scrim);
    }

    public addCaptain(id: string): void {
        const scrim = getScrim(this.id);

        if (!scrim) {
            return;
        }

        scrim.captains.push({ id });

        removeScrim(this.getId());
        addScrim(scrim);
    }

    public removePlayer(id: string): void {
        const scrim = getScrim(this.id);

        if (!scrim) {
            return;
        }

        const player = scrim.players.find((p: { id: string }) => p.id === id);

        if (!player) {
            return;
        }

        scrim.players.splice(scrim.players.indexOf(player), 1);

        removeScrim(this.getId());
        addScrim(scrim);
    }

    public removeTeam(team: number): void {
        const scrim = getScrim(this.id);

        if (!scrim) {
            return;
        }

        scrim.teams.splice(team, 1);

        removeScrim(this.getId());
        addScrim(scrim);
    }

    public removeCaptain(id: string): void {
        const scrim = getScrim(this.id);

        if (!scrim) {
            return;
        }

        const captain = scrim.captains.find((p: { id: string }) => p.id === id);

        if (!captain) {
            return;
        }

        scrim.captains.splice(scrim.captains.indexOf(captain), 1);

        removeScrim(this.getId());
        addScrim(scrim);
    }

    public getMap(): string {
        const scrim = getScrim(this.id);

        if (!scrim) {
            return '';
        }

        return scrim.map;
    }

    public getChannel(): string {
        const scrim = getScrim(this.id);

        if (!scrim) {
            return '';
        }

        return scrim.channel;
    }

    public getRole(): string {
        const scrim = getScrim(this.id);

        if (!scrim) {
            return '';
        }

        return scrim.role;
    }

    public setMap(map: string): void {
        const scrim = getScrim(this.id);

        if (!scrim) {
            return;
        }

        scrim.map = map;

        removeScrim(this.getId());
        addScrim(scrim);
    }

    public addPlayerToTeam(team: number, player: string): void {
        const scrim = getScrim(this.id);

        if (!scrim || team < 0 || team > 1) {
            return;
        }

        const teamData = scrim.teams[team];

        if (!teamData) {
            return;
        }

        teamData.push({ id: player });

        removeScrim(this.getId());
        addScrim(scrim);
    }
}
