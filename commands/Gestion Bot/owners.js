const { MessageEmbed } = require("discord.js");
const config = require('../../config.json');
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu } = require('discord.js');

module.exports = {
  name: 'owner',
  aliases: 'owners',
  description: `owner une personne.`,
  go: async (client, db, message, args, prefix, color, footer) => {
    if (config.owner === message.author.id || config.buyer === message.author.id || config.sown === message.author.id || config.atoya === message.author.id) {
      if (args[0]) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (message.mentions.members.first()) member = client.users.cache.get(message.mentions.members.first().id);
        if (!member) return message.reply({ allowedMentions: { repliedUser: false }, content: `Aucun membre trouvé pour \`${args[0] || "Aucun ❌"}\`` });
        if (db.get(`owner_${client.user.id}_${member.id}`) === true) return message.reply({ allowedMentions: { repliedUser: false }, content: `${member.username} est déjà owner` });
        db.set(`owner_${client.user.id}_${member.id}`, true);
        const msg = await message.reply({ allowedMentions: { repliedUser: false }, content: `${member.username} est maintenant owner` });
        console.log(`Le membre ${member.username} vient de se faire owner par ${message.author.tag} sur le bot ${client.user.tag}`);

        const filter = i => i.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000 });
      } else {
        const data = db.all().filter(data => data.ID.startsWith(`owner_${client.user.id}`)).sort((a, b) => b.data - a.data);
        const count = 15;
        let p0 = 0;
        let p1 = count;
        let page = 1;
        let embed = new MessageEmbed()
          .setTitle(`Owner List`)
          .setFooter(`${page} / ${Math.ceil(data.length / count) === 0 ? 1 : Math.ceil(data.length / count)} • ${footer} `)
          .setColor(color)
          .setDescription(data
            .filter(x => message.guild.members.cache.get(x.ID.split('_')[2]))
            .slice(p0, p1)
            .map((m, c) => {
              const user = client.users.cache.get(m.ID.split("_")[2]);
              const crown = m.ID.split("_")[2] === config.buyer ? "**| __Buyer Bot__**" : "";
              return `${c + 1} - [${user.tag}](https://discord.com/users/${m.ID.split("_")[2]}) | (\`${m.ID.split("_")[2]}\`) ${crown}`;
            }).join("\n") || "Aucune owner dans le bot");

        message.channel.send({ embeds: [embed] });
      }
    }
  }
}
