

const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
module.exports = {
    name: 'ticket-categorie',
    category: "Ticket",
    description: "Permet de configurer la catégories des tickets",
    usage: "ticket-categorie",
    go: async (client, db, message, args, prefix, color, footer) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
     
            const funny = message.guild.channels.cache.filter(x => x.type === "GUILD_CATEGORY")
            message.delete()
            const newCategorie = message.guild.channels.cache.get(args[0] || funny.id);
            if (!newCategorie) return message.channel.send({ content: "Aucun catégorie trouvé !" })
            if (db.get(`${message.guild.id}.categorie`) === newCategorie) return message.channel.send(`Nouvelle catégorie : \`${db.get(`${message.guild.id}.categorie`)}\``)
            else {
                db.set(`${message.guild.id}.categorie`, args[0])
                message.channel.send(`Nouvelle catégorie : ${newCategorie.name}`)
            }
        }
    }
}
        
     