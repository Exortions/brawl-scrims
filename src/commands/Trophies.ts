import { Message, TextChannel, User } from 'discord.js';
import { Command } from '../Command';
import { getPlayer } from '../data/players';
import { BotClient } from '../types';
import Embed from '../utils/Embed';

export default class Trophies extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'trophies',
            description: 'Shows the current trophies of the specified player.',
            category: 'Scrims',
            usage: client.settings.prefix.concat('trophies <discord tag>'),
            cooldown: 1000,
            requiredPermissions: ['SEND_MESSAGES']
        });
    }

    public async run(message: Message): Promise<void> {
        if (message.mentions.users.size === 0)
            return this.runSelf(message).catch(err => {
                new Embed()
                    .setTitle('Error')
                    .setDescription(err.message)
                    .setColor('#ff0000')
                    .send(message.channel);
            });

        const user = message.mentions.users.first();
        if (!user) return Promise.reject(new Error('Invalid user!'));

        return this.runOther(message, user).catch(err => {
            new Embed()
                .setTitle('Error')
                .setDescription(err.message)
                .setColor('#ff0000')
                .send(message.channel);
        });
    }

    public async sendEmbed(tag: string, trophies: number, channel: TextChannel): Promise<void> {
        new Embed()
            .setTitle(`${tag}`)
            .setDescription(`has ${trophies} trophies.`)
            .setColor('#FFFF00')
            .send(channel);
    }

    public async runSelf(message: Message): Promise<void> {
        return this.runOther(message, message.author);
    }

    public async runOther(message: Message, user: User): Promise<void> {
        const player = getPlayer(user.tag);

        if (!player) return Promise.reject(new Error('Invalid player!'));

        const { trophies } = player;

        return this.sendEmbed(user.tag, trophies, message.channel as TextChannel);
    }
}
