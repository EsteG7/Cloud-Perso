const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'servers',
  description: 'Affiche tous les serveurs où le bot est présent avec la possibilité de quitter un serveur.',
  usage: `servers`,
  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
    // Activer le cache des guildes
    await client.guilds.fetch();

    // Récupérer tous les serveurs où le bot est présent
    const guilds = client.guilds.cache;

    // Créer un tableau d'options pour chaque serveur
    const options = guilds.map(guild => ({
      label: guild.name,
      value: guild.id,
      description: `Membres : ${guild.memberCount} | ID: ${guild.id}`,
      emoji: '🔹'
    }));

    // Créer un select menu avec toutes les options
    const selectMenu = new Discord.MessageSelectMenu()
      .setCustomId('servers')
      .setPlaceholder('Cloud\'s - Choisissez un serveur...')
      .addOptions(options);

    // Créer un MessageEmbed pour afficher les serveurs
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle('Serveurs')
      .setDescription(`Voici la liste des serveurs où je suis présent : \n\n ${guilds.map(guild => guild.name).join('\n\n')}`)
      .setFooter(footer);

    // Envoyer le MessageEmbed avec le select menu
    const messageEmbed = await message.reply({ content: null, embeds: [embed], allowedMentions: { repliedUser: false }, components: [new Discord.MessageActionRow().addComponents(selectMenu)] });

    // Créer un collector pour récupérer la réponse de l'utilisateur
    const collector = message.channel.createMessageComponentCollector({
      componentType: 'SELECT_MENU',
      time: 60000 // Temps en ms pendant lequel le collector est actif
    });

    collector.on('collect', async interaction => {
      if (interaction.customId === 'servers') {
        // Récupérer le serveur sélectionné par l'utilisateur
        const guild = client.guilds.cache.get(interaction.values[0]);

        // Créer un nouveau select menu pour demander confirmation à l'utilisateur
        const confirmationMenu = new Discord.MessageSelectMenu()
          .setCustomId('confirmation')
          .setPlaceholder(`Êtes-vous sûr de vouloir quitter ${guild.name} ?`)
          .addOptions([
            {
              label: 'Oui',
              value: 'yes',
              emoji: '✅'
            },
            {
              label: 'Non',
              value: 'no',
              emoji: '❌'
            }
          ]);

        // Envoyer le select menu de confirmation
        await interaction.update({
          components: [new Discord.MessageActionRow().addComponents(confirmationMenu)]
        });

        // Mettre à jour le collector pour récupérer la réponse de l'utilisateur
        collector.resetTimer();

        collector.on('collect', async interaction => {
          if (message.author.id !== interaction.user.id) {
            return interaction.reply({ content: '👮‍♂️ Vous n\'avez pas les droits nécessaires pour exécuter cette commande.', ephemeral: true });
          }
          if (interaction.customId === 'confirmation') {
            if (interaction.values[0] === 'yes') {
              await guild.leave();

              // Envoyer un message de confirmation
              const confirmationMessage = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`J'ai quitté le serveur **${guild.name}**.`)
                .setFooter(footer);

              await interaction.update({          embeds: [confirmationMessage], components: [] });
            } else if (interaction.values[0] === 'no') {
              // Envoyer un message pour dire que le bot ne quittera pas le serveur
              const cancelMessage = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`Je ne quitterai pas le serveur **${guild.name}**.`)
                .setFooter(footer);
    
              await interaction.update({
                embeds: [cancelMessage],
                components: [new Discord.MessageActionRow().addComponents(selectMenu)]
              });
    
              // Mettre à jour le collector pour récupérer la réponse de l'utilisateur
              collector.resetTimer();
            }
          }
        });
    
        collector.on('end', async () => {
          
          // Supprimer le select menu de confirmation
          await interaction.update({
            components: [new Discord.MessageActionRow().addComponents(selectMenu)]
          });
        });
      }
    });
  }}    }