const { Client, Message, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
module.exports = {
    name : "unhide",
    aliases: [],
    description: 'affiche le salon au membres',
    usage: `unhide <salon>`,
    go: async(client, db, message, args, owner, Whitelist, color , footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

            try {
                message.guild.roles.cache.forEach(role => {
                    channel.permissionOverwrites.edit(message.guild.id, {
                        VIEW_CHANNEL: true,
                    });
                }, `Salon caché par ${message.author.tag}`);
            } catch (e) {
                console.log(e);
            }
            message.channel.send(`Les membres peuvent  voir le salon <#${channel.id}>`);
        }

        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`<@${message.author.id}> a utilisé la commande \`unhide\` dans le channel \`<#${message.channel.id}>\``)
            .setTimestamp()
            .setFooter(footer)
        client.channels.cache.get(ml.get(`${message.guild.id}.modlog`)).send({ embeds: [embed] }).catch(console.error)

    }
}

  