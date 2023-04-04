const fs = require('fs');
const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: 'helpv2',
  usage: 'helpv2',
  description: 'Helpv2 [Seulement pour SOWN et ATOYA]',
  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    if (config.sown === message.author.id || config.atoya === message.author.id) {

      const commandFolders = fs.readdirSync('./commands');
      const selectMenuOptions = [];

      const emojiMap = {
        'Modération': '🛡',
        'Gestion Bot': '🤖',
        'Créateur': '🔑',
        'Utilitaire': '💎',
        'Ticket': '🔑',
      };

      for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        const options = [];

        for (const file of commandFiles) {
          const command = require(`../${folder}/${file}`);
          options.push({
            label: command.name,
            description: command.description || 'Aucune description pour le moment',
            value: command.name
          });
        }

        const emoji = emojiMap[folder] || '❌';

        selectMenuOptions.push({
          label: folder,
          value: folder,
          emoji: emoji,
          options: options
        });
      }

      const selectMenu = new MessageSelectMenu()
        .setCustomId('help-select-menu')
        .setPlaceholder('Cloud\'s - Choisir une catégorie')
        .addOptions(selectMenuOptions);

      const actionRow = new MessageActionRow()
        .addComponents(selectMenu);

      const embed = new MessageEmbed()
        .setColor(color)
        .setDescription('Veuillez choisir une catégorie de commande ci-dessous.');

      const helpMessage = await message.reply({ embeds: [embed], components: [actionRow] });

      client.on('interactionCreate', async interaction => {
        if (!interaction.isSelectMenu() || interaction.customId !== 'help-select-menu') return;

        const [folder] = interaction.values;
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

        const commandsList = commandFiles.map(file => {
          const command = require(`../${folder}/${file}`);
          return `\`${prefix}${command.name}\` \n **${command.description || "Aucune description pour le moment"}**\n`;
        }).join('\n');

        const emoji = emojiMap[folder] || '❓';

        const embed = new MessageEmbed()
          .setColor(color)
          .setTitle(`${emoji} ${folder}`)
          .setDescription(commandsList);

        interaction.update({ embeds: [embed], components: [actionRow] });
      });
    }
  }
};
