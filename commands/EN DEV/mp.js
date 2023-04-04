const Discord = require("discord.js");

module.exports = {
  name: "mp",
  aliases: [],
  description: "Envoie un message privé à un membre avec le bot.",
  usage: "mp <@membre> <message>",
  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
    const member = message.mentions.members.first();
    if (!member) {
      return message.channel.send("Veuillez mentionner un membre.");
    }

    const content = args.slice(1).join(" ");
    if (!content) {
      return message.channel.send("Veuillez indiquer un message à envoyer.");
    }

    try {
      const dmChannel = await member.createDM();
      await dmChannel.send(content);

      const embed = new Discord.MessageEmbed()
        .setTitle("Message envoyé")
        .setDescription(`Le message a été envoyé à **${member.user.tag}**.`)
        .setColor(color)
        .setFooter(footer)
        .setTimestamp();
      message.channel.send({embeds: [embed]});
    } catch (err) {
      console.error(err);
      message.channel.send("Le message n'a pas pu être envoyé.");
    }
  }}
};
