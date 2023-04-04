const Discord = require("discord.js");
const malScraper = require('mal-scraper');


module.exports = {
  name: "anime",
  go: async (client, db, message, args, prefix, color, footer, interaction) => {

    const search = `${args}`;
    if (!search)
      return message.reply(':x: | Veuillez ajouter une requête de recherche.');

    malScraper.getInfoFromName(search)
      .then((data) => {
        const malEmbed = new Discord.MessageEmbed()
          .setAuthor(`Résultat de recherce pour ${args}`.split(',').join(' '))
          .setThumbnail(data.picture)
          .setColor(color)
          .addField('Première', `\`${data.premiered}\``, true)
          .addField('Diffuser', `\`${data.broadcast}\``, true)
          .addField('Genres', `\`${data.genres}\``, true)
          .addField('Titre anglais', `\`${data.englishTitle}\``, true)
          .addField('Titre japonais', `\`${data.japaneseTitle}\``, true)
          .addField('Type', `\`${data.type}\``, true)
          .addField('Episodes', `\`${data.episodes}\``, true)
          .addField('Evaluation', `\`${data.rating}\``, true)
          .addField('Diffusé', `\`${data.aired}\``, true)
          .addField('Score', `\`${data.score}\``, true)
          .addField('Favori', `\`${data.favorites}\``, true)
          .addField('Classé', `\`${data.ranked}\``, true)
          .addField('Durée', `\`${data.duration}\``, true)
          .addField('Studios', `\`${data.studios}\``, true)
          .addField('Popularité', `\`${data.popularity}\``, true)
          .addField('Membres', `\`${data.members}\``, true)
          .addField('Score Stats', `\`${data.scoreStats}\``, true)
          .addField('Source', `\`${data.source}\``, true)
          .addField('Synonymes', `\`${data.synonyms}\``, true)
          .addField('Status', `\`${data.status}\``, true)
          .addField('Identifier', `\`${data.id}\``, true)
          .addField('Link', `\`${data.url}\``, true)
          .setTimestamp()
          .setFooter(footer)

        message.channel.send({embeds: [malEmbed]});

      })
  }
};