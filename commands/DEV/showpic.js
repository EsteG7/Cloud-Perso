const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: 'pfp',
    usage: 'pfp <id/mention>',
    description: `Permet d'activer le mode pfp`,
    go: async (client, db, message, args, prefix, color, footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {

            const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0] || message.channelId);

            if (!args[0]) {
                if (!channel) return message.channel.send({ content: "Aucun salon trouvé !" })
                await db.set(`${message.guild.id}.channelpfp`, channel.id)
                message.channel.send({ content: `> Salon PFP **${channel}** !` })

            }

            if (args[0] === "off") {

                db.delete(`${message.guild.id}.channelpfp`);
                message.channel.send({ content: "> Pfps **désactivé** avec succès !" })
            }
        }
    }
}