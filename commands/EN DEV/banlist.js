const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'banlist',
  description: 'Affiche la liste des utilisateurs bannis sur le serveur.',
  go: async (client, db, message, args, prefix, color, footer, interaction) => {

    try {
      const banList = await message.guild.bans.fetch();
      if (banList.size === 0) {
        return message.reply({content: "\`❌\` Il n\'y a pas d\'utilisateur banni sur ce serveur.", allowedMentions: { repliedUser: false }}); 
      }

      const banListArray = [];
      banList.forEach(ban => {
        const reason = ban.reason || 'Aucune raison spécifiée';
        banListArray.push(`[\`${ban.user.tag}\`](https://discord.com/users/${ban.user.id}) | \`${ban.user.id}\` | \`${reason}\``);
      });

      const banListEmbed = new MessageEmbed()
        .setColor(color)
        .setFooter({
            text: footer,
            icon_url: client.user.displayAvatarURL()
        })
        .setTitle('Liste des utilisateurs bannis')
        
        .setDescription(banListArray.join('\n'));
        
      message.reply({content: null, embeds: [banListEmbed], allowedMentions: { repliedUser: false }}); 
    } catch (err) {
      console.error(err);
      message.reply('Une erreur est survenue lors de la récupération de la liste des utilisateurs bannis.');
    }
  },
};
