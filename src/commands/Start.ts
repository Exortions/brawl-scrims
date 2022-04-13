import { Message } from 'discord.js';
import { Command } from '../Command';
import { BotClient } from '../types';
import * as scrims from '../data/scrims';
import Embed from '../utils/Embed';
import { getPlayer } from '../data/players';

export default class Start extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'start',
            description: 'Starts a scrim.',
            category: 'Scrims',
            usage: client.settings.prefix.concat('start <team code>'),
            cooldown: 1000,
            requiredPermissions: ['SEND_MESSAGES']
        });
    }

    public async run(message: Message): Promise<void> {
        if (!message.guild) return;

        const player = getPlayer(message.author.tag);

        if (!player) {
            new Embed()
                .setTitle('Error')
                .setDescription('No account linked')
                .setFooter('Link your Brawl Stars account first with !link')
                .setColor('#ff0000')
                .send(message.channel);
            return;
        }

        const teamCode = message.content.split(' ')[1];

        if (!teamCode) {
            new Embed()
                .setTitle('Error')
                .setDescription('Invalid team code!')
                .setFooter(
                    'If you think this is a bug, make a new team code and report it to an admin.'
                )
                .setColor('#ff0000')
                .send(message.channel);
            return;
        }

        const channel = await message.guild.channels.create(`scrim-${teamCode}`, {
            type: 'text',
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL']
                }
            ]
        });

        const role = await message.guild.roles.create({
            data: {
                name: `scrim-${teamCode}`,
                color: '#FFFF00',
                hoist: true,
                mentionable: true
            }
        });

        // Make @everyone allowed to view the channel but not send messages
        channel.updateOverwrite(message.guild.roles.everyone, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: false
        });

        channel.updateOverwrite(role, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        });

        const scrim = {
            id: scrims.getScrims().length + 1,
            team_code: teamCode,
            players: [
                {
                    id: player.id,
                    brawl_stars_id: player.brawl_stars_id,
                    is_host: true,
                    trophies: player.trophies
                }
            ],
            teams: [[], []],
            captains: [],
            map: '',
            channel: channel.id,
            role: role.id
        };

        scrims.addScrim(scrim);

        new Embed()
            .setTitle('Scrim started!')
            .setDescription(`Use ${this.client.settings.prefix}add to add players.`)
            .setColor('#FFFF00')
            .send(channel);
    }
}
