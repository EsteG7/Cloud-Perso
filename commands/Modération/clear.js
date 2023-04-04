const { Permissions } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
  name: 'clear',
  description: 'Permet de supprimer d\'un coup plusieurs messages dans un salon',
  usage: 'clear <nombre de messages>',
  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
    if (!args[0]) {
      return message.reply({ content: 'Veuillez spécifier le nombre de messages à supprimer.', allowedMentions: { repliedUser: false } });
    }

    const deleteCount = parseInt(args[0], 10);

    if (isNaN(deleteCount)) {
      return message.reply({ content: 'Veuillez spécifier un nombre valide de messages à supprimer.', allowedMentions: { repliedUser: false } });
    }

    if (deleteCount < 1 || deleteCount > 100) {
      return message.reply({ content: 'Veuillez spécifier un nombre de messages à supprimer compris entre 1 et 100.', allowedMentions: { repliedUser: false } });
    }

    const permissions = message.channel.permissionsFor(message.client.user);
    if (!permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      return message.reply({ content: "Je n'ai pas les permissions pour supprimer des messages dans ce canal.", allowedMentions: { repliedUser: false } });
    }

    const messages = await message.channel.messages.fetch({ limit: deleteCount + 1 });
    message.channel.bulkDelete(messages, true);

    message.channel.send(`J'ai supprimé ${deleteCount} messages.`);
  }}
};
