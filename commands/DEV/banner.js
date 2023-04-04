const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = {
  name: 'banner',
  aliases: ["bn"],
  usage: 'banner <id/mentions>',
  description: 'Affiche la bannière d\'un membre.',
  go: async (client, db, message, args, prefix,  color,footer) => {
    
    if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

      const url = await member.user.fetch().then((user) => user.bannerURL({ format: "png", dynamic: true, size: 4096 }));

      const ERRbannerEmbed = new MessageEmbed()
        .setColor(color)
        .setTitle(`Pas De Bannière`)
        .setFooter(footer)
        .setDescription(`${member.user.username} n'a pas de bannière !`);

      if (!url) return message.channel.send({ embeds: [ERRbannerEmbed] });

      const bannerEmbed = new MessageEmbed()
        .setColor(color)
        .setDescription(`[${member.user.tag}](${member.user.bannerURL({ format: "png", size: 4096 })}) | (\`${member.user.id}\`)`)
        .setFooter(footer)
        .setURL(member.user.bannerURL({ format: "png", size: 4096 }))
        .setImage(`${url}`);

      const buttons = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("banner-banner")
          .setLabel("Afficher la photo de profil du membre")
          .setStyle("PRIMARY"),
      );

      const sentEmbed = await message.channel.send({
        embeds: [bannerEmbed],
        components: [buttons]
      });

      const collector = sentEmbed.createMessageComponentCollector({
        componentType: 'BUTTON',
        time: 60000
      });

      collector.on('collect', async i => {
        if (i.customId === "banner-banner") {
          const profileEmbed = new MessageEmbed()
            .setColor(color)
            .setDescription(`[${member.user.tag}](${member.user.displayAvatarURL({ format: "png", size: 4096 })}) | (\`${member.user.id}\`)`)
            .setFooter(footer)
            .setURL(member.user.displayAvatarURL({ format: "png", size: 4096 }))
            .setImage(`${member.user.displayAvatarURL({ format: "png", size: 4096 })}`);

          const bannerbutton = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("banner-button")
              .setLabel("Afficher la bannière de profil du membre")
              .setStyle("PRIMARY"),
          );

          await i.update({ embeds: [profileEmbed], components: [bannerbutton] });
        }

        if (i.customId === "banner-button") {
          const url2 = await member.user.fetch().then((user) => user.bannerURL({ format: "png", dynamic: true, size: 4096 }));
          const bannerWithoutButtons = new MessageEmbed()
            .setColor(color)
            .setDescription(`[${member.user.tag}](${member.user.bannerURL({ format: "png", size: 4096 })}) | (\`${member.user.id}\`)`)
            .setFooter(footer)
            .setImage(`${url2}}`);
          
          await i.update({ embeds: [bannerWithoutButtons], components: [buttons] });
        }
      });

      collector.on('end', async collected => {
        if (sentEmbed && !sentEmbed.deleted) {
    
          
          await sentEmbed.edit({ embeds: [bannerWithoutButtons], components: [] });
        }
      });
    }
  }
}