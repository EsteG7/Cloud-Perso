
const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'slowmode',
  aliases: [],
  go: async (client, db, message, args, owner, Whitelist, color, footer) => {
    if (db.get(`owner_${client.user.id}_${message.author.id}`) !== true) return;
    
    const currentCooldown = message.channel.rateLimitPerUser;
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

    if (args[0] === 'off') {
      message.channel.setRateLimitPerUser(0);
      return message.channel.send(`Le mode lent est maintenant désactivé dans <#${channel.id}>`).then(() => {
        const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setTitle('Modération | **`slowmode`**')
          .setColor(color)
          .setDescription(`<@${message.author.id}> a désactivé le \`slowmode\` sur le salon <#${message.channel.id}>`)
          .setTimestamp()
          .setFooter(footer);

        client.channels.cache.get(db.get(`${message.guild.id}.modlog`)).send({ embeds: [embed] }).catch(console.error);
      });
    }

    const time = ms(args[0]) / 1000;

    if (isNaN(time)) return message.channel.send(`Aucune heure valide trouvée pour \`${args[0]}\``);

    if (time > 21600) return message.channel.send('Le mode lent ne peut pas être supérieur à 6 heures.');

    if (currentCooldown === time) return message.channel.send(`Mode lent est déjà sur ${args[0]} dans <#${channel.id}>`);

    message.channel.setRateLimitPerUser(time).then(() => {
      message.channel.send(`Le mode lent est maintenant de ${args[0]} dans <#${channel.id}>`);

      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle('Modération | **`slowmode`**')
        .setColor(color)
        .setDescription(`<@${message.author.id}> a mis un \`slowmode\` de ${args[0]} sur le salon <#${message.channel.id}>`)
        .setTimestamp()
        .setFooter(footer);

      client.channels.cache.get(db.get(`${message.guild.id}.modlog`)).send({ embeds: [embed] }).catch(console.error);
    });
  },
};
