const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'uptime',
    go: async (client, db, message, args, prefix, color, footer) => {
         if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
            let days = Math.floor(client.uptime / (1000 * 60 * 60 * 24)).toString();
            let hours = Math.floor((client.uptime / (1000 * 60 * 60)) % 24).toString();
            let minutes = Math.floor((client.uptime / (1000 * 60)) % 60).toString();
            let seconds = Math.floor((client.uptime / 1000) % 60).toString();
            
            const embed = new MessageEmbed()
            .setColor(color)
            .setFooter(footer)
            .addFields({name : "Uptime du Bot :", value:`Je suis connecter depuis ${days} jour(s) ${hours} heure(s) ${minutes} minute(s) ${seconds} seconde(s)`})
            message.channel.send({embeds : [embed]})
           
    }
}

}



