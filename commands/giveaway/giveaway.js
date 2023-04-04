const Discord = require('discord.js');
const ms = require('ms');
const config = require('../../config.json')
module.exports = {
  name: 'giveaway',
  usage: 'giveaway <durée> <nombre de gagnants> <prix>',
  description: `Permet de lancer un giveaway sur le serveur.`,
  go: async (client, db, message, args, prefix, color, footer) => {
    if (
        config.owner === message.author.id ||
        db.get(`owner_${client.user.id}_${message.author.id}`) === true 
      ) {

    const duration = args[0];
    if (!duration || isNaN(ms(duration))) {
      return message.reply(":x: Veuillez spécifier une durée valide pour le giveaway.");
    }

    const maxWinners = parseInt(args[1]);
    if (isNaN(maxWinners) || maxWinners < 1 || maxWinners > 10) {
      return message.reply(":x: Veuillez spécifier un nombre de gagnants valide pour le giveaway (maximum 10).");
    }

    const prize = args.slice(2).join(' ');
    if (!prize) {
      return message.reply(":x: Veuillez spécifier un prix pour le giveaway.");
    }

    const endAt = new Date(Date.now() + ms(duration));
    const winners = [];
    const embed = new Discord.MessageEmbed()
      .setTitle(`${maxWinners} gagnant(s) - ${prize}`)
      .setDescription(`Réagissez avec 🎉 pour participer !\nDurée : ${duration}\nFin le : ${endAt.toLocaleString()}`)
      .setColor(color)
      .setFooter(`Giveaway organisé par ${message.author.tag}`, message.author.avatarURL());

    const components = [
      new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId('start_giveaway')
          .setLabel('Lancer le giveaway')
          .setStyle('PRIMARY')
      )
    ];

    const giveawayMessage = await message.channel.send({ embeds: [embed], components: components });
    const filter = i => i.customId === 'start_giveaway' && i.user.id === message.author.id;
    const collector = giveawayMessage.createMessageComponentCollector({ filter, time: ms(duration) });

    collector.on('collect', async () => {
      await giveawayMessage.edit({ components: [] });
      await giveawayMessage.react('🎉');

      const reactionCollectorFilter = (reaction, user) => {
        return reaction.emoji.name === '🎉' && !user.bot;
      };

      const reactionCollector = giveawayMessage.createReactionCollector({ filter: reactionCollectorFilter, time: ms(duration) });

      reactionCollector.on('collect', (reaction, user) => {
        if (!winners.includes(user.id)) {
          winners.push(user.id);
        }
      });

      reactionCollector.on('end', async () => {
        if (winners.length === 0) {
          const noWinnersEmbed = new Discord.MessageEmbed()
            .setTitle(`${maxWinners} gagnant(s) - ${prize}`)
            .setDescription(`Aucun gagnant !\nDurée : ${duration}\nFin le : ${endAt.toLocaleString()}`)
            .setColor(color)
            .setFooter(`Giveaway organisé par ${message.author.tag}`, message.author.avatarURL());
            await giveawayMessage.edit({ embeds: [noWinnersEmbed] });
            } else {
            const shuffledWinners = shuffleArray(winners);
            const finalWinners = shuffledWinners.slice(0, maxWinners);
            let winnersText = '';
            for (let i = 0; i < finalWinners.length; i++) {
              const user = await client.users.fetch(finalWinners[i]);
              winnersText += `- ${user.tag}\n`;
            }
      
            const winnersEmbed = new Discord.MessageEmbed()
              .setTitle(`${maxWinners} gagnant(s) - ${prize}`)
              .setDescription(`Gagnant(s) : \n${winnersText}\nDurée : ${duration}\nFin le : ${endAt.toLocaleString()}`)
              .setColor(color)
              .setFooter(`Giveaway organisé par ${message.author.tag}`, message.author.avatarURL());
            await giveawayMessage.edit({ embeds: [winnersEmbed] });
          }
      
          const giveawayData = {
            prize: prize,
            winners: winners,
            endAt: endAt.getTime()
          };
      
          db.set(`giveaway_${giveawayMessage.id}`, giveawayData);
        });
      });
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
     } }
};