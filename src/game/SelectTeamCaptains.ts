import { Message, TextChannel } from 'discord.js';
import Scrim from '../data/scrims';
import Embed from '../utils/Embed';

export default async function SelectTeamCaptains(
    scrim: Scrim,
    message: Message,
    channel: TextChannel
): Promise<string> {
    if (!scrim || !message || !channel) return Promise.resolve('Error');

    const players = scrim.getPlayers();

    if (!players || players.length !== 6) return Promise.resolve('Error');

    const captains = players.sort(() => 0.5 - Math.random()).slice(0, 2);

    captains.forEach(captain => {
        scrim.addCaptain(captain.id);
    });

    new Embed()
        .setTitle('Team Captains')
        .setDescription(
            `${captains[0].id} and ${
                captains[1].id
            } are the captains of scrim-${scrim.getTeamCode()}.`
        )
        .setColor('#FFFF00')
        .send(channel);

    return Promise.resolve('Success');
}
