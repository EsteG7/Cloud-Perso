const fetch = require('node-fetch');
const config = require('../../config.json')
const Discord = require('discord.js');

module.exports = {
  name: 'fivem',
  description: 'Affiche les joueurs connectés sur un serveur FiveM',

  go: async (client, db, message, prefix) => {
    const args = message.content.split(' ');
    const ip = args[1];
    const port = args[2];

    if (!ip || !port) {
      message.reply('Veuillez fournir un IP et un port pour rejoindre un serveur FiveM.');
      return;
    }

    const url = `http://${ip}:${port}/players.json`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.length === 0) {
        message.reply('Il n\'y a aucun joueur connecté sur le serveur FiveM.');
        return;
      }

      const players = data.map(player => ({
        id: player.id,
        name: player.name,
        ping: player.ping,
      }));

      const playerFields = players.map(player => (`Joueur : ${player.id} | Nom : ${player.name} | Ping : ${player.ping}`));
      const color = db.get(`${message.guild.id}.color`) || config.color;
      const footer = config.footer;

      const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setFooter(footer)
        .setTitle(`Joueurs connectés sur le serveur FiveM ${ip}:${port}`)
        .setDescription(`${playerFields}`);

      const filter = (interaction) => interaction.customId === 'refreshButton';
      const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 });

      const refreshButton = new Discord.MessageButton()
        .setCustomId('refreshButton')
        .setLabel('Réactualiser')
        .setStyle('PRIMARY');

      embed.setTimestamp();

      const msg = await message.reply({
        embeds: [embed],
        components: [{ type: 'ACTION_ROW', components: [refreshButton] }],
      });

      collector.on('collect', async (interaction) => {
        await interaction.deferUpdate();
        const newData = await fetch(url).then((res) => res.json());
        const newPlayers = newData.map((player) => ({
          id: player.id,
          name: player.name,
          ping: player.ping,
        }));
        const newPlayerFields = newPlayers.map((player) => (`Joueur : ${player.id} | Nom : ${player.name} | Ping : ${player.ping}`));
        const newEmbed = new Discord.MessageEmbed()
          .setColor(color)
          .setFooter(footer)
          .setTitle(`Joueurs connectés sur le serveur FiveM ${ip}:${port}`)
          .setDescription(`${newPlayerFields}`);
        newEmbed.setTimestamp();
        await msg.edit({ embeds: [newEmbed] });
      });

      collector.on('end', () => {
        const endEmbed = new Discord.MessageEmbed()
          .setColor(color)
          .setFooter(footer)
          .setTitle(`Joueurs connectés sur le serveur FiveM ${ip}:${port}`)
          .setDescription(`${playerFields}`);
        endEmbed.setTimestamp();
        refreshButton.setDisabled(true);
        msg.edit({ embeds: [endEmbed], components: [{ type: 'ACTION_ROW', components: [refreshButton.setDisabled(true)] }] });
      });

    }
  }