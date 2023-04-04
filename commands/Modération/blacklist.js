const Discord = require('discord.js')

module.exports = {
  name: 'bl',
  go: async (client, db, message, args, prefix, color, footer) => {
    if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {

      if (args[0]) {

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
          try {
            member = await client.users.fetch(args[0]); 
          } catch (e) {
            return message.reply({ allowedMentions: { repliedUser: false }, content: `Aucun membre trouvé pour \`${args[0] || "❌"}\`` });
          }
        }
        if (db.get(`owner_${client.user.id}_${member.id}`) === true) return;
        if (db.get(`bl_${client.user.id}_${member.id}`) === true) return message.reply({ allowedMentions: { repliedUser: false }, content: `${member.username} est déjà blacklisté` });

        client.guilds.cache.forEach(guild => {
          guild.members.ban(member, { reason: `Blacklisted | Par ${message.author.tag}`}).catch(console.error);
        });

        db.set(`bl_${client.user.id}_${member.id}`, true);
        message.reply({ allowedMentions: { repliedUser: false }, content: `**${member.tag}** a été blacklisté de tous les serveurs (${client.guilds.cache.size}).` });

      } else {

        const data = db.all().filter(data => data.ID.startsWith(`bl_${client.user.id}`)).sort((a, b) => b.data - a.data)
        const count = 15;
        let p0 = 0;
        let p1 = count;
        let page = 1;
        let embed = new Discord.MessageEmbed()
          .setTitle(`Blacklist`)
          .setFooter({ text: `${page} / ${Math.ceil(data.length / count) === 0 ? 1 : Math.ceil(data.length / count)}` })
          .setColor(color)
          .setDescription(data
            .slice(p0, p1).map((m, c) => `<@${m.ID.split("_")[2]}> `).join("\n") || "Aucune blacklist trouvée");

        message.channel.send({ embeds: [embed]});

      }
    }
  }
}
