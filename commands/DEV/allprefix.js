const Discord = require('discord.js')
module.exports = {
    name: 'allprefix',
    aliases: ["alpr"],
    usage: 'allprefix',
    description: 'Affiche tous les préfixes des serveurs où le bot est présent.',
    go: async (client, db, message, args, prefix, color, footer) => {
      if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
      const embed = new Discord.MessageEmbed()
        .setTitle('Préfixes de tous les serveurs')
        .setColor(color)
        .setFooter(footer);

      client.guilds.cache.forEach(guild => {
        const prefix = db.get(`prefix_${guild.id}`);
      
        if (!prefix) {
          db.set(`prefix_${guild.id}`, '+');
        }
        embed.addField(guild.name, prefix || '+');
      });
  
    
   message.reply({content: null, allowedMentions: { repliedUser: false }, embeds: [embed]})
    }
  }}
  