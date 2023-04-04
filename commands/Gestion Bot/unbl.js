const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = {
  name: 'unbl',
  go: async (client, db, message, args, prefix, color, footer) => {
    if (db.get(`owner_${client.user.id}_${message.author.id}`) !== true) {
      return;
    }

    let member = message.mentions.users.first() || await client.users.fetch(args[0]);
    if (!member) {
      return message.reply({ allowedMentions: { repliedUser: false }, content: `Aucun membre trouvé pour \`${args[0] || "❌"}\`` });
    }

    if (db.get(`bl_${client.user.id}_${member.id}`) === null) {
      return message.reply({ allowedMentions: { repliedUser: false }, content: `${member.username} n'est pas blacklisté` });
    }
        
    await db.delete(`bl_${client.user.id}_${member.id}`);
    return message.reply({ allowedMentions: { repliedUser: false }, content: `${member.username} n'est plus blacklisté` });
  }
}
