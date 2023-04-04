const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js')
const config = require('../../config.json')
const Discord = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Permet d\'envoyer le help.',

  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    if (args.length === 0) {
      const selectMenu = new MessageSelectMenu()
        .setCustomId('help-select')
        .setPlaceholder('Cloud\'s Bot - Sélectionnez une page de help')
        .addOptions([
          {
            label: '| Accueil',
            emoji: '📚',
            value: 'help-accueil',
          },
          {
            label: '| Modération',
            emoji: '🛡',
            value: 'help-moderation',
          },
          {
            label: '| Gestion Bot',
            emoji: '🎗',
            value: 'help-gestionbot',
          },
          {
            label: '| Musique',
            emoji: '🎵',
            value: 'help-musique',
          },
          {
            label: '| Ticket',
            emoji: '📮',
            value: 'help-ticket',
          },
        ]);
        const actionRow = new MessageActionRow().addComponents(selectMenu);
      const accueil = new MessageEmbed()
        .setTitle('Help Cloud\'s Bot Gestion')
        .setDescription('Pour voir les commandes correspondantes, merci de cliquer sur le select menu.')
        .setColor(color)
        .setImage('https://cdn.discordapp.com/attachments/1083780594372198460/1084090849530490880/LogoBanner.png')
        .setFooter(`Le propriétaire du bot est ${client.users.cache.get(config.buyer).tag}`);
      const initialMessage = await message.reply({
        content: null,
        allowedMentions: { repliedUser: false },
        components: [actionRow],
        embeds: [accueil],
      });
   
      
    client.on('interactionCreate', async interaction => {
      if (!interaction.isSelectMenu()) return; 
    
      if (interaction.customId === 'help-select') {
        const selectedValue = interaction.values[0]; 
        
        if (selectedValue === 'help-moderation') {
          
          const embed = new MessageEmbed()
            .setTitle('Modération')
            .setDescription(`
            Voici les commandes de modération disponibles :\n
           \`${prefix}ban <membre/id> [raison]\`\nPermet de bannir un membre du serveur\n
           \`${prefix}unban <membre/id>\` \nPermet de unban un user du serveur\n
           \`${prefix}clear <nombre de messages>\`\nPermet de supprimer d\'un coup plusieurs messages dans un salon\n
           \`${prefix}renew [salon]\`\n Permet de recréer un salon ou le message est envoyer\n
           \`${prefix}tempmute <membre/id> <temps> [raison]\`\nPermet de mute temporairement un membre du serveur\n
           \`${prefix}untempmute <membre/id> <temps> [raison]\`\nPermet de retire le mute temporairement un membre du serveur\n
           \`${prefix}unbanall\`\n unbanall tous les user ban.\n
           \`${prefix}tempban <user> <temps> <raison>\`\nBannit temporairement un utilisateur du serveur.\n
           \`${prefix}bl\`\n Ajoute un user a blacklist du bot\n
           \`${prefix}lock <salon>\`\nPermet de bloquer un salon, après ça les membres ne pourront plus envoyer de messages
           \`${prefix}unlock <salon>\`\nPermet de bloquer un salon, après ça les membres ne pourront plus envoyer de messages\n
           \`${prefix}clearwebhooks\`\nSupprime tous les webhooks du serveur.\n
           \`${prefix}warnlist [mention/id] \`\nPermet d'afficher la liste des warns que le membre a enregistrés\n
           \`${prefix}tempban <user> <temps> <raison>\`\nBannit temporairement un utilisateur du serveur.\n
           \`${prefix}delwarn <@membre> <ID de l'avertissement>\`\nSupprime un avertissement (warn) d'un membre.\n
           \`${prefix}hide <salon>\`\nCache le salon au membres\n
           \`${prefix}unhide <salon>\`\nAffiche le salon au membres\n
           \`${prefix}slowmode <temps>\`\nAjoute dans le channel un mode lent\n
            `)
            .setColor(color)
            .setFooter(`Commandes : ${client.commands.size} - ${footer}`);
          
          await interaction.update({
            content: null,
            embeds: [embed],
            components: [actionRow],
          });
        } else if (selectedValue === 'help-gestionbot') {
          
          const embed = new MessageEmbed()
            .setTitle('Gestion bot')
            .setDescription(`Voici les commandes de gestion du bot disponibles :\n
            \`${prefix}allprefix\`\nAffiche tous les préfixes des serveurs où le bot est présent.\n
            \`${prefix}bot\`\nEnvoie un embed avec un select menu\n
            \`${prefix}manage\`\nPermet de gère votre bot.\n
            \`${prefix}say <text>\`\nPermet d\'envoyer un message avec le bot\n
            \`${prefix}changlog\`\nEnvoie un les dernier mise a jour du bot.\n
            \`${prefix}color <nouvelle couleur>\`\nPermet de changer la couleur des embeds du bot\n
            \`${prefix}servers\`\nAffiche tous les serveurs où le bot est présent avec la possibilité de quitter un serveur.\n
            \`${prefix}mp <@membre> <message>\`\nEnvoie un message privé à un membre avec le bot.\n
            \`${prefix}embed\`\nPermet de crée un embed\n
            \`${prefix}prevname [user/id]\`\nAffiche les dernier pseudo\n
            \`${prefix}avatar <image>\`\nPermet de changer l'avatar du bot.\n
            \`${prefix}prefix <prefix>\`\nPermet de changer le prefix du bot sur un serveur.\n
            \`${prefix}owners [user/id]\`\nOwner une personne.\n
            \`${prefix}backup\`\nCrée une backup/load/delete/list\n
            \`${prefix}snap <nom du compte>\`\nAffiche le snapcode du snap précisé\n
            \`${prefix}stats\`\nAffiche les informations avancées du robot\n
            \`${prefix}uptime\`\nAffiche l'uptime du bot\n
            \`${prefix}snipe [numéro]\`\nPermet d\'afficher les derniers messages supprimés du salon\n
            \`${prefix}support\`\nDonne le lien vers le support.\n`)
            .setColor(color)
            .setFooter(`Commandes : ${client.commands.size} - ${footer}`);
          
          await interaction.update({
            content: null,
            embeds: [embed],
            components: [actionRow],
          });
        } else if (selectedValue === 'help-accueil') {
            await interaction.update({
                content: null,
                embeds: [accueil],
                components: [actionRow],
            })
        } else if (selectedValue === 'help-musique') {
          
            const embed = new MessageEmbed()
              .setTitle('🎶 Musique')
              .setDescription('Voici les commandes de musique du bot disponibles :')
              .setColor(color)
              .setFooter(`Commandes : ${client.commands.size} - ${footer}`);
            
            await interaction.update({
              content: null,
              embeds: [embed],
              components: [actionRow],
            });
          } else if (selectedValue === 'help-ticket') {
          
            const embed = new MessageEmbed()
              .setTitle('Ticket')
              .setDescription('Voici les commandes de contact/ticket du bot disponibles :')
              .setColor(color)
              .setFooter(`Commandes : ${client.commands.size} - ${footer}`);
            
            await interaction.update({
              content: null,
              embeds: [embed],
              components: [actionRow],
            });
        } else {
        
          await interaction.update({
            content: `Pas encore disponible : "${selectedValue}".`,
            components: [actionRow],
            embed: [help-aceille],
          });
        }
      }
    });


} else {
  const commandName = args[0].toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) {
      return message.reply(`Cette commande n'existe pas. Utilisez \`${prefix}help\` pour voir la liste des commandes.`);
  }

  const embed = new Discord.MessageEmbed()
      .setTitle(`Commande: \`${command.name}\``)
      .setColor(color)
      .setFooter(footer)
      .addField("Utilisation", `\`${prefix}${command.usage || "Aucun Usage."}\``)
      .addField("Description" , `\`${command.description ||  "Aucune description disponible."}\``);
  if (command.aliases) {
      embed.addField("Aliase", `\`${command.aliases.join("`, `")}\``);
  }
  
  return message.channel.send({ embeds: [embed] });
}
}
}

