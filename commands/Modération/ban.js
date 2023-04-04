const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Permet de bannir un membre du serveur',
  usage: `ban <membre/id> [raison]`,
  go: async (client, db, message, newPresence, oldPresence, owner, Whitelist, color, footer) => {
    if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {

      // Séparez la commande et l'ID de l'utilisateur
      const args = message.content.split(' ');
      let user = message.mentions.users.first() || await client.users.fetch(args[1]);
      if (!user) {
        return message.reply({ content: 'Veuillez mentionner un utilisateur valide ou fournir un identifiant d\'utilisateur valide.', allowedMentions: { repliedUser: false } });
      }
      const userId = user.id;
      const reason = args.slice(2).join(' ');

      try {
        await message.guild.bans.create(userId, { reason: reason });
        message.reply({ content: `**${user.tag}** a été banni du serveur pour la raison suivante \`${reason || 'Aucune raison spécifiée'}\`.`, allowedMentions: { repliedUser: false } });
      } catch (error) {
        console.error(error);
        message.reply('Il y a eu une erreur lors de la tentative de bannissement de l\'utilisateur.');
      }
    }
  }
}
