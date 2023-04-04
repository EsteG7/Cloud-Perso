const Discord = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: "delwarn",
  aliases: [],
  description: "Supprime un avertissement (warn) d'un membre.",
  usage: "delwarn <@membre> <ID de l'avertissement>",
  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) return message.channel.send(`\`❌\` Aucun membre trouvé.`);
    if (user.bot || user.id === message.author.id) return;
    if (message.guild.members.cache.get(user.id).roles.highest.position > message.member.roles.highest.position) return;

    const warns = db.get(`info.${message.guild.id}.${user.id}`, []);
    const warnID = args[1];
    const warn = warns.find(w => w.id === warnID);
    if (!warn) return message.channel.send(`\`❌\` Cet avertissement n'existe pas.`);

    const warnIndex = warns.indexOf(warn);
    warns.splice(warnIndex, 1);
    db.set(`info.${message.guild.id}.${user.id}`, warns);

    const embed = new Discord.MessageEmbed()
      .setTitle(`Modération | \`Suppression d'un avertissement\``)
      .setDescription(`
        L'avertissement ID \`${warnID}\` de **${user.tag}** a été supprimé par **${message.author.tag}**.
        Raison du warn : **${warn.reason}**
      `)
      .setFooter(footer)
      .setColor(color);

    message.channel.send(embed);
    user.send(`Un de vos avertissements a été supprimé sur le serveur ${message.guild.name}.\nID de l'avertissement : \`${warnID}\``);
  }
};
