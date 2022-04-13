/* eslint-disable import/no-duplicates */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
import { Message, TextChannel } from 'discord.js';
import { Command } from '../Command';
import { getPlayer } from '../data/players';
import { addScrim, getScrimByTeamCode, removeScrim } from '../data/scrims';
import Scrim from '../data/scrims';
import SelectTeamCaptains from '../game/SelectTeamCaptains';
import { BotClient } from '../types';
import Embed from '../utils/Embed';

export default class Add extends Command {
    // Adds a player to the current scrim if in a scrim channel.
    constructor(client: BotClient) {
        super(client, {
            name: 'add',
            description: 'Adds a player to the current scrim.',
            category: 'Scrims',
            usage: client.settings.prefix.concat('add <discord tags>'),
            cooldown: 1000,
            requiredPermissions: ['SEND_MESSAGES']
        });
    }

    public async run(message: Message): Promise<void> {
        if (!message.guild || !message.mentions.members || !message.channel) return;

        const channel = message.guild.channels.cache.get(message.channel.id);

        if (!channel) return;

        if (!channel.name.startsWith('scrim-')) return;

        const playerLength = message.mentions.members.size;

        if (playerLength === 0) {
            new Embed()
                .setTitle('Error')
                .setDescription('Invalid player!')
                .setFooter('Please specify a player. Example: !add @player1 @player2')
                .setColor('#ff0000')
                .send(message.channel);
            return;
        }

        const players = message.mentions.members.map(m => m.user.tag);

        const scrim = getScrimByTeamCode(channel.name.split('-')[1].toUpperCase());

        if (!scrim) return;
        const playerCount = scrim.players.length;

        if (playerCount >= 6) {
            new Embed()
                .setTitle('Error')
                .setDescription('Scrim is full!')
                .setFooter('There\'s already a maximum of 6 players.') // eslint-disable-line prettier/prettier
                .setColor('#ff0000')
                .send(message.channel);
            return;
        }

        const playersAdded: string[] = [];

        for (const tag of players) {
            const player = getPlayer(tag);
            if (!player) return;

            let includesPlayer = false;

            for (const p of scrim.players) {
                if (p.id === player.id) {
                    includesPlayer = true;
                    break;
                }
            }

            if (!includesPlayer) {
                scrim.players.push(player);
                playersAdded.push(tag);
            } else {
                new Embed()
                    .setTitle('Error')
                    .setDescription(`${player.id} is already in the scrim!`)
                    .setFooter('Please remove them first.')
                    .setColor('#ff0000')
                    .send(message.channel);
            }
        }

        const host = getPlayer(message.author.tag);

        if (!host) return;

        let includesHost = false;

        for (const p of scrim.players) {
            if (p.id === host.id) {
                includesHost = true;
                break;
            }
        }

        if (!includesHost) {
            scrim.players.push(host);
            playersAdded.push(message.author.tag);
        }

        if (playersAdded.length <= 0) return;

        removeScrim(scrim.id);
        addScrim(scrim);

        const { role } = scrim;

        message.mentions.members.forEach(member => {
            member.roles.add(role);
        });

        new Embed()
            .setTitle('Added players')
            .setDescription(playersAdded.join('\n'))
            .setColor('#FFFF00')
            .setFooter(`${playersAdded.length} player(s) added.`)
            .send(message.channel);

        const _scrim = new Scrim(scrim.id);

        if (_scrim.getPlayers().length !== 6) return;

        SelectTeamCaptains(_scrim, message, message.channel as TextChannel).then(err => {
            const error = err === 'Error';

            if (error)
                new Embed()
                    .setTitle('Error')
                    .setDescription('Error adding captains.')
                    .setColor('#ff0000')
                    .send(message.channel);
        });
    }
}
