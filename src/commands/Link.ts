import { Message } from 'discord.js';
import { Command } from '../Command';
import { addPlayer, getPlayer } from '../data/players';
import { BotClient } from '../types';
import Embed from '../utils/Embed';

export default class Link extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'link',
            description: 'Links your Brawl Stars account to your Discord account.',
            category: 'General',
            usage: client.settings.prefix.concat('link <brawl stars id>'),
            cooldown: 1000,
            requiredPermissions: ['SEND_MESSAGES']
        });
    }

    public async run(message: Message): Promise<void> {
        const brawlStarsId = message.content.split(' ')[1];

        if (!brawlStarsId) {
            new Embed()
                .setTitle('Error')
                .setDescription('Invalid Brawl Stars ID!')
                .setFooter('Please specify a Brawl Stars ID. Example: !link AA9AA9AA9')
                .setColor('#ff0000')
                .send(message.channel);
            return;
        }

        if (getPlayer(message.author.tag) !== undefined) {
            new Embed()
                .setTitle('Error')
                .setDescription('Account already linked!')
                .setFooter(`Your Brawl Stars account is already linked to ${message.author.tag}.`)
                .setColor('#ff0000')
                .send(message.channel);
            return;
        }

        new Embed()
            .setTitle('Successfully linked account!')
            .addField('Brawl Stars ID', brawlStarsId)
            .addField('Discord ID', message.author.tag)
            .setColor('#FFFF00')
            .send(message.channel);

        addPlayer(message.author.tag, brawlStarsId, false);
    }
}
