import { Message } from 'discord.js';
import { Command } from '../Command';
import { getScrimByTeamCode } from '../data/scrims';
import { BotClient } from '../types';
import Embed from '../utils/Embed';

export default class List extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'list',
            description: 'Lists all members inside of scrim.',
            category: 'Scrims',
            usage: client.settings.prefix.concat('list'),
            cooldown: 1000,
            requiredPermissions: ['SEND_MESSAGES']
        });
    }

    public async run(message: Message): Promise<void> {
        if (!message || !message.guild) return;

        const channel = message.guild.channels.cache.get(message.channel.id);

        if (!channel) return;

        if (!channel.name.startsWith('scrim-')) return;

        const scrim = getScrimByTeamCode(channel.name.split('-')[1].toUpperCase());

        if (!scrim) return;

        const players = scrim.players.map(p => p.id);

        new Embed()
            .setTitle('Scrim Members')
            .setDescription(players.join('\n'))
            .setColor('#FFFF00')
            .send(message.channel);
    }
}
