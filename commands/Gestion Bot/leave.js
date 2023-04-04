module.exports = {
    name: 'leave',
    usage: 'leave <id>',
    description: `Permet de forcer le bot à quitter un serveur.`,
    go: async (client, db, message, args, prefix, color, footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {

            
            const guildID = args[0]
            if (isNaN(guildID) || !guildID) {
            
            } else {
                const guild = client.guilds.cache.get(guildID);
               
                await message.channel.send(`J'ai quitté le serveur **${guild.name}**`)
                client.guilds.cache.get(guildID).leave()
               
                    }
            }
        }
    }
