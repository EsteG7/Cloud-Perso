const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const config = require('../../config.json');
const os = require('os');
module.exports = {
  name: 'manage',
  description: 'Permet de gère votre bot.',

  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
    const selectMenu = new MessageSelectMenu()
      .setCustomId('manage-menu')
      .setPlaceholder('Cloud\'s Bot - Manage')
      .addOptions([
        {
            label: 'Ping',
            value: 'manage-ping',
            description: 'Affiche le ping du bot',
            emoji: '🔁',
          },
        {
          label: 'Restart',
          value: 'manage-restart',
          description: 'Redémarrez le bot',
          emoji: '🔄',
        },
        {
          label: 'Affiche Prefix / Color',
          value: 'manage-prcl',
          description: 'Afficher le préfixe et la couleur actuels du bot',
          emoji: '🎨',
        },
        {
          label: 'Affiche Uptime',
          value: 'manage-uptime',
          description: 'Affiche depuis combien de temps le bot est en ligne',
          emoji: '⏰',
        },
        {
          label: "Affiche les performance de la machine",
          emoji: "🧭",
          value: 'manage-pmh'
        }
      ]);

    const actionRow = new MessageActionRow().addComponents(selectMenu);

    const manage = new MessageEmbed()
      .setTitle(`Manage ${client.user.username}`)
      .setDescription(`[${client.user.tag}](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
      .setColor(color)
      .setFooter(`Le propriétaire du bot est ${client.users.cache.get(config.buyer).tag}`);

    const initialMessage = await message.reply({
      content: null,
      allowedMentions: { repliedUser: false },
      components: [actionRow],
      embeds: [manage],
    });

    client.on('interactionCreate', async (interaction) => {


      if (!interaction.isSelectMenu()) return;
      if (interaction.customId === 'manage-menu') {

      const selectedValue = interaction.values[0];

      if (selectedValue === 'manage-ping') {
        const embed = new MessageEmbed()
        .setColor(color)
        .setTitle('Ping')
        .addField('Latence', `**${client.ws.ping}ms**`)

        .setTimestamp();
            interaction.reply({ content: null, embeds: [embed], ephemeral: true });
      } if (selectedValue === 'manage-restart') {
        interaction.reply({ content: 'Le bot redémarrera dans 3 secondes.', ephemeral: true });
        setTimeout(() => {
          process.exit();
        }, 3000);

      } if (selectedValue === 'manage-uptime') {
        let days = Math.floor((client.uptime / (1000 * 60 * 60 * 24)) % 60).toString();
        let hours = Math.floor((client.uptime / (1000 * 60 * 60)) % 60).toString();
        let minuts = Math.floor((client.uptime / (1000 * 60)) % 60).toString();
        let seconds = Math.floor((client.uptime / 1000) % 60).toString();
        const embed = new MessageEmbed()
        .addFields({name : "Uptime du Bot :", value:`Je suis connecter depuis ${days} jour(s) ${hours} heure(s) ${minuts} minute(s) ${seconds} seconde(s)`})
          .setFooter(footer)
        .setColor(color);

      interaction.reply({ content: null, embeds: [embed], ephemeral: true });

      } else if (selectedValue === 'manage-prcl') {
        const embed = new MessageEmbed()
          .setDescription(`
            Le préfixe sur ce serveur est : \`${prefix}\`
            La couleur des embeds est : \`${color}\``)
            .setFooter(footer)
          .setColor(color);

        interaction.reply({ content: null, embeds: [embed], ephemeral: true });
      }  else if (selectedValue === 'manage-pmh') {
      const embed = new MessageEmbed()
      .addField('• Système d\'exploitation', `${os.type()} ${os.arch()}`, false)
      .addField('• CPU', os.cpus()[0].model, false)
      .addField('• CPU utiliser', `${Math.round(process.cpuUsage().system / 1024 / 1024)} Mb / ${Math.round(os.totalmem() / 1024 / 1024)}MB`, false)
      .addField('• Mémoire utiliser ', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} Mb`, false)
      .addField('•Mémoire Disponible', `${Math.round(os.freemem() / 1024 / 1024)} Mb`, false)
          .setFooter(footer)
        .setColor(color);

      interaction.reply({ content: null, embeds: [embed], ephemeral: true });
    }else {
        await interaction.update({
          content: `Pas encore disponible : "${selectedValue}".`,
          components: [actionRow],
          embeds: [manage],
        });
      }
    }})
  }}
}
