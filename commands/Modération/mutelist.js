
// Importer les modules nécessaires de Discord.js v13
const { Permissions, MessageEmbed } = require('discord.js');

// Créer la commande
module.exports = {
  name: 'listmute',
  description: 'Affiche la liste des membres muets',
  go: async (client, db, message, args, prefix, color, footer) => {
    if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
      const mutedMembers = await message.guild.members.fetch({ withMute: true});
      const tempMutedMembers = mutedMembers.filter(member => (member.voice.serverMute || member.voice.mute) && !member.user.bot);

      if (tempMutedMembers.size === null) {
        return message.reply({ content: 'Aucun membre n\'est muet !'});
      }

      const embed = new MessageEmbed()
        .setTitle('Liste des membres muets')
        .setColor(color)
        .setDescription(tempMutedMembers.map(member => `${member.user.tag} (${member.id})`).join('\n') || "Aucun mute");

      // Répondre au message avec l'embed
      message.reply({ embeds: [embed] });
    }
  }
};
