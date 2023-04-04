const { Permissions, MessageEmbed } = require('discord.js');


module.exports = {
  name: "kick",
  usage: "kick <@user/id> [raison]",
  description: "Permet d'expulser une personne d'un serveur",
  go: async (client,db,message,args,prefix,color,footer,interaction) => {

    const memberID = args[0];
    const member = message.mentions.members.first() || message.guild.members.cache.get(memberID);
    let raison = args.slice(1).join(' ');
    if (!raison) {
      raison = 'Aucune'
    }

    if (!member) {
      return message.reply({ content: 'Mentionnez ou entrez l\'ID du membre.', allowedMentions: { repliedUser: false } });
    }

    if (member.id === message.author.id) {
      return message.reply("Vous ne pouvez pas vous expulser vous-même !");
    }

    if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
      return message.reply('Vous ne pouvez pas expulser cet utilisateur car il a un rôle plus élevé ou égal au vôtre !');
    }

    if (member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      return message.reply("Vous ne pouvez pas expulser un administrateur !");
    }

    try {
      await member.send({
        embeds: [
          new MessageEmbed()
            .setTitle('Modération | \`kick\`')
            .setDescription(`
            Vous avez été kick du serveur : **${message.guild.name}**
            Raison: **${raison}**
            kick par: **${message.author.tag}** (${message.author.id})`)
            .setColor(color)
            .setFooter(footer)
        ]
      });
    } catch (error) {
      console.error(`Erreur lors de l'envoi du message d'expulsion à ${member.user.tag}`, error);
    }

    try {
      await member.kick(raison);
      message.channel.send(`**${member.user.tag}** a été expulsé.`);
    } catch (error) {
      console.error(`Erreur lors de l'expulsion de ${member.user.tag} sur le serveur ${message.guild.name}. Aujourd'hui à ${new Date().toLocaleTimeString()}. Par ${message.author.tag}`, error);
      message.reply('Une erreur est survenue lors de l\'expulsion de cet utilisateur.');
    }
  }
}