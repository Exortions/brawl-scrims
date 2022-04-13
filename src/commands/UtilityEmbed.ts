// eslint-disable no-redeclare
// eslint-disable no-fallthrough
// eslint-disable no-case-declarations
import { Message } from 'discord.js';
import { Command } from '../Command';
import { BotClient } from '../types';
import Embed from '../utils/Embed';

export default class UtilityEmbed extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'embed',
            description: 'Creates an embed.',
            category: 'Admin',
            usage: client.settings.prefix.concat('embed <name>'),
            cooldown: 500,
            requiredPermissions: ['ADMINISTRATOR']
        });
    }

    public async run(message: Message): Promise<void> {
        if (!message.guild) return;

        const name = message.content.split(' ')[1];

        if (!name) {
            new Embed()
                .setTitle('Error')
                .setDescription('Invalid name!')
                .setFooter('Please specify a name. Example: !embed rules')
                .setColor('#ff0000')
                .send(message.channel);
            return;
        }

        const embed = new Embed();

        message.delete();

        let announcementsChannel;
        let announcements;

        switch (name) {
            case 'rules':
                embed
                    .setTitle('Rules')
                    .setDescription(
                        '1. No spamming.\n2. No advertising.\n3. Three strikes will result in a ban for the rest of the season'
                    )
                    .setColor('#ff0000')
                    .setThumbnail(
                        'https://i.pinimg.com/originals/3c/eb/5d/3ceb5da1108c8f536f6289ce6b8e446f.jpg'
                    )
                    .send(message.channel);
                break;
            case 'howtoplay':
                announcementsChannel = message.guild.channels.cache.get('962924509533470778');

                if (!announcementsChannel) return;

                announcements = announcementsChannel.toString();
                embed
                    .setTitle('How to play')
                    .setDescription(
                        `1. Once a host starts a scrim, they will add players that want to join.\n
                        2. Team captains are randomly selected and can pick players\n
                        3. A map will be generated for the scrim.
                        \n4. The host will invite everybody to the game and start the scrim.
                        \n5. If you win, you earn +10 trophies.
                        \n6. If you lose, you lose -5 trophies.
                        \n7. At the end of each season, trophies reset and the leaderboard is posted to ${announcements}`
                    )
                    .setColor('#FFFF00')
                    .send(message.channel);
                message.channel.send('How to join a game:');
                message.channel.send('https://giphy.com/embed/78D4Dhf0sgF1nOHjgY');
                break;
            case 'ruleshowtoplay':
                embed
                    .setTitle('Rules')
                    .setDescription(
                        '1. No spamming.\n2. No advertising.\n3. Three strikes will result in a ban for the rest of the season'
                    )
                    .setColor('#ff0000')
                    .setThumbnail(
                        'https://i.pinimg.com/originals/3c/eb/5d/3ceb5da1108c8f536f6289ce6b8e446f.jpg'
                    )
                    .send(message.channel);

                announcementsChannel = message.guild.channels.cache.get('962924509533470778');

                if (!announcementsChannel) return;

                announcements = announcementsChannel.toString();
                embed
                    .setTitle('How to play')
                    .setDescription(
                        `1. Once a host starts a scrim, they will add players that want to join.\n
                        2. Team captains are randomly selected and can pick players\n
                        3. A map will be generated for the scrim.
                        \n4. The host will invite everybody to the game and start the scrim.
                        \n5. If you win, you earn +10 trophies.
                        \n6. If you lose, you lose -5 trophies.
                        \n7. At the end of each season, trophies reset and the leaderboard is posted to ${announcements}`
                    )
                    .setColor('#FFFF00')
                    .send(message.channel);
                message.channel.send('How to join a game:');
                message.channel.send('https://giphy.com/embed/78D4Dhf0sgF1nOHjgY');
                break;
            default:
                break;
        }
    }
}
