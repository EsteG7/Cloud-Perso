const Discord = require('discord.js')
const fs = require('fs')
const moment = require('moment')

module.exports = {
    name: 'unlock',
    aliases: [],
    description: 'Permet de bloquer un salon, après ça les membres ne pourront plus envoyer de messages',
    usage: `unlock <salon>`,
    go: async (client, db, message, args, owner, Whitelist, color, footer) => {
        if (args[0] === "all") {
            message.guild.channels.cache.forEach((channel, id) => {
                channel.permissionOverwrites.edit(message.guild.id, {
                    SEND_MESSAGES: true,
                })
            }, `Tous les salons unlock par ${message.author.tag}`);

            message.channel.send(`${message.guild.channels.cache.size} salons unlock`);

            const channellogs = ml.get(`${message.guild.id}.modlog`)

            const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setTitle(`Modération | **\`unlock\`**`)
                .setDescription(`${message.author.tag} vient d unlock tout les salons du serveur `)
                .setTimestamp()
                .setColor(color)
                .setFooter({ text: `Cloud's ${client.config.version}`  })
            client.channels.cache.get(channellogs).send({ embeds: [embed] }).catch(console.error)
            return
        }
    
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)){
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

        try {
            message.guild.roles.cache.forEach(role => {
                channel.permissionOverwrites.edit(message.guild.id, {
                    SEND_MESSAGES: true,
                });
            }, `Salon fermé par ${message.author.tag}`);
        } catch (e) {
            console.log(e);
        }
        message.channel.send(`**${message.author.tag}** vient de unlock le channel <#${channel.id}>.`);
    }



    const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setTitle(`Modération | **\`unlock\`**`)
        .setColor(color)
        .setDescription(`<@${message.author.id}> a \`unlock\` le salon <#${message.channel.id}>`)
        .setTimestamp()
        .setFooter({ text: `Cloud's ${client.config.version}`  })
    client.channels.cache.get(ml.get(`${message.guild.id}.modlog`)).send({ embeds: [embed] }).catch(console.error)
    }
}
  