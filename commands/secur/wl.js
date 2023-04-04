const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "wl",
  go: async (client, db, message, args, prefix, color, footer) => {
    if (db.get(`owner_${client.user.id}_${message.author.id}`) !== true) {
      return;
    }

    if (args[0]) {
      let member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (message.mentions.members.first())
        member = client.users.cache.get(message.mentions.members.first().id);
      if (db.get(`owner_${client.user.id}_${member.id}`) === true) return;
      if (!member)
        return message.reply({
          allowedMentions: { repliedUser: false },
          content: `Aucun membre trouvé pour \`${args[0] || "❌"}\``,
        });
      if (db.get(`wl_${client.user.id}_${member.id}`) === true)
        return message.reply({
          allowedMentions: { repliedUser: false },
          content: `${member.username} est déjà whitelist`,
        });
      db.set(`wl_${client.user.id}_${member.id}`, true);

      const reply = await message.reply({
        allowedMentions: { repliedUser: false },
        content: `${member.username} est maintenant whitelist`,
      });


    } else {
      const data = db
        .all()
        .filter((data) => data.ID.startsWith(`wl_${client.user.id}`))
        .sort((a, b) => b.data - a.data);
      const count = 15;
      let p0 = 0;
      let p1 = count;
      let page = 1;
      let embed = new MessageEmbed()
        .setTitle(`Wl List`)
        .setFooter({
          text: `${page} / ${
            Math.ceil(data.length / count) === 0
              ? 1
              : Math.ceil(data.length / count)
          }`,
        })
        .setColor(color)
        .setDescription(
          data
            // .filter(x => message.guild.members.cache.get(x.ID.split('_')[2]))
            .slice(p0, p1)
            .map((m, c) => `<@${m.ID.split("_")[2]}> `)
            .join("\n") || "Aucune donnée trouvée"
        );
      message.channel.send({ embeds: [embed] });
    }
  },
};
