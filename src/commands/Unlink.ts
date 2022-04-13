import { Message } from 'discord.js';
import { Command } from '../Command';
import { getPlayer, removePlayer } from '../data/players';
import { BotClient } from '../types';
import Embed from '../utils/Embed';

export default class Unlink extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'unlink',
            description: 'Unlinks your Brawl Stars account from your Discord account.',
            category: 'General',
            usage: client.settings.prefix.concat('unlink'),
            cooldown: 1000,
            requiredPermissions: ['SEND_MESSAGES']
        });
    }

    public async run(message: Message): Promise<void> {
        const player = getPlayer(message.author.tag);

        if (!player) {
            new Embed()
                .setTitle('Error')
                .setDescription('Account not linked!')
                .setFooter(`There isn't an account linked to ${message.author.tag}.`)
                .setColor('#ff0000')
                .send(message.channel);
            return;
        }

        new Embed()
            .setTitle('Successfully unlinked account!')
            .addField('Brawl Stars ID', player.brawl_stars_id)
            .addField('Discord ID', message.author.tag)
            .setColor('#FFFF00')
            .send(message.channel);

        removePlayer(message.author.tag);
    }
}
