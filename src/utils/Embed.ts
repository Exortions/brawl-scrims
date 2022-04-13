import * as discord from 'discord.js';

export default class Embed {
    public embed: discord.MessageEmbed;

    constructor() {
        this.embed = new discord.MessageEmbed();
    }

    public setTitle(title: string): Embed {
        this.embed.setTitle(title);
        return this;
    }

    public setDescription(description: string): Embed {
        this.embed.setDescription(description);
        return this;
    }

    public setColor(color: string): Embed {
        this.embed.setColor(color);
        return this;
    }

    public setFooter(footer: string): Embed {
        this.embed.setFooter(footer);
        return this;
    }

    public setTimestamp(timestamp: Date): Embed {
        this.embed.setTimestamp(timestamp);
        return this;
    }

    public setThumbnail(thumbnail: string): Embed {
        this.embed.setThumbnail(thumbnail);
        return this;
    }

    public setImage(image: string): Embed {
        this.embed.setImage(image);
        return this;
    }

    public setAuthor(name: string, iconURL?: string, url?: string): Embed {
        this.embed.setAuthor(name, iconURL, url);
        return this;
    }

    public addField(name: string, value: string, inline?: boolean): Embed {
        this.embed.addField(name, value, inline);
        return this;
    }

    public addFields(fields: { name: string; value: string; inline?: boolean }[]): Embed {
        fields.forEach(field => this.embed.addField(field.name, field.value, field.inline));
        return this;
    }

    public send(
        channel: discord.TextChannel | discord.DMChannel | discord.NewsChannel
    ): Promise<discord.Message> {
        return channel.send(this.embed);
    }
}
