const { Client, Message, MessageEmbed } = require('discord.js');
const { Util } = require("discord.js");

module.exports = {
    name: "emoji",
    aliases: ["addemoji"],
    go: async(client, db, message, owner, args, Whitelist, color, footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
            if (!args.length) {
                return message.channel.send({ content: "Veuillez spécifier l'émoji" });
            }

            for (const rawEmoji of args) {
                const parsedEmoji = Util.parseEmoji(rawEmoji);

                if (parsedEmoji.id) {
                    const extension = parsedEmoji.animated ? ".gif" : ".png";
                    const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;

                    message.guild.emojis.create(url, parsedEmoji.name)
                        .then((emoji) => message.channel.send({ content: `Emoji ajouté par ${message.author.username}\nPreview: ${emoji.url}` }));
                }
            }
        }
    }
}
