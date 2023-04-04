const { Discord } = require('discord.js');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const moment = require("moment")

module.exports = {
  name: 'snipe',
  aliases: ["sn"],
  usage: 'snipe [numéro]',
  description: 'Permet d\'afficher les derniers messages supprimés du salon',
  go: async (client, db, message, args, prefix, color, footer) => {
    if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
      let snipes = client.snipes.get(message.channel.id)
      if (!snipes) return message.reply({ content:"Aucun message supprimé", allowedMentions: { repliedUser: false } });
      
      const numSnipes = parseInt(args[0]) || snipes.length;

      const target = snipes[numSnipes - 1];
      if (!target) return message.reply({ content: `Il n'a que ${snipes.length} message(s) à snipe`, allowedMentions: { repliedUser: false } });

      const { msg, time, image } = target;
      const embed = new MessageEmbed()
        .setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL({})})
        .setColor(color)
        .setDescription(`**${msg.content}**`)
        .setFooter(`${moment(time).fromNow()} | ${numSnipes} sur ${snipes.length}`)

      if (msg.image) embed.setImage(msg.image)

      const buttonsPerPage = 5;
      let currentPage = 1;
      let currentButtonIndex = 0;
      const buttons = snipes.slice(0, numSnipes).map((s, i) => {
        if (i === numSnipes - 1) return null; 
        if (i % buttonsPerPage === 0) {
          currentPage++;
          currentButtonIndex = 0;
        } else {
          currentButtonIndex++;
        }
        return new MessageButton()
          .setStyle("SECONDARY")
          .setCustomId(`${i}`)
          .setLabel(`#${i + 1}`)
          .setDisabled(i === numSnipes - 1);
      }).filter(Boolean); // Filtre les valeurs nulles

      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle("PRIMARY")
          .setCustomId("te")
          .setLabel(`${msg.author.tag}`)
          .setDisabled(true),
        ...buttons.slice(0, buttonsPerPage)
      );
      const components = [row];

      const collector = message.channel.createMessageComponentCollector({
        componentType: 'BUTTON',
        time: 30000
      });

      collector.on('collect', i => {
        if (i.customId === 'te') {
          i.deferUpdate();
          return;
        }
        const snipeIndex = parseInt(i.customId);
        const selectedTarget = snipes[snipeIndex];
        const selectedEmbed = new MessageEmbed()
          .setAuthor({ name: selectedTarget.msg.author.tag, iconURL: selectedTarget.msg.author.displayAvatarURL({})})
          .setColor(color)
          .setDescription(`**${selectedTarget.msg.content}**`)
          .setFooter(`${moment(selectedTarget.time).fromNow()} | ${snipeIndex + 1} / ${snipes.length}`)
        if (selectedTarget.msg.image) selectedEmbed.setImage(selectedTarget.msg.image)

        i.update({ embeds: [selectedEmbed], components: updateComponents(components, snipeIndex, buttonsPerPage) });
      });
      message.reply({embeds: [embed], allowedMentions: { repliedUser: false } });

    }
  }
}