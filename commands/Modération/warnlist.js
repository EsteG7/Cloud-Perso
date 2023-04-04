const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const db = require('quick.db');

module.exports = {
  name: 'warnlist',
  aliases: [],
  description: `Permet d'afficher la liste des warns que le membre a enregistrés`,
  usage: `warnlist [mention/id]`,
  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    const userId = user.id;
    const number = db.get(`number.${message.guildId}.${userId}`);
    const warnInfo = db.get(`info.${message.guildId}.${userId}`);
  
    if (!number || !warnInfo || warnInfo.length == 0) {
      return message.reply({ content: `Cette personne n'a pas de warn.`, allowedMentions: { repliedUser: false } });
    }
  
    const pages = Math.ceil(number / 5);
    let page = 1;
    let index = 0;
  
    const menuOptions = warnInfo.map((warning, i) => ({
      label: `Warn ${i+1}`,
      description: `Modérateur: **${warning.moderator}**\nRaison: **${warning.reason}**\nDate: <t:${warning.date}>`,
      value: i.toString(),
      emoji: '👮‍♂️'
    }));
  
    const embed = new MessageEmbed()
      .setTitle(`Liste des sanctions de ${user.tag || "Erreur"} (**${number}**)`)
      .setColor(color)
      .setDescription(`Modérateur: **${warnInfo[index].moderator}**\nRaison: **${warnInfo[index].reason}**\nDate: <t:${warnInfo[index].date}>`)
      .setFooter(`Pages ${page}/${pages}`);
  
    const menu = new MessageSelectMenu()
      .setCustomId('sanctions-menu')
      .setPlaceholder('Cloud\'s - Sélectionner une sanction')
      .addOptions(menuOptions.slice(index, index+5));
  
    const row = new MessageActionRow()
      .addComponents(menu);
  
    const msg = await message.reply({ content: null, embeds: [embed], components: [row], allowedMentions: { repliedUser: false } });
  
    const collector = msg.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 60000 });
    collector.on('collect', async (i) => {
        if (i.customId === 'sanctions-menu') {
          index = parseInt(i.values[0]);
          page = Math.ceil((index + 1) / 5);
          embed.setDescription(`Modérateur: **${warnInfo[index].moderator}**\nRaison: **${warnInfo[index].reason}**\nDate: <t:${warnInfo[index].date}>`);
          embed.setFooter(`Pages ${page}/${pages}`);
          menu.options = menuOptions.slice(index, index+5);
          await i.update({ embeds: [embed], components: [row] });
        }
      });
    
      collector.on('end', async (collected) => {
        menu.setDisabled(true);
        row.components = [menu];
        await msg.edit({ components: [row] });
    
        if (collected.size === 0) {
          return msg.edit({ content: "La sélection a expiré. Veuillez réexécuter la commande.", components: [] });
        }
      });
    }
  }