import * as Discord from 'discord.js';
import Scrim, { addScrim, getScrim, removeScrim } from '../data/scrims';
import * as maps from '../utils/Maps';

export default async function SelectMap(
    message: Discord.Message,
    scrimClass: Scrim
): Promise<void> {
    const mode = maps.getRandomMode();
    const map = maps.getRandomMap(mode);

    const obj = {
        name: map.name,
        file: map.file,
        mode: mode
    };

    const attachment = new Discord.MessageAttachment(
        `./data/maps/${obj.mode}/${obj.file}`,
        obj.file
    );

    const scrim = getScrim(scrimClass.getId());

    if (!scrim) return;

    scrim.map = `${obj.name} - ${obj.mode}`;

    removeScrim(scrim.id);
    addScrim(scrim);

    const embed = new Discord.MessageEmbed()
        .setTitle('Map Selection')
        .setDescription(`Map: ${scrim.map}`)
        .attachFiles([attachment])
        .setImage(`attachment://${obj.file}`)
        .setColor('#FFFF00');

    message.channel.send(embed);
}
