const Discord = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
  name: "warn",
  aliases: [],
  description: "Envoie un message privé à un membre avec le bot.",
  usage: "warn <@membre> [raison]",
  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!user) return message.channel.send(`\`❌\` Aucun membre trouvé.`);
        if (user.bot || user.id === message.author.id) return;
        if (message.guild.members.cache.get(user.id).roles.highest.position > message.member.roles.highest.position) return;
        
        const reason = args.slice(1).join(" ") || "Aucune raison donnée";
        const warnID = db.get(`number.${message.guild.id}.${user.id}`, 0) + 1;
        
        db.push(`info.${message.guild.id}.${user.id}`, {
            moderator: message.author.tag,
            reason: reason,
            date: Date.now(),
            id: warnID
        });
        db.add(`number.${message.guild.id}.${user.id}`, 1);
       
        message.channel.send(`**${user.tag}** a été **warn** pour \`${reason}\``);
        user.send({embeds: [
            new Discord.MessageEmbed()
          .setTitle(`Modération | \`Warn\``)
          .setDescription(`
          Vous avez été **warn** sur le serveur: **${message.guild.name}**
          Raison: **${reason}**
          Warn par : **${message.author.tag}**
          `)
          .setFooter(footer)
          .setColor(color)
          
          ]});
    } else {
        const user = message.author;
        const reason = args.slice(0).join(" ") || "Aucune raison donnée";
        const warnID = db.get(`number.${message.guild.id}.${user.id}`, 0) + 1;

        db.push(`info.${message.guild.id}.${user.id}`, {
            moderator: message.author.tag,
            reason: reason,
            date: Date.now(),
            id: warnID
        });
        db.add(`number.${message.guild.id}.${user.id}`, 1);

        message.channel.send(`**${user.tag}** a été **warn** pour \`${reason}\``);
        user.send(`Vous avez été **warn** sur ${message.guild.name} pour \`${reason}\``);
    }
}}