import { Message, TextChannel } from 'discord.js';
import { Command } from '../Command';
import { addScrim, getScrimByTeamCode, removeScrim } from '../data/scrims';
import { BotClient } from '../types';
import Embed from '../utils/Embed';

export default class Remove extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'remove',
            description: 'Removes a user from the scrim.',
            category: 'Scrims',
            usage: client.settings.prefix.concat('remove <discord tag>'),
            cooldown: 1000,
            requiredPermissions: ['SEND_MESSAGES']
        });
    }

    public async run(message: Message): Promise<void> {
        const channel = message.channel as TextChannel;

        if (!channel || !channel.name || !channel.name.startsWith('scrim-')) return;

        if (message.mentions.users.size === 0) {
            new Embed()
                .setTitle('Error')
                .setDescription('You must mention a user to remove them from the scrim.')
                .setColor('#ff0000')
                .send(message.channel);
            return;
        }

        const user = message.mentions.users.first();
        if (!user) {
            new Embed()
                .setTitle('Error')
                .setDescription('Invalid user!')
                .setColor('#ff0000')
                .send(message.channel);
            return;
        }

        const scrim = getScrimByTeamCode(channel.name.split('-')[1].toUpperCase());
        if (!scrim) {
            new Embed()
                .setTitle('Error')
                .setDescription('Invalid scrim!')
                .setColor('#ff0000')
                .send(message.channel);
            return;
        }

        removeScrim(scrim.id);

        scrim.players = scrim.players.filter(p => p.id !== user.tag);

        addScrim(scrim);

        new Embed()
            .setTitle('Success')
            .setDescription(`Removed ${user.tag} from the scrim.`)
            .setColor('#FFFF00')
            .send(message.channel);
    }
}
