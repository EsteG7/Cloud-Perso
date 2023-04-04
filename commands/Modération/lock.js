const Discord = require('discord.js')
const fs = require('fs')
const moment = require('moment')

module.exports = {
    name: 'lock',
    aliases: [],
    description: 'Permet de bloquer un salon, après ça les membres ne pourront plus envoyer de messages',
    usage: `lock <salon>`,
    go: async (client, db, message, args, owner, color, footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
        if (args[0] === "all") {
            message.guild.channels.cache.forEach((channel, id) => {
                channel.permissionOverwrites.edit(message.guild.id, {
                    SEND_MESSAGES: false,
                })
            }, `Tous les salons lock par ${message.author.tag}`);

            message.channel.send(`${message.guild.channels.cache.size} salons fermés`);

            const channellogs = ml.get(`${message.guild.id}.modlog`)

            const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setTitle(`Modération | **\`lock\`**`)
                .setDescription(`${message.author.tag} vient de lock tout les salons du serveur `)
                .setTimestamp()
                .setColor(color)
                .setFooter({ text: `Cloud's ${client.config.version}`  })
            client.channels.cache.get(channellogs).send({ embeds: [embed] }).catch(console.error)
            return
        }
    
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

        try {
            message.guild.roles.cache.forEach(role => {
                channel.permissionOverwrites.edit(message.guild.id, {
                    SEND_MESSAGES: false,
                });
            }, `Salon fermé par ${message.author.tag}`);
        } catch (e) {
            console.log(e);
        }
        message.channel.send(`${message.author.tag} vient de lock le channel <#${channel.id}>.`);
    }



    const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setTitle(`Modération | **\`lock\`**`)
        .setColor(color)
        .setDescription(`<@${message.author.id}> a \`lock\` le salon <#${message.channel.id}>`)
        .setTimestamp()
        .setFooter({ text: `Cloud's ${client.config.version}`  })
    client.channels.cache.get(ml.get(`${message.guild.id}.modlog`)).send({ embeds: [embed] }).catch(console.error)
    }
}
}