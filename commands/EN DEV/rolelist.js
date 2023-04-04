const { MessageEmbed } = require('discord.js');
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }

module.exports = {
    name: 'rolelist',
    aliases: ['rl'],
   
    go: async (client, db, message, args, prefix, color, footer, interaction) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
          const embed = new MessageEmbed()
          .setTitle(`Liste des rôles du serveur ${message.guild.name}`)
          .setDescription(message.guild.roles.cache.map(r => `${r}`).join(" \n "))
            .setFooter(footer)
        .setColor(color);
        
        message.channel.send({ embeds: [embed] })
    
        }
    }  
}