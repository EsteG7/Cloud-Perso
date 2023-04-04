const Discord = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const db = require("quick.db");

module.exports = {
  name: 'randomuser',
  description: 'Choisit un utilisateur aléatoire sur le serveur.',
  aliases: ["rdr"],
  usage: `randomuser`,
  go: async (client,db,message,args,prefix,color,footer,interaction) => {

      const members = message.guild.members.cache.filter(member => !member.user.bot);
      const randomUser = members.random().user;
      
      // Création du select menu avec les options "En ligne" et "En vocal"
      const selectMenu = new MessageSelectMenu()
        .setCustomId('userStatus')
        .setPlaceholder('Choisir le statut de l\'utilisateur (A debug)')
        .setDisabled(true)
        .addOptions([
          { label: 'En ligne', value: 'online' },
          { label: 'En vocal', value: 'voice' }
        ]);

      // Création de la rangée d'actions contenant le select menu
      const row = new MessageActionRow().addComponents(selectMenu);

      const embed = new MessageEmbed()
        .setColor(color)
        .setTitle('Utilisateur aléatoire')
        .setDescription(`L'utilisateur choisi aléatoirement est :`)
        .addFields({ name: "Random User Mention:", value: `${randomUser}` })
        .addFields({ name: "Random User ID:", value: `${randomUser.id}` })
        .addFields({ name: "Random User TAG:", value: `${randomUser.tag}` })

      // Envoi du message contenant l'embed et la rangée d'actions
      message.channel.send({ embeds: [embed], components: [row] })
        .then(async msg => {
          // Attente de la sélection de l'option dans le select menu
          const filter = i => i.customId ==='userStatus' && i.user.id === message.author.id;
          const collector = msg.createMessageComponentCollector({ filter, time: 15000 });

          collector.on('collect', async i => {
            // Récupération du statut sélectionné dans le select menu
            const selectedOption = i.values[0];
    
            // Filtrage des membres selon le statut sélectionné
            let filteredMembers;
            switch (selectedOption) {
              case 'online':
                filteredMembers = members.filter(member => member.presence.status === 'online');
                break;
              case 'voice':
                filteredMembers = members.filter(member => member.voice.channel);
                break;
              default:
                filteredMembers = members;
            }
    
            // Choix d'un utilisateur aléatoire parmi les membres filtrés
            const randomFilteredUser = filteredMembers.random().user;
    
            // Mise à jour de l'embed avec l'utilisateur aléatoire filtré
            embed.spliceFields(0, 1, { name: "Utilisateur aléatoire filtré :", value: `${randomFilteredUser}` })
              .spliceFields(1, 1, { name: "RandomFilteredUser ID:", value: `${randomFilteredUser.id}` })
              .spliceFields(2, 1, { name: "RandomFilteredUser TAG:", value: `${randomFilteredUser.tag}` });
    
            // Mise à jour du message avec l'embed modifié
            msg.edit({ embeds: [embed] });
          });
    
          collector.on('end', async collected => {
            // Suppression de la rangée d'actions du message
            row.components.forEach(component => component.setDisabled(true));
            msg.edit({ components: [row] });
          });
        });
    },
};