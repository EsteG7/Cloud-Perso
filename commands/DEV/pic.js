const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = {
  name: 'pic',
  description: 'Permet d\'afficher la photo de profil d\'un membre',
  usage: 'pic [mention/id]',
  go: async (client, db, message, args, prefix, color, footer) => {
    if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) { // Vérifie si l'auteur du message est l'administrateur du bot
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member; // Récupère le membre mentionné ou le membre qui a envoyé le message

      const url = await member.user.fetch().then((user) => user.bannerURL({ format: "png", dynamic: true, size: 4096 })); // Récupère l'URL de la bannière de l'utilisateur

      const ERRbannerEmbed = new MessageEmbed()
        .setColor(color)
        .setTitle(`Pas De Bannière`)
        .setFooter(footer)
        .setDescription(`${member.user.username} n'a pas de bannière !`);

      if (!url) return message.channel.send({ embeds: [ERRbannerEmbed] }); // Si l'utilisateur n'a pas de bannière, envoie un message d'erreur

      const bannerEmbed = new MessageEmbed()
        .setColor(color)
        .setDescription(`[${member.user.tag}](${member.user.bannerURL({ format: "png", size: 4096 })}) | (\`${member.user.id}\`)`)
        .setFooter(footer)
        .setURL(member.user.avatarURL({ format: "png", size: 4096 }))
        .setImage(`${member.user.avatarURL({ format: "png", size: 4096 })}`); // Crée l'embed qui affiche la photo de profil de l'utilisateur
       

      const buttons = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("banner-banner")
          .setLabel("Afficher la bannière de profil")
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
        if (message.author.id !== i.user.id) {
          return interaction.reply({ content: '👮‍♂️ Vous n\'avez pas les droits nécessaires pour exécuter cette commande.', ephemeral: true });
        }
        if (i.customId === "banner-banner") { 
          const profileEmbed = new MessageEmbed()
            .setColor(color)
            .setDescription(`[${member.user.tag}](${member.user.bannerURL({ format: "png", size: 4096 })}) | (\`${member.user.id}\`)`)
            .setFooter(footer)
            .setURL(member.user.bannerURL({ format: "png", size: 4096 }))
            .setImage(`${member.user.bannerURL({ format: "png", dynamic: true, size: 4096 })}`); // Crée l'embed qui affiche la photo de profil de l'utilisateur
      
          await i.update({ embeds: [profileEmbed], components: [] }); 
        }
      })}}}