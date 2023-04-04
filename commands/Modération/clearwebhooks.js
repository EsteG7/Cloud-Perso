const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'clearwebhooks',
  description: 'Supprime tous les webhooks du serveur.',
  usage: 'clearwebhooks',
  go: async (client, db, message, args, prefix, color, footer) => {
    if (!message.member.permissions.has('MANAGE_WEBHOOKS')) {
      return message.channel.send({
        content: `:x: Vous n'avez pas la permission de gérer les webhooks.`,
      });
    }

    const webhooks = await message.guild.fetchWebhooks();

    if (webhooks.size === 0) {
      return message.channel.send({
        content: `:x: Il n'y a aucun webhook sur ce serveur.`,
      });
    }

    await Promise.all(
      webhooks.map(async (webhook) => {
        await webhook.delete();
      })
    );

    const embed = new MessageEmbed()
      .setColor(color)
      .setDescription(`:white_check_mark: Tous les webhooks ont été supprimés avec succès.`)
      .setFooter(footer);

    return message.channel.send({ embeds: [embed] });
  },
};
